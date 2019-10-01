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
    }
    flipCard(card) {

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

