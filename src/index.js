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
    let unavailableTiles = [];

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


        placeDefault: function() {
            this.placeShip([2,4], [2,7]);
            this.placeShip([4,1], [4,5]);
            this.placeShip([4,7], [7,7]);
            this.placeShip([3,9], [3,11]);
            this.placeShip([8,4], [8,6]);
            this.placeShip([6,1], [6,4]);
            this.placeShip([10,6], [10,10]);
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

        isTileUnavailable: function(row, col) {
            return (unavailableTiles.some(e => Array.isArray(e) && e.every((o, i) => Object.is([row, col][i], o)))) ? true : false;
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
            unavailableTiles.push([row, col])
            if (this.isTileEmpty(row, col)) {
                if (!this.isTileShot(row, col)) {
                    missedShots.push([row, col]);
                }
                this.handleMissed()
                return false;
            } else {
                for (let i of activeShips) {
                    if (i.start[0] == i.end[0]) {
                        if (col >= i.start[1] && col < i.end[1] && row == i.start[0]) {
                            i.hit(row, col, team)
                            unavailableTiles.push([row, col])
                            missedShots.push([row+1, col+1])
                            missedShots.push([row+1, col-1])
                            missedShots.push([row-1, col+1])
                            missedShots.push([row-1, col-1])
                        }
                    } else if (i.start[1] == i.end[1]) {
                        if (row >= i.start[0] && row < i.end[0] && col == i.start[1]) {
                            i.hit(row, col, team)
                            unavailableTiles.push([row, col])
                            missedShots.push([row+1, col+1])
                            missedShots.push([row+1, col-1])
                            missedShots.push([row-1, col+1])
                            missedShots.push([row-1, col-1])
                            console.log(missedShots)
                        }
                    }
                }
                return true;
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
                    tile.classList.add('missed');
                    tile.classList.remove('grid-item');
                } else if (player == '.enemCont > ') {
                    tile.classList.add('selfExposed');
                    tile.classList.remove('grid-item');
                } else {
                    tile.classList.add('selfExposed');
                    tile.classList.remove('grid-item');
                }
            }catch(e){
                return;
            }
        },

        purgeAll: function() {
            const enemCont = document.querySelector('.enemCont');
            const selfCont = document.querySelector('.selfCont');

            while (enemCont.hasChildNodes() | selfCont.hasChildNodes()) {
                enemCont.removeChild(enemCont.lastChild);
                selfCont.removeChild(selfCont.lastChild);
            }
        },

        displayResult: function(status) {
            const btns = Array.from(document.querySelectorAll('.grid-item'))
            const result = document.querySelector('.result');

            btns.forEach(function(btn) { 
                btn.disabled = true;
            })

            if (status == 1) {
                result.innerHTML = 'You won! Congratz';
            } else {
                result.innerHTML = 'You lost! So bad!'
            }

            const restartCont = document.querySelector('.restartCont')
            const restart = document.createElement('button');
            restart.classList.add('restart');
            restart.innerHTML = 'Restart';
            restartCont.appendChild(restart);

            restart.addEventListener('click', () => {
                DOM.purgeAll();
                DOM.createGrid(10, 10, '.selfCont');
                DOM.createGrid(10, 10, '.enemCont');
                result.innerHTML = ''
                theGame()
            });
        }
    }
})();

const theGame = function() {
    const selfBoard = newGameboard(1);
    const enemBoard = newGameboard(2);

    enemBoard.placeDefault();
    selfBoard.placeDefault();

    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const attackRow = parseInt(e.target.getAttribute('data-row'));
            const attackCol = parseInt(e.target.getAttribute('data-col'));
            const attackTeam = e.target.getAttribute('data-team');

            if (attackTeam == 'enem') {
                if (!(enemBoard.receiveAttack(attackRow, attackCol))) {
                    let row = randomIntFromInterval(1,10);
                    let col = randomIntFromInterval(1,10);
                    while ((selfBoard.isTileShot(row, col)) | (selfBoard.isTileUnavailable(row, col))) {
                        row = randomIntFromInterval(1,10);
                        col = randomIntFromInterval(1,10);
                        console.log(row, col)
                    }
                    selfBoard.receiveAttack(row, col)
                }
                if (enemBoard.allSunk()) {
                    DOM.displayResult();
                }
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