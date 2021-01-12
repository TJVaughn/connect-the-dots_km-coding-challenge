const getThruNodes = require("./getThruNodes")

const createPoint = (x, y, pathEnd, lineThru) => {
    let obj = {
        pathEnd,
        lineThru,
        x,
        y

    }
    return obj
}

const getPointsByAttrs = (gameState, pE, both) => {
    let points = []
    if(both){
        for(let i = 0; i < gameState.length; i++){
            if(gameState[i].pathEnd || gameState[i].lineThru){
                points.push(gameState[i])
            }
        }
    } else if(pE){
        for(let i = 0; i < gameState.length; i++){
            if(gameState[i].pathEnd){
                points.push(gameState[i])
            }
        }
    } else {
        for(let i = 0; i < gameState.length; i++){
            if(gameState[i].lineThru){
                points.push(gameState[i])
            }
        }
    }
    
    return points
}

const findAndUpdateNode = (node, gameState, path, line) => {
    for(let i = 0; i < gameState.length; i++){
        if(node.x === gameState[i].x && node.y === gameState[i].y){
            gameState[i].pathEnd = path
            gameState[i].lineThru = line
        }
    }
    // let pathEndpoints = getPathEndpoints(gameState)
    // console.log(pathEndpoints);
    
}

const sendPayload = (id, player1, newLine, msg, message) => {
    let heading
    player1 ? heading = 'Player 1' : heading = 'Player 2'
    if(player1 === 'GAME_OVER'){
        heading = "Game Over"
    }
    let payload = JSON.stringify({
        id,
        msg,
        "body": {
            newLine,
            heading,
            message
        }
    })
    console.log("Server: ")
    console.log(payload)
    return payload
}

const createGameState = () => {
    let gameState = [{player1: true}]
    for(let i = 0; i < 4; i++){
        gameState.push(
            createPoint(0, i)
        )
        gameState.push(
            createPoint(1, i)
        )
        gameState.push(
            createPoint(2, i)
        )
        gameState.push(
            createPoint(3, i)
        )
    }
    // console.log(gameState);
    return gameState
}

// const min1MakePos = (num) => {
//     if(num === 0){
//         return num
//     }
//     if(num < 0){
//         num = num * -1
//         // return num += 1
//     }
//     num -= 1
//     return num
// }

// let calcDiff = (startNode, endNode) => {
//     let xDiff = startNode.x - endNode.x
//     let yDiff = startNode.y - endNode.y
//     xDiff = min1MakePos(xDiff)
//     yDiff = min1MakePos(yDiff)
//     return {xDiff, yDiff}
// }
const updateLineThrus = (thruNodes, gameState) => {
    for (let i = 0; i < thruNodes.length; i++) {
        findAndUpdateNode(thruNodes[i], gameState, false, true)
    }
}
const updateMovesMade = (startNode, endNode, movesMade) => {
    let thruNodes = getThruNodes(startNode, endNode)
    if (thruNodes.length === 0) {
        movesMade.push({ start: { x: startNode.x, y: startNode.y }, end: { x: endNode.x, y: endNode.y } })
    } else if (thruNodes.length === 1) {
        movesMade.push(
            {
                start: { x: startNode.x, y: startNode.y },
                end: { x: thruNodes[0].x, y: thruNodes[0].y }
            },
            {
                start: { x: thruNodes[0].x, y: thruNodes[0].y },
                end: { x: endNode.x, y: endNode.y }
            }
        )
    } else if (thruNodes.length === 2) {
        movesMade.push(
            {
                start: { x: startNode.x, y: startNode.y },
                end: { x: thruNodes[0].x, y: thruNodes[0].y }
            },
            {
                start: { x: thruNodes[0].x, y: thruNodes[0].y },
                end: { x: thruNodes[1].x, y: thruNodes[1].y }
            },
            {
                start: { x: thruNodes[1].x, y: thruNodes[1].y },
                end: { x: endNode.x, y: endNode.y }
            }
        )
    }
    
    return movesMade
}

module.exports = { 
    createPoint, getPointsByAttrs, findAndUpdateNode, updateMovesMade,
    sendPayload, createGameState, updateLineThrus
 }