const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = 20; // 20x20 grid
canvas.width = gridSize * tileCount;
canvas.height = gridSize * tileCount;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

const currentScoreElement = document.getElementById("currentScore");
const highScoreElement = document.getElementById("highScore");

// تحميل الصور
const snakeHeadImg = new Image();
snakeHeadImg.src = "https://via.placeholder.com/20x20/00ff00/000000?text=🐍";

const snakeBodyImg = new Image();
snakeBodyImg.src = "https://via.placeholder.com/20x20/00cc00/000000?text=🟢";

const foodImg = new Image();
foodImg.src = "https://via.placeholder.com/20x20/ff0000/000000?text=🍎";

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

    // تجاوز الجدران
    if (head.x < 0) head.x = tileCount - 1;
    if (head.x >= tileCount) head.x = 0;
    if (head.y < 0) head.y = tileCount - 1;
    if (head.y >= tileCount) head.y = 0;

    if (collision(head, snake)) {
        resetGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }

    currentScoreElement.textContent = `النقاط: ${score}`;
    highScoreElement.textContent = `أعلى نقاط: ${highScore}`;
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // رسم الثعبان
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.drawImage(snakeHeadImg, segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        } else {
            ctx.drawImage(snakeBodyImg, segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        }
    });

    // رسم الفاكهة
    ctx.drawImage(foodImg, food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function collision(head, array) {
    return array.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
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
