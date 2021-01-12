const getThruNodes = (start, end) => {
    let diff = {
        x: start.x - end.x,
        y: start.y - end.y 
    }
    let nodes = [
        // start
    ]
    let xVals = []
    let yVals = []
    let cap
    
    if(diff.x === 0){
        if(diff.y < 0){
            cap = diff.y *-1 -1
            yVals = getVals(cap, start.y, true)
        } else {
            cap = diff.y - 1
            yVals = getVals(cap, start.y, false)
        }       
        for (let i = 0; i < yVals.length; i++) {
            nodes.push({ x: start.x, y: yVals[i] })
        }
        return nodes
    } if(diff.y === 0){
        if (diff.x < 0) {
            cap = diff.x * -1 - 1
            xVals = getVals(cap, start.x, true)
        } else {
            cap = diff.x - 1
            xVals = getVals(cap, start.x, false)
        }
        for (let i = 0; i < xVals.length; i++) {
            nodes.push({ x: xVals[i], y: start.y })
        }
        // console.log("nodes")
        // console.log(nodes)
        return nodes
    } 
    if(diff.x < 0){
        cap = diff.x * -1 - 1
        xVals = getVals(cap, start.x, true)
    } 
    if(diff.x > 0){
        cap = diff.x - 1
        xVals = getVals(cap, start.x, false)
    } 
    if (diff.y < 0) {
        cap = diff.y * -1 - 1
        yVals = getVals(cap, start.y, true)
    }
    if (diff.y > 0) {
        cap = diff.y - 1
        yVals = getVals(cap, start.y, false)
    }
    // console.log(xVals)
    // console.log(yVals)
    // console.log(diff);
    if(xVals.length > 0){
        for (let i = 0; i < xVals.length; i++) {
            nodes.push({ x: xVals[i], y: yVals[i] })
        }
    }
    
    // nodes.push(end)
    // console.log("nodes")
    // console.log(nodes)
    return nodes
}

function getVals(cap, start, add) {
    let vals = []
    let val
    if(add){
        for (let i = 1; i <= cap; i++) {
            val = start + i
            vals.push(val)
            if (i > 3) {
                break;
            }
        }
        return vals
    }
   if(!add){
       for (let i = 1; i <= cap; i++) {
           val = start - i
           vals.push(val)
           if (i > 3) {
               break;
           }
       }
       return vals
   }
}

module.exports = getThruNodes