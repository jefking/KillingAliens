function start()
{
    layout();
}

function layout()
{
    var board = window.getElementByName('board');
    var max = 4;
    for (i = 0; i < max; i++)
    {
        board.addChild(point);
        window.screen.width / (i + 1);
    }
}