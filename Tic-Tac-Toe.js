
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#New-Game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Audio element
const winSound = new Audio('images/congratulation_audio.mp3'); // Replace with the path to your winner sound file

let turnO = true;   // Player turn
let count = 0;
let gameEnded = false; // Flag to track if the game has ended

// Defining all winning possibilities
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Reset the game
const NewGame = () => {
    turnO = true;
    count = 0;
    gameEnded = false; // Reset the game ended flag
    enableBoxes();
    msg.innerText = "Turn of player O";
    boxes.forEach((box, index) => {
        box.classList.remove("winner");
        box.innerText = "";
    });
};

// Function in case of draw condition
const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    disableBoxes();
};

// Function to show the turn
const showTurn = () => {
    if (turnO) {
        msg.innerText = "Turn of player X";
    } else {
        msg.innerText = "Turn of player O";
    }
};

// Adding functionality to the boxes on click and checking the winner at every step
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            showTurn();
            box.innerText = "O";
            turnO = false;
        } else {
            showTurn();
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        // To check winner
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

// Disable all boxes after the winner
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all the boxes to reset the game
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Function to show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    disableBoxes();
    gameEnded = true; // Set the game ended flag

    // Play win sound if game has not ended before
    winSound.play();
};

// Function to initialize confetti
const fireConfetti = () => {
    var confettiSettings = {
        spread: 2000,
        startVelocity: 55,
        ticks: 150,
        zIndex: 2000,
        particleCount: 200 
    };
    confetti(confettiSettings);
};

// Check winner at every click
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                boxes[pattern[0]].classList.add("winner");
                boxes[pattern[1]].classList.add("winner");
                boxes[pattern[2]].classList.add("winner");

                showWinner(pos1val);
                fireConfetti();

                return true;
            }
        }
    }
};

// Reset the game using New Game button
resetBtn.addEventListener("click", NewGame);
