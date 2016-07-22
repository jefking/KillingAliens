var aliens = [];

function initAliens(count) {
    for (var i = 0; i < count; i++) {
        var newAlien = spawn(i);
        aliens.push(newAlien);
    }
}

function respawn(id) {
    var alien = spawn(id);
    for (var i = 0; i < alienCount; i++) {
        if (aliens[i].id == id) {
            aliens[i] = alien;
            return 0;
        }
    }
}

function updateAliens() {
    for (var i = 0; i < aliens.length; i++) {
        updateAlien(aliens[i]);
    }
}

function updateAlien(alien) {
    var nextCoordinates = alien.path.shift();
    if (nextCoordinates == undefined) {
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
    var random = Math.random();
    var startingEdge = Math.floor(random * 4);
    switch (startingEdge) {
        case 0:
            x = Math.floor(random * boardWidth);
            y = 0;
            break;
        case 1:
            x = Math.floor(random * boardWidth);
            y = boardHeight;
            break;
        case 2:
            x = 0;
            y = Math.floor(random * boardHeight);
            break;
        case 3:
            x = boardWidth;
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
        path: getPath([x, y], [targetX, targetY])
    };
}
