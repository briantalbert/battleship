const { Gameboard } = require('./Gameboard.js');
const { Ship } = require('./ship.js');

const testBoard = Gameboard();

//make fleet
const patrolBoat = Ship("patrol boat", 2);
const submarine = Ship("submarine", 3);
const destroyer = Ship("destroyer", 3);
const battleship = Ship("battleship", 4);
const carrier = Ship("carrier", 5);

test('make board', () => {
    expect(testBoard.makeBoard()).toEqual([['','','','','','','',''],
                                           ['','','','','','','',''],
                                           ['','','','','','','',''],
                                           ['','','','','','','',''],
                                           ['','','','','','','',''],
                                           ['','','','','','','',''],
                                           ['','','','','','','',''],
                                           ['','','','','','','','']]);
});

test('Ship can fit', () => {
    expect(testBoard.canFit(battleship, 0, 2, 'h')).toEqual(true);
    expect(testBoard.canFit(patrolBoat, 1, 1, 'v')).toEqual(true);
    expect(testBoard.canFit(carrier, 7, 5, 'h')).toEqual(false);
    expect(testBoard.canFit(submarine, 0, 5, 'v')).toEqual(true);
    expect(testBoard.canFit(destroyer, 3, 6, 'h')).toEqual(false);
})

test('Placing ship', () => {
    expect(testBoard.placeShip(battleship, 0, 2, 'h')).toEqual([['','','B','B','B','B','',''],
                                                                ['','','','','','','',''],
                                                                ['','','','','','','',''],
                                                                ['','','','','','','',''],
                                                                ['','','','','','','',''],
                                                                ['','','','','','','',''],
                                                                ['','','','','','','',''],
                                                                ['','','','','','','','']]);

    expect(testBoard.placeShip(carrier, 0, 5, 'v')).toEqual(false);

    expect(testBoard.placeShip(carrier, 1, 5, 'v')).toEqual([['','','B','B','B','B','',''],
    ['','','','','','C','',''],
    ['','','','','','C','',''],
    ['','','','','','C','',''],
    ['','','','','','C','',''],
    ['','','','','','C','',''],
    ['','','','','','','',''],
    ['','','','','','','','']]);

    expect(testBoard.placeShip(destroyer, 4, 0, 'h')).toEqual([['','','B','B','B','B','',''],
    ['','','','','','C','',''],
    ['','','','','','C','',''],
    ['','','','','','C','',''],
    ['D','D','D','','','C','',''],
    ['','','','','','C','',''],
    ['','','','','','','',''],
    ['','','','','','','','']]);

    expect(testBoard.placeShip(submarine, 0, 0, 'h')).toEqual(false);

    expect(testBoard.placeShip(submarine, 4, 7, 'v')).toEqual([['','','B','B','B','B','',''],
    ['','','','','','C','',''],
    ['','','','','','C','',''],
    ['','','','','','C','',''],
    ['D','D','D','','','C','','S'],
    ['','','','','','C','','S'],
    ['','','','','','','','S'],
    ['','','','','','','','']]);

    expect(testBoard.placeShip(submarine, 7, 0, 'h')).toEqual(false);

    expect(testBoard.placeShip(patrolBoat, 2, 0, 'h')).toEqual([['','','B','B','B','B','',''],
    ['','','','','','C','',''],
    ['P','P','','','','C','',''],
    ['','','','','','C','',''],
    ['D','D','D','','','C','','S'],
    ['','','','','','C','','S'],
    ['','','','','','','','S'],
    ['','','','','','','','']]);
})

test('Receiving Attack', () => {
    expect(testBoard.receiveAttack(0, 2)).toEqual(true);
    expect(testBoard.receiveAttack(0, 0)).toEqual(false);
    expect(testBoard.receiveAttack(4, 7)).toEqual(true);
});

/*

-const patrolBoat = Ship("patrol boat", 2);
-const submarine = Ship("submarine", 3);
-const destroyer = Ship("destroyer", 3);
-const battleship = Ship("battleship", 4);
-const carrier = Ship("carrier", 5);

0['','','B','B','B','B','',''],
1['','','','','','C','',''],
2['P','P','','','','C','',''],
3['','','','','','C','',''],
4['D','D','D','','','C','','S'],
5['','','','','','C','','S'],
6['','','','','','','','S'],
7['','','','','','','','']

*/