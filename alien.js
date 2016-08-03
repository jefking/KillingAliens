var aliens = [];
var spawnDelay = 120;
var heatMap = [];
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
    var addedIds = [];
    var idsToCheck = [{'id': getIdFromCoordinates(targetX, targetY), 'distance':0}];
    addedIds[getIdFromCoordinates(targetX, targetY)] = true;

    // work in progress: an obstacle
    /*
    for (var obstacle = 470; obstacle < 490; obstacle++) {
        addedIds[obstacle] = true;
        heatMap[id] = -1;
    }
    */

    while (idsToCheck != null && idsToCheck.length > 0) {
        var payload = idsToCheck.shift();
        var id = payload['id'];
        var distance = payload['distance'];

        heatMap[id] = distance;

        // TODO: If a neighboring tile is not accessible, don't visit it
        if (id + 1 < boardHeight * boardWidth && addedIds[id + 1] !== true) {
            idsToCheck.push({'id': (id + 1), 'distance': (distance + 1)});
            addedIds[id + 1] = true;
        }
        if (id - 1 > 0 && addedIds[id - 1] !== true) {
            idsToCheck.push({'id': (id - 1), 'distance': (distance + 1)});
            addedIds[id - 1] = true;
        }
        if (id + boardWidth < boardHeight * boardWidth && addedIds[id + boardWidth] !== true) {
            idsToCheck.push({'id': (id + boardWidth), 'distance': (distance + 1)});
            addedIds[id + boardWidth] = true;
        }
        if (id - boardWidth > 0 && addedIds[id - boardWidth] !== true) {
            idsToCheck.push({'id': (id - boardWidth), 'distance': (distance + 1)});
            addedIds[id - boardWidth] = true;
        }
    }

    for (var x = 0; x < boardWidth; x++) {
        for (var y = 0; y < boardHeight; y++) {
            var id = getIdFromCoordinates(x, y);
            var dx = 0;
            var dy = 0;

            if (x <= 1 || heatMap[id - 1] == -1) {
                dx = 1;
            }
            else if (x >= boardWidth - 1 || heatMap[id + 1] == -1)
            {
                dx = -1;
            }
            else
            {
                dx = heatMap[id - 1] - heatMap[id + 1];
                if (isNaN(dx)) { console.log("wrong dX:: " + id + " " + x + " " + y + " heat: " + heatMap[id - 1] + " " + heatMap[id + 1])};
            }

            if (y <= 1 || heatMap[id - boardWidth] == -1) {
                dy = 1;
            }
            else if (y >= boardHeight - 1 || heatMap[id + boardWidth] == -1)
            {
                dy = -1;
            }
            else
            {
                dy = heatMap[id - boardWidth] - heatMap[id + boardWidth];
                if (isNaN(dy)) { console.log("wrong dY:: " + id + " " + x + " " + y + " heat: " + heatMap[id - boardWidth] + " " + heatMap[id + boardWidth])};
            }

            vectorMap[id] = {'x': dx, 'y': dy};
        }
    }
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

    var alienCoordinates = getIdFromCoordinates(alien.x, alien.y);
    if (isNaN(alienCoordinates) === true) {
        console.log("Incorrect ID " + alienCoordinates + " for " + JSON.stringify(alien));
    }
    alien.x += vectorMap[alienCoordinates].x;
    alien.y += vectorMap[alienCoordinates].y;
    if (Math.abs(targetX - alien.x) < 2 && Math.abs(targetY - alien.y) < 2) {
        // Alien reached the target!
        health--;
        updateScore();

        removeAlien(alien);
    }
    else {
        renderAlien(alien); // todo: move rendering to a better spot
    }
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
        delay: Math.floor(Math.random() * spawnDelay),
    };
}
