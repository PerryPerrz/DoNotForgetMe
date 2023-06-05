const cards = document.querySelectorAll('.card'),
    timer = document.querySelector(".timer span"),
    flip = document.querySelector(".flip span"),
    memory = document.querySelector(".memory span"),
    resetBtn = document.querySelector(".reset");

let matchedCards = 0;
let firstCard, secondCard;
let disableCards = false;
let flipCount = 0;

let memoryCompleted = 0;
memory.textContent = memoryCompleted;

let countdown = undefined;
let timerInterval = undefined;

// Function who update the timer
function updateTime() {
    timer.innerText = countdown;

    // Check if the timer is up
    if (countdown === 0) {
        // Reset memory count
        memoryCompleted = 0;
        memory.textContent = memoryCompleted;

        clearInterval(timerInterval);

        alert("Game Over !", "Time is up !");

        // Reset the game
        resetGame();

        alert("New game has started !")
        shuffleCards();
    } else {
        countdown--;
    }
}

// Function to reset the game
function resetGame() {
    flipCount = 0;
    flip.textContent = flipCount;

    matchedCards = 0;
    firstCard = secondCard = "";
    disableCards = false;
}

// Function to start a new game
function startingNewGame() {
    // Reset memory count
    memoryCompleted = 0;
    memory.textContent = memoryCompleted;

    shuffleCards();
}

// Function to flip the card
function flipCard(e) {
    flipCount++;
    flip.textContent = flipCount;

    let clickedCard = e.target; // Get the clicked card by the user

    // Check if the user clicked the same card
    if (clickedCard !== firstCard && !disableCards) {
        clickedCard.classList.add("flip");

        if (!firstCard) {
            return firstCard = clickedCard;
        }

        secondCard = clickedCard;
        disableCards = true; // Disable the cards temporarily

        // Get the images of the cards
        let firstCardImg = firstCard.querySelector('.back-view img').src,
            secondCardImg = secondCard.querySelector('.back-view img').src;

        matchCards(firstCardImg, secondCardImg);
    }
}

// Function to check if the cards match
function matchCards(card1, card2) {
    if (card1 === card2) {
        // Disable the cards temporarily
        disableCards = true;

        // Animate the cards if they match
        setTimeout(() => {
            // Add the victory animation class to the cards after 400ms
            firstCard.classList.add("victory");
            secondCard.classList.add("victory");

            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            firstCard = secondCard = ""; // Reset the cards

            // Enable the cards after 400ms
            disableCards = false;
        }, 400);

        matchedCards++;
        if (matchedCards == 8) {
            // Update the memory count
            memoryCompleted++;
            memory.textContent = memoryCompleted;

            // the user won
            setTimeout(() => {
                return shuffleCards(); // call the shuffle function after 1000ms
            }, 1000);
        }
        return;
    }

    // Shake the cards if they don't match
    setTimeout(() => {
        // Add the shake class to the cards after 400ms
        firstCard.classList.add("shake");
        secondCard.classList.add("shake");

        firstCard.classList.remove("victory");
        secondCard.classList.remove("victory");
    }, 400);

    setTimeout(() => {
        // Remove the shake and flip class after 1200ms
        firstCard.classList.remove("shake", "flip");
        secondCard.classList.remove("shake", "flip");
        firstCard = secondCard = ""; // Reset the cards
        disableCards = false;
    }, 1200);
}

// Function to shuffle the cards
function shuffleCards() {
    // Reset timer
    timerInterval = clearInterval(timerInterval);
    countdown = 90;
    timer.innerText = countdown;

    // start the timer every 1 second
    timerInterval = setInterval(updateTime, 1000);

    // Reset the game
    resetGame();

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); // Shuffle the array randomly

    // Removing the flip class from all cards and passing random images to each card
    cards.forEach((card, index) => {
        card.classList.remove("flip");

        let imgTag = card.querySelector('.back-view img');
        imgTag.src = `assets/gems/img-${arr[index]}.png`;

        card.addEventListener('click', flipCard);
    });
}

shuffleCards(); // Call the shuffle function

// Add event listener to each card
cards.forEach(card => {
    card.addEventListener('click', flipCard);
});

// Setup event listeners
resetBtn.addEventListener("click", startingNewGame);