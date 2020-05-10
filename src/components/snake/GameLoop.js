/* 
Code written by group 7A
*/

import Constants from './Constants';

const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max-min+1)+min);
}

const GameLoop = (entities, { touches, dispatch }) => {
    let head = entities.head;
    let food = entities.food;
    let tail = entities.tail;

    touches.filter(t => t.type === "move").forEach(t => {
        if (head && head.position) {
            if (t.delta.pageY && t.delta.pageX) {
                if (t.delta.pageY && Math.abs(t.delta.pageY) > Math.abs(t.delta.pageX)) {
                    if (t.delta.pageY < 0 && head.yspeed != 1) {
                        head.yspeed = -1;
                        head.xspeed = 0;
                    } else if (t.delta.pageY > 0 && head.yspeed != -1) {
                        head.yspeed = 1;
                        head.xspeed = 0;
                    }
                } else if (t.delta.pageX) {
                    if (t.delta.pageX < 0 && head.xspeed != 1) {
                        head.xspeed = -1;
                        head.yspeed = 0;
                    } else if (t.delta.pageX > 0 && head.xspeed != -1) {
                        head.xspeed = 1;
                        head.yspeed = 0;
                    }
                }
            }
        }
    })

    head.nextMove -= 1;
    if (head.nextMove === 0) {
        head.nextMove = head.updateFrequency;

        if (
            head.position[0] + head.xspeed < 0 ||
            head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
            head.position[1] + head.yspeed < 0 ||
            head.position[1] + head.yspeed >= Constants.GRID_SIZE
        ) {
            // game over
            dispatch({
                type: "game-over"
            });
        } else {
            tail.elements = [[head.position[0], head.position[1]]].concat(tail.elements).slice(0,-1);

            head.position[0] += head.xspeed;
            head.position[1] += head.yspeed;

            for (let i=0; i<tail.elements.length; i++) {
                if (head.position[0] === tail.elements[i][0] && head.position[1] === tail.elements[i][1]) {
                    dispatch({
                        type: "game-over"
                    });
                }
            }

            if (head.position[0] === food.position[0] && head.position[1] === food.position[1]) {
                // eat food
                tail.elements = [[food.position[0], food.position[1]]].concat(tail.elements);

                food.position[0] = randomBetween(0, Constants.GRID_SIZE-1);
                food.position[1] = randomBetween(0, Constants.GRID_SIZE-1);

                dispatch({
                    type: "increase-score"
                });

                dispatch({
                    type: "play-music"
                });
            }
        }
    }

    return entities;
}

export { GameLoop };