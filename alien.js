var aliens = [];
var spawnDelay = 120;
var vectorMap = [];

function getIdFromCoordinates(x, y) {
    return y * boardWidth + x;
}

function initAliens(count) {
    for (var i = 0; i < count; i++) {
        aliens[i] = spawn(i);
    }
}

function initVectorMap() {
    var distance = 0;
    
}

function respawn(id) {
    var newAlien = spawn(id);
    aliens[id] = newAlien;
    return newAlien;
}

function updateAliens() {
    for (var i = 0; i < aliens.length; i++) {
        updateAlien(aliens[i]);
    }
}

function updateAlien(alien) {

    if (alien.delay > 0) {
        alien.delay--;
        return;
    }

    var nextCoordinates = alien.path.shift();
    if (nextCoordinates == undefined) {
        // Alien reached the target!
        health--;
        updateScore();

        removeAlien(alien);
    }
    else {
        alien.x = nextCoordinates[0];
        alien.y = nextCoordinates[1];

        renderAlien(alien); // todo: move rendering to a better spot
    }
}

function getPath(start, end) {

    currentX = start[0];
    currentY = start[1];
    var path = [[currentX, currentY]];

    // Todo: use proper path finding algorithm
    // Account for obstacles in the grid

    while (currentX != end[0] || currentY != end[1]) {

        var deltaX = end[0] - currentX;
        var deltaY = end[1] - currentY;

        // should we move horizontally or vertically?
        // the probability of moving horizontally should be proportional to deltaX/deltaY
        if (deltaX == 0) {
            if (deltaY > 0) { currentY++; } else { currentY--; }
        }
        else if (deltaY == 0) {
            if (deltaX > 0) { currentX++; } else { currentX--; }
        }
        else {
            var chanceX = Math.abs(deltaX) / (Math.abs(deltaX) + Math.abs(deltaY));
            if (Math.random() < chanceX) {
                if (deltaX > 0) { currentX++; } else { currentX--; }
            }
            else {
                if (deltaY > 0) { currentY++; } else { currentY--; }
            }
        }
               
        path.push([currentX, currentY]);
    }
    return path;
}

function spawn(id) {
    var x = 0;
    var y = 0;
    var startingEdge = Math.floor(Math.random() * 4);
    var random = Math.random();
    switch (startingEdge) {
        case 0:
            x = Math.floor(random * boardWidth);
            y = 0;
            break;
        case 1:
            x = Math.floor(random * boardWidth);
            y = boardHeight - 1;
            break;
        case 2:
            x = 0;
            y = Math.floor(random * boardHeight);
            break;
        case 3:
            x = boardWidth - 1;
            y = Math.floor(random * boardHeight);
            break;
        default:
            break;
    }

    return {
        id: id,
        x: x,
        y: y,
        hp: 100,
        path: getPath([x, y], [targetX, targetY]),
        delay: Math.floor(Math.random() * spawnDelay),
    };
}
