const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");

// إعداد اللعبة
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;

// رسم الثعبان والطعام
function draw() {
    gameBoard.innerHTML = "";
    snake.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

// تحريك الثعبان
function move() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // التحقق من الاصطدام بالجدران أو الجسم
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert("Game Over! النقاط: " + score);
        resetGame();
        return;
    }

    snake.unshift(head);

    // التحقق من أكل الطعام
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

// توليد الطعام في مكان عشوائي
function generateFood() {
    food.x = Math.floor(Math.random() * gridSize) + 1;
    food.y = Math.floor(Math.random() * gridSize) + 1;
}

// إعادة تعيين اللعبة
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreElement.textContent = score;
    generateFood();
}

// التحكم في الثعبان باستخدام الأزرار
document.getElementById("up").addEventListener("click", () => direction = { x: 0, y: -1 });
document.getElementById("left").addEventListener("click", () => direction = { x: -1, y: 0 });
document.getElementById("down").addEventListener("click", () => direction = { x: 0, y: 1 });
document.getElementById("right").addEventListener("click", () => direction = { x: 1, y: 0 });

// تحديث اللعبة كل 200 مللي ثانية
setInterval(() => {
    move();
    draw();
}, 200);
