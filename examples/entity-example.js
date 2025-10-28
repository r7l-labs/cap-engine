import { Entity } from '../src/capjs/entity.js';
import { Scene } from '../src/capjs/scene.js';
import { Engine } from '../src/capjs/engine.js';

// Create a simple game with a player and some enemies
const game = new Engine({
    width: 400,
    height: 300
});

const scene = new Scene();
game.scene = scene;

// Create a player (red square)
const player = new Entity({
    pos: { x: 200, y: 150 },  // center of screen
    size: { w: 32, h: 32 },
    color: '#ff0000',
    name: 'player'
});

// Create some enemies (blue squares)
const enemy1 = new Entity({
    pos: { x: 50, y: 50 },
    vel: { x: 30, y: 0 },  // moving right
    size: { w: 24, h: 24 },
    color: '#0000ff',
    name: 'enemy1'
});

const enemy2 = new Entity({
    pos: { x: 350, y: 200 },
    vel: { x: -30, y: 0 },  // moving left
    size: { w: 24, h: 24 },
    color: '#0000ff',
    name: 'enemy2'
});

// Add entities to scene
scene.add(player);
scene.add(enemy1);
scene.add(enemy2);

// Handle keyboard input for player movement
document.addEventListener('keydown', (e) => {
    const speed = 100;
    switch(e.key) {
        case 'ArrowLeft':
            player.setVelocity(-speed, 0);
            break;
        case 'ArrowRight':
            player.setVelocity(speed, 0);
            break;
        case 'ArrowUp':
            player.setVelocity(0, -speed);
            break;
        case 'ArrowDown':
            player.setVelocity(0, speed);
            break;
    }
});

document.addEventListener('keyup', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        player.setVelocity(0, 0);
    }
});

// Update game logic
scene.onUpdate = (dt) => {
    // Check for collisions between player and enemies
    if (player.collidesWith(enemy1) || player.collidesWith(enemy2)) {
        console.log('Collision detected!');
        // You could add game over logic here
    }

    // Make enemies bounce off screen edges
    [enemy1, enemy2].forEach(enemy => {
        const bounds = enemy.bounds();
        if (bounds.x <= 0 || bounds.x + bounds.w >= game.width) {
            enemy.vel.x *= -1; // Reverse direction
        }
    });
};

// Start the game
game.start();