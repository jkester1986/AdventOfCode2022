fs = require('fs');
fs.readFile('Day9.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
    const tailVisited = new Set();
    tailVisited.add("0,0");
    let headPos = { x: 0, y: 0};
    let tailPos = { x: 0, y: 0};


    lines.forEach(line => {
        // console.log("head", `${headPos.x},${headPos.y}`)

        // console.log("tail", `${tailPos.x},${tailPos.y}`)

        const move = line.split(" ");
        const spaces = Number(move[1]);
        const direction = move[0]
        switch(direction) {
            case "U":
                headPos.y += spaces;
                break;
            case "D":
                headPos.y -= spaces;
                break;
            case "L":
                headPos.x -= spaces;
                break;
            case "R":
                headPos.x += spaces;
                break;
        }

        const xDiff = headPos.x - tailPos.x;
        const yDiff = headPos.y - tailPos.y;
        // move tail
        if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
            // console.log("need to move tail, head is at", `${headPos.x},${headPos.y}`)
            // head and tail in same column or same row
            if(headPos.x === tailPos.x || headPos.y === tailPos.y) {
                moveTail(direction);
            }

            // we're diagonal
            else {
                // tail lower left
                if (xDiff > 0 && yDiff > 0) {
                    tailPos = {
                        y: tailPos.y + 1,
                        x: tailPos.x + 1
                    }
                }
                // tail upper left
                else if (xDiff > 0 && yDiff < 0) {
                    tailPos = {
                        y: tailPos.y - 1,
                        x: tailPos.x + 1
                    }
                }
                // tail upper right
                else if (xDiff < 0 && yDiff < 0) {
                    tailPos = {
                        y: tailPos.y - 1,
                        x: tailPos.x - 1
                    }
                }
                // tail lower right
                else if (xDiff < 0 && yDiff > 0) {
                    tailPos = {
                        y: tailPos.y + 1,
                        x: tailPos.x - 1
                    }
                }

                tailVisited.add(`${tailPos.x},${tailPos.y}`);

                const newXDiff = headPos.x - tailPos.x;
                const newYDiff = headPos.y - tailPos.y;
                if (Math.abs(newXDiff) > 1 || Math.abs(newYDiff) > 1)
                    moveTail(direction);
            }
        }
        // console.log("----")
    });

    function moveTail(direction) {
        const tailStartY = tailPos.y;
        const tailStartX = tailPos.x;

        switch(direction) {
            case "U":
                for (let i = tailStartY; i < headPos.y - 1; i++) {
                    tailPos = {
                        y: tailPos.y + 1,
                        x: tailPos.x
                    }
                    tailVisited.add(`${tailPos.x},${tailPos.y}`);
                }
                break;
            case "D":
                for (let i = tailStartY; i > headPos.y + 1; i--) {
                    tailPos = {
                        y: tailPos.y - 1,
                        x: tailPos.x
                    }
                    tailVisited.add(`${tailPos.x},${tailPos.y}`);
                }
                break;
            case "L":
                for (let i = tailStartX; i > headPos.x + 1; i--) {
                    tailPos = {
                        y: tailPos.y,
                        x: tailPos.x - 1
                    }
                    tailVisited.add(`${tailPos.x},${tailPos.y}`);
                }
                break;
            case "R":
                for (let i = tailStartX; i < headPos.x - 1; i++) {
                    tailPos = {
                        y: tailPos.y,
                        x: tailPos.x + 1
                    }
                    tailVisited.add(`${tailPos.x},${tailPos.y}`);
                }
                break;
        }

    }

    console.log(tailVisited.size);
});