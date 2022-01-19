let best_amount=0;
let winner = new Audio("winner.wav");

function start(){

    let minutes = 60 * 1,
        display = document.querySelector('#time'),
        amount = 0,
        show_points = document.querySelector('#show_points');
        endview = document.getElementById('gameover');

    let points,snake, running, apple, move, nextMove, button;
    const ctx = document.getElementById('snake-canvas').getContext('2d');

     startTimer(minutes,display);
     setDefault();
     addKeyDownEventListener();
     let game = setInterval(renderFrame, 100);

//start gry po nacisnieciu przycisku START
     nextMove = {x:1,y:0};
     running = true;
     button = document.getElementById('start');
     button.disabled = true;
     endview.style.display = "none";

//sprawdzanie czy głowa węża trafiła w jabłko
     function renderFrame(){
         if(running){
             if (nextMove.x !== -move.x || nextMove.y !== -move.y){
                 move = nextMove;
             }
             snake.push({x: processBound(getHead().x + move.x), y: processBound(getHead().y + move.y)});
             if(snake.filter(square => square.x === location.x && square.y === location.y).length >= 2){
                 setDefault();
             } else {
                 if (apple.x === getHead().x && apple.y === getHead().y){
                     points++;
                     apple = generateAppleLocation();
                     amount++;
                 }
                 points <= 0 ? snake.shift() : points--;
             }
         }
         //ustawienia canvasa
         ctx.fillStyle = 'black';
         ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

         ctx.fillStyle = 'yellow';
         snake.forEach(square => ctx.fillRect(square.x * 20, square.y * 20,18 ,18));

         ctx.fillStyle = 'red';
         ctx.fillRect(apple.x * 20, apple.y * 20, 18, 18);

         ctx.fillStyle = 'white';
         ctx.fillText(amount, 10, 30);
         ctx.font = "30px Arial";
     }

     function getHead(){
         return snake[snake.length - 1];
     }

//przechodzenie poza granicami planszy
     function processBound(number){
         if (number > 29){
             return 0;
         } else if (number < 0){
             return 29;
         }
         return number;
     }

// ustawienia początkowe
     function setDefault(){
         running = false;
         points = 2;
         [move, nextMove] = Array(2).fill({x: 0, y:0})
         snake = [{x: 10, y: 10}];
         apple = generateAppleLocation();
     }

//losowe generowanie jabłka
     function generateAppleLocation() {
         let location;
         do{
             location = {x:generateRandomNumber(29), y:generateRandomNumber(29)};
         } while(snake.filter(square => square.x === location.x && square.y === location.y).length > 0);
         return location;
     }

     function generateRandomNumber(max) {
         return Math.floor(Math.random() * (max + 1));
     }

// sprawdzanie ruchów gracza
     function addKeyDownEventListener() {
         window.addEventListener('keydown',e => {
             if (e.code.startsWith('Arrow')){
                 e.preventDefault();
                 //running = true;
             }
             switch (e.code){
                 case 'ArrowLeft':
                     nextMove = {x: -1,y: 0};
                     break;
                 case 'ArrowRight':
                     nextMove = {x: 1,y: 0};
                     break;
                 case 'ArrowDown':
                     nextMove = {x: 0,y: 1};
                     break;
                 case 'ArrowUp':
                     nextMove = {x: 0,y: -1};
                     break;
             }
         })
     }

    //odliczanie czasu
     function startTimer(duration, display){
         var timer = duration,minutes,seconds;
        var time = setInterval(function (){
             minutes = parseInt(timer / 60,10);
             seconds = parseInt(timer % 60, 10);

             minutes = minutes < 10 ? "0" + minutes : minutes;
             seconds = seconds < 10 ? "0" + seconds : seconds;
             display.textContent = minutes + ":" + seconds;

             if(--timer < 0){
                 //sprawdzanie czy wynik jest lepszy od najlepszego
                 if(amount > best_amount){
                     show_points.textContent = amount;
                     best_amount = amount;
                     winner.play();
                 }
                 //zatrzymanie gry i odblokowanie przycisku
                 running = false;
                 endview.style.display = "block";
                 button.disabled = false;
                 clearInterval(time);
                 clearInterval(game);
             }
         },1000);
     }
 }