const Ship = (shipName, shipLength) => {
    let hitCount = 0;

    const hit = () => {
        hitCount++;
        /* console.log(shipName + ' was hit!');
        if (isSunk()) {
            console.log(shipName + ' is sunk!');
        } */
        return hitCount;
    }

    const getLength = () => {
        return shipLength;
    }
    
    const getName = () => {
        return shipName;
    }

    const isSunk = () => {
        if (hitCount >= shipLength) {
            return true;
        } else {
            return false;
        }
    };

    return { hit, isSunk, getLength, getName };
}

module.exports.Ship = Ship;