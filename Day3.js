fs = require('fs');
fs.readFile('Day3.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    let lines = data.split('\n');
    const length = lines.length;
    const dictionary = {}
    let priorityTotal = 0;
    let badgePriorities = 0;

    // create dictionary of a-zA-Z with points 1-52
    for (i = 0; i < 52; i++) {
        letter = ((i % 26) + 10).toString(36);
        dictionary[i > 25 ? letter.toUpperCase() : letter] = i + 1;
    }

    lines.forEach(line => {
        const half = line.length / 2;
        const firstHalf = line.substring(0, half).split("");
        const secondHalf = line.substring(half).split("");

        let intersection = firstHalf.find(char => secondHalf.includes(char));
        priorityTotal += dictionary[intersection];
    })

    console.log("P1", priorityTotal);

    for(i = 0; i <= length-3; i += 3) {
        let intersection1 = lines[i].split("").filter(char => lines[i+1].includes(char));
        let intersection2 = intersection1.filter(char => lines[i+2].includes(char));
        badgePriorities += dictionary[intersection2[0]]
    }

    console.log("P2", badgePriorities)
});
