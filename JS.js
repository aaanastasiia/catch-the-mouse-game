const start = document.getElementById('start__button');
const speed = document.getElementById('speed');
const points = document.getElementById('points');
const lives = [...document.querySelectorAll('.health-icon')];
const death = [...document.querySelectorAll('.death-icon')];
const star = document.querySelector('.star__icon');
let pointsCounter = 0;
let speedCounter = 1;
const rulesBtn = document.querySelector('.question__button');
const acceptRules = document.querySelector('.popup__accept_btn');
const btnGameOver = document.getElementById('popup__game-over_btn');
const popup = document.querySelector('.popup');
const popupGameOver = document.querySelector('.popup__game-over');
const rulesClick = () => popup.style.display = 'block';
rulesBtn.addEventListener('click', rulesClick);
const acceptClick = () => popup.style.display = 'none';
acceptRules.addEventListener('click', acceptClick);


const ellipse = document.querySelectorAll('.ellipse');
// const emojies = ['🐭', '🐼', '🐻', '🦊', '🐱', '🐮', '🦁', '🐽', '🐨', '🐰', '🐯']
const emojies = ['🐭', '🐼']
console.log(emojies[0]);

const rightEmoji = '🐭';

let pickedEllipse = null;

function emojiAppearance () {
    marker = true;
    if (pickedEllipse !== null) {
        pickedEllipse.innerHTML = '';
    }
    let emojiRandom = (Math.round(Math.random() * (emojies.length - 1)));
    let ellipseRandom = (Math.round(Math.random() * (ellipse.length - 1)));
    let emojiWrap = document.createElement('div');
    emojiWrap.id = 'wrap__emoji';
    pickedEllipse = ellipse[ellipseRandom];
    pickedEllipse.appendChild(emojiWrap);
    emojiWrap.innerHTML = emojies[emojiRandom];
    gameTime(emojiWrap, emojiRandom);
};

let i = 0;

// function gameTime(emojiWrap, emojiRandom) {
//     start.onclick = function () {
//         points.innerHTML = pointsCounter;
//         speed.innerHTML = speedCounter;
//         let timer = 1300;
//         let timerId = setInterval(() => emojiAppearance(), timer);
//         gameTime(timerId);
//         console.log(timer);
//         function emojiOnClick () {
//             marker = false;
//             pickedEllipse.innerHTML = null;
//             if (emojies[emojiRandom] === '🐭') {
//                 pointsCounter += 10; 
//                 points.innerHTML = pointsCounter; 
//                 star.style.animation = 'none';
//                     if (pointsCounter % 50 === 0) {
//                         star.style.animation = 'flash 1s ease-in-out';
//                         setTimeout(() => { speedCounter += 1;
//                         speed.innerHTML = speedCounter
//                         }, 800); 
                        
//                         // let timer = 1400;
//                         // let indexTimer = 1;
//                         // indexTimer -= 0.1;
//                         // let timerId = setInterval(emojiAppearance, timer*indexTimer);
//                         // console.log('Скорость игры:' + timer*indexTimer);
//                     }
//             }
//             else {
//                 i++;
//                 console.log(i);
//                 const livesCounter = 3;
//                 console.log(lives[livesCounter-i]);
//                 lives[livesCounter-i].style.display = 'none';
//                 death[livesCounter-i].style.display = 'block';
//                 }
//                     if (i === 3) {
//                         const counter = document.getElementById('points-counter');
//                         counter.innerHTML = pointsCounter;
//                         popupGameOver.style.display = 'block';
//                         console.log(pointsCounter);
//                         i = 0;
                        
//                         clearInterval(timerId);
//                     }
//                     pointsCounter = 0;
//         }
//         emojiWrap.addEventListener('click', emojiOnClick);
//     }
//     };
// gameTime();

start.onclick = function () {
    points.innerHTML = pointsCounter;
    speed.innerHTML = speedCounter;
    let timer = 1300;
    let timerId = setInterval(() => emojiAppearance(), timer);
    gameTime(timerId);
    console.log(timer);
}
start.addEventListener('click', start);

function gameTime (emojiWrap, emojiRandom, timerId) {
    function emojiOnClick () {
        marker = false;
        pickedEllipse.innerHTML = null;
        if (emojies[emojiRandom] === '🐭') {
            pointsCounter += 10; 
            points.innerHTML = pointsCounter; 
            star.style.animation = 'none';
                if (pointsCounter % 50 === 0) {
                    star.style.animation = 'flash 1s ease-in-out';
                    setTimeout(() => { speedCounter += 1;
                    speed.innerHTML = speedCounter
                    }, 800); 
                    
                    // let timer = 1400;
					// let indexTimer = 1;
					// indexTimer -= 0.1;
					// let timerId = setInterval(emojiAppearance, timer*indexTimer);
					// console.log('Скорость игры:' + timer*indexTimer);
                }
        }
        else {
            i++;
            console.log(i);
            const livesCounter = 3;
            console.log(lives[livesCounter-i]);
            lives[livesCounter-i].style.display = 'none';
            death[livesCounter-i].style.display = 'block';
            }
                if (i === 3) {
                    const counter = document.getElementById('points-counter');
                    counter.innerHTML = pointsCounter;
                    popupGameOver.style.display = 'block';
                    console.log(pointsCounter);
                    i = 0;
                    
                    clearInterval(timerId);
                }
                pointsCounter = 0;
    }
    emojiWrap.addEventListener('click', emojiOnClick);
}


function gameOver () {
    marker = false;
    popupGameOver.style.display = 'none';
    pointsCounter = 0;
    i = 0;
}
btnGameOver.addEventListener('click', gameOver);
if (pickedEllipse!==null) {
    pickedEllipse.innerHTML = '';
}


