// COLOR PALETTES
const statusColors = {
    success: 'rgba(66,157,1,1)',
    warning: 'rgba(250,210,2,1)',
    error  : 'rgba(234,22,1,1)'
}

// DEFAULT VALUES
let roundCount
let userChoice

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

function game(roundCount) {
    // Variables
    let roundsSet = false
    let roundsArr = getRoundsArr(roundCount)
    let currentRound = 1
    let results
    let winner
    let gameOver = false

    roundsArr.map((round, index) => {
        let currentRound = index + 1
        let complete = false
        userChoice = ''

        if (!complete) {
            // get choices
            let computerSelection = computerPlay()
            let userSelection = getUserSelection()
            // userChoicesContainer.classList.remove('active')
            console.log("Hi")
        }
        // wait for user selection
        return 
    })

    // for (let i = currentRound - 1; i < roundCount; i++) {
    //     let complete = false
        
    //     // Get choices
    //     let computerSelection = computerPlay()
    //     let userSelection = getUserSelection()
    //     console.log(userChoice)
        
    // }

    // Loop for roundCount passed in
    
    // Whens roundsArr is set, map through each to play each round
    // roundsArr.map((round, index) => {
    //     let currentRound = index + 1
    //     let complete = false

    //     if (userChoice) {
    //         userChoicesContainer.classList.remove('active')
    //         console.log("Hi")
    //     }
    //     // wait for user selection
    //     return 
    // })

    // When roundsArr is set with rounds, call function to initialize game prompts
    // let roundResults = roundsArr.map((round, index) => {
    //     let currentRound = index + 1
    //     return startRound(round, currentRound, round.isTie)
    // })

    // winner = checkWinner(roundResults)

    // Alert window of winner
    // window.alert(winner)

    // Play again?
    // let playAgain = window.prompt('Play again? yes or no', 'no')

    if (playAgain === 'no') {
        gameOver = true
        return
    } else {
        game()
    }

}

function setUserChoice(choice) {
    userChoice = choice
    return
}

// Query the absolute.parent and the init container
const overlayParent = document.querySelector('.overlay')
const initContainer = document.querySelector('.init')

// Query the absolute.half containers
// --- these containers open up (top goes up, bottom goes down)
//     once the 'Start Game' button is clicked
const absoluteTopHalf = document.querySelector('.absolute.half.top')
const absoluteBottomHalf = document.querySelector('.absolute.half.bottom')

// Query the start button container
// --- this is the blue/purple container with the
//     radio inputs and 'Start Game' button
const startBtnCont = document.querySelector('.start-btn.container')

// Query the section that contains the 'Best out of...' prompt, and the
// --- radio buttons
const promptOne = document.querySelector('.round-count-input-box')

// Query all radio inputs
// --- then loop over each radioInput
//     + when a input is selected, the startButton styles to 'activate'
//       button are applie
const radioInputs = document.querySelectorAll(`input[type='radio']`)
radioInputs.forEach(radio => {
    radio.addEventListener('click', function(e) {
        startButton.classList.add('active')
        startButton.disabled = false
        startButton.style.cursor = 'pointer'
        roundCount = e.target.value
    })
})

// Query the user choices container
const userChoicesContainer = document.querySelector('.user-choices.container')

// Query all buttons for user choice
const buttons = document.querySelectorAll('.btn.user-choice')

// Function for getting user choice
// --- loops through user-choice DOM elements, then returns a promise
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        getUserSelection(button.value)
    })
})

async function getUserSelection(selection) {
    return await selection
}

// START BUTTON ELEMENT
const startButton = document.getElementById('start')

// ** LISTEN: click to start game
startButton.addEventListener('click', () => {
    // Add classes to animate/hide...
    // --- promptOne: contains the 'Best out of...' prompt
    promptOne.classList.add('hide')
    // --- absolute...Half containers to animate
    absoluteTopHalf.classList.add('closeUp')
    absoluteBottomHalf.classList.add('closeDown')
    // --- startButton
    startButton.classList.add('hide')
    // --- initContainer
    initContainer.classList.add('hide')

    // Set timeout to unappend initContainer from DOM
    setTimeout(() => {
        overlayParent.remove()
    }, 700);
    game(roundCount)
})