#!/usr/bin/env node
const readlinePromise = import('readline');
const inquirerPromise = import('inquirer');
Promise.all([readlinePromise, inquirerPromise]).then(([readline, inquirer]) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // Define the game states
    let GameState;
    (function (GameState) {
        GameState[GameState["START"] = 0] = "START";
        GameState[GameState["EXPLORE"] = 1] = "EXPLORE";
        GameState[GameState["BATTLE"] = 2] = "BATTLE";
        GameState[GameState["END"] = 3] = "END";
    })(GameState || (GameState = {}));
    let playerState;
    // Initialize the game
    async function initGame() {
        console.log('Welcome to the Text-Based Adventure Game!\n');
        playerState = {
            health: 100,
            gold: 0,
            weapon: 'Sword',
        };
        rl.question('Enter your name: ', (playerName) => {
            console.log(`\nHello, ${playerName}! Your adventure begins!\n`);
            gameLoop(GameState.START);
        });
    }
    //defining game in looping
    async function gameLoop(state) {
        switch (state) {
            case GameState.START:
                console.log('You find yourself in a mysterious forest...\n');
                rl.question('What will you do? (Explore/Quit) ', (answer) => {
                    if (answer.toLowerCase() === 'explore') {
                        gameLoop(GameState.EXPLORE);
                    }
                    else {
                        console.log('Thanks for playing!');
                        rl.close();
                    }
                });
                break;
            case GameState.EXPLORE:
                console.log('You are exploring the forest...\n');
                rl.question('What will you do? (Continue exploring/Battle/Quit) ', (answer) => {
                    if (answer.toLowerCase() === 'continue exploring') {
                        gameLoop(GameState.EXPLORE);
                    }
                    else if (answer.toLowerCase() === 'battle') {
                        gameLoop(GameState.BATTLE);
                    }
                    else {
                        console.log('Thanks for playing!');
                        rl.close();
                    }
                });
                break;
            case GameState.BATTLE:
                console.log('You encounter a fierce enemy!\n');
                console.log('You defeated the enemy!\n');
                gameLoop(GameState.EXPLORE);
                break;
            case GameState.END:
                console.log('Game over!');
                rl.close();
                break;
        }
    }
    initGame();
}).catch((error) => {
    console.error('Error loading modules:', error);
});
