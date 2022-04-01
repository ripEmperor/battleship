import { shipFactory, newGameboard } from './index';

test('hitStatus', () => {
    let ship = shipFactory([1, 4], [1, 9], 1);
    
    expect(ship.hitStatus).toEqual([])
    ship.hit(1, 5)
    expect(ship.hitStatus).toEqual([[1, 5]])
});

test('length', () => {
    let ship = shipFactory([1, 4], [1, 9], 1);
    let ship2 = shipFactory([1, 4], [4, 4], 1);
    
    expect(ship.length).toEqual(5)
    expect(ship2.length).toEqual(3)
});

test('isSunk', () => {
    let ship = shipFactory([1, 4], [1, 9], 1);      

    ship.hit(1, 4);
    ship.hit(1, 5);
    ship.hit(1, 6);
    ship.hit(1, 7);
    ship.hit(1, 8);
    
    expect(ship.isSunk()).toEqual(true)
});

test('gameboard.placeShip()', () => {
    let gameboard = newGameboard(1);
    let newShip = gameboard.placeShip([1,3], [1,5])
    expect(newShip.length).toEqual(2)
});

test('gameboard.receiveAttack()', () => {
    let gameboard = newGameboard(1);

    let newShipRow = gameboard.placeShip([1,3], [1,5]);
    gameboard.receiveAttack(1,3);
    gameboard.receiveAttack(1,4);
    gameboard.receiveAttack(1,5);
    gameboard.receiveAttack(1,6);
    gameboard.receiveAttack(1,7);
    expect(newShipRow.isSunk()).toEqual(true);

    let newShipColumn = gameboard.placeShip([1,3], [3,3]);
    gameboard.receiveAttack(1,3);
    gameboard.receiveAttack(2,3);
    gameboard.receiveAttack(3,3);
    expect(newShipColumn.isSunk()).toEqual(true);
});

test('gameboard.isTileDisabled()', () => {
    let gameboard = newGameboard(1);
    let newShip = gameboard.placeShip([1,3], [1,5]);
    gameboard.receiveAttack(1,3);
    gameboard.receiveAttack(1,4);
    gameboard.receiveAttack(1,5);
    expect(newShip.isSunk()).toEqual(true);
});

test('gameboard.isTileShot()', () => {
    let gameboard = newGameboard(1);
    let newShip = gameboard.placeShip([1,3], [1,5]);
    gameboard.receiveAttack(1,3);
    gameboard.receiveAttack(1,4);
    gameboard.receiveAttack(1,5);
    expect(gameboard.isTileShot(1,5)).toEqual(true);
});

test('gameboard.allSunk()', () => {
    const gameboard = newGameboard(1);
    const newShip = gameboard.placeShip([1,3], [1,5]);
    const newShip2 = gameboard.placeShip([2,3], [2,4]);
    gameboard.receiveAttack(1,3);
    gameboard.receiveAttack(1,4);
    gameboard.receiveAttack(2,3);
    expect(gameboard.allSunk()).toEqual(true);
});