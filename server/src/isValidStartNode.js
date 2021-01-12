const { getPointsByAttrs, findAndUpdateNode } = require('./helpers')

const isValidStartNode = (gameState, startNode, clickedNode) => {
    let response = {bool: false, message: ''}
    
    //If the clicked node is identical to the start node, return invalid after updating the node
    if(clickedNode.x === startNode.x && clickedNode.y === startNode.y){
        response.bool = false
        response.message = "Identical node"
        findAndUpdateNode(clickedNode, gameState, true)
        return response
    }
    if(startNode.x !== null){
        response.message = "Must be end node"
        response.bool = false
        return response
    }
    //If there are no used points in the array it is valid, pass go, collect $200. Must be first move of game.
    let usedPoints = []
    for(let i = 0; i < gameState.length; i++){
        if(gameState[i].pathEnd){
            usedPoints.push(gameState[i])
        }
    }
    console.log(usedPoints.length);
    if(usedPoints.length === 0){
        response.bool = true
        response.message = ''
        return response
    }    
    console.log(startNode);
    console.log(gameState);
    let pathEndpoints = getPointsByAttrs(gameState, true, false)
    console.log(pathEndpoints)
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