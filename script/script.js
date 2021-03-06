
/*----------------sounds----------*/

class AudioController {
    constructor() {
        this.matchSound = new Audio('sounds/applause5.mp3');
        this.victorySound = new Audio('sounds/crowdhomerunapplause.mp3');
        this.gameOverSound = new Audio('sounds/crowd-groan.mp3');
     }
match() {
    this.matchSound.play();
}
victory() {
    this.victorySound.play();
}
gameOver() {
    this.gameOverSound.play();
    }
}


class MixnMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    /*------------game start-------*/
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
    setTimeout(() =>{
        this.shuffleCards();
        this.countdown = this.startCountdown();
        this.busy = false;
}, 500);
this.hideCards();
this.timer.innerText = this.timeRemaining;
this.ticker.innerText = this.totalClicks;

    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        })
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck)
            this.checkForCardMatch(card);
            else
            this.cardToCheck = card;
        }
    }
/*---------------check for matched cards----------*/
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
        this.cardMatch(card, this.cardToCheck);
        else
        this.cardNotMatched(card, this.cardToCheck);

       this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
        this.victory();
    }
    cardNotMatched(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

getCardType(card) {
    return card.getElementsByClassName('team')[0].src;
}

/*-----countdown timer--------*/
    startCountdown() {
        return setInterval(() => {
this.timeRemaining--;
this.timer.innerText = this.timeRemaining;
if(this.timeRemaining === 0)
this.gameOver();
        }, 1000);
    }

/*------overlay screens for victory or game over-------*/
    gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }

/*-----shuffle cards using the Fisher-Yates shuffle------*/
    shuffleCards() {
        for(let i = this.cardsArray.length -1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;
        }
    }

    canFlipCard(card) {
       return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixnMatch(60, cards);

overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
    });
  });
  cards.forEach(card => {
      card.addEventListener('click', () =>{
          game.flipCard(card);
     });
  });
}
/*-------makes sure to run only when html is loaded--------*/
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

let audioController = new AudioController();

