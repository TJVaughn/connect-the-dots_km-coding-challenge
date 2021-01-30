const checkLineThruPoint = require('./checkLineThroughPoint')
const checkLineThruLine = require('./checkLineThroughLine')
const { getPointsByAttrs, findAndUpdateNode, updateLineThrus } = require('./helpers')
const getThruNodes = require('./getThruNodes')

//identical node
const isIdenticalNode = (startNode, endNode, gameState, update) => {
    if (endNode.x === startNode.x && endNode.y === startNode.y) {
        if (getPointsByAttrs(gameState, true, false).length === 2) {
            console.log("Invalid. Same point")
            if (update) {
                findAndUpdateNode(startNode, gameState, true, true)
            }
            return true
        }
        if (update) {
            findAndUpdateNode(startNode, gameState, undefined, undefined)
        }
        console.log("Invalid. Same point")
        return true
    }
}

//is the end node pathEnd or lineThru true
const isPathEndOrLineThru = (gameState, endNode) => {
    let invalidPoints = getPointsByAttrs(gameState, false, true)
    for (let i = 0; i < invalidPoints.length; i++) {
        if (endNode.x === invalidPoints[i].x && endNode.y === invalidPoints[i].y) {
            console.log("Invalid. Point is path end or line through")
            return true
        }
    }
}
//is it a valid horizontal or vertical
const isValidHorizontal = (startNode, endNode, gameState, update) => {
    if ((endNode.x === startNode.x && endNode.y !== startNode.y)
        || (endNode.y === startNode.y && endNode.x !== startNode.x)) {
        let invalid = getPointsByAttrs(gameState, null, true)
        let nodes = getThruNodes(startNode, endNode)
        if (!nodes) {
            if (update) {
                updateLineThrus(nodes, gameState)
            }
            return true
        }
        if (!checkLineThruPoint(invalid, nodes)) {
            if (update) {
                updateLineThrus(nodes, gameState)
            }
            return true
        }
        console.log("Invalid. Line through point")
        return false
    }
}
//valid diagonal
const isValidDiagonal = (startNode, endNode, movesMade, gameState, update) => {
    for (let i = 1; i < 4; i++) {
        if (startNode.x === endNode.x + i || startNode.x === endNode.x - i) {
            if (startNode.y === endNode.y + i || startNode.y === endNode.y - i) {
                let isLTL = checkLineThruLine(startNode, endNode, movesMade)
                console.log(isLTL)
                if (isLTL) {
                    console.log("Invalid end. Line through line")
                    return false
                }
                let invalid = getPointsByAttrs(gameState, false, true)
                let thruNodes = getThruNodes(startNode, endNode)
                if (!thruNodes) {
                    if (update) {
                        updateLineThrus(thruNodes, gameState)
                    }
                    return true
                }

                if (!checkLineThruPoint(invalid, thruNodes)) {
                    if (update) {
                        updateLineThrus(thruNodes, gameState)
                    }
                    return true
                }
            }
        }
    }
    console.log("Invalid. Not a proper diagonal")
    return false
}

module.exports = { isIdenticalNode, isPathEndOrLineThru, isValidDiagonal, isValidHorizontal }