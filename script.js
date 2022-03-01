function computerPlay() {
    let num = Math.floor(Math.random() * 3)
    
    switch(num) {
        case 0:
            return 'Rock'
        case 1:
            return 'Paper'
        case 2: 
            return 'Scissors'
        default:
            return
    }
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 'Tie'
    } else if (playerSelection === 'Rock') {
        if (computerSelection === 'Paper') {
            return 'Computer'
        } else if (computerSelection === 'Scissors') {
            return 'Player'
        }
    } else if (playerSelection === 'Paper') {
        if (computerSelection === 'Rock') {
            return 'Player'
        } else if (computerSelection === 'Scissors') {
            return 'Computer'
        }
    } else if (playerSelection === 'Scissors') {
        if (computerSelection === 'Paper') {
            return 'Player'
        } else if (computerSelection === 'Rock') {
            return 'Computer'
        }
    }
}

const playerSelection = 'Rock'
const computerSelection = computerPlay()
console.log(playRound(playerSelection, computerSelection))