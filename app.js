function start() {
    var board = document.getElementById('board');
    var alien = document.createElement('div');
    alien.className = 'alien sprite';
    board.appendChild(alien);
    var tower = document.createElement('div');
    tower.className = 'tower sprite';
    board.appendChild(tower);
    layout();
}

function layout() {
    var board = document.getElementById('board');
    board.innerHTML = '';

    var max = 10;
    var rowHeight = window.innerHeight / max;
    var colHeight = window.innerWidth / max;
    for (i = rowHeight / 2; i < window.innerHeight; i+=rowHeight) {
        for (j = colHeight / 2; j <  window.innerWidth; j+=colHeight) {
            var point = document.createElement('div');
            point.className = 'point sprite';
            point.style.top = i + 'px';
            point.style.left = j + 'px';
            board.appendChild(point);
        }
    }
}