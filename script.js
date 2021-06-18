const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 0
let score = 0
let misses = 0

startBtn.addEventListener('click', e => {
  e.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.dataset.time)
    startGame()
  }
})

board.addEventListener('click', e => {
  if (e.target.classList.contains('circle')) {
    score++
    e.target.remove()
    createRandomCircle()
  } else if (!e.target.classList.contains('circle') && time > 1) {
    board.classList.add('missed')
    misses++
    setTimeout(() => {
      board.classList.remove('missed')
    }, 500)
  }
})

function startGame() {
  screens[1].classList.add('up')
  const interval = setInterval(decreaseTime, 1000)
  setTimeout(() => {
    clearInterval(interval)
  }, time * 1000)
  createRandomCircle()
  setTime(`00:${time}`)
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `
    <div>
      <h1>Ваш счет: <span class="primary">${score}</span><br>промахов: ${misses}</h1>
      <button class="time-btn" id="restart">Играть снова</button>
    </div>
  `
  const restartBtn = document.querySelector('#restart')
  restartBtn.addEventListener('click', restartGame)
}

function restartGame() {
  screens[1].classList.remove('up')
  time = 0
  score = 0
  misses = 0
  board.innerHTML = ''
  setTimeout(() => {
    timeEl.parentNode.classList.remove('hide')
  }, 500)
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const { width, height} = board.getBoundingClientRect()
  const size = getRandomNumber(10, 65)
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  setRandomColor(circle)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  board.append(circle)
}

function decreaseTime() {
  if (time === 1) {
    finishGame()
  } else {
    let current  = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(`00:${current}`)
  }
}

function setRandomColor(element) {
  const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']
  const index = getRandomNumber(0, colors.length - 1)
  element.style.background = colors[index]
  element.style.boxShadow = `0 0 10px ${colors[index]}`
}

function setTime(value) {
  timeEl.innerHTML = value
}

function getRandomNumber(min, max) {
  return Math.round((Math.random() * (max - min) + min))
}
