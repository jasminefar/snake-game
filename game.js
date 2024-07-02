
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    let snake = [{ x: 200, y: 200 }];
    let direction = { x: 0, y: 0 };
    let food = { x: 0, y: 0 };
    let score = 0;

    function generateFood() {
        food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'lime';
        snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        });
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
        ctx.fillStyle = 'white';
        ctx.fillText(`Score: ${score}`, 10, 20);
    }

    function update() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        if (head.x === food.x && head.y === food.y) {
            score++;
            generateFood();
        } else {
            snake.pop();
        }
        snake.unshift(head);

        if (
            head.x < 0 || head.x >= canvas.width ||
            head.y < 0 || head.y >= canvas.height ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            alert('Game Over!');
            document.location.reload();
        }
    }

    function gameLoop() {
        update();
        draw();
        setTimeout(gameLoop, 100);
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (direction.y === 0) direction = { x: 0, y: -gridSize };
                break;
            case 'ArrowDown':
                if (direction.y === 0) direction = { x: 0, y: gridSize };
                break;
            case 'ArrowLeft':
                if (direction.x === 0) direction = { x: -gridSize, y: 0 };
                break;
            case 'ArrowRight':
                if (direction.x === 0) direction = { x: gridSize, y: 0 };
                break;
        }
    });

    generateFood();
    gameLoop();
});
