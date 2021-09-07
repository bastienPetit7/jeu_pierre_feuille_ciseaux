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

const playerPierre = document.getElementById('playerPierre');
const playerFeuille = document.getElementById('playerFeuille');
const playerCiseaux = document.getElementById('playerCiseaux');
const playerLézard = document.getElementById('playerLézard');
const playerSpock = document.getElementById('playerSpock');

const computerPierre = document.getElementById('computerPierre');
const computerFeuille = document.getElementById('computerFeuille');
const computerCiseaux = document.getElementById('computerCiseaux');
const computerLézard = document.getElementById('computerLézard');
const computerSpock = document.getElementById('computerSpock');

const resultText = document.getElementById('resultText'); 

const allGameIcons = document.querySelectorAll('.far');


const choices = {
    pierre: { name: 'Pierre', defeats: ['ciseaux', 'lézard'] },
    feuille: { name: 'Feuille', defeats: ['pierre', 'spock'] },
    ciseaux: { name: 'Ciseaux', defeats: ['feuille', 'lézard'] },
    lézard: { name: 'Lézard', defeats: ['feuille', 'spock'] },
    spock: { name: 'Spock', defeats: ['ciseaux', 'pierre'] },
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
    resultText.textContent = " Que la partie commence !"
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
        finalResult.textContent = 'VICTOIRE'; 
        startConfetti();
    }
    if (computerPoint === Number (winNumber)){
        gameContainer.classList.add('hidden');
        victoryBox.classList.remove('hidden');
        finalResult.textContent = 'DÉFAITE';
    }
}

// Check the Result 
function checkResult(playerChoice, computerChoice) {
    const choice = choices[playerChoice];

    if ( playerChoice === computerChoice){
        resultText.textContent = "Égalité !!";

    } else if ( choice.defeats.indexOf(computerChoice) === -1){
        resultText.textContent = ' Perdu !!!';
        computerPoint ++; 
        computerScoreEl.textContent = computerPoint; 
    } else {
        resultText.textContent = 'GAGNÉ !!!';
        playerPoint ++; 
        playerScoreEl.textContent = playerPoint; 
        
    }
    whoWin();
}


// Display computer random Choice 
function computerChoiceDisplay(computerChoice) {

    switch(computerChoice) {
        case 'pierre': 
            computerPierre.classList.add('selected'); 
            computerChoiceEl.textContent = ' -- Pierre'; 
            break;
        
        case 'feuille': 
            computerFeuille.classList.add('selected'); 
            computerChoiceEl.textContent = ' -- Feuille'; 
            break;

        case 'ciseaux': 
            computerCiseaux.classList.add('selected'); 
            computerChoiceEl.textContent = ' -- Ciseaux'; 
            break;

        case 'lézard': 
            computerLézard.classList.add('selected'); 
            computerChoiceEl.textContent = ' -- Lézard'; 
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
        computerChoice = 'pierre'; 

    } else if ( randomNumber < 0.4 ){
        computerChoice = 'feuille'; 

    } else if ( randomNumber < 0.6) {
        computerChoice = 'ciseaux';

    } else if ( randomNumber < 0.8){
        computerChoice = 'lézard';

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
        case 'pierre': 
            playerPierre.classList.add('selected'); 
            playerChoiceEl.textContent = ' -- Pierre'; 
            break;
        
        case 'feuille': 
            playerFeuille.classList.add('selected'); 
            playerChoiceEl.textContent = ' -- Feuille'; 
            break;

        case 'ciseaux': 
            playerCiseaux.classList.add('selected'); 
            playerChoiceEl.textContent = ' -- Ciseaux'; 
            break;

        case 'lézard': 
            playerLézard.classList.add('selected'); 
            playerChoiceEl.textContent = ' -- Lézard'; 
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