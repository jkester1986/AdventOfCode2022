fs = require('fs');
fs.readFile('Day11.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let monkeySetup = data.split('\n\n');
    let monkeys = [];

    monkeySetup.forEach((monkey, i) => {
        data = monkey.split("\n");
        items = data[1].match(/Starting\sitems:\s(.+)/)[1].replaceAll(",", "").split(" ").map(Number)
        operandAndVal = data[2].match(/old\s(.)\s(\d+)?/)
        // console.log({operandAndVal})
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
        })
    })

    round = 0;
    while(round < 20) {
        monkeys.forEach(({items, operand, increaseBy, test}, i) => {
            monkeys[i].itemsInspected += items.length;
            items.forEach(item => {
                // P1
                // item = Math.floor(eval(`${item}${operand}${increaseBy === "self" ? item : increaseBy}`)/3)
                // P2
                item = eval(`${item}${operand}${increaseBy === "self" ? item : increaseBy}`)

                console.log({item});
                // find the new monkey the item is going to
                newMonkey = test[item%test.divBy === 0] // test[true || false]
                monkeys[newMonkey].items.push(item);
            })
            monkeys[i].items = [];
        })
        round++;
    }

    // for some reason monkey 3 is missing 2 items but the others are correct with the example???
    monkeys.forEach((monkey, i) => {
        console.log(i, ":", monkey.itemsInspected)
    })

    let inspected = monkeys.map(monkey => monkey.itemsInspected).sort((a, b) => b - a)
    console.log(inspected[0] * inspected[1])
});