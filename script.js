const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let direction = { x: 20, y: 0 };
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameInterval;

highScoreDisplay.textContent = highScore;

// تحميل صورة الأكل (تفاحة)
const foodImg = new Image();
foodImg.src = 'https://cdn-icons-png.flaticon.com/512/415/415733.png';  // أيقونة تفاحة

function startGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 20, y: 0 };
    score = 0;
    scoreDisplay.textContent = score;
    generateFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 120);
    startBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
}

function updateGame() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // التحقق من الاصطدام بالجدران أو النفس
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameInterval);
        alert('انتهت اللعبة! اضغط على إعادة التشغيل.');
        return;
    }

    snake.unshift(head);

    // التحقق من أكل الطعام
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
            localStorage.setItem('highScore', highScore);
        }
        generateFood();
    } else {
        snake.pop();
    }

    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // رسم الشبكة
    drawGrid();

    // رسم الأكل (تفاحة)
    ctx.drawImage(foodImg, food.x, food.y, 20, 20);

    // رسم الثعبان
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#27ae60' : '#2ecc71';  // الرأس لون مختلف
        ctx.fillRect(segment.x, segment.y, 20, 20);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(segment.x, segment.y, 20, 20);
    });
}

// رسم الشبكة
function drawGrid() {
    ctx.strokeStyle = '#bdc3c7';
    for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
    }
}

// التحكم في حركة الثعبان
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -20 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 20 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -20, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 20, y: 0 };
            break;
    }
});

// زر بدء اللعبة وإعادة التشغيل
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

// بدء اللعبة تلقائيًا لأول مرة
startGame();
