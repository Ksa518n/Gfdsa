const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
let score = 0;

// الحصول على الأزرار
const upButton = document.getElementById("upButton");
const leftButton = document.getElementById("leftButton");
const downButton = document.getElementById("downButton");
const rightButton = document.getElementById("rightButton");

// إضافة مستمعين للأحداث
upButton.addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
});

leftButton.addEventListener("click", () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
});

downButton.addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
});

rightButton.addEventListener("click", () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
});

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || collision(head, snake)) {
        resetGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = "white";
    ctx.fillText(`النقاط: ${score}`, 10, 20);
}

function collision(head, array) {
    return array.some(segment => segment.x === head.x && segment.y === head.y);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
}

document.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

gameLoop();
