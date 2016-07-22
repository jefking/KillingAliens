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

    var max = 4;
    var heightMax = window.innerHeight / max;
    var widthMax = window.innerWidth / max;
    for (i = 0; i < max; i++) {
        for (j = 0; j < max; j++) {
            var point = document.createElement('div');
            point.className = 'point sprite';
            point.style.top = heightMax * i + 'px';
            point.style.left = widthMax * j + 'px';
            board.appendChild(point);
        }
    }
}