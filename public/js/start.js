window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 800;
    canvas.height = 720;
    let enemies = []
    let score = 0
    let gameOver = false
    let powerUps = [];
    let collectedPowerUpIndices = [];
    let powerUpInterval = 20000;
    let powerUpTimer = powerUpInterval;
    let activePowerUpRemainingTime = 0;

    //all sounds
    let audio1 = new Audio('./assets/sounds/Beat_Blitz.mp3');
    audio1.volume = 0.1;
    audio1.play();
    let audio2 = new Audio('./assets/sounds/Hero_Death.mp3');
    audio2.volume = 0.2;
    let audio3 = new Audio('./assets/sounds/Collect_Point.mp3');
    audio3.volume = 0.2;
    let powerUpCollectSound = new Audio('./assets/sounds/Nom.mp3');
    powerUpCollectSound.volume = 1;

    // Reads the user input of arrow keys
    class InputHandler {
        constructor() {
            this.keys = [];
            this.touchY = '';
            this.touchThreshold = 100;
            window.addEventListener('keydown', e => {
                if ((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight')
                    && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', e => {
                console.log(e.key)
                if (e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
            window.addEventListener('touchstart', e => {
                this.touchY = e.changedTouches[0].pageY
            });
            window.addEventListener('touchmove', e => {
                const swipeDistance = e.changedTouches[0].pageY - this.touchY;
                if (swipeDistance < -this.touchThreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
            });
            window.addEventListener('touchend', e => {
                this.keys.splice(this.keys.indexOf('swipe up'), 1);              
            });
        }
    }

    // handles everything to do with the player
    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage');
            this.frameX = 0;
            this.maxFrame = 5;
            this.frameY = 0;
            this.fps = 15;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
            this.powerUp = false;
            this.powerUpTimer = 0;
            this.powerUpLimit = 8000;
        }
        draw(context) {
            context.beginPath();
            context.arc(this.x + this.width / 3, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input, deltaTime, enemies, powerUps) {
            //collision detection
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width / 1.2) - (this.x + this.width / 3);
                const dy = (enemy.y + enemy.height / 1.2) - (this.y + this.height / 3);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < enemy.width / 2 + this.width / 2) {
                    gameOver = true;
                    audio2.play();
                }
            })

            // sprite animation
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            // power up
            if (this.powerUp) {
                this.powerUpTimer += deltaTime;
                activePowerUpRemainingTime = Math.max(this.powerUpLimit - this.powerUpTimer, 0);
                if (this.powerUpTimer > this.powerUpLimit) {
                    this.powerUp = false;
                    this.powerUpTimer = 0;
                    activePowerUpRemainingTime = 0;
                }
            } else {
                activePowerUpRemainingTime = 0;
                powerUps.forEach((powerUp, index) => {
                    const dx = (powerUp.x + powerUp.width / 2) - (this.x + this.width / 3);
                    const dy = (powerUp.y + powerUp.height / 2) - (this.y + this.height / 3);
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < powerUp.width / 2 + this.width / 2 && !powerUp.active) {
                        powerUp.active = true;
                        this.powerUp = true;
                        this.powerUpTimer = 0;
                        collectedPowerUpIndices.push(index);
                        player.powerUpTimer = 0;
                        powerUpCollectSound.play();
                    }
                });
            }

            // controls
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            } else if ((input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('swipe up') > -1) && this.onGround()) {
                this.vy -= 30;
            } else {
                this.speed = 0;
            }

            // horizontal movement
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

            //vertical movement
            this.y += this.vy;
            if (!this.onGround()) {
                this.vy += this.weight;
                this.maxFrame = 0;
                this.frameY = 0;
            } else {
                this.vy = 0;
                this.maxFrame = 5;
                this.frameY = 0;
            }
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
        }
        onGround() {
            return this.y >= this.gameHeight - this.height;
        }
    }

    // handles the parallax background
    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 5;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
        }
        update() {
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
    }

    // handles everything to do with the powerup
    class PowerUp {
        constructor(gameWidth, gameHeight, initialY) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 100;
            this.height = 100;
            this.image = document.getElementById('powerupImage');
            this.x = this.gameWidth;
            this.y = initialY;
            this.active = false;
            this.activeDuration = 5000;
            this.timer = 0;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        update(deltaTime) {
            if (this.active) {
                this.timer += deltaTime;
                if (this.timer > this.activeDuration) {
                    this.active = false;
                    this.timer = 0;
                }
            }
            this.x -= 2;
        }
    }

    // handles everything for the enemies
    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 100;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.maxFrame = 3;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = Math.random() * 14 + 4;
            this.markedForDeletion = false;
        }
        draw(context) {
            // collision detection
            context.beginPath();
            context.arc(this.x + this.width / 3, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed;
            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;
                if (player.powerUp) {
                    score += 2;
                } else {
                    score += 1;
                }
                audio3.play();
            }
        }
    }

    // pushes and deletes enemies from the enemies array
    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    }

    // pushes and deletes powerups from the powerup array
    function handlePowerUps(deltaTime) {
        powerUpTimer += deltaTime;
        if (powerUpTimer > powerUpInterval) {
            const maxSpawnHeight = player.y - player.height;
            const minSpawnHeight = maxSpawnHeight - 200;
            const yPosition = Math.max(minSpawnHeight, Math.random() * (maxSpawnHeight - minSpawnHeight) + minSpawnHeight);
            powerUps.push(new PowerUp(canvas.width, canvas.height, yPosition));
            powerUpInterval = Math.random() * 10000 + 10000;
            powerUpTimer = 0;
            remainingPowerUpTime = powerUpInterval;
        } else {
            remainingPowerUpTime = powerUpInterval - powerUpTimer;
        }
        powerUps.forEach((powerUp, index) => {
            powerUp.draw(ctx);
            powerUp.update(deltaTime);
            if (powerUp.x + powerUp.width <= 0 || powerUp.active) {
                powerUps.splice(index, 1);
            }
        });
    }

    //displays the score, how long the powerup is active, and the game over text
    function displayStatusText(context) {
        context.font = '40px Russo One';
        context.fillStyle = 'black';
        context.fillText('Score: ' + score, 20, 50);
        context.fillStyle = 'white';
        context.fillText('Score: ' + score, 20, 52);
        if (player.powerUp) {
            context.fillText('2X: ' + (activePowerUpRemainingTime / 1000).toFixed(1) + 's', 20, 100);
        }
        if (gameOver) {
            powerUpTimer = 0;
            audio1.pause();
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText('GAME OVER, try again!', canvas.width / 2, 200);
            context.fillStyle = 'white';
            context.fillText('GAME OVER, try again!', canvas.width / 2 + 2, 202);
            setTimeout(function () {
                document.location.replace('/gameover');
            }, 2000)
            const data = {
                score: score,
            }
            fetch('/api/leaderboards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Score posted successfully:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 2000;
    let randomEnemyInterval = Math.random() * 800 + 200;

    // calls all the classes and starts the animations
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input, deltaTime, enemies, powerUps);
        handleEnemies(deltaTime);
        handlePowerUps(deltaTime);
        displayStatusText(ctx);
        powerUps = powerUps.filter(powerUp => !powerUp.active);
        if (!gameOver) {
            requestAnimationFrame(animate);
        }
    }
    animate(0);
});