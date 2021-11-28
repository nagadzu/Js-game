let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $resultHeader = document.querySelector('#result-header')
let $timeHeader = document.querySelector('#time-header')
let $gameTime = document.querySelector('#game-time')
let $result = document.querySelector('#result')
let isGameStarted = false
let score = 0
$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)


function startGame() {
    score = 0
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    $start.classList.add('hide')
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
    $gameTime.setAttribute('disabled','true')
    setGameTime()
    timer()
    renderBox()
}

function endGame() {
    isGameStarted = false
    $start.classList.remove('hide')
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    $timeHeader.classList.add('hide')
    $resultHeader.classList.remove('hide')
    $result.textContent = '' + score
    
}

function timer() {
    let interval = setInterval(function () {
        let sec = parseFloat($time.textContent)
        if (sec <= 0.1) {
            clearInterval(interval)
            endGame()
        }
        $time.textContent = (sec - 0.1).toFixed(1)
    }, 100)
}


function handleBoxClick(event) {
    if (event.target.dataset.box) {
        score += 1
        renderBox()
    }
}


function renderBox() {
    if (isGameStarted) {
        $game.innerHTML = ''
        let boxSize = getRandom(40,100)
        let box = document.createElement('div')
        let gameSize = 300
        let left = getRandom(0, gameSize - boxSize)
        let top = getRandom(0, gameSize - boxSize)
        box.style.width = box.style.height = boxSize + 'px'
        box.style.backgroundColor = `rgb(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,255)})`
        box.style.position = 'absolute'
        box.style.top = top + 'px'
        box.style.left = left + 'px'
        box.style.cursor = 'pointer'
        box.setAttribute('data-box', 'true')

        $game.insertAdjacentElement('afterbegin', box)
    }
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

$gameTime.addEventListener('input', setGameTime)


function setGameTime() {
    $time.textContent = parseFloat($gameTime.value).toFixed(1)
}