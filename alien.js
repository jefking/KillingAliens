var aliens = [];
function initAliens(count) {
    for (var i = 0; i < count; i++) {
        aliens.push(spawn());
    }
}

function updateAliens() {
    for (var i = 0; i < aliens.length; i++) {
        updateAlien(aliens[i]);
    }
}

function updateAlien(alien) {
    var nextCoordinates = alien.path.shift();
    alien.x = nextCoordinates[0];
    alien.y = nextCoordinates[1];
}

function getPath(start, end) {

    currentX = start[0];
    currentY = start[1];
    var path = [ [currentX, currentY] ];

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
            else
            {
                if (deltaY > 0) { currentY++; } else { currentY--; }
            }
        }

        path.push( [currentX, currentY]);
    }
    return path;
}

function spawn() {
    var x = 0;
    var y = 0;
    var random = Math.random();
    var startingEdge = Math.ceil(random * 4);
    switch (startingEdge) {
        case 0:
            x = Math.ceil(random * boardWidth);
            y = 0;
            break;
        case 1:
            x = Math.ceil(random * boardWidth);
            y = boardHeight;
            break;
        case 0:
            x = 0;
            y = Math.ceil(random * boardHeight);
            break;
        case 0:
            x = boardWidth;
            y = Math.ceil(random * boardHeight);
            break;
        default:
            break;
    }

    return {
        x: x,
        y: y,
        hp: 100,
        path: getPath([x, y], [targetX, targetY]) 
    };
}
