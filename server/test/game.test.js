
// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
// });
const {
    createPoint, getPointsByAttrs, findAndUpdateNode, updateMovesMade,
        sendPayload, createGameState, updateLineThrus
} = require('../src/helpers')

const { isValidEndNode, isIdenticalNode, isPathEndOrLineThru, isValidDiagonal, isValidHorizontal } = require('../src/isValidEndNode')

const isValidStartNode = require('../src/isValidStartNode')

let gameState
let movesMade
let startNode

beforeEach(() => {
    gameState = createGameState()
    movesMade = []
    startNode = { x: null, y: null }
})

test('duplicate start node clicked, game state unaffected', () => {
    startNode = {x: 2, y: 2}
    let clickedNode = {x: 2, y: 2}
    let res = isValidEndNode(gameState, startNode, clickedNode, movesMade)
    expect(res).toBe(false)
    for(let i = 0; i < gameState.length; i++){
        expect(gameState[i].pathEnd).toBe(undefined)
        expect(gameState[i].lineThru).toBe(undefined)
    }
})
test('2, 2 to 3, 2 should be valid', () => {
    startNode = { x: 2, y: 2 }
    let clickedNode = { x: 3, y: 2 }
    let res = isValidEndNode(gameState, startNode, clickedNode, movesMade)
    expect(res).toBe(true)
    console.log(movesMade)
})

test('LINE THROUGH LINE 1,1 to 2,2 but 1,2 to 2, 1 has been made, should be invalid', () => {
    startNode = { x: 1, y: 1 }
    let clickedNode = { x: 2, y: 2 }
    movesMade = [{start: {x: 1, y: 2}, end: {x: 2, y:1}}]
    let res = isValidEndNode(gameState, startNode, clickedNode, movesMade)
    expect(res).toBe(false)
})

test('LINE THROUGH POINT: DIAGONAL', () => {
    startNode = { x: 0, y: 0 }
    let clickedNode = { x: 3, y: 3 }
    // movesMade = [
    //     { start: { x: 0, y: 2 }, end: { x: 1, y: 1 } },
    //     { start: { x: 1, y: 1 }, end: { x: 2, y: 0 } },
    //     { start: { x: 2, y: 0 }, end: { x: 1, y: 0 } },
    //     { start: { x: 1, y: 0 }, end: { x: 0, y: 0 } }
    //     ]
    gameState = [
        { player1: true },
        { pathEnd: true, lineThru: true, x: 0, y: 0 },
        { pathEnd: false, lineThru: true, x: 1, y: 0 },
        { pathEnd: false, lineThru: true, x: 2, y: 0 },
        { pathEnd: undefined, lineThru: undefined, x: 3, y: 0 },
        { pathEnd: undefined, lineThru: undefined, x: 0, y: 1 },
        { pathEnd: false, lineThru: true, x: 1, y: 1 },
        { pathEnd: undefined, lineThru: undefined, x: 2, y: 1 },
        { pathEnd: undefined, lineThru: undefined, x: 3, y: 1 },
        { pathEnd: true, lineThru: true, x: 0, y: 2 },
        { pathEnd: undefined, lineThru: undefined, x: 1, y: 2 },
        { pathEnd: undefined, lineThru: undefined, x: 2, y: 2 },
        { pathEnd: undefined, lineThru: undefined, x: 3, y: 2 },
        { pathEnd: undefined, lineThru: undefined, x: 0, y: 3 },
        { pathEnd: undefined, lineThru: undefined, x: 1, y: 3 },
        { pathEnd: undefined, lineThru: undefined, x: 2, y: 3 },
        { pathEnd: undefined, lineThru: undefined, x: 3, y: 3 }
    ]

    let res = isValidEndNode(gameState, startNode, clickedNode, movesMade)
    expect(res).toBe(false)
})

test('INVALID DIAGONAL ', () => {

})

test('SHOULD BE GAME OVER', () => {

})

test('MULTI POINT MOVE SHOULD UPDATE THRU NODES', () => {

})

test('', () => {

})