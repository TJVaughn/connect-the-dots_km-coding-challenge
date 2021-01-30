const express = require('express')
const path = require('path')
const http = require('http')
const WebSocket = require('ws')
const { getPointsByAttrs, findAndUpdateNode, sendPayload, updateMovesMade, createGameState, updateLineThrus } = require('./server/src/helpers')
const isValidStartNode = require('./server/src/isValidStartNode')
const isValidEndNode = require('./server/src/isValidEndNode')
const gameOver = require('./server/src/gameOver')
const getThruNodes = require('./server/src/getThruNodes')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 8080
const publicDirPath = path.join(__dirname, './client/public')
app.use(express.static(publicDirPath))
const wss = new WebSocket.Server({server})

//Must define gameState outside of initialize
let gameState
let movesMade
let startNode 

wss.on('connection', (ws) => {
    ws.on('message', (m) => {
        m = JSON.parse(m)
        console.log("Client: ")
        console.log(m)

        //when the browser initializes, refresh game state
        if(m.msg === "INITIALIZE") {
            gameState = createGameState()
            movesMade = []
            startNode = { x: null, y: null }
            return ws.send(
                sendPayload(1, 1, null, "INITIALIZE", "Awaiting Player 1's Move", null)
            )
        } 

        let startNodeRes = isValidStartNode(gameState, movesMade, startNode, m.body)

        if(startNodeRes.bool){
            startNode.x = m.body.x
            startNode.y = m.body.y
            // console.log(startNode);
            findAndUpdateNode(startNode, gameState, true, true)
            console.log(gameState)

            return ws.send(
                sendPayload(m.id, gameState[0].player1, null, "VALID_START_NODE", null)
            )
        }
        if(startNodeRes.message === "INVALID_START_NODE"){
            startNode.x = null
            startNode.y = null
            console.log(gameState)
            return ws.send(
                sendPayload(m.id, gameState[0].player1, null, "INVALID_START_NODE", "Invalid start node")
            )
        }
        if(isValidEndNode(gameState, startNode, m.body, movesMade)){
            
            
            gameState[0].player1 = !gameState[0].player1

            ws.send(
                sendPayload(m.id, gameState[0].player1, 
                    {start: {x: startNode.x, y: startNode.y}, 
                    end: {x: m.body.x, y: m.body.y}}, "VALID_END_NODE", null)
            )
            if(getPointsByAttrs(gameState, true).length > 1){
                findAndUpdateNode(startNode, gameState, false, true)
            }
            // let thruNodes = updateLineThrus(gameState, startNode, m.body)
            let thruNodes = getThruNodes(startNode, m.body)
            // console.log(thruNodes)
            updateLineThrus(thruNodes, gameState)
            // console.log(thruNodes)
            movesMade = updateMovesMade(startNode, m.body, movesMade)
            // console.log(movesMade)
            startNode.x = null
            startNode.y = null
            findAndUpdateNode(m.body, gameState, true, true)
            
            console.log(gameState)
            let go = gameOver(getPointsByAttrs(gameState, true, false), gameState, movesMade)
            console.log(`Game Over: ${go}`)
            if(go){
                return ws.send(
                    sendPayload(m.id, "GAME_OVER", {start: {x: startNode.x, y: startNode.y}, 
                        end: {x: m.body.x, y: m.body.y}}, "GAME_OVER", 
                        `Game Over!!! Player ${gameState[0].player1 ? '1' : '2'} wins!`)
                )
            }
            // console.log("Moves Made: ");
            // console.log(movesMade)
            console.log("Game State: ");
            console.log(gameState)
            return
        }
        //if it is not a valid end node, send invalid node message
        startNode.x = null
        startNode.y = null
        // console.log("Moves Made: ");
        // console.log(movesMade)
        console.log("Game State: ");
        console.log(gameState)
        return ws.send(
            sendPayload(m.id, gameState[0].player1, null, "INVALID_END_NODE", "No move was made. Invalid")
        )
    })
})

server.listen(port, () => {
    console.log(`Server is listening on port:${port}`);
})
