
/* build world */
window.addEventListener('load', () => {
    buildWorld()
});

/* tips */
document.getElementById('tips_img').addEventListener('mouseover', () => {
    window.requestAnimationFrame(() => {
        document.getElementById('tips').style.opacity = '1';
        document.getElementById('tips').style.marginTop = '10px';
    })
});
document.getElementById('tips_img').addEventListener('mouseout', () => {
    window.requestAnimationFrame(() => {
        document.getElementById('tips').style.opacity = '0';
        document.getElementById('tips').style.marginTop = '0';
    })
});

/* ipml 'build world' */
function buildWorld() {
    const WORLD_SIZE = 20;
    const INTERVAL = 200;
    const world = document.getElementById('world');
    let alive_cells = [];
    let mirai_cells = [];
    let num_of_progeny = 0;
    let isRunning = false;
    let timer;

    initCells();
    updateWorld();

    function updateWorld() {
        let html = '';
        for (let i = 1; i <= WORLD_SIZE; ++i) {
            for (let j = 1; j <= WORLD_SIZE; ++j) {
                if (alive_cells[i][j]) html += '<span class="cell alive" data-x="' + i + '" data-y="' + j + '"></span>';
                else html += '<span class="cell" data-x="' + i + '" data-y="' + j + '"></span>';
            }
        }
        world.innerHTML = html;
    }

    function initCells() {
        for (let i = 1; i <= WORLD_SIZE; ++i) {
            alive_cells[i] = [];
            for (let j = 1; j <= WORLD_SIZE; ++j) {
                alive_cells[i][j] = false;
            }
        }
    }

    function analyzeNext() {
        mirai_cells = deepCopyArray(alive_cells);
        for (let i = 1; i <= WORLD_SIZE; ++i) {
            for (let j = 1; j <= WORLD_SIZE; ++j) {
                analyzeCellAlive(i, j);
            }
        }
        alive_cells = deepCopyArray(mirai_cells);
        if (!isAllDeath(alive_cells)) {
            ++num_of_progeny;
            document.getElementById('num').textContent = 'Number of progeny: ' + num_of_progeny;
        }
        updateWorld();
    }

    function countAroundCells(x, y) {
        let count = 0;
        for (let _x = -1; _x <= 1; ++_x) {
            for (let _y = -1; _y <= 1; ++_y) {
                if (_x === 0 && _y === 0) continue;
                try {
                    if (alive_cells[x + _x][y + _y]) ++count;
                } catch (e) {
                    // nothing to do
                }
            }
        }
        return count;
    }

    function analyzeCellAlive(x, y) {
        if (countAroundCells(x, y) < 2) {
            mirai_cells[x][y] = false;
        } else if (countAroundCells(x, y) > 3) {
            mirai_cells[x][y] = false;
        } else if (countAroundCells(x, y) === 2) {
            if (alive_cells[x][y]) mirai_cells[x][y] = true;
        } else if (countAroundCells(x, y) === 3) {
            mirai_cells[x][y] = true;
        }
    }

    function deepCopyArray(src) {
        const dest = [];
        const len = src.length;
        for (let i = 1; i <= len; ++i) {
            if (src[i] instanceof Array) dest[i] = deepCopyArray(src[i]);
            else dest[i] = src[i];
        }
        return dest;
    }

    function isAllDeath(cells) {
        for (let i = 1; i <= WORLD_SIZE; ++i) {
            for (let j = 1; j <= WORLD_SIZE; ++j) {
                if (cells[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    world.addEventListener('click', (e) => {
        e.stopPropagation();
        const cell = e.target;
        const x = cell.dataset.x;
        const y = cell.dataset.y;
        cell.classList.toggle('alive');
        alive_cells[x][y] = !alive_cells[x][y];
    })

    document.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
            isRunning = !isRunning;
            if (isRunning) {
                window.requestAnimationFrame(() => {
                    document.getElementById('light').style.backgroundColor = '#4CAF50';
                });
                document.getElementById('status_text').textContent = 'Running';
                document.getElementById('start_text').textContent = 'Press「ENTER」to stop';
                timer = window.setInterval(analyzeNext, INTERVAL);
            } else {
                window.requestAnimationFrame(() => {
                    document.getElementById('light').style.backgroundColor = '#F44336';
                });
                document.getElementById('status_text').textContent = 'Stopping';
                document.getElementById('start_text').textContent = 'Press「ENTER」to start';
                window.clearInterval(timer);
            }
        }
        if (e.key === ' ') {
            window.requestAnimationFrame(() => {
                document.getElementById('light').style.backgroundColor = '#F44336';
            });
            document.getElementById('status_text').textContent = 'Stopping';
            document.getElementById('start_text').textContent = 'Press「ENTER」to start';
            window.clearInterval(timer);
            num_of_progeny = 0;
            document.getElementById('num').textContent = 'Number of progeny: ' + num_of_progeny;
            initCells();
            updateWorld();
        }
    })
}

