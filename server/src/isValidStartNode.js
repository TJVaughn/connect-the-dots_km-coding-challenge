const { getPointsByAttrs } = require('./helpers')

const isValidStartNode = (gameState, movesMade, startNode, clickedNode) => { //Clicked node is m.body
    let response = {bool: false, message: ''}
    if(startNode.x !== null){
        response.message = "Not a start node, go check if valid end node"
        response.bool = false
        return response
    }
    //If there are no used points in the array it is valid, pass go, collect $200. Must be first move of game.
    if (movesMade.length === 0) {
        response.bool = true
        response.message = ''
        return response
    }    
    let pathEndpoints = getPointsByAttrs(gameState, true, false)
    if(pathEndPoints.length > 2) {
        throw new Error("Path end points greater than 2!")
    }
    //Moves have been made, start node is not null
    //Check if the clicked node is a path end for next move
    for(let i = 0; i < pathEndpoints.length; i++){
        if(pathEndpoints[i].x === clickedNode.x && pathEndpoints[i].y === clickedNode.y){
            response.bool = true
            response.message = ""
            return response
        }
    }

        
    response.bool = false
    response.message = "INVALID_START_NODE"
    return response
}

module.exports = isValidStartNode
