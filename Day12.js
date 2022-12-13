// TODO: figure out how to have P2 run faster
fs = require('fs');
fs.readFile('Day12.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split('\n');
  let height = lines.length;
  let width = lines[0].length;
  let map = {}
  let SPos = "";
  let endingPos = "";
  const allAs = []

  lines.forEach((line, y) => {
    let chars = line.split("");
    chars.forEach((char, x) => {
      console.log.l
      const pos = `${x},${y}`;
      if (char === "S")
        SPos = pos
      else if (char === "E")
        endingPos = pos
      map[pos] = {
        val: char === "E" ? 26 : char.charCodeAt(0) - 97,
        char,
        x,
        y
      }
      if (char === "a")
        allAs.push(pos);
    })
  });


  function leastSteps(startingPos, additionalPruning) {
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
      // console.log({ steps, stepSet: currentStep, steps });
      let allNewOptions = [];
      // console.log the grid
      for (let y = 0; y < height; y++) {
        let row = ""
        for (let x = 0; x < width; x++) {
          if (visited.has(`${x},${y}`))
            row += "#"
          else
            row += "."
        }
        // console.log(row)
      }
      currentStep.forEach(option => {
        let {pos} = option;
        // if (steps === 3) process.exit();
        
        let {x, y, val, char} = map[pos];
        // console.log({pos, char, locationQueue})
        if (char === "E") {
          found = true;
          return;
          // console.log("least number of steps:", steps)
          // process.exit();
        }
        // up
        const upPos = `${x},${y - 1}`;
        // console.log({upPos})
        const upLoc = map[upPos];
        if (upLoc && ((upLoc.val - val) <= 1 || ["S"].includes(char)) && !visited.has(upPos) && (!additionalPruning || !(allAs.includes(upPos)))) {
          // console.log({upLoc})
          allNewOptions.push({
            pos: upPos,
          });
          visited.add(upPos)
        }
    
        // down
        const downPos = `${x},${y + 1}`;
        // console.log({downPos});
        const downLoc = map[downPos];
        if (downLoc && ((downLoc.val - val) <= 1 || ["S"].includes(char)) && !visited.has(downPos) && (!additionalPruning || !(allAs.includes(downPos)))) {
          // console.log({ downLoc })
          allNewOptions.push({
            pos: downPos,
          });
          visited.add(downPos)
        }
    
        // left
        const leftPos = `${x - 1},${y}`;
        // console.log({leftPos})
        const leftLoc = map[leftPos];
        if (leftLoc && ((leftLoc.val - val) <= 1 || ["S"].includes(char)) && !visited.has(leftPos) && (!additionalPruning || !(allAs.includes(leftPos)))) {
          // console.log({ leftLoc })
          allNewOptions.push({
            pos: leftPos,
          });
          visited.add(leftPos)
        }
    
        // right
        const rightPos = `${x + 1},${y}`;
        // console.log({rightPos})
        const rightLoc = map[rightPos];
        if (rightLoc && ((rightLoc.val - val) <= 1 || ["S"].includes(char)) && !visited.has(rightPos) && (!additionalPruning || !(allAs.includes(rightPos)))) {
          // console.log({ rightLoc })
          allNewOptions.push({
            pos: rightPos,
          });
          visited.add(rightPos)
        }
    
      });
      if (found)
        return steps;
      // console.log({allNewOptions})
      // console.log("===========")
      locationQueue.push(allNewOptions);
      // if (steps === 12) process.exit();
      steps++;
      if (steps > 500) return 500
    }
  }

  console.log("P1", leastSteps(SPos));

  let lowest = 500;
  allAs.forEach(a => {
    const stepCount = leastSteps(a, true);
    if (stepCount < lowest) lowest = stepCount;
  });

  console.log("P2", lowest)


});