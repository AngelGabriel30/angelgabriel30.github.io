const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const groundHeight = 20;
const gravity = 0.5;
const jumpStrength = 10;
const cactusSpeed = 5;

let dinosaur = {
    x: 50,
    y: canvas.height - groundHeight,
    width: 50,
    height: 50,
    isJumping: false,
    jumpCount: 0
};

let cactus = {
    x: canvas.width,
    y: canvas.height - groundHeight - 50,
    width: 20,
    height: 50
};

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
    
    // Draw dinosaur
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
    
    // Draw cactus
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
}

function update() {
    // Update dinosaur position
    if (dinosaur.isJumping) {
        dinosaur.y -= jumpStrength - (0.5 * dinosaur.jumpCount);
        dinosaur.jumpCount++;
        if (dinosaur.y >= canvas.height - groundHeight) {
            dinosaur.y = canvas.height - groundHeight;
            dinosaur.isJumping = false;
            dinosaur.jumpCount = 0;
        }
    }
    
    // Update cactus position
    cactus.x -= cactusSpeed;
    if (cactus.x + cactus.width < 0) {
        cactus.x = canvas.width;
    }
    
    // Check collision
    if (dinosaur.x < cactus.x + cactus.width &&
        dinosaur.x + dinosaur.width > cactus.x &&
        dinosaur.y < cactus.y + cactus.height &&
        dinosaur.y + dinosaur.height > cactus.y) {
        // Collision detected, reset game
        alert("Game Over");
        resetGame();
    }
}

function resetGame() {
    dinosaur.x = 50;
    dinosaur.y = canvas.height - groundHeight;
    cactus.x = canvas.width;
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();

canvas.addEventListener('click', function() {
    if (!dinosaur.isJumping) {
        dinosaur.isJumping = true;
    }
});
