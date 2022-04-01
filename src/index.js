import css from './styles/styles.css'

function getAllNumbersBetween(x, y) {
    let numbers = [];
    for (let i = x; i < y; i++) {
        numbers.push(i);
    }
    return numbers;
}

function shipFactory(start, end, team) {
    let length;

    return {
        start,
        end,
        team,
        hitStatus: [],
        setLength: function() {
            if (start[0] == end[0]) {
                length = end[1]-start[1];
            } else {
                length = end[0]-start[0];
            }
        }(),
        length,
        hit: function(row, col) {
            this.hitStatus.push([row, col])
        },
        isSunk: function() {
            return this.hitStatus.length >= this.length ? true : false;
        }
    }
}

function newGameboard(team) {
    let activeShips = [];
    let missedShots = [];

    return {
        team,
        placeShip: function(start, end) {
            let newShip = shipFactory(start, end, team);
            activeShips.push(newShip);
            return newShip;
        },

        getActiveTiles: function(row, col) {
            let activeTiles = [];

            for (let i of activeShips) {
                if (i.start[0] == i.end[0]) {
                    let onesBetween = getAllNumbersBetween(i.start[1], i.end[1]);
                    for (let j of onesBetween) {
                        activeTiles.push([i.start[0], j])
                    }
                } else if (i.start[1] == i.end[1]) {
                    let onesBetween = getAllNumbersBetween(i.start[0], i.end[0]);
                    for (let j of onesBetween) {
                        activeTiles.push([j, i.start[1]])
                    }
                }
            }
            return activeTiles;
        },

        isTileEmpty: function(row, col) {
            return (this.getActiveTiles().some(e => Array.isArray(e) && e.every((o, i) => Object.is([row, col][i], o)))) ? false : true;
        },

        isTileShot: function(row, col) {
            return (missedShots.some(e => Array.isArray(e) && e.every((o, i) => Object.is([row, col][i], o)))) ? true : false;
        },

        allSunk: function() {
            let sunkShips = [];

            for (let i of activeShips) {
                if (i.isSunk() == true) {
                    sunkShips.push(i)
                }
            }
            
            return sunkShips.length == activeShips.length ? true : false;
        },

        receiveAttack: function(row, col) {
            if (this.isTileEmpty(row, col)) {
                missedShots.push([row, col]);
            } else {
                for (let i of activeShips) {
                    if (i.start[0] == i.end[0]) {
                        if (col >= i.start[1] && col < i.end[1] && row == i.start[0]) {
                            i.hit(row, col)
                        }
                    } else if (i.start[1] == i.end[1]) {
                        if (row >= i.start[0] && row < i.end[0] && col == i.start[1]) {
                            i.hit(row, col)
                        }
                    }
                }
            }
        },
    }
}

const DOM = (function(){
    return {
        createGrid: function (rows, cols, player) {
            const container = document.querySelector(player);
            container.style.setProperty('--grid-rows', rows);
            container.style.setProperty('--grid-cols', cols);
            for (let i = 1; i <= rows; i++) {
                for (let c = 1; c <= rows; c++) {
                    let cell = document.createElement("button");
                    cell.setAttribute('data-row', i)
                    cell.setAttribute('data-col', c)
                    container.appendChild(cell).className = "grid-item";
                }
            }
        },

        displayShip: function (start, end, gameboard) {
            let coords = [];

            if (start[0] == end[0]) {
                let onesBetween = getAllNumbersBetween(start[1], end[1]);
                for (let j of onesBetween) {
                    coords.push([start[0], j])
                }
            } else if (start[1] == end[1]) {
                let onesBetween = getAllNumbersBetween(start[0], end[0]);
                for (let j of onesBetween) {
                    coords.push([j, start[1]])
                }
            }

            for (let i of coords) {
                console.log(i[0], i[1])
                let tile = document.querySelector(`[data-row="${i[0]}"][data-col="${i[1]}"]`);
                tile.classList.add('exposed');
                tile.classList.remove('grid-item')
            }
        }
    }
})();

const theGame = function() {
    const selfBoard = newGameboard(1);
    const enemBoard = newGameboard(2);

    selfBoard.placeShip([1,1], [1,4])
    DOM.displayShip([1,1],[1,4],selfBoard)
}

DOM.createGrid(10, 10, '.selfCont');
DOM.createGrid(10, 10, '.enemCont');
theGame()

module.exports = {
    shipFactory, newGameboard
};