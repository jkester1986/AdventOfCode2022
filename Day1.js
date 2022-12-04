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

		/**
		 * Yes, I realize now I could have just sorted the stupid totals.
		 * Why didn't I do that originally? I have no excuse, really,
		 * other than that it was midnight and I haven't done these puzzles in a year
		 */
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
