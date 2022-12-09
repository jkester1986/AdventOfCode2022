fs = require('fs');
fs.readFile('Day8.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let treesRow = data.split('\n').map(currentRowIndex => currentRowIndex.split('').map(Number));;
  const length = treesRow.length;
  let visibleTrees = 0;
  let bestViewingDistance = 0;

  treesRow.forEach((trees, currentRowIndex) => {
    const rowLength = trees.length;

    // for every tree
    for(let col = 0; col < rowLength; col++ ){
      const treeHeight = trees[col];
      const left = col === 0 ? [] : trees.slice(0, col).reverse();
      const right = col === rowLength - 1 ? [] : trees.slice(col+1, rowLength);
      let hasClearSight = false;
      let viewingDistance = 1;

      // if we're in the first or last row, the tree is always visible
      if (currentRowIndex === 0 || currentRowIndex === length - 1) {
        viewingDistance = 0;
        hasClearSight = true;
      }
      // see if any trees are greater than or equal to the current tree on the left or right; if one or both don't, set hasClearSight to true
      if (!left.some(height => height >= treeHeight) || !right.some(height => height >= treeHeight)) hasClearSight = true;
      let leftViewingDistance = left.findIndex(height => height >= treeHeight);
      leftViewingDistance = leftViewingDistance === -1 ? left.length : leftViewingDistance + 1;
      let rightViewingDistance = right.findIndex(height => height >= treeHeight);
      rightViewingDistance = rightViewingDistance === -1 ? right.length : rightViewingDistance + 1;
      viewingDistance = viewingDistance * leftViewingDistance * rightViewingDistance;

      if(currentRowIndex > 0) {
        let distance = 0;
        // all rows below currentRowIndex
        for (let otherRow = currentRowIndex - 1; otherRow >= 0; otherRow--) {
          distance++
          if (treesRow[otherRow][col] >= treeHeight) {
            viewingDistance *= distance;
            break;
          }
          // if we've gotten to the end and no trees are too high
          if (otherRow === 0) {
            hasClearSight = true;
            viewingDistance *= distance;
          }
        }
      }

      if(currentRowIndex < length - 1) {
        let distance = 0;
        // all rows above currentRowIndex
        for (let otherRow = currentRowIndex + 1; otherRow < length; otherRow++) {
          distance++
          if (treesRow[otherRow][col] >= treeHeight) {
            viewingDistance *= distance;
            break;
          }
          // if we've gotten to the end and no trees are too high
          if (otherRow === rowLength - 1) {
            hasClearSight = true;
            viewingDistance *= distance;
          }
        }
      }

      if (hasClearSight)
        visibleTrees++;
      if (viewingDistance > bestViewingDistance)
        bestViewingDistance = viewingDistance;
    }
  })

  console.log({visibleTrees, bestViewingDistance})
});