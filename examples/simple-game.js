import { Engine } from '../src/capjs/engine.js';

// Create a simple game with nice defaults
const game = new Engine({
    width: 800,
    height: 600,
    backgroundColor: '#1a1a1a'  // dark background
});

// Get the scene (created automatically by the engine)
const scene = game.scene;

// Create player with a single line!
const player = scene.createEntity({
    pos: { x: 400, y: 300 },  // center of screen
    size: { w: 32, h: 32 },
    color: '#00ff00',  // green
    name: 'player'
});

// Create some enemies that bounce around
const createEnemy = (x, y, vx, vy) => {
    return scene.createEntity({
        pos: { x, y },
        vel: { x: vx, y: vy },
        size: { w: 24, h: 24 },
        color: '#ff0000',  // red
        name: 'enemy'
    });
};

// Add a few enemies
createEnemy(100, 100, 100, 50);
createEnemy(700, 100, -100, 50);
createEnemy(400, 500, 50, -50);

// Player control speed
const PLAYER_SPEED = 200;

// Game update logic - called every frame
scene.onUpdate = (dt) => {
    // Handle player movement with arrow keys
    const input = {
        x: (game.isKeyPressed('ArrowRight') ? 1 : 0) - (game.isKeyPressed('ArrowLeft') ? 1 : 0),
        y: (game.isKeyPressed('ArrowDown') ? 1 : 0) - (game.isKeyPressed('ArrowUp') ? 1 : 0)
    };
    
    player.setVelocity(
        input.x * PLAYER_SPEED,
        input.y * PLAYER_SPEED
    );

    // Keep player in bounds
    const bounds = player.bounds();
    if (bounds.x < 0) player.setPosition(0, bounds.y);
    if (bounds.y < 0) player.setPosition(bounds.x, 0);
    if (bounds.x + bounds.w > game.width) player.setPosition(game.width - bounds.w, bounds.y);
    if (bounds.y + bounds.h > game.height) player.setPosition(bounds.x, game.height - bounds.h);

    // Make enemies bounce off walls
    scene.entities.forEach(entity => {
        if (entity.name === 'enemy') {
            const bounds = entity.bounds();
            if (bounds.x <= 0 || bounds.x + bounds.w >= game.width) {
                entity.vel.x *= -1;
            }
            if (bounds.y <= 0 || bounds.y + bounds.h >= game.height) {
                entity.vel.y *= -1;
            }
        }
    });
};

// Handle collisions between entities
scene.onCollision = (entity1, entity2) => {
    // Check if player hit an enemy
    if ((entity1 === player || entity2 === player)) {
        console.log('Game Over!');
        game.stop();
        
        // Show game over message
        const ctx = game.renderer.ctx;
        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', game.width / 2, game.height / 2);
    }
};

// Start the game!
game.start();