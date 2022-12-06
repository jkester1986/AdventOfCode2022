fs = require('fs');
fs.readFile('Day6.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

    const end = data.length - 14;

    let index1;
    let index2;
    loop:
    for(let i = 0; i < end; i ++) {
      const checkSet1 = new Set();
      const checkSet2 = new Set();

      let counter = 0;
      for(let j = i; j < i+14; j++) {
        if (counter < 4) checkSet1.add(data[j]);
        checkSet2.add(data[j]);
        counter++;

        if (!index1 && checkSet1.size === 4) {
          index1 = i + 4;
        }

        if (checkSet2.size === 14) {
          index2 = i + 14;
          break loop;
        }
      }

    }
    console.log("P1:", index1)
    console.log("P2:", index2)
});