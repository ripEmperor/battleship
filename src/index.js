import css from './styles/styles.css'

function getAllNumbersBetween(x, y) {
    let numbers = [];
    for (let i = x; i < y; i++) {
        numbers.push(i);
    }
    return numbers;
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
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
            let player = team == 1 ? '.selfCont > ' : '.enemCont > ';

            DOM.displayTile(row, col, player, 0)
            DOM.displayTile(row+1, col+1, player, 1)
            DOM.displayTile(row+1, col-1, player, 1)
            DOM.displayTile(row-1, col+1, player, 1)
            DOM.displayTile(row-1, col-1, player, 1)
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

            let player = team == 1 ? '.selfCont > ' : '.enemCont > ';
            
            activeShips.push(newShip);

            if (team != 2) {
                DOM.displayShip(start, end, player)
            }

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

        handleMissed: function() {
            let player = team == 1 ? '.selfCont > ' : '.enemCont > ';

            for (let i of missedShots) {
                DOM.displayTile(i[0], i[1], player, 1)
            }
        },

        receiveAttack: function(row, col) {
            if (this.isTileEmpty(row, col)) {
                console.log('test')
                if (!this.isTileShot(row, col)) {
                    missedShots.push([row, col]);
                }
                this.handleMissed()
            } else {
                console.log('test2');
                for (let i of activeShips) {
                    if (i.start[0] == i.end[0]) {
                        if (col >= i.start[1] && col < i.end[1] && row == i.start[0]) {
                            i.hit(row, col, team)
                        }
                    } else if (i.start[1] == i.end[1]) {
                        if (row >= i.start[0] && row < i.end[0] && col == i.start[1]) {
                            i.hit(row, col, team)
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
                    if (player == '.enemCont') {
                        cell.setAttribute('data-team', 'enem')
                    } else {
                        cell.setAttribute('data-team', 'self')
                    }
                    container.appendChild(cell).className = "grid-item";
                }
            }
        },

        displayShip: function (start, end, player) {
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
                let tile = document.querySelector(`${player}[data-row="${i[0]}"][data-col="${i[1]}"]`);
                tile.classList.add('exposed');
            }
        },

        displayTile: function (row, col, player, missed) {
            let coords = [];
            let tile;
            try{
                tile = document.querySelector(`${player}[data-row="${row}"][data-col="${col}"]`);
                if (missed == 1) {
                    tile.classList.add('missed')
                } else {
                    tile.classList.add('exposed');
                }
            }catch(e){
                return;
            }
        },
    }
})();

const theGame = function() {
    const selfBoard = newGameboard(1);
    const enemBoard = newGameboard(2);

    enemBoard.placeShip([2,1], [2,4])

    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const attackRow = parseInt(e.target.getAttribute('data-row'));
            const attackCol = parseInt(e.target.getAttribute('data-col'));
            const attackTeam = e.target.getAttribute('data-team');

            if (attackTeam == 'enem') {
                enemBoard.receiveAttack(attackRow, attackCol);
                selfBoard.receiveAttack(randomIntFromInterval(1,10), randomIntFromInterval(1,10))
            } else {
                selfBoard.receiveAttack(attackRow, attackCol);
            }
        });
    });

    //add button eventlistener that takes data-row & data-col as arg \
    //that onclick looks for coords in enemBoard.activeTiles and \
    //does enemBoard.hit([cords]) + enemBoard.placeShip([cords]) \
    //that plus simple loop that passes turns should roughly be it \
    //and then simply finish up with styling.
}



DOM.createGrid(10, 10, '.selfCont');
DOM.createGrid(10, 10, '.enemCont');

theGame()

module.exports = {
    shipFactory, newGameboard
};