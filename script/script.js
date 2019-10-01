class AudioController {
    constructor() {
        this.matchSound = new Audio('sounds/applause5.wav');
        this.victorySound = new Audio('sounds/victory.wav');
        this.gameOverSound = new Audio('sounds/gameover.wav');
     }

}



function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));

overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
    });
  });
  cards.forEach(card => {
      card.addEventListener('click', () =>{
     });
  });
}
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

let audioController = new AudioController();

