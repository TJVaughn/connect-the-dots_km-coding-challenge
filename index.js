const express = require('express')
const app = express()
const port = process.env.PORT
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const WebSocket = require('ws')
const { getPointsByAttrs, findAndUpdateNode, sendPayload, updateMovesMade,
    createGameState, updateLineThrus} = require('./server/src/helpers')
const isValidStartNode = require('./server/src/isValidStartNode')
const {isValidEndNode }= require('./server/src/isValidEndNode')
// const updateLineThrus = require('./server/src/updateLineThrus')
const gameOver = require('./server/src/gameOver')
const getThruNodes = require('./server/src/getThruNodes')

const publicDirPath = path.join(__dirname, './client/public')
app.use(express.static(publicDirPath))
const wss = new WebSocket.Server({server})


//create fresh game state
let startNode = {x: null, y: null}
let gameState = createGameState()
let movesMade = []

wss.on('connection', (ws) => {
    ws.on('message', (m) => {
        m = JSON.parse(m)
        console.log("Client: ")
        console.log(m);

        //initialize
        if(m.msg === "INITIALIZE") {
            console.log(startNode);
            console.log(gameState)
            gameState = createGameState()
            movesMade = []
            startNode = { x: null, y: null }
            return ws.send(
                sendPayload(1, 1, null, "INITIALIZE", "Awaiting Player 1's Move", null)
            )
        } 
        let startNodeRes = isValidStartNode(gameState, startNode, m.body)
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


// payload = JSON.stringify({
//     "id": 1,
//     "msg": "INITIALIZE",
//     "body": {
//         "newLine": null,
//         "heading": "Player 1",
//         "message": "Awaiting Player 1's Move"
//     }
// })
// ws.send(payload)

// payload = JSON.stringify(
//     {
//         "id": 2,
//         "msg": "VALID_START_NODE",
//         "body": {
//             "newLine": null,
//             "heading": "Player 1",
//             "message": null
//         }
//     }
// )
// payload = JSON.stringify({
    //         "id": 3,
    //         "msg": "VALID_END_NODE",
    //         "body": {
    //             "newLine": {
    //                 "start": {
    //                     "x": gameState[0].x,
    //                     "y": gameState[0].y
    //                 },
    //                 "end": {
    //                     "x": coordinates.end.x,
    //                     "y": coordinates.end.y
    //                 }
    //             },
    //             "heading": "Player 2",
    //             "message": null
    //         }
    //     })
    // ws.send(payload)

      // if(m.id === 4){
        //     coordinates.start.x = m.body.x,
        //     coordinates.start.y = m.body.y
        //     // console.log(coordinates);
        //     payload = JSON.stringify(
        //         {
        //             "id": 4,
        //             "msg": "VALID_START_NODE",
        //             "body": {
        //                 "newLine": null,
        //                 "heading": "Player 1",
        //                 "message": null
        //             }
        //         }
        //     )
        //     ws.send(payload)
        // }
        // if(m.id === 5){
        //     coordinates.end.x = m.body.x,
        //     coordinates.end.y = m.body.y

        //     // console.log(coordinates);
        //     payload = JSON.stringify({
        //             "id": 5,
        //             "msg": "VALID_END_NODE",
        //             "body": {
        //                 "newLine": {
        //                     "start": {
        //                         "x": coordinates.start.x,
        //                         "y": coordinates.start.y
        //                     },
        //                     "end": {
        //                         "x": coordinates.end.x,
        //                         "y": coordinates.end.y
        //                     }
        //                 },
        //                 "heading": "Player 2",
        //                 "message": null
        //             }
        //         })
        //     ws.send(payload)
// }


// let coordinates = {
//     start: {
//         x: 0, y: 0
//     },
//     end: {
//         x: 0, y: 0
//     }
// }
// let gameState = []


// let p0 = createPoint(0, 0)
// console.log(p0);
// let gameState = {
//     p0: {x: 0, y: 0, pathEnd: false, lineThru: false}, p1: {x: 1, y: 0, pathEnd: false, lineThru: false}, 
//     p2: {x: 2, y: 0, pathEnd: false, lineThru: false}, p3: {x: 3, y: 0, pathEnd: false, lineThru: false}, 

//     p4: {x: 0, y: 1, pathEnd: false, lineThru: false}, p5: {x: 1, y: 1, pathEnd: false, lineThru: false}, 
//     p6: {x: 2, y: 1, pathEnd: false, lineThru: false}, p7: {x: 3, y: 1, pathEnd: false, lineThru: false}, 

//     p8: {x: 0, y: 2, pathEnd: false, lineThru: false}, p9: {x: 1, y: 2, pathEnd: false, lineThru: false}, 
//     p10: {x: 2, y: 2, pathEnd: false, lineThru: false}, p11: {x: 3, y: 2, pathEnd: false, lineThru: false}, 

//     p12: {x: 0, y: 3, pathEnd: false, lineThru: false}, p13: {x: 1, y: 3, pathEnd: false, lineThru: false}, 
//     p14: {x: 2, y: 3, pathEnd: false, lineThru: false}, p15: {x: 3, y: 3, pathEnd: false, lineThru: false}
//     //All 16 possible points on the grid
//     // This way we can check the points and paths being taken up.
// }


            // Player one can only draw an octilinear line.
            // So it can have the same x axis or same y.(horizontal and vertical lines)
            // Or it can go diagonal 45deg. so if start is 0,0 | it can be 1,1 | 2,2 | 3,3
            // If start is 2,1 | it can be 3,2
            // case 3: 
            //     // coordinates.end.x = m.body.x,
            //     // coordinates.end.y = m.body.y
            //     // console.log(coordinates);
            //     if(isValidEndNode(gameState, {x: m.body.x, y: m.body.y}, 1)){
            //         gameState.push({x: m.body.x, y: m.body.y})
            //         // console.log(gameState);
            //         ws.send(
            //             sendPayload(3, 2, {start: {x: gameState[0].x, y: gameState[0].y}, end: {x: m.body.x, y: m.body.y}}, "VALID_END_NODE", null)
            //         )
            //     } else {
            //         ws.send(
            //             sendPayload(3, 1, null, "INVALID_END_NODE", "Invalid Move!")
            //         )
            //     }

            //     break


                // for(let i = 0; i < gameState.length; i++ ){

                //     if(!gameState[i].pathEnd && !gameState.lineThru) { //None of the points have been selected, this must be the first move
                //         if(gameState[i].x === m.body.x && gameState[i].y === m.body.y) {
                //             gameState[i].pathEnd = true
                //             gameState[i].lineThru = true
                //             prevClick.x = m.body.x
                //             prevClick.y = m.body.y
                //         }
                //     }
                // }
                // console.log(gameState)
                    //what are the points in use?
                    // what paths do they take up?
                    // what players turn is it?
                    // Is it a valid start node? Either the first node clicked on the board, or at the end of either ends
                    // So we need to easily access the value for both of the end nodes
                    // We need to save every point on the graph that has either a point on it or line through it

                    //Is this a start node or an end node?
                    // console.log(m)


                // if(m.id === 2) {

                // }
                // coordinates.start.x = m.body.x,
                // coordinates.start.y = m.body.y
                // console.log(coordinates);
                // gameState.push({x: m.body.x, y: m.body.y})
                
                        // console.log(isValidEndNode(gameState, m.body.x, m.body.y))
        // if(isFirstMove(gameState)){
        //     findAndUpdateNode(m.body.x, m.body.y, gameState)
        //     ws.send(
        //         sendPayload(m.id, gameState[0].player1, null, "VALID_START_NODE", null)
        //     )
        //     //first point: x, y
        //     startNode.x = m.body.x
        //     startNode.y = m.body.y
        // } else if(m.body.x === startNode.x && m.body.y === startNode.y) {
        //     ws.send(
        //         sendPayload(m.id, gameState[0].player1, null, "INVALID_END_NODE", "No move was made")
        //     )
        // } else if(m.body.x === startNode.x || m.body.y === startNode.y) {
            
        // } else if(isValidStartNode(gameState, startNode.x, startNode.y, gameState[0].player1)) {

        // } else if(isValidEndNode(gameState, {x: m.body.x, y: m.body.y})){
        //     console.log(gameState);
        //     ws.send(
        //         sendPayload(m.id, gameState[0].player1, {start: {x: startNode.x, y: startNode.y}, end: {x: m.body.x, y: m.body.y}}, "VALID_END_NODE", null)
        //     )
        //     gameState[0].player1 = !gameState[0].player1
        // } else {
        //     ws.send(
        //         sendPayload(m.id, gameState[0].player1, null, "INVALID_END_NODE", "Invalid Move!")
        //     )
        // }

        //is second point valid? {
//are any points marked as the start or the end of the path?
//if second point is identical send invalid and no message
//if second point has same x but different y, it is valid
//if second point has same y but different x, it is valid
//if second point has (x that is +1 || -1 && y +1 || -1) || (sX === eX +-2 && sY === eY +-2) || (sX === eX +-3 && sY === eY +-3), it is valid diagonal
//need options for each so we can mark which other point had a line thru
//if the second line passes through another point that is in use, it is invalid
//if it checks the appropriate boxes for validity, allow the node to be played
//mark the points it crosses, and mark the start of the entire path as well as the ends of the entire path
//pathStart
//pathEnd
//nodesClicked or lineThrough
