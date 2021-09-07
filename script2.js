import {startConfetti, stopConfetti, removeConfetti} from './confetti.js'; 

const gameContainer = document.querySelector('.game-container');

const victoryBox = document.getElementById('victoryBox'); 
const finalResult = document.getElementById('finalResult');

const gameModeContainer = document.getElementById('gameModeContainer');
const formGameMode = document.getElementById('gameMode'); 
const radioCont = document.querySelectorAll('.radio-container');

const gameDisplay = document.getElementById('gameDisplay');

const playerChoiceEl = document.getElementById('playerChoice');
const playerScoreEl = document.getElementById('playerScore'); 
const computerChoiceEl = document.getElementById('computerChoice');
const computerScoreEl = document.getElementById('computerScore');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const resultText = document.getElementById('resultText'); 

const allGameIcons = document.querySelectorAll('.far');


const choices = {
    rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
    paper: { name: 'Paper', defeats: ['rock', 'spock'] },
    scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
    lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
    spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let computerChoice = '';
let playerPoint = 0; 
let computerPoint = 0;
let winNumber = ''; 


// Reset selected choice 
function resetSelected() {
    allGameIcons.forEach((icon) => {
        icon.classList.remove('selected');
    })
    
    // removeConfetti(); 
}

// Reset all Game 
function resetAll() {
    resetSelected(); 
   
    playerPoint = 0; 
    computerPoint = 0;
    resultText.textContent = " Let's Get Started !"
    computerScoreEl.textContent = computerPoint;
    playerScoreEl.textContent = playerPoint; 
    victoryBox.classList.add('hidden');
    gameDisplay.classList.add('hidden'); 
    gameModeContainer.classList.remove('hidden'); 
    gameContainer.classList.remove('hidden');
    
    stopConfetti();
}
window.resetAll = resetAll; 

// Check who win the party, first at 3
function whoWin() {
    if ( playerPoint === Number (winNumber)){
        gameContainer.classList.add('hidden');
        victoryBox.classList.remove('hidden');
        finalResult.textContent = 'YOU WIN'; 
        startConfetti();
    }
    if (computerPoint === Number (winNumber)){
        gameContainer.classList.add('hidden');
        victoryBox.classList.remove('hidden');
        finalResult.textContent = 'YOU LOOSE';
    }
}

// Check the Result 
function checkResult(playerChoice, computerChoice) {
    const choice = choices[playerChoice];

    if ( playerChoice === computerChoice){
        resultText.textContent = "It's a Tie !!";

    } else if ( choice.defeats.indexOf(computerChoice) === -1){
        resultText.textContent = ' You Lost !!!';
        computerPoint ++; 
        computerScoreEl.textContent = computerPoint; 
    } else {
        resultText.textContent = 'YOU WON !!!';
        playerPoint ++; 
        playerScoreEl.textContent = playerPoint; 
        
    }
    whoWin();
}


// Display computer random Choice 
function computerChoiceDisplay(computerChoice) {

    switch(computerChoice) {
        case 'rock': 
            computerRock.classList.add('selected'); 
            computerChoiceEl.textContent = ' -- Rock'; 
            break;
        
        case 'paper': 
            computerPaper.classList.add('selected'); 
            computerChoiceEl.textContent = ' -- Paper'; 
            break;

        case 'scissors': 
            computerScissors.classList.add('selected'); 
            computerChoiceEl.textContent = ' -- Scissors'; 
            break;

        case 'lizard': 
            computerLizard.classList.add('selected'); 
            computerChoiceEl.textContent = ' -- Lizard'; 
            break;

        case 'spock': 
            computerSpock.classList.add('selected'); 
            computerChoiceEl.textContent = ' -- Spock'; 
            break;
        default:
        break; 
    }
}

// generate a random choice for the computer NB : ATTENTION A BIEN UTILISER ELSE IF... ET PAS SEULEMENT IF...
function computerRandomChoice() {
    let randomNumber = Math.random(); 
    
    if (randomNumber < 0.2) {
        computerChoice = 'rock'; 

    } else if ( randomNumber < 0.4 ){
        computerChoice = 'paper'; 

    } else if ( randomNumber < 0.6) {
        computerChoice = 'scissors';

    } else if ( randomNumber < 0.8){
        computerChoice = 'lizard';

    } else {
        computerChoice = 'spock'
    }
    return computerChoice; 

}





// repartition des differentes fonction motrice du jeux ... 
function gameStart(playerChoice) {
    resetSelected();
    computerRandomChoice();
    computerChoiceDisplay(computerChoice);
    checkResult(playerChoice, computerChoice); 
    
}


// Player Selection 
function select(playerChoice) {
    gameStart(playerChoice);
    // Use a switch statement

    switch(playerChoice) {
        case 'rock': 
            playerRock.classList.add('selected'); 
            playerChoiceEl.textContent = ' -- Rock'; 
            break;
        
        case 'paper': 
            playerPaper.classList.add('selected'); 
            playerChoiceEl.textContent = ' -- Paper'; 
            break;

        case 'scissors': 
            playerScissors.classList.add('selected'); 
            playerChoiceEl.textContent = ' -- Scissors'; 
            break;

        case 'lizard': 
            playerLizard.classList.add('selected'); 
            playerChoiceEl.textContent = ' -- Lizard'; 
            break;

        case 'spock': 
            playerSpock.classList.add('selected'); 
            playerChoiceEl.textContent = ' -- Spock'; 
            break;
        default:
        break; 
    }
}
window.select = select;

function startRound(e){
    e.preventDefault();
    console.log('win Number', winNumber); 
    gameModeContainer.classList.add('hidden'); 
    gameDisplay.classList.remove('hidden'); 
}


// Event Listener 
formGameMode.addEventListener('click', ()=> {
    
    radioCont.forEach((radioEl) => {
        // Remove Selected Label Styling
        radioEl.classList.remove('selected-label'); 
        // Add it back if radio input is checked
        if (radioEl.children[1].checked) {
          radioEl.classList.add('selected-label');
          winNumber = radioEl.children[1].value;
        }
    });
});

formGameMode.addEventListener('submit', startRound); 

// On Load 
resetAll(); 