var boardHeight = 50;
var boardWidth = 50;
var alienCount = 50;

function start() {
    initBoard();
    
    initAliens();

    setInterval(updateAliens, 1000);

    // addAlien();
    // addTower();
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

// function addAlien()
// {
//     var x = Math.random(0, boardWidth);
//     var y = Math.random(0, boardWidth);
//     var board = document.getElementById('board');
//     var alien = document.createElement('div');
//     alien.className = 'alien sprite';
//     board.appendChild(alien);

//     setInterval(updateAliens, 1000);
// }

// function moveAlien(alien)
// {
//     var x = Math.random(0, boardWidth);
//     var y = Math.random(0, boardWidth);
//     alien.style.top = x + 'px';
//     alien.style.left = y + 'px';
// }

// function addTower()
// {
//     var board = document.getElementById('board');
//     var tower = document.createElement('div');
//     tower.className = 'tower sprite';
//     board.appendChild(tower);
// }