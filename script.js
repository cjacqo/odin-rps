let winsArr = []

function computerPlay() {
    let num = Math.floor(Math.random() * 3)
    
    switch(num) {
        case 0:
            return 'rock'
        case 1:
            return 'paper'
        case 2: 
            return 'scissors'
        default:
            return
    }
}

function shoot(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 'tie'
    } else if (playerSelection === 'rock') {
        if (computerSelection === 'paper') {
            return 'computer'
        } else if (computerSelection === 'scissors') {
            return 'player'
        }
    } else if (playerSelection === 'paper') {
        if (computerSelection === 'rock') {
            return 'player'
        } else if (computerSelection === 'scissors') {
            return 'computer'
        }
    } else if (playerSelection === 'scissors') {
        if (computerSelection === 'paper') {
            return 'player'
        } else if (computerSelection === 'rock') {
            return 'computer'
        }
    }
}

function checkWinner(arr) {
    let computerScore = 0
    let playerScore = 0

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'computer') {
            computerScore++
        } else (
            playerScore++
        )
    }

    if (computerScore > playerScore) {
        return 'Sorry, you lose!'
    } else {
        return 'YAY! You won! (:'
    }
}

function userPrompt(roundNum, isTie) {
    let x
    
    if (isTie) {
        x = window.prompt("TIE! Select again. What is your choice?")
    } else {
        x = window.prompt("ROUND " + roundNum + ": What is your choice?")
    }

    let answer = x.toLowerCase()

    if (answer === 'rock' || answer === 'paper' || answer === 'scissors') {
        return answer
    } else {
        window.alert('Answer must be either rock, paper, or scissors')
        userPrompt(roundNum, false)
    }
}

function getRoundsArr(num) {
    let arr = []
    let roundObj = { winner: null, isTie: false }

    for (let i = 0; i < num; i++) {
        arr.push(roundObj)
    }
    return arr
}

function startRound(round, roundNum, isTie) {
    let result
    
    // get computer and player selections
    const computerSelection = computerPlay()
    const playerSelection = userPrompt(roundNum, isTie)

    // once selections are made, SHOOT
    result = shoot(computerSelection, playerSelection)

    if (result !== 'tie') {
        return result
    } else {
        startRound(round, roundNum, true)
    }
}

function game() {
    // Variables
    let roundsSet = false
    let roundsArr = []
    let winner
    let gameOver = false

    // Have user input number of rounds
    // --- confirms that user input matches condition. Will not continue
    //     till met
    do {
        let num = window.prompt('How many rounds would you like to play? (min 1 / max 10)')

        if (num >= 1 && num <= 10) {
            roundsSet = true
            roundsArr = getRoundsArr(num)
        } else {
            window.alert('Number of rounds MUST be between 1 and 10')
        }
    } while (!roundsSet)

    // When roundsArr is set with rounds, call function to initialize game prompts
    let roundResults = roundsArr.map((round, index) => {
        let currentRound = index + 1
        return startRound(round, currentRound, round.isTie)
    })

    winner = checkWinner(roundResults)

    // Alert window of winner
    window.alert(winner)

    // Play again?
    let playAgain = window.prompt('Play again? yes or no', 'no')

    if (playAgain === 'no') {
        gameOver = true
        return
    } else {
        game()
    }

}

game()