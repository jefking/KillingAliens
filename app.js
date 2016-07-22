function start()
{
    layout();
}

function layout()
{
    var board = document.getElementById('board');
    console.log(board);
    var point = board.createElement('div');
    point.className = 'point sprite';
    // var tower = board.createElement('<div class="tower sprite"></div>');
    // var sprite = board.createElement('<div class="sprite sprite"></div>');
    board.appendChild(point);
    // board.appendChild(tower);
    // board.appendChild(sprite);

    // var max = 4;
    // for (i = 0; i < max; i++)
    // {
    //     board.addChild(point);
    //     window.screen.width / (i + 1);
    // }
}