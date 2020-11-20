// initializing variables

let d;
let score = 0;
const box = 32;


const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// get audio and images files

const background = new Image();
background.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const dead = new Audio();
dead.src = "audio/dead.mp3";

const up = new Audio();
up.src = "audio/up.mp3";

const down = new Audio();
down.src = "audio/down.mp3";

const right = new Audio();
right.src = "audio/right.mp3";

const left = new Audio();
left.src = "audio/left.mp3";

const eat = new Audio();
eat.src = "audio/eat.mp3";

// creating snake and food objects ::::: Note food and snake will have both x and y properties

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}


let food = [];
food[0] = {
    x: Math.floor(Math.random() * 17 + 1) * box, // appear in x-axis randomly
    y: Math.floor(Math.random() * 15 + 3) * box // appear in y-axis randomly
}

// and keyboard keys for playing the game

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        up.play();
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        right.play();
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        down.play();
        d = "DOWN";
    }
}

// draw or add everything to the canvas

function draw() {
    // draw background
    ctx.drawImage(background, 0, 0);
    // draw food
    ctx.drawImage(foodImg, food[0].x, food[0].y);
    // draw text
    ctx.fillStyle = "white";
    ctx.font = "45px changa one";
    ctx.fillText(score, 2 * box, 1.6 * box)


    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box)
    }


    // snake old position

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    // move the snake

    if (d == "LEFT") snakeX -= box; // store new value using the same variable
    if (d == "RIGHT") snakeX += box;
    if (d == "UP") snakeY -= box;
    if (d == "DOWN") snakeY += box;

    // snake new position

    let snakeNew = {
        x: snakeX,
        y: snakeY,
    }

    // if the snake eat the food
    if (snakeX == food[0].x && snakeY == food[0].y) {
        score++;
        eat.play();

        // change food location

        food[0] = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop();
    }


    snake.unshift(snakeNew);


    // set collision function

    function collition(head, body) {
        for (let i = 0; i < body.length; i++) {
            if (head[i].x == body[i].x && head[i].y == body[i].y){
                return true;
            }else {
                return false;
            }
        }
    }

    // set collision condition aka game over

    for (let i = 0; i < snake.length; i++) {
        if (snakeX < box || snakeX > 17 * box || snakeY > 17 * box || snakeY < 3 * box || collition(snakeNew,snake)) {
            clearInterval(game);
            dead.play();
        }
    }


}

let game = setInterval(draw, 200);