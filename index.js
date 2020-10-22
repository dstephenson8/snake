
const grid = document.querySelector('.grid')
const startBtn = document.getElementById('start')
const score = document.getElementById('score')
let scoreCount = 0;
let squares = [];
let currentSnake = [2,1,0]
let direction = 1;
const width = 40;
let appleIndex = 0;
let intervalTime = 1000
let timerId = 0;
let borderWall= true; 
let specialAppleIndex = 0;
let timerIdSpecial = 0;
let timerIdSpecialAdd = 0;

createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake') )


// Event Listeners
startBtn.addEventListener('click', startGame);



// Functions 

function removeSpecial(){
    console.log(squares[specialAppleIndex])
    squares[specialAppleIndex].classList.remove('specialApple')
}


function startGame(){
    document.addEventListener('keydown', control);

    timerIdSpecial = setInterval(removeSpecial, 10000);
    timerIdSpecialAdd = setInterval(specialApple, 20000);

    squares.forEach(element => element.classList.remove('snake'))
    squares[appleIndex].classList.remove('apple');
    squares.forEach(element => element.classList.remove('specialApple'));

     clearInterval(timerId);
     currentSnake = [2,1,0];
     scoreCount = 0;
     direction = 1;
     intervalTime = 1000;
     generateApples();
     
     currentSnake.forEach(index => squares[index].classList.add('snake') )
     score.textContent = scoreCount;     
     document.getElementById('title').innerText = "Snake Game"




     timerId = setInterval(move, intervalTime);


}


function createGrid(){
    
    for(var i = 0; i < width*width;  i++){
        var square = document.createElement('div');
        square.classList.add('square')
        grid.appendChild(square);
        squares.push(square)
    
    }
}

function move(){

    if(borderWall){  /// removes border wall 

    
        if(
        (currentSnake[0]+ width >= width*width && direction === width)||
        (currentSnake[0] % width === width-1 && direction === 1)|| 
        (currentSnake[0] % width === 0 && direction === -1)||
        (currentSnake[0] - width < 0 && direction === -width )||
        squares[currentSnake[0] + direction].classList.contains('snake') 
        )  {
            gameOver(); 
            return clearInterval(timerId)
            
        }
    }

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0]+direction);
    


    // Deal with snake head getting the apple
    if(currentSnake[0]=== appleIndex){
        squares[appleIndex].classList.remove('apple');
        squares[tail].classList.add('snake')
        currentSnake.push(tail);
        generateApples();
        scoreCount ++; 
        score.textContent = scoreCount;
        clearInterval(timerId)
        intervalTime = intervalTime * 0.9;
        timerId = setInterval(move, intervalTime);
        
    }
        //Deal with special apple 
    if(currentSnake[0]=== specialAppleIndex){
        console.log(squares[specialAppleIndex])
        squares[specialAppleIndex].classList.remove('specialApple');
        squares[tail].classList.add('snake')
        currentSnake.push(tail);
        currentSnake.push(tail);
        currentSnake.push(tail);
        currentSnake.push(tail);
        scoreCount =scoreCount +  5; 
        score.textContent = scoreCount;
        clearInterval(timerId)
        intervalTime = intervalTime * 0.9;
        timerId = setInterval(move, intervalTime);
        
    }

    squares[currentSnake[0]].classList.add('snake');
}



function control(e) {
    if (e.keyCode === 39) {
        direction = 1; 
        move();

    } else if (e.keyCode === 38){
        direction = -width
        move();

    }else if(e.keyCode === 37){
        direction = -1;
        move();

    }else if(e.keyCode === 40){
        direction = width;

        move();
    }
}

function generateApples(){
    do{
        appleIndex = Math.floor(Math.random() *squares.length) 
        console.log(appleIndex)
    }while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

function specialApple(){
    do{
        specialAppleIndex = Math.floor(Math.random() *squares.length) 
        console.log(specialAppleIndex + " special index")
    }while(squares[specialAppleIndex].classList.contains('snake') && squares[specialAppleIndex].classList.contains('snake'))
    squares[specialAppleIndex].classList.add('specialApple')
}



function gameOver(){
    document.getElementById('title').innerText = "GAME OVER!!!!"
    clearInterval(timerIdSpecial);
    clearInterval(timerIdSpecialAdd);
    clearInterval(timerId);
    document.removeEventListener('keydown', control);
}



