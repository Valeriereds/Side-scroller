window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    let enemies = []
    let score = 0
    let gameOver = false
    let powerUps = [];
    let collectedPowerUpIndices = [];
    let powerUpInterval = 20000; // Set the power-up interval to 10 seconds
    let powerUpTimer = powerUpInterval; // Initialize the timer to the interval value


    let audio1 = new Audio('./assets/sounds/Beat_Blitz.mp3');
    audio1.volume = 0.1;
    audio1.play();
    let audio2 = new Audio('./assets/sounds/Hero_Death.mp3');
    audio2.volume = 0.2;
    let audio3 = new Audio('./assets/sounds/Collect_Point.mp3');
    audio3.volume = 0.2;


    class InputHandler {
        constructor() {
            this.keys = [];
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
        }
    }

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
            this.powerUpTimer = 0
            this.powerUpLimit = 5000;
        }
        draw(context) {
            // context.fillStyle = 'white';
            // context.fillRect(this.x, this.y, this.width, this.height);
            // context.strokeStyle = 'white'
            context.beginPath();
            context.arc(this.x + this.width / 3, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            // context.stroke();
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
                this.powerUpTimer += deltaTime; // Increment power-up timer

                if (this.powerUpTimer > this.powerUpLimit) {
                    this.powerUp = false; // Deactivate power-up
                    this.powerUpTimer = 0; // Reset power-up timer
                }
            } else {
                powerUps.forEach((powerUp, index) => {
                    const dx = (powerUp.x + powerUp.width / 2) - (this.x + this.width / 3);
                    const dy = (powerUp.y + powerUp.height / 2) - (this.y + this.height / 3);
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < powerUp.width / 2 + this.width / 2 && !powerUp.active) {
                        powerUp.active = true;
                        this.powerUp = true;
                        this.powerUpTimer = 0;
                        collectedPowerUpIndices.push(index); // Store index for removal
                    }
                });
            }

            // controls
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
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
            this.timer = 0; // Timer for tracking active duration
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        update(deltaTime) {
            if (this.active) {
                this.timer += deltaTime; // Increment the timer

                if (this.timer > this.activeDuration) {
                    this.active = false;
                    this.timer = 0; // Reset the timer
                }
            }
            this.x -= 2;
        }
    }


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
            this.speed = 10;
            this.markedForDeletion = false;
        }
        draw(context) {
            context.beginPath();
            context.arc(this.x + this.width / 3, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            // context.stroke();
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
                    score += 2; // Double points during power-up
                } else {
                    score += 1; // Regular points
                }
                audio3.play();
            }
        }
    }


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

    function handlePowerUps(deltaTime) {
        powerUpTimer += deltaTime;

        if (powerUpTimer > powerUpInterval) {
            const maxSpawnHeight = player.y - player.height; // Use player.height instead of player.jumpHeight
            const minSpawnHeight = maxSpawnHeight - 200;

            const yPosition = Math.max(minSpawnHeight, Math.random() * (maxSpawnHeight - minSpawnHeight) + minSpawnHeight);

            powerUps.push(new PowerUp(canvas.width, canvas.height, yPosition));
            powerUpTimer = 0; // Reset the timer
        }

        powerUps.forEach((powerUp, index) => {
            powerUp.draw(ctx);
            powerUp.update(deltaTime); // Pass deltaTime to the update method

            if (powerUp.x + powerUp.width <= 0 || powerUp.active) {
                powerUps.splice(index, 1);
            }
        });
    }

    function displayStatusText(context) {
        context.font = '40px Helvetica'
        context.fillStyle = 'black';
        context.fillText('Score: ' + score, 20, 50)
        context.fillStyle = 'white';
        context.fillText('Score: ' + score, 20, 52)
        if (gameOver) {
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
    let randomEnemyInterval = Math.random() * 1000 + 100;


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

        // Remove collected power-ups
        powerUps = powerUps.filter(powerUp => !powerUp.active);

        if (!gameOver) {
            requestAnimationFrame(animate);
        }
    }

    animate(0);
});