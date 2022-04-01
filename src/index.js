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
            return this.hitStatus.length == length ? true : false;
        }
    }
}

function newGameboard(team) {
    let activeShips = [];
    let activeTiles = [];
    let missedShots = [];

    return {
        team,
        placeShip: function(row, col) {
            let newShip = shipFactory(row, col, team);
            activeShips.push(newShip);
            return newShip;
        },

        isTileDisabled: function(row, col) {
            for (let i of activeShips) {
                if (i.start[0] == i.end[0]) {
                    let onesBetween = getAllNumbersBetween(i.start[1], i.end[1]);
                    for (let j of onesBetween) {
                        activeTiles.push([i.start[0], j])
                    }
                } else if (i.start[1] == i.end[1]) {
                    let onesBetween = getAllNumbersBetween(i.start[0], i.end[0]);
                    for (let j of onesBetween) {
                        activeTiles.push([i.start[1], j])
                    }
                }
            }
            return activeTiles.includes([row, col]) ? false : true;
        },

        receiveAttack: function(row, col) {
            if (this.isTileDisabled(row, col)) {
                missedShots.push([row, col])
                return;
                //handle wrong click
            } else {
                for (let i of activeShips) {
                    if (i.start[0] == i.end[0]) {
                        if (col >= i.start[1] && col < i.end[1]) {
                            i.hit(row, col)
                        }
                    } else if (i.start[1] == i.end[1]) {
                        if (row >= i.start[0] && row < i.end[0]) {
                            i.hit(row, col)
                        }
                    }
                }
            }
        },
    }
}

module.exports = {
    shipFactory, newGameboard
};