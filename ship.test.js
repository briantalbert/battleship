const { Ship } = require('./ship.js');

const testShip = Ship("battleship", 4);

test(('increase hit counter'), () => {
    expect(testShip.hit()).toBe(1);
    expect(testShip.hit()).toBe(2);
});

test(('is sunk'), () => {
    expect(testShip.isSunk()).toBe(false);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
})