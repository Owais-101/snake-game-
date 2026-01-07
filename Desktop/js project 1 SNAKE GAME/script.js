const board = document.querySelector('.board');
const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let snakeFood = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }

const blocks = [];
const snake = [
    {
        x: 1,
        y: 4
    },
]

// Default direction
let direction = 'down';

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        block.innerText = `${row},${col}`
        blocks[`${row},${col}`] = block;
    }
}

function renderSnake() {

    let head = null;
    // console.log(head);

    blocks[`${snakeFood.x},${snakeFood.y}`].classList.add("snakeFood")

    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    } else if (direction == "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    } else if (direction == "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }

    if (head.x == snakeFood.x && head.y == snakeFood.y) {
        blocks[`${snakeFood.x},${snakeFood.y}`].classList.remove("snakeFood");
        snakeFood = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        blocks[`${snakeFood.x},${snakeFood.y}`].classList.add("snakeFood");
        snake.unshift(head);

    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        alert("game over");
        clearInterval(intervalId);

    }

    snake.forEach((block) => {
        blocks[`${block.x},${block.y}`].classList.remove("fill")
    })

    snake.unshift(head);
    console.log(head);

    snake.pop();
    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.add("fill")
    })

}


intervalId = setInterval(() => {
    renderSnake();
}, 300)


addEventListener('keydown', (event) => {

    if (event.key == "ArrowUp") direction = "up"
    if (event.key == "ArrowDown") direction = "down"
    if (event.key == "ArrowRight") direction = "right"
    if (event.key == "ArrowLeft") direction = "left"

});


