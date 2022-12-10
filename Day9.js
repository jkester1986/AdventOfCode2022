fs = require('fs');
fs.readFile('Day9.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
    const tailVisited = new Set();
    tailVisited.add("0,0");
    let knots = new Array(2).fill().map(() => ({x: 0, y: 0}))


    lines.forEach(line => {
        // console.log("head", `${head.x},${head.y}`)

        // console.log("tail", `${nextKnot.x},${nextKnot.y}`)
        let head = knots[0];
        let nextKnot = knots[1];
        // move initial head
        const move = line.split(" ");
        const spaces = Number(move[1]);
        const direction = move[0]
        switch(direction) {
            case "U":
                head.y += spaces;
                break;
            case "D":
                head.y -= spaces;
                break;
            case "L":
                head.x -= spaces;
                break;
            case "R":
                head.x += spaces;
                break;
        }

        const xDiff = head.x - nextKnot.x;
        const yDiff = head.y - nextKnot.y;
        // move knots
        for(let i = 0; i < knots.length - 1; i++) {
            nextKnot = knots[i+1];
            console.log({head, nextKnot})
            if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
                // head and tail in same column or same row
                if(head.x === nextKnot.x || head.y === nextKnot.y) {
                    moveTail(direction, head, nextKnot);
                }

                // we're diagonal
                else {
                    // tail lower left
                    if (xDiff > 0 && yDiff > 0) {
                        nextKnot.y++;
                        nextKnot.x++;
                    }
                    // tail upper left
                    else if (xDiff > 0 && yDiff < 0) {
                        nextKnot.x++;
                        nextKnot.y--;
                    }
                    // tail upper right
                    else if (xDiff < 0 && yDiff < 0) {
                        nextKnot.x--;
                        nextKnot.y--;
                    }
                    // tail lower right
                    else if (xDiff < 0 && yDiff > 0) {
                        nextKnot.x--;
                        nextKnot.y++;
                    }

                    tailVisited.add(`${nextKnot.x},${nextKnot.y}`);

                    const newXDiff = head.x - nextKnot.x;
                    const newYDiff = head.y - nextKnot.y;
                    if (Math.abs(newXDiff) > 1 || Math.abs(newYDiff) > 1)
                        moveTail(direction, head, nextKnot);
                }
            }
            head = nextKnot;
            console.log("new knot location:", nextKnot)
        }
        console.log({knots})
        console.log("----------")

        // process.exit();
    });

    function moveTail(direction, head, nextKnot) {
        const tailStartY = nextKnot.y;
        const tailStartX = nextKnot.x;

        switch(direction) {
            case "U":
                for (let i = tailStartY; i < head.y - 1; i++) {
                    nextKnot.y++;
                    tailVisited.add(`${nextKnot.x},${nextKnot.y}`);
                }
                break;
            case "D":
                for (let i = tailStartY; i > head.y + 1; i--) {
                    nextKnot.y--;
                    tailVisited.add(`${nextKnot.x},${nextKnot.y}`);
                }
                break;
            case "L":
                for (let i = tailStartX; i > head.x + 1; i--) {
                    nextKnot.x--;
                    tailVisited.add(`${nextKnot.x},${nextKnot.y}`);
                }
                break;
            case "R":
                for (let i = tailStartX; i < head.x - 1; i++) {
                    nextKnot.x++;
                    tailVisited.add(`${nextKnot.x},${nextKnot.y}`);
                }
                break;
        }

    }

    console.log(tailVisited.size);
});