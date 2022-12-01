fs = require('fs');
fs.readFile('Day1.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let elves = data.split('\n\n');
	let highest = 0;
	let secondHighest = 0;
	let thirdHighest = 0;
	
	elves.forEach((elf, i) => {
		let calories = elf.split('\n').map(Number);
		let total = calories.reduce((partialSum, a) => partialSum + a, 0);


		if (total > highest) {
			thirdHighest = secondHighest;
			secondHighest = highest;
			highest = total;
		}
		else if (total > secondHighest) {
			thirdHighest = secondHighest;
			secondHighest = total;
		}
		else if (total > thirdHighest) {
			thirdHighest = total;
		}
	});
	console.log(highest);
	console.log(highest + secondHighest + thirdHighest)
});
