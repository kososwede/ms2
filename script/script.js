class AudioController {
    constructor() {
        this.matchSound = new Audio('sounds/applause5.wav');
        this.victorySound = new Audio('sounds/victory.wav');
        this.gameOverSound = new Audio('sounds/gameover.wav');
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
        //this.shuffleCards();
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
        }
    }

    shuffleCards() {
        for(let i = this.cardsArray.length -1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;
        }
    }

    canFlipCard(card) {
        return true;
      //  return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
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
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

let audioController = new AudioController();

