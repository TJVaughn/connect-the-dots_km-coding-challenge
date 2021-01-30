const { isIdenticalNode, isPathEndOrLineThru, isValidDiagonal, isValidHorizontal } = require('./endNodeHelpers')

const isValidEndNode = (gameState, startNode, endNode, movesMade) => {
    if(isIdenticalNode(startNode, endNode, gameState, true)){
        return false
    }
    if(isPathEndOrLineThru(gameState, endNode)){
        return false
    }

    if(isValidHorizontal(startNode, endNode, gameState, true)){
        return true
    }
    if(isValidDiagonal(startNode, endNode, movesMade, gameState, true)){
        return true
    }
    console.log("Invalid. All other statements failed to validate it")
    return false
}

module.exports = isValidEndNode