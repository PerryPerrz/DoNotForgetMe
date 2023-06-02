const cards = document.querySelectorAll('.card');

let matchedCards = 0;
let firstCard, secondCard;
let disableCards = false;

// Function to flip the card
function flipCard(e) {
    let clickedCard = e.target; // Get the clicked card by the user

    // Check if the user clicked the same card
    if (clickedCard !== firstCard && !disableCards) {
        clickedCard.classList.toggle("flip");

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
        matchedCards++;
        if (matchedCards == 8) {
            // the user won
            setTimeout(() => {
                return shuffleCards(); // call the shuffle function after 1000ms
            }, 1000);
        }
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard = secondCard = ""; // Reset the cards
        return disableCards = false;
    }

    // Shake the cards if they don't match
    setTimeout(() => {
        // Add the shake class to the cards after 400ms
        firstCard.classList.toggle("shake");
        secondCard.classList.toggle("shake");
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
    matchedCards = 0;
    firstCard = secondCard = "";
    disableCards = false;
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