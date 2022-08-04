function randomNumber(start, end) {
  return start + Math.random() * (end - start)
}

let start = [0, 0]
let end = [0, 0]
let endTime = 0

let heartRains = []

function initRain() {
  const { innerWidth, innerHeight } = window
  const startX = randomNumber(0, innerWidth)
  const startY = -30
  start = [startX, startY]
  const endX = randomNumber(0, innerWidth)
  const endY = innerHeight + 30
  end = [endX, endY]
  endTime = randomNumber(3, 3.5) * 1000
}

function createRain(delay) {
  initRain()
  const span = document.createElement('span')
  span.classList.add('rain')
  span.style.left = start[0]
  span.style.top = start[1]
  span.style.transition = `all ${endTime / 1000}s`
  span.style.transitionTimingFunction = 'linear'
  span.style.fontSize = '20px'
  span.innerHTML = '❤️'

  setTimeout(() => {
    span.style.left = `${end[0]}px`
    span.style.top = `${end[1]}px`

    setTimeout(() => {
      // span.style.display = 'none'
    }, endTime)
  }, delay)
  return span
}

function createHeartRain(rainNum) {
  const div = document.createElement('div')
  console.log('rainNum', rainNum)
  for (let i = 0; i < rainNum; i++) {
    const delay = randomNumber(i * 200, i * 200 + 1000)
    const rain = createRain(delay)
    div.appendChild(rain)
  }
  document.body.appendChild(div)
}

function removeRain() {
  heartRains = heartRains.filter(item => item.time !== time)
  rain()
}

function rain() {
  const rainNum = 30
  const stayTime = rainNum * 200 + 1000 + 4000
  const time = new Date().getTime()
  if (
    !heartRains.length ||
    time - heartRains[heartRains.length - 1].time > stayTime / 2
  ) {
    heartRains.push({ time, rainNum })
    createHeartRain(rainNum)
    setTimeout(() => {
      // removeRain(time)
    }, stayTime)
  }
}

// heartRains.map(item => <HeartRain num={item.rainNum} key={item.time}/>)
rain()

console.log('sss', heartRains)
