// COLOR PALETTES
const statusColors = {
    success: 'rgba(66,157,1,1)',
    warning: 'rgba(250,210,2,1)',
    error  : 'rgba(234,22,1,1)'
}

// RPS
const choicesArr = ['rock', 'paper', 'scissors']
const iconsArr = [
    `<i class="fa-solid fa-hand-back-fist" value="rock"></i>`,
    `<i class="fa-solid fa-hand" value="paper"></i>`,
    `<i class="fa-solid fa-hand-peace" value="scissors"></i>`
]
const heartIcon = `<i class="fa-solid fa-heart"></i>`

// DEFAULT VALUES
let roundCount
// let userChoice = false
let computerChoice

function computerPlay() {
    let num = Math.floor(Math.random() * 3)
    
    return choicesArr[num]
}

function shoot(userChoice, computerChoice) {
    
    if (userChoice === computerChoice) {
        return 'tie'
    } else if (userChoice === 'rock') {
        if (computerChoice === 'paper') {
            return 'computer'
        } else if (computerChoice === 'scissors') {
            return 'user'
        }
    } else if (userChoice === 'paper') {
        if (computerChoice === 'rock') {
            return 'user'
        } else if (computerChoice === 'scissors') {
            return 'computer'
        }
    } else if (userChoice === 'scissors') {
        if (computerChoice === 'paper') {
            return 'user'
        } else if (computerChoice === 'rock') {
            return 'computer'
        }
    }
}

function checkWinner(arr) {
    let computerScore = 0
    let userScore = 0

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'computer') {
            computerScore++
        } else (
            userScore++
        )
    }

    if (computerScore > userScore) {
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

// Swap out the hand icons based on selection
// --- happens after animation completes
function appendHandChoices(user, computer) {
    let userIconIndex = user === 'rock' ? iconsArr[0] : user === 'paper' ? iconsArr[1] : iconsArr[2]
    let computerIconIndex = computer === 'rock' ? iconsArr[0] : computer === 'paper' ? iconsArr[1] : iconsArr[2]
    userHandContainer.innerHTML = userIconIndex
    computerHandContainer.innerHTML = computerIconIndex
}

// Set default classes
function setDefault() {
    // toggle active class to play shake animate on hand containers,
    // --- as well as the user choices section and
    userArea.classList.remove('win', 'loss')
    computerArea.classList.remove('win', 'loss')
    userHandContainer.classList.add('active')
    computerHandContainer.classList.add('active')
    userHandContainer.innerHTML = iconsArr[0]
    computerHandContainer.innerHTML = iconsArr[0]
}

// Create divs
function createIconDiv(count) {
    let livesParent = document.createElement("div")
    livesParent.classList.add("lives", "wrapper", "flex")
    let arr = []

    for (let i = 0; i < count; i++) {
        let icon = document.createElement('i')
        icon.classList.add("fa-solid", "fa-heart")
        arr.push(icon)
    }

    let nodes = arr.map(i => {
        return i
    })

    livesParent.append(...nodes)
    return livesParent
}

function game(roundCount) {
    // Variables
    let answerClicked = false
    let winners = []
    let userLives = []
    let computerLives = []

    // create lives containers
    let theUsersLives = document.createElement("div")
    let theComputersLives = document.createElement("div")
    theUsersLives.classList.add('lives', 'container', 'flex')
    theComputersLives.classList.add('lives', 'container', 'flex')

    let userLivesParent = createIconDiv(roundCount)
    let computerLivesParent = createIconDiv(roundCount)

    // mount livesParent containers to DOM
    userLivesContainer.appendChild(userLivesParent)
    computerLivesContainer.appendChild(computerLivesParent)

    // let parentDiv = createIconDiv(roundCount)
    // computerLivesContainer.appendChild(parentDiv)

    // userArea.appendChild(theUsersLives)
    
    function onClick(e) {
        // --- sets the user choice and computer choice
        //      !!! needs to fix propagation of child elements
        answerClicked = true
        let user = e.target.value
        let computer = computerPlay()

        // --- check that all the rounds have been played
        //     if yes, remove eventListener
        if (roundCount === 0) {
            test.removeEventListener('click', onClick)
            return
        } else {
            // Function to set classes to default
            setDefault()

            setTimeout(function() {
                result = shoot(user, computer)
    
                // call function to change icons, and background
                // --- colors of player areas if result is NOT a 'tie'
                appendHandChoices(user, computer)
                userChoicesContainer.classList.add('active')
                userHandContainer.classList.remove('active')
                computerHandContainer.classList.remove('active')
                if (result !== 'tie') {
                    let currentRound = parseInt(roundCountText.innerHTML)
                    console.log(currentRound)
                    // --- set round number from roundCount
                    roundCountText.innerHTML = currentRound + 1
                    
                    userArea.classList.add(`${result === 'user' ? 'win' : 'loss'}`)
                    computerArea.classList.add(`${result === 'computer' ? 'win' : 'loss'}`)
                    console.log(roundCount)
    
                    // push winner to the winners array
                    winners.push(result)
                }
            }, 1500)
        }
    }

    let test = document.getElementById('userChoiceButtons')

    if (roundCount > 0) {
        test.addEventListener('click', onClick, true)
    } else {
        test.removeEventListener
    }
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

const rockButton = document.getElementById('rock')
const paperButton = document.getElementById('paper')
const scissorsButton = document.getElementById('scissors')

// Query shoot button
const shootButton = document.querySelector('.btn.shoot')

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
        game(roundCount)
    }, 700);
})

// Query for player areas (full sections with half width)
const userArea = document.getElementById('userArea')
const computerArea = document.getElementById('computerArea')

// Query for hand-containers
const userHandContainer = document.getElementById('userHand')
const computerHandContainer = document.getElementById('computerHand')

// Query for round count h4
const roundCountText = document.getElementById('currentRound')

// Query for lives containers
const userLivesContainer = document.getElementById('userLives')
const computerLivesContainer = document.getElementById('computerLives')