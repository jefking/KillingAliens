var boardHeight = 50;
var boardWidth = 50;
var alienCount = 50;
var targetX = 25;
var targetY = 25;
var speed = 250;

function start() {
    initBoard();

    initAliens(alienCount);

    setInterval(updateAliens, speed);

    // addTower();
}

function initBoard() {
    var board = document.getElementById('board');
    board.innerHTML = '';

    for (i = 0; i < (boardHeight * boardWidth); i++) {
        var point = document.createElement('div');
        point.className = 'point sprite';
        board.appendChild(point);
    }

    layout();
}

function layout() {
    var board = document.getElementById('board');

    var current = 0;

    var rowHeight = window.innerHeight / boardHeight;
    var colHeight = window.innerWidth / boardWidth;
    for (i = rowHeight / 2; i < window.innerHeight; i += rowHeight) {
        for (j = colHeight / 2; j < window.innerWidth; j += colHeight, current++) {
            board.childNodes[current].style.top = i + 'px';
            board.childNodes[current].style.left = j + 'px';
        }
    }
}

function renderAlien(alienModel) {
    var rowHeight = window.innerHeight / boardHeight;
    var colHeight = window.innerWidth / boardWidth; // todo: share scaling code and rename colHeight

    var sprite = document.getElementById("alien-" + alienModel.id);
    if (sprite == undefined) {
        var board = document.getElementById('board');
        sprite = document.createElement('div');
        sprite.className = 'alien sprite';
        sprite.id = "alien-" + alienModel.id;
        board.appendChild(sprite);
    }
    sprite.style.top = rowHeight * alienModel.x + 'px';
    sprite.style.left = colHeight * alienModel.y + 'px';
}

function removeAlien(alienModel) {

    //remove health, etc. 

    respawn(alienModel.id);
}
// function addTower()
// {
//     var board = document.getElementById('board');
//     var tower = document.createElement('div');
//     tower.className = 'tower sprite';
//     board.appendChild(tower);
// }