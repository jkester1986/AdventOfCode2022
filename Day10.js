fs = require('fs');
fs.readFile('Day10.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
    let registerX = 1;
    let cycles = 0;
    let stack = [];
    let signalStrength = 0;
    let row = new Array(40).fill(".");

    while(cycles < 240) {
        cycles++;
        if(cycles%40-1 === registerX) {
            row[registerX] = "#"
        }
        if(cycles%40-1 === registerX-1) {
            row[registerX-1] = "#"
        }
        if(cycles%40-1 === registerX+1) {
            row[registerX+1] = "#"
        }
        if ([20, 60, 100, 140, 180, 220].includes(cycles))
            signalStrength += registerX * cycles;
        if ([40, 80, 120, 160, 200, 240].includes(cycles)) {
            console.log(row.join(""))
            row = new Array(40).fill(".");
        }

        let line = lines?.shift();
        let direction = line?.split(" ");
        if(direction?.length > 1)
            stack.push(undefined)
        stack.push(direction);

        currnDirection = stack.shift();
        if (currnDirection && currnDirection?.length > 1){
            registerX += Number(currnDirection[1]);
        }
    }
    console.log({signalStrength})
});