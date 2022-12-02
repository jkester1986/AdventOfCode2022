fs = require('fs');
fs.readFile('Day2.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let rounds = data.split('\n');

    const move = {
        A: 1, 
        B: 2,
        C: 3,
        X: 1,
        Y: 2,
        Z: 3
    }
    let yourScoreP1 = 0;
    let yourScoreP2 = 0;

    rounds.forEach(round => {
        // loss = 0
        // tie = 3
        // win = 6

        // x = lose
        // y = draw
        // z = win 
        const [them, you] = round.split(" ");

        switch(them) {
            case "A":
                switch(you) {
                    case "X":
                        yourScoreP1 += 3 + move[you];
                        yourScoreP2 += 3;
                        break;
                    case "Y":
                        yourScoreP1 += 6 + move[you];
                        yourScoreP2 += 3 + 1;
                        break;
                    case "Z":
                        yourScoreP1 += move[you]
                        yourScoreP2 += 6 + 2;
                        break;
                }
                break;
            case "B":
                switch(you) {
                    case "X":
                        yourScoreP1 += move[you]
                        yourScoreP2 += 1;
                        break;
                    case "Y":
                        yourScoreP1 += move[you] + 3;
                        yourScoreP2 += 3 + 2;
                        break;
                    case "Z":
                        yourScoreP1 += move[you] + 6;
                        yourScoreP2 += 6 + 3;
                        break;
                }
                break;
            case "C":
                switch(you) {
                    case "X":
                        yourScoreP1 += move[you] + 6;
                        yourScoreP2 += 2;
                        break;
                    case "Y":
                        yourScoreP1 += move[you];
                        yourScoreP2 += 3 + 3;
                        break;
                    case "Z":
                        yourScoreP1 += move[you] + 3;
                        yourScoreP2 += 6 + 1;
                        break;
                }
                break;
        }
    })

    console.log({yourScoreP1, yourScoreP2})
});
