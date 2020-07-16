class game {
    constructor() {
        this.score = 0;
        this.health = 3;
        this.isRunning = false;
        this.isMouse = false;
        this.level = 0;
        this.pickedEllipse = null;
        this.timer = 1300;
        this.pointsCounter = 0;
        this.speedCounter = 1;
        this.emojiType = '';
        this.lifeCounter = 0;
        // this.createInterval = 2000;

        this.sumAnimals = {
            mouse: 10,
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
        this.emojiWrap = document.createElement('div');
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
            for(let i = this.sumAnimals[key]; i > 0; i--){
                this.emojies.push(this.animals[key]);
            }
        }
    }

    deleteElement() {
        let deleteEmoji = document.querySelector('.wrap__emoji');
        if (deleteEmoji) 
        deleteEmoji.remove();
        this.isMouse = false;   
    }

    getRandomEmoji() {
        let emojiRandom = (Math.round(Math.random() * (this.emojies.length - 1)));
        console.log(this.emojies[emojiRandom]);
        if (this.emojies[emojiRandom] === '🐭') {
            this.isMouse = true; 
        }
        return this.emojies[emojiRandom];
        
    }

    createEmoji() { 
        this.deleteElement();
        let ellipseRandom = (Math.round(Math.random() * (this.ellipse.length - 1)));
        this.emojiWrap.classList.add('wrap__emoji');
        this.ellipse[ellipseRandom].appendChild(this.emojiWrap);
        this.emojiWrap.innerHTML = this.getRandomEmoji();
        this.emojiWrap.addEventListener('click', () => this.clickEmoji(), {once: true});
    }

    clickEmoji() {   
        this.speedCounter = 1;
        if (this.isMouse) {
            this.pointsCounter += 10; 
            this.star.style.animation = 'none';
                if (this.pointsCounter % 50 === 0) {
                    this.star.style.animation = 'flash 1s ease-in-out';
                    this.speedCounter += 1;
                    // setTimeout(() => { this.speedCounter += 1;
                    // speed.innerHTML = this.speedCounter
                    // }, this.timer * 0.9); 
                }
        }
        else {        
            this.health--;
            console.log(this.health);
            this.lifeCounter++;
            const livesCounter = 3;
            console.log(this.lives[livesCounter-this.lifeCounter]);
            this.lives[livesCounter-this.lifeCounter].style.display = 'none';
            this.death[livesCounter-this.lifeCounter].style.display = 'block';
        }
        if (this.health === 0) {
            this.deleteElement();
            clearInterval(this.interval);
            const counter = document.getElementById('points-counter');
            counter.innerHTML = this.pointsCounter;
            this.popupGameOver.classList.add('active');
            this.endGame();
        }
        this.setPoints();
        this.setScore();
    }

    setPoints() {
        this.points.innerHTML = this.pointsCounter;  
    }
    
    setScore () {
        this.speed.innerHTML = this.speedCounter;
    }
    
    startGame() {
        this.isRunning = true;
        this.createEmojiesArr ();
        this.createEmoji ();
        this.setPoints ();
        this.setScore()
        this.interval = setInterval( () => this.createEmoji(),this.timer);
    }

    endGame() {
        this.health = 3;
        this.points = 0;
        this.points.innerHTML = this.pointsCounter;
        if (this.btnGameOver !== null) {
        this.btnGameOver.addEventListener('click', () => {this.popupGameOver.classList.remove('active')});
        }
    }

    
}
let start = document.querySelector('.start__button');
start.addEventListener('click', () => { let newGame = new game();
                                        newGame.startGame();});