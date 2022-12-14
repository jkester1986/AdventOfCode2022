fs = require('fs');
fs.readFile('Day12.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split('\n');
  let map = {}
  let SPos = "";
  const allAs = []

  lines.forEach((line, y) => {
    let chars = line.split("");
    chars.forEach((char, x) => {
      console.log.l
      const pos = `${x},${y}`;
      if (char === "E")
        SPos = pos
      map[pos] = {
        val: char === "E" ? 26 : char === "S" ? 0 : char.charCodeAt(0) - 97,
        char,
        x,
        y
      }
      if (char === "a")
        allAs.push(pos);
    })
  });


  function leastSteps(startingPos, findAs) {
    const visited = new Set();
    const locationQueue = [];
  
    locationQueue.push([{
      pos: startingPos
    }]);
    visited.add(startingPos)
    
    let steps = 0;
    let found = false;
    loop:
    while (locationQueue.length) {
      // find all possible next paths
      currentStep = locationQueue.shift();
      let allNewOptions = [];
      currentStep.forEach(option => {
        let {pos} = option;
        
        let {x, y, val, char} = map[pos];
        if (char === "S" || findAs && char === "a") {
          found = true;
          return;
        }

        // up
        const upPos = `${x},${y - 1}`;
        const upLoc = map[upPos];
        if (upLoc && ((val - upLoc.val) <= 1 ) && !visited.has(upPos)) {
          allNewOptions.push({
            pos: upPos,
          });
          visited.add(upPos)
        }
    
        // down
        const downPos = `${x},${y + 1}`;
        const downLoc = map[downPos];
        if (downLoc && ((val - downLoc.val) <= 1 ) && !visited.has(downPos)) {
          allNewOptions.push({
            pos: downPos,
          });
          visited.add(downPos)
        }
    
        // left
        const leftPos = `${x - 1},${y}`;
        const leftLoc = map[leftPos];
        if (leftLoc && ((val - leftLoc.val) <= 1 ) && !visited.has(leftPos)) {
          allNewOptions.push({
            pos: leftPos,
          });
          visited.add(leftPos)
        }
    
        // right
        const rightPos = `${x + 1},${y}`;
        const rightLoc = map[rightPos];
        if (rightLoc && ((val - rightLoc.val) <= 1  ) && !visited.has(rightPos)) {
          allNewOptions.push({
            pos: rightPos,
          });
          visited.add(rightPos)
        }
    
      });
      if (found)
        return steps;
      locationQueue.push(allNewOptions);
      steps++;
      if (steps > 500) return 500
    }
  }

  console.log("P1", leastSteps(SPos));
  console.log("P2", leastSteps(SPos, true));


});