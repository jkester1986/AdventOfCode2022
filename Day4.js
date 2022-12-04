fs = require('fs');
fs.readFile('Day4.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    let lines = data.split('\n').map(el => el.split(','));
    let completeOverlap = 0;
    let partialOverlap = 0;

    lines.forEach(line => {
        const pattern = /(\d+)-(\d+)/;
        range1 = ranges(line[0])
        range2 = ranges(line[1])
        
        if(hasFullOverlap(range1, range2) || hasFullOverlap(range2, range1)) {
            completeOverlap++;
            partialOverlap++;
        }
        else if (hasPartialOverlap(range1, range2) || hasPartialOverlap(range2, range1)) partialOverlap ++;

    })

    console.log("P1:", completeOverlap)
    console.log("P2:", partialOverlap)
});

// check if the range for the first is contained within the second
function hasFullOverlap(range1, range2) {
    return range1[0] >= range2[0] && range1[1] <= range2[1]
}

function hasPartialOverlap(range1, range2) {
    return (range1[0] >= range2[0] && range1[0] <= range2[1]) || (range1[1] >= range2[0] && range1[1] <= range2[1])
}

function ranges(line) {
    const pattern = /(\d+)-(\d+)/;
    return line.match(pattern).slice(1,3).map(Number).sort((a, b) => a < b);
}