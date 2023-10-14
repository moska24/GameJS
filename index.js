const cards = document.querySelectorAll('.memory-card');

let hasFlipped= false;
let firstCard;
let secondCard;
let lockBoard = false;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlipped){
        hasFlipped = true;
        firstCard = this;
    } else {
        secondCard =this;

        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name){
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
[hasFlipped, lockBoard] = [false, false];
[firstCard, secondCard] = [null, null];
}

(function suffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flipCard));