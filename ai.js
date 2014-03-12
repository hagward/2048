function findMove(m, depth) {
    var move = 0,
        max = 0;
    for (var i = 0; i < 4; i++) {
        var clone = cloneMatrix(m);
        if (shiftGravity(clone, i) === -1) {
            continue;
        }
        var numEmpty = findMaxEmpty(clone, depth);
        if (numEmpty > max) {
            max = numEmpty;
            move = i;
        }
    }
    return move;
}

// Returns the maximum empty squares for a given depth.
function findMaxEmpty(m, depth) {
    if (depth == 0) {
        return countEmpty(m);
    } else {
        var numEmpty = [];
        for (var i = 0; i < 4; i++) {
            var clone = cloneMatrix(m);
            spawnRandomNumberTwo(clone);
            if (shiftGravity(clone, i) === -1) {
                continue;
            }
            numEmpty.push(findMaxEmpty(clone, depth-1));
        }
        return Math.max.apply(null, numEmpty);
    }
}

// Returns the number of empty squares in a matrix.
function countEmpty(m) {
    var numEmpty = 0;
    for (var i = 0; i < m.length; i++) {
        for (var j = 0; j < m[0].length; j++) {
            if (m[i][j] === 0) {
                numEmpty += 1;
            }
        }
    }
    return numEmpty;
}

function cloneMatrix(m) {
    var clone = [];
    for (var i = 0; i < m.length; i++) {
        clone.push(m[i].slice());
    }
    return clone;
}

// ==========================================

function runAi(m, depth, waitTime) {
    if (!gameOver) {
    	var direction = findMove(m, depth);
        update(direction);
        setTimeout(function() {
            runAi(m, depth, waitTime)
        }, waitTime);
    }
}
