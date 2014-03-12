// Returns the total yielded score.
function shiftGravity(m, direction) {
    var score = 0,
        moved = false,
        subScore;
    
    switch (direction) {
    case 0: // left
        for (var x = 1; x < m[0].length; x++) {
            for (var y = 0; y < m.length; y++) {
                subScore = shiftCell(m, x, y, 0);
                if (subScore >= 0) {
                	score += subScore;
                    moved = true;
                }
            }
        }
        break;
    case 1: // up
        for (var y = 1; y < m.length; y++) {
            for (var x = 0; x < m[0].length; x++) {
                subScore = shiftCell(m, x, y, 1);
                if (subScore >= 0) {
                	score += subScore;
                    moved = true;
                }
            }
        }
        break;
    case 2: // right
        for (var x = m[0].length - 2; x >= 0; x--) {
            for (var y = 0; y < m.length; y++) {
                subScore = shiftCell(m, x, y, 2);
                if (subScore >= 0) {
                	score += subScore;
                    moved = true;
                }
            }
        }
        break;
    case 3: // down
        for (var y = m.length - 2; y >= 0; y--) {
            for (var x = 0; x < m[0].length; x++) {
                subScore = shiftCell(m, x, y, 3);
                if (subScore >= 0) {
                	score += subScore;
                    moved = true;
                }
            }
        }
        break;
    }
    
    return (moved) ? score : -1;
}

// Returns the yielded score.
function shiftCell(m, x, y, direction) {
    if (m[y][x] === 0)
        return -1; // TODO: not -1
    
    var value = m[y][x],
        xAdd = 0,
        yAdd = 0,
        x2, y2;
    
    switch (direction) {
    case 0:
        xAdd = -1;
        break;
    case 1:
        yAdd = -1;
        break;
    case 2:
        xAdd = +1;
        break;
    case 3:
        yAdd = +1;
        break;
    }
    
    x2 = x + xAdd;
    y2 = y + yAdd;
    
    while (x2 >= 0 && x2 < m.length && y2 >= 0 && y2 < m.length) {
        if (m[y2][x2] === value) {
            m[y2][x2] *= 2;
            m[y][x] = 0;
            return m[y2][x2];
        } else if (m[y2][x2] !== 0) {
            break;
        }
        x2 += xAdd;
        y2 += yAdd;
    }
    
    
    // TODO: remove
    if (y2 - yAdd === y && x2 - xAdd === x) {
        return -1;
    }
    
    m[y][x] = 0;
    m[y2-yAdd][x2-xAdd] = value;
    
    return 0;
}

// Creates and returns an integer matrix filled with zeroes.
function createSquareMatrix(side) {
    var m = [];
    
    for (var y = 0; y < side; y++) {
        m.push([]);
        for (var x = 0; x < side; x++) {
            m[y].push(0);
        }
    }
    
    return m;
}

// Creates a grid of divs and returns them in a list.
function createDivGrid(parent, side) {
    var divList = [];
    
    for (var y = 0; y < side; y++) {
        var rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        parent.appendChild(rowDiv);
        for (var x = 0; x < side; x++) {
            var colDiv = document.createElement('div');
            colDiv.className = 'column';
            colDiv.innerHTML = '0';
            rowDiv.appendChild(colDiv);
            divList.push(colDiv);
        }
        var clearDiv = document.createElement('div');
        clearDiv.className = 'clear';
        rowDiv.appendChild(clearDiv);
    }
    
    return divList;
}

function updateDivs(m, divs, colors) {
    for (var y = 0; y < m.length; y++) {
        for (var x = 0; x < m[0].length; x++) {
            var index = y * m[0].length + x;
            divs[index].innerHTML = m[y][x];
            
            if (m[y][x] > 0) {
                var color = Math.log(m[y][x]) / Math.log(2);
                divs[index].style.backgroundColor = colors[color];
                divs[index].style.color = 'black';
            } else {
                divs[index].style.backgroundColor = colors[0];
                // Ugly solution for making the div look empty.
                divs[index].style.color = colors[0];
            }
        }
    }
}

function spawnRandomNumberTwo(m) {
    var emptySquares = [];
    for (var y = 0; y < m.length; y++)
        for (var x = 0; x < m[0].length; x++)
            if (m[y][x] === 0)
                emptySquares.push([x, y]);
    
    // Game over?
    if (emptySquares.length === 0)
        return false;
    
    var index = getRandomInt(0, emptySquares.length - 1);
    var square = emptySquares[index];
    var x = square[0];
    var y = square[1];
    m[y][x] = 2;
    return true;
}

function canMakeAMove(m) {
    // Check first row.
    for (var x = 1; x < m[0].length; x++) {
        if (m[0][x-1] === 0 || m[0][x] === 0 || m[0][x-1] === m[0][x]) {
            return true;
        }
    }
    
    // Check first column.
    for (var y = 1; y < m.length; y++) {
        if (m[y][0] === 0 || m[y-1][0] === m[y][0]) {
            return true;
        }
    }
    
    // Check the rest.
    for (var y = 1; y < m.length; y++) {
        for (var x = 1; x < m[0].length; x++) {
            if (m[y][x] === 0 || m[y-1][x] === 0 || m[y][x-1] === 0 ||
                m[y-1][x] === m[y][x] || m[y][x-1] === m[y][x]) {
                return true;
            }
        }
    }
    
    return false;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==========================================

// Returns true if it is possible to move in the specified direction.
function update(direction) {
    var subScore = shiftGravity(m, direction);
    if (subScore === -1) {
        return false;
    } else {
        score += subScore;
        scoreSpan.innerHTML = score;
        spawnRandomNumberTwo(m);
        updateDivs(m, divs, colors);
        if (!canMakeAMove(m)) {
            gameOver = true;
            gameOverDiv.style.visibility = 'visible';
        }
        return true;
    }
}

var side = 4;
var colors = ['aliceblue',
              'antiquewhite',
              'aquamarine',
              'lightsalmon',
              'lightgreen',
              'darkseagreen',
              'deeppink',
              'deepskyblue',
              'orangered',
              'gold',
              'slategray'];
var m = createSquareMatrix(side);
var divs = createDivGrid(document.getElementById('gridDiv'), side);
var scoreSpan = document.getElementById('scoreSpan');
var gameOverDiv = document.getElementById('gameOverDiv');
var score = 0;
var gameOver = false;

spawnRandomNumberTwo(m);
updateDivs(m, divs, colors);

document.onkeydown = function(event) {
    if (gameOver) {
        return;
    }
    
	switch (event.which) {
    case 37:
    case 38:
    case 39:
    case 40:
        event.preventDefault();
    	update(event.which - 37);
        break;
    }
};
