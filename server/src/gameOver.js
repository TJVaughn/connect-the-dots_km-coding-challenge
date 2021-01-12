const { isValidDiagonal, isValidHorizontal } = require('./isValidEndNode')

const gameOver = (pathEndpoints, gameState, movesMade) => {

    const makeNode = (node, xNum, yNum) => {
        let newNode = { x: null, y: null }
        newNode.x = node.x + xNum
        newNode.y = node.y + yNum
        return newNode
    }
    let nodesToCheck = []
    let validNodes = []
   
    let node = {x: null, y: null}

    for(let i = 0; i < pathEndpoints.length; i++){
           // make the nodes
        node.x = pathEndpoints[i].x
        node.y = pathEndpoints[i].y
        newNode = makeNode(node,1,1)
        nodesToCheck.push(newNode)
        newNode = makeNode(node, -1,-1)
        nodesToCheck.push(newNode)
        newNode = makeNode(node, 1,-1)
        nodesToCheck.push(newNode)
        newNode = makeNode(node, -1,1)
        nodesToCheck.push(newNode)
        newNode = makeNode(node, 0,1)
        nodesToCheck.push(newNode)
        newNode = makeNode(node, 1,0)
        nodesToCheck.push(newNode)
        newNode = makeNode(node, 0,-1)
        nodesToCheck.push(newNode)
        newNode = makeNode(node, -1,0)
        nodesToCheck.push(newNode)
        for (let z = 0; z < nodesToCheck.length; z++) {
                // validate the nodes
            if ((nodesToCheck[z].x >= 0 && nodesToCheck[z].x < 4)
                && (nodesToCheck[z].y >= 0 && nodesToCheck[z].y < 4)) {
                validNodes.push(nodesToCheck[z])
            }
            // try to find a move that works
            //iterate through every point on the grid
            for (let a = 0; a < gameState.length; a++) {
                // then iterate through all the validated nodes
                for (let k = 0; k < validNodes.length; k++) {
                    //if the valid node is the same as the game state node, we can get its other properties
                    if (validNodes[k].x === gameState[a].x) { // same x
                        if (validNodes[k].y === gameState[a].y) { // same y
                            if (gameState[a].lineThru === undefined) { // point does not have lineThru: true
                                if (gameState[a].pathEnd === undefined) { // point does not have pathEnd: true
                                    if(isValidDiagonal(pathEndpoints[i], gameState[a], movesMade, gameState, false)){
                                        return false
                                    } else if(isValidHorizontal(pathEndpoints[i], gameState[a], gameState, false)){
                                        return false
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
   
    return true
}

module.exports = gameOver