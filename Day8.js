fs = require('fs');
fs.readFile('Day8.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let treesRow = data.split('\n').map(currentRowIndex => currentRowIndex.split('').map(Number));;
  const length = treesRow.length;
  let visibleTrees = 0;

  treesRow.forEach((trees, currentRowIndex) => {
    const rowLength = trees.length;
    for(let col = 0; col < rowLength; col++ ){
      const treeHeight = trees[col];
      const left = col === 0 ? [] : trees.slice(0, col-1);
      const right = col === rowLength - 1 ? [] : trees.slice(col+1, rowLength);
      let hasClearSight = false;
      // console.log(`currentRowIndex:${currentRowIndex}, col:${col}`)

      if (!left.some(height => height >= treeHeight) || !right.some(height => height >= treeHeight)) hasClearSight   = true;

      if(currentRowIndex > 0) {
        for (let otherRow = 0; otherRow < currentRowIndex; otherRow++) {
          // console.log("above", `otherRow:${otherRow}, col:${col}`)
          if (treesRow[otherRow][col] >= treeHeight) {
            // console.log(treesRow[otherRow][col], "is too high for ", treeHeight)
            break;
          }
          if (otherRow === currentRowIndex - 1) hasClearSight = true;
        }
      }
      if(currentRowIndex < length - 1) {
        for (let otherRow = currentRowIndex + 1; otherRow < length; otherRow++) {
          // console.log("below", `otherRow:${otherRow}, col:${col}`)
          if (treesRow[otherRow][col] >= treeHeight) {
            // console.log(treesRow[otherRow][col], "is too high for ", treeHeight)
            break;
          }
          if (otherRow === rowLength - 1) hasClearSight = true;
        }
      }
      if (hasClearSight)
        visibleTrees++;
      // console.log("")
    }
    // console.log("----------------")
  })

  console.log({visibleTrees})
});