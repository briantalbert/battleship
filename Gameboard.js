const { Ship } = require('./ship.js');

const Gameboard = () => {

    let placedShips = [];
    let shipList = [];
    
    const makeShips = () => {
        const patrolBoat = Ship("patrol boat", 2);
        const submarine = Ship("submarine", 3);
        const destroyer = Ship("destroyer", 3);
        const battleship = Ship("battleship", 4);
        const carrier = Ship("carrier", 5);

        shipList.push(patrolBoat, submarine, destroyer, battleship, carrier);
    }

    makeShips();

    const makeBoard = () => {
        let board = [];
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                row.push('');
            }
            board.push(row);
        }
        return board;
    }

    const board = makeBoard();

    const canFit = (ship, x, y, dir) => {
        //dir: v for vertical, h for horizontal
        if (placedShips.includes(ship.getName())) {
            return false;
        }
        const shipLength = ship.getLength();
        if (dir == 'h') {
            if (y + shipLength > 8) {
                return false;
            } else {
                for (let i = 0; i < shipLength; i++) {
                    if (board[x][y + i] != '') {
                        return false;
                    }
                };
                return true;
            }
        } else if (dir == 'v') {
            if (x + shipLength > 8) {
                return false;
            } else {
                for (let i = 0; i < shipLength; i++) {
                    if (board[x + i][y] != '') {
                        return false;
                    }
                };
                return true;
            }
        }

    }

    const receiveAttack = (x, y) => {
        if (board[x][y] != '') {
            board[x][y] = 'X';
            hitShip(x, y);
            return true;
        } else {
            return false;
        }
    };

    const hitShip = (x, y) => {
        let shipInitial = board[x][y];
        if (shipInitial == 'X') {
            return false;
        }

        switch (shipInitial) {
            case 'P':
                shipList[0].hit();
                break;
            case 'S':
                shipList[1].hit();
                break;
            case 'D':
                shipList[2].hit();
                break;
            case 'B':
                shipList[3].hit();
            break;
            case 'C':
                shipList[4].hit();
            break;  
        }
        return true;
    }

    const placeShip = (ship, x, y, dir) => {
        let shipLength = ship.getLength();
        let shipName = ship.getName();
        let shipInitial = shipName.charAt(0).toUpperCase();
        if (canFit(ship, x, y, dir)) {
            placedShips.push(shipName);
            switch (dir) {
                case 'h':
                    for (let i = 0; i < shipLength; i++) {
                        board[x][y + i] = shipInitial;
                    };
                    break;
                case 'v':
                    for (let i = 0; i < shipLength; i++) {
                        board[x + i][y] = shipInitial;
                    }
                    break;    
                default:
                    break;
            }
            return board;
        } else {
            return false;
        }
        
    }

    const getBoard = () => {
        return board;
    }

    return { makeBoard, canFit, getBoard, placeShip, receiveAttack };
}

module.exports.Gameboard = Gameboard;