var boardHeight = 50;
var boardWidth = 50;

function start() {
    var board = document.getElementById('board');
    var alien = document.createElement('div');
    alien.className = 'alien sprite';
    board.appendChild(alien);
    var tower = document.createElement('div');
    tower.className = 'tower sprite';
    board.appendChild(tower);

    initBoard();
}

function initBoard()
{
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
    for (i = rowHeight / 2; i < window.innerHeight; i+=rowHeight) {
        for (j = colHeight / 2; j <  window.innerWidth; j+=colHeight, current++) {
            board.childNodes[current].style.top = i + 'px';
            board.childNodes[current].style.left = j + 'px';
        }
    }
}