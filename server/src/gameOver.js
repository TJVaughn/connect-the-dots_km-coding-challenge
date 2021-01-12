// const checkLineThruLine = require('./checkLineThroughLine')
// const isValidEndNode = require('./isValidEndNode')
// const checkLineThruPoint = require('./checkLineThroughPoint')
const { isValidEndNode, isIdenticalNode, isPathEndOrLineThru, isValidDiagonal, isValidHorizontal } = require('./isValidEndNode')


const gameOver = (pathEndpoints, gameState, movesMade) => {
    //check if the 8 surrounding points are lineThru true or undefined or pathend true or undefined
    //if they are all false in either category, there is no move to be made
    //if neither endpoint can make a move, the game is over

    //if the endpoint is say 0,0 then we will get some negative values we need to ignore
    //if the endpoint is say 3,3 then we will get some values over 3 we need to ignore

    //if the x or y is < 0 or > 3 it is to be ignored
    // console.log(pathEndpoints)

    const makeNode = (node, xNum, yNum) => {
        let newNode = { x: null, y: null }
        newNode.x = node.x + xNum
        newNode.y = node.y + yNum
        // console.log(newNode)
        return newNode
    }

    // make the nodes
    // validate the nodes
    // try to find a move that works
    // if no moves work from the two path ends, game over is true

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

 // console.log(nodesToCheck)

    // console.log(validNodes)
    // for(let i =0; i < validNodes.length; i++){
    //     let res = isValidEndNode(gameState, pathEndpoints[0], validNodes[i], movesMade)
    //     if(res){
    //         return false
    //     }
    // }
    // return true


//I need to merge these two for loops together!
    // for(let i = 0; i < pathEndpoints.length; i++){
    //     for(let x = 0; x < validNodes.length; x++){
    //         if((!checkLineThruLine(pathEndpoints[i], validNodes[x], movesMade))){
    //             console.log(`${validNodes[x].x}, ${validNodes[x].y} is valid`)
    //             return false
    //         }

    //     }
    // }
    // console.log(movesMade)
//     for(let i = 0; i < gameState.length; i++){
//         for(let k = 0; k < validNodes.length; k++){
//             if(validNodes[k].x === gameState[i].x){ // same x
//                 if(validNodes[k].y === gameState[i].y){ // same y
//                     if(gameState[i].lineThru === undefined){ // point does not have lineThru: true
//                         if(gameState[i].pathEnd === undefined){ // point does not have pathEnd: true
//                             for(let z = 0; z < pathEndpoints.length; z++){
//                                 // console.log(`${validNodes[k].x}, ${validNodes[k].y} is valid`)
//                                 if(!checkLineThruLine(pathEndpoints[z], validNodes[k], movesMade)){ // if it returns false
//                                     //than it must not be game over
//                                     //but the following path end point could be?
//                                     console.log(`${pathEndpoints[z].x}, ${pathEndpoints[z].y} to 
// ${validNodes[k].x}, ${validNodes[k].y} is valid`)
//                                     return false
//                                 }
//                             }
//                             return false
//                         }
//                     }
//                 }
//             }
//         }
//     }



// for (let b = 0; b < pathEndpoints.length; b++) {
    // console.log(`${validNodes[k].x}, ${validNodes[k].y} is valid`)
    // if (isValidDiagonal(pathEndpoints[b], validNodes[k], movesMade, gameState)) {

    // }
    //                                         if (!checkLineThruLine(pathEndpoints[b], validNodes[k], movesMade)) { // if it returns false
    //                                             //than it must not be game over
    //                                             //but the following path end point could be?
    //                                             console.log(`${pathEndpoints[b].x}, ${pathEndpoints[b].y} to 
    // ${validNodes[k].x}, ${validNodes[k].y} is valid`)
    //                                             return false
    //                                         }
// }