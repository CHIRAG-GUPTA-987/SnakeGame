let inputDir = {
    x: 0,
    y: 0
}

const gameOverSound = new Audio('gameOverSound.mp3');
const foodSound = new Audio('foodSound.mp3');
const directionChangeSound = new Audio('directionChangeSound.mp3');

let snakeArr = [
    {
        x: 13,
        y: 15
    }
]
let food = {
    x: 8, 
    y: 4
}
let speed = 8;
let lastPaintTime = 0;
let score = 0;
let board = document.querySelector('.board');
let isPaused = false;

const isCollide = snake => {
    for(let i=1; i<snakeArr.length; i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)return true;
    }
    if(snakeArr[0].x <= 0 || snakeArr[0].x >= 18 || snakeArr[0].y <= 0 || snakeArr[0].y >= 18)return true;
    return false;
}

//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed)return;
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine() {
    if(isPaused)return;
    //PART1: UPDATING THE SNAKE ARRAY AND FOOD
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir.x = 0;
        inputDir.y = 0;
        document.querySelector('.gameOver').classList.remove('d-none');
        setTimeout(()=>{
            snakeArr = [
                {
                    x: 13,
                    y: 15
                }
            ];
            food = {
                x: 8, 
                y: 4
            }
            score = 0;
            document.querySelector('.mainScore').innerHTML = score;
            document.querySelector('.gameOver').classList.add('d-none');
        }, 5000) 
        return;
    }

    //IF YOU HAVE EATEN THE FOOD, INCREMENT THE SCORE AND REGENERATE THE FOOD
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        document.querySelector('.mainScore').innerHTML = score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        })
        const a = 0, b = 18;
        food = {
            x: Math.round(a + (b-a)*Math.random()),
            y: Math.round(a + (b-a)*Math.random())
        }
    }

    //MOVING THE SNAKE
    for(let i = snakeArr.length-2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //PART2: DISPLAY SNAKE AND FOOD
    //DISPLAY THE SNAKE
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0)snakeElement.classList.add('head');
        else snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })
    //DISPLAY THE FOOD
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main logic Starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {
        x: 0, 
        y: 0
    }
    switch(e.key) {
        case "ArrowUp":
            console.log("ArrowUP");
            directionChangeSound.play();
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            directionChangeSound.play();
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            directionChangeSound.play();
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            directionChangeSound.play();
            inputDir.x = -1;
            inputDir.y = 0;
            break;
    }
})
const reset = document.querySelector('#reset');
reset.addEventListener('click', e=>{
    inputDir.x=0;
    inputDir.y=0;
    snakeArr = [
        {
            x: 13,
            y: 15
        }
    ];
    food = {
        x: 8, 
        y: 4
    }
    score = 0;
    document.querySelector('.mainScore').innerHTML = score;
})
const pause = document.querySelector('#pause');
pause.addEventListener('click', e=>{
    if(isPaused)isPaused = false;
    else isPaused = true;
})