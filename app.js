const board = document.querySelector('#board');
const p1 = document.querySelector('#P1');
const p2 = document.querySelector('#P2');

const state = {
    X: true, count: 0,
    arr: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
}

board.addEventListener('click', function x(event) {
    if (!event.target.classList.contains('box'))
        return;
    if (event.target.classList.length > 1)
        return;

    event.target.classList.add(state.X ? 'cross' : 'circle');

    if (check(state.X, event.target.id)) {
        endGame(state.X ? 'X' : 'O');
        board.removeEventListener('click', x);
    }
    else if (++state.count == 9) {
        endGame();
    }
    else {
        p1.classList.toggle('turn');
        p2.classList.toggle('turn');
        state.X = !state.X
    }
    if (state.count == 1) {
        document.querySelector('.reload').classList.remove('hide');
    }
});

function check(type, id) {

    const i = Number(id[1]);
    const j = Number(id[2]);

    type = type ? 'X' : 'O';
    state.arr[i][j] = type;

    let arr = state.arr;

    if (arr[i][0] == type && arr[i][1] == type && arr[i][2] == type && displayBar('r' + (i + 1)))
        return true;
    if (arr[0][j] == type && arr[1][j] == type && arr[2][j] == type && displayBar('c' + (j + 1)))
        return true;
    if (i == j && arr[0][0] == type && arr[1][1] == type && arr[2][2] == type && displayBar('x1'))
        return true;
    if (i + j == 2 && arr[0][2] == type && arr[1][1] == type && arr[2][0] == type && displayBar('x2'))
        return true;

    return false;
}

function endGame(winner) {

    if (winner == 'X') {
        p2.classList.add('hide');
        p1.innerHTML = `Player-X Won`;
    } else if (winner == 'O') {
        p1.classList.add('hide');
        p2.innerHTML = `Player-O Won`;
    } else {
        p2.classList.add('hide');
        p1.innerHTML = `Draw`;
    }

}

function displayBar(classs) {
    const bar = document.querySelector('.bar');
    bar.classList.add(classs);
    bar.classList.remove('hide');
    let height = 1;
    const interval = setInterval(() => {
        bar.style.height = height + '%';
        height++;
        if (height >= 100) clearInterval(interval);
    }, 5);
    return true;
}