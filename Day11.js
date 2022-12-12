fs = require('fs');
fs.readFile('Day11.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let monkeySetup = data.split('\n\n');
    let monkeys = [];
    let modulo = 1;

    monkeySetup.forEach((monkey) => {
        data = monkey.split("\n");
        items = data[1].match(/Starting\sitems:\s(.+)/)[1].replaceAll(",", "").split(" ").map(Number)
        operandAndVal = data[2].match(/old\s(.)\s(\d+)?/)
        divBy = Number(data[3].match(/\s(\d+)$/)[1])
        trueTo = Number(data[4].match(/\s(\d+)$/)[1])
        falseTo = Number(data[5].match(/\s(\d+)$/)[1])
        monkeys.push({
            itemsInspected: 0,
            items,
            operand: operandAndVal[1],
            increaseBy: operandAndVal[2] ? Number(operandAndVal[2]) : "self",
            test: {
                divBy,
                true: trueTo,
                false: falseTo
            }
        });
        modulo *= divBy;
    })

    round = 0;
    while(round < 10000) {
        monkeys.forEach(({items, operand, increaseBy, test}, i) => {
            monkeys[i].itemsInspected += items.length;
            items.forEach(item => {
                item = eval(`${item}${operand}${increaseBy === "self" ? item : increaseBy}`)

                newMonkey = test[item%test.divBy === 0]
                // because future me will forget - the modulo of all the numbers mutiplied together will result in a remainder that will always give the right future remainder in future rounds
                monkeys[newMonkey].items.push(item%modulo);
            })
            monkeys[i].items = [];
        })
        round++;
    }

    let inspected = monkeys.map(monkey => monkey.itemsInspected).sort((a, b) => b - a)
    console.log(inspected[0] * inspected[1])
});