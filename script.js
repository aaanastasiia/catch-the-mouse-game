  class game {
    constructor() {
        this.score = 0;
        this.health = 3;
        this.isRunning = false;
        this.isMouse = false;
        this.level = 0;
        this.pickedEllipse = null;
        this.timer = 1600;
        this.pointsCounter = 0;
        this.speedCounter = 1;
        this.emojiType = '';
        this.lifeCounter = 0;
        this.emojiWrap = '';
        this.interval = '';

        this.sumAnimals = {
            mouse: 8,
            panda: 1,
            bear: 1,
            fox: 1,
            cat: 1,
            cow: 1,
            lion: 1,
            pig: 1,
            koala: 1,
            hare: 1,
            tiger: 1
        };

        this.animals = {
            mouse: '🐭',
            panda: '🐼',
            bear: '🐻',
            fox: '🦊',
            cat: '🐱',
            cow: '🐮',
            lion: '🦁',
            pig: '🐽',
            koala: '🐨',
            hare: '🐰',
            tiger: '🐯'
        };

        this.emojies = [];

        this.ellipse = document.querySelectorAll('.ellipse');
        this.speed = document.getElementById('speed');
        this.points = document.getElementById('points');
        this.star = document.querySelector('.star__icon');
        this.lives = [...document.querySelectorAll('.health-icon')];
        this.death = [...document.querySelectorAll('.death-icon')];
        this.popupGameOver = document.querySelector('.popup__game-over');
        this.btnGameOver = document.getElementById('popup__game-over_btn');
    }

    createEmojiesArr() {
        for (const key in this.sumAnimals) {
            for(let i = this.sumAnimals[key]; i > 0; i--) {
                this.emojies.push(this.animals[key]);
            }
        }
    }

    deleteElement() {
        let deleteEmoji = document.querySelector('.wrap__emoji');
        if (deleteEmoji) {
            deleteEmoji.remove();
        }
        this.isMouse = false;  
    }

    getRandomEmoji() {
        let emojiRandom = (Math.round(Math.random() * (this.emojies.length - 1)));
        if (this.emojies[emojiRandom] === '🐭') {
            this.isMouse = true; 
        }
        return this.emojies[emojiRandom];
    }

    createEmoji() { 
        this.deleteElement();
        this.emojiWrap = document.createElement('div');
        let ellipseRandom = (Math.round(Math.random() * (this.ellipse.length - 1)));
        this.emojiWrap.classList.add('wrap__emoji');
        this.ellipse[ellipseRandom].appendChild(this.emojiWrap);
        this.emojiWrap.innerHTML = this.getRandomEmoji();
        this.emojiWrap.addEventListener('click', () => this.clickEmoji());
    }

    clickEmoji() {
        if (this.isMouse) {
            this.star.style.animation = 'none';
            this.pointsCounter += 10; 
                if (this.pointsCounter % 50 === 0) {
                    this.star.style.animation = 'flash 1s ease-in-out';
                    this.speedCounter += 1;
                    this.timer = 1600 - (300 * this.speedCounter);
                    clearInterval(this.interval);
                    this.startGame();
                }
        }
        else {
            this.health--;
            this.lifeCounter++;
            const livesCounter = 3;
            this.lives[livesCounter-this.lifeCounter].style.display = 'none';
            this.death[livesCounter-this.lifeCounter].style.display = 'block';
        }
        if (this.health === 0) {
            clearInterval(this.interval);
            const counter = document.getElementById('points-counter');
            counter.innerHTML = this.pointsCounter;
            this.popupGameOver.classList.add('active');
            this.endGame();
        }
        this.isMouse = false;
        this.deleteElement();
        this.setPoints();
        this.setScore();
    }

    healthFull() {
        this.lives.forEach((live) => live.style.display = 'block');
        this.death.forEach((item) => item.style.display = 'none');
    }

    setPoints() {
        this.points.innerHTML = this.pointsCounter;  
    }
    
    setScore () {
        setTimeout(() => this.speed.innerHTML = this.speedCounter, 150);
    }
    
    startGame() {
        console.log(this.timer);
        this.isRunning = true;
        this.createEmojiesArr ();
        this.setPoints ();
        this.setScore();
        this.interval = setInterval( () => this.createEmoji(), this.timer);
    }

    endGame() {
        this.healthFull();
        this.health = 3;
        this.pointsCounter = 0;
        this.speedCounter = 0;
        this.speed.innerHTML = this.speedCounter;
        this.points.innerHTML = this.pointsCounter;
        this.btnGameOver.addEventListener('click', () => {this.popupGameOver.classList.remove('active')});
    }
}

let start = document.querySelector('.start__button');
start.addEventListener('click', () => { let newGame = new game();
                                        newGame.startGame()});

const rulesBtn = document.querySelector('.question__button');
const acceptRules = document.querySelector('.popup__accept_btn');
const popup = document.querySelector('.popup');
rulesBtn.addEventListener('click', () => popup.style.display = 'block');
acceptRules.addEventListener('click', () => popup.style.display = 'none');