const checkLineThruPoint = (invalidNodes, thruNodes) => {
    // console.log(invalidNodes)
    // console.log("Invalid above and thru below")
    // console.log(thruNodes)
    for(let i = 0; i < invalidNodes.length; i++){
        for(let x = 0; x < thruNodes.length; x++){
            if(thruNodes[x].x === invalidNodes[i].x && thruNodes[x].y === invalidNodes[i].y){
                return true
            }
        }
    }
    return false
}

module.exports = checkLineThruPoint