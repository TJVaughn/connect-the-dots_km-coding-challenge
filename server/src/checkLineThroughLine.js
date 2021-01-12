const getThruNodes = require("./getThruNodes");

const checkLineThruLine = (startNode, endNode, movesMade) => {
    //Works if the move is only one dot in length
    //If the move is say from 0,0 3,3, only 1,1 to 2,2 is blocked. 
    //if the move is from 0,0 to 2,2, 1,1 to 2,2 is blocked but 0,0 to 1,1 is avail

    //We need conditional logic to know which two of these to use!
    
        // {x: startNode.x, y: startNode.y -1},
        // {x: startNode.x, y: startNode.y +1},
        // {x: startNode.x -1, y: startNode.y},
        // {x: startNode.x +1, y: startNode.y},


    const calcNodesToCheck = (nodesToCheck, start, xDiff, yDiff) => {
        
        if (xDiff > 0 && yDiff > 0) {
            xDiff *= -1
            yDiff *= -1
        } else if (xDiff < 0 && yDiff < 0) {
            xDiff *= -1
            yDiff *= -1
        }
        nodesToCheck.push(
            { x: start.x, y: start.y + xDiff },
            { x: start.x + yDiff, y: start.y }
        )
        return nodesToCheck
    }
    console.log("Moves Made:");
    console.log(movesMade)
    let nodesToCheck = []
    let thruNodes = getThruNodes(startNode, endNode)
    if(thruNodes.length === 0){
        let xDiff = startNode.x - endNode.x
        let yDiff = startNode.y - endNode.y
        nodesToCheck = calcNodesToCheck(nodesToCheck, startNode, xDiff, yDiff)
    }
    if (thruNodes.length === 1) {
        let xDiff = startNode.x - thruNodes[0].x
        let yDiff = startNode.y - thruNodes[0].y
        nodesToCheck = calcNodesToCheck(nodesToCheck, startNode, xDiff, yDiff)

        xDiff = thruNodes[0].x - endNode.x
        yDiff = thruNodes[0].y - endNode.y
        nodesToCheck = calcNodesToCheck(nodesToCheck, thruNodes[0], xDiff, yDiff)
    }
    if (thruNodes.length === 2) {
        let xDiff = startNode.x - thruNodes[0].x
        let yDiff = startNode.y - thruNodes[0].y
        nodesToCheck = calcNodesToCheck(nodesToCheck, startNode, xDiff, yDiff)

        xDiff = thruNodes[0].x - thruNodes[1].x
        yDiff = thruNodes[0].y - thruNodes[1].y
        nodesToCheck = calcNodesToCheck(nodesToCheck, thruNodes[0], xDiff, yDiff)

        xDiff = thruNodes[1].x - endNode.x
        yDiff = thruNodes[1].y - endNode.y
        nodesToCheck = calcNodesToCheck(nodesToCheck, thruNodes[1], xDiff, yDiff)
    }

    console.log("NOdes to check");
    console.log(nodesToCheck)

    for(let i = 0; i < movesMade.length; i ++){
        //if the start nodes are same
            //and end nodes are same
            //we need to check the start to thruNode[0], from thruNode[0] to thruNode[1] and thruNode[1] to endNode 
            // console.log(movesMade[i])
            for(let z = 0; z < nodesToCheck.length -1 ;z++){
                if (
                    ((movesMade[i].start.x === nodesToCheck[z].x && movesMade[i].start.y === nodesToCheck[z].y)
                        && (movesMade[i].end.x === nodesToCheck[z + 1].x && movesMade[i].end.y === nodesToCheck[z + 1].y))
                    || ((movesMade[i].start.x === nodesToCheck[z + 1].x && movesMade[i].start.y === nodesToCheck[z + 1].y)
                        && (movesMade[i].end.x === nodesToCheck[z].x && movesMade[i].end.y === nodesToCheck[z].y))
                ) {
                    return true
                }
            }
    }
    return false
}

module.exports = checkLineThruLine


// for (let i = 0; i < movesMade.length; i++) {
//     //if the start nodes are same
//     //and end nodes are same
//     //we need to check the start to thruNode[0], from thruNode[0] to thruNode[1] and thruNode[1] to endNode 
//     // console.log(movesMade[i])
//     if (
//         ((movesMade[i].start.x === nodesToCheck[0].x && movesMade[i].start.y === nodesToCheck[0].y)
//             && (movesMade[i].end.x === nodesToCheck[1].x && movesMade[i].end.y === nodesToCheck[1].y))
//         || ((movesMade[i].start.x === nodesToCheck[1].x && movesMade[i].start.y === nodesToCheck[1].y)
//             && (movesMade[i].end.x === nodesToCheck[0].x && movesMade[i].end.y === nodesToCheck[0].y))
//     ) {
//         return true
//     }
// }