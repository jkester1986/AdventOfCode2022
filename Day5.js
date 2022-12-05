
fs = require('fs');
cloneDeep = require('lodash.clonedeep');
fs.readFile('Day5.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	const lines = data.split('\n\n');
    const stacks = lines[0].split("\n");
    const directions = lines[1].split("\n");

    const stacksDict = {};
    let stackDict9001 = {};

    stacks.forEach(line => {
        // https://stackoverflow.com/a/6259543
        const pattern = /.{1,4}/g;
        line.match(pattern).forEach((chunk, i) => {
            const innerPattern = /\[(.)\]?./;
            const crate = chunk.match(innerPattern)
            if (crate) {
                if (stacksDict[i+1]) {
                    stacksDict[i+1].unshift(crate[1]);
                }
                else stacksDict[i+1] = [crate[1]]
            }
        });
        stackDict9001 = cloneDeep(stacksDict)
    })

    directions.forEach(line => {
        const pattern = /\w+\s(\d+)\s\w+\s(\d+)\s\w+\s(\d+)/
        const direction = line.match(pattern);
        const amount = direction[1];
        const from = direction[2];
        const to = direction[3];

        for (let i = 0; i < amount; i++) {
            if(stacksDict[from].length) {
                stacksDict[to].push(stacksDict[from]?.pop());
            }
        }

        stackDict9001[to] = [...stackDict9001[to], ...stackDict9001[from].slice(-amount)];
        stackDict9001[from]?.splice(-amount, amount);
    });


    let result = "";
    let result9001 = "";
    for(let i = 1; i < 10; i++) {
        result += stacksDict[i].pop();
        result9001 += stackDict9001[i].pop();
    }
    console.log("P1:", result);
    console.log("P2:", result9001);
});