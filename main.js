const isPc = (function () {
  var userAgentInfo = navigator.userAgent
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ]
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
})()
const w = document.getElementById('wrapper')
w.style.display = isPc ? 'flex' : ''
const fullStyle = [
  `/*
* Hi,落落学姐！
* 送一个爱心给你~
*/
/* 首先给所有元素加上过渡效果 */
* {
-webkit-transition: all .5s;
transition: all .5s;
}
/* 白色背景太单调了。来点背景 */
body, html {
color: #fff;
background-color: darkslategray;
}
/* 文字太近了 */
.styleEditor {
overflow: auto;
${isPc
    ? `width: 48vw;
height: 96vh;`
    : `width: 96vw;
height: 48vh;`
  }
border: 1px solid;
font-size: 14px;
line-height: 1.5;
padding: 10px;
}
/* 这些代码颜色都一样。加点儿高亮区别来 */
.token.selector{ color: rgb(133,153,0) }
.token.property{ color: rgb(187,137,0) }
.token.punctuation{ color: yellow }
.token.function{ color: rgb(42,161,152) }
.token.comment{ color: rgb(177,177,177) }
/* 加个 3D 效果 */
html{
perspective: 1000px;
-webkit-perspective: 1000px;
}
.styleEditor {
${isPc
    ? `transform: rotateY(10deg) translateZ(-100px) ;
-webkit-transform: rotateY(10deg) translateZ(-100px);`
    : `transform: rotateX(-10deg) translateZ(-100px);
-webkit-transform: rotateX(-10deg) translateZ(-100px);`
  } ${isPc
    ? ''
    : `
transform-origin: 50% 0% 0;
-webkit-transform-origin: 50% 0% 0;`
  }
}
/*
* 宝贝，今天教你写代码。
* 用代码画一个爱心。
*/
/* 首先，来一个画板 */
.heartWrapper {
${isPc
    ? `width: 48vw;
height: 96vh;`
    : `width: 96vw;
height: 48vh;`
  }
position: relative;
border: 1px solid;
background-color: white;
${isPc
    ? `transform: rotateY(-10deg) translateZ(-100px);
-webkit-transform: rotateY(-10deg) translateZ(-100px);`
    : `transform: rotateX(10deg) translateZ(-100px);
-webkit-transform: rotateX(10deg) translateZ(-100px);`
  }${isPc
    ? ''
    : `
transform-origin: 50% 0% 0;
-webkit-transform-origin: 50% 0% 0;`
  }
}
/* 画一个方块，当左心室和右心室 */
.heart {
width: 100px;
height: 100px;
position: absolute;
top: 50%;
left: 50%;
margin: -50px 0 0 -50px;
border-radius: 20px;
background: #E88D8D;
transform: rotate(45deg);
}
/* 画上左心房 */
.heart::before {
content: '';
background: #E88D8D;
border-radius: 50%;
width: 100px;
height: 100px;
position: absolute;
left: -38px;
top: 1px;
}
/* 再画上右心房 */
.heart::after {
content: '';
background: #E88D8D;
border-radius: 50%;
width: 100px;
height: 100px;
position: absolute;
right: -1px;
top: -38px;
}
/* 太单调了，让心跳动起来 */
@keyframes throb {
0% {
transform: scale(1) rotate(45deg);
opacity: 1;
}
100% {
transform: scale(1.65) rotate(45deg);
opacity: 0
}
}
.bounce {
opacity: 0.2;
animation: throb 1s infinite linear;
}
/*
* Ok，完成！
* 宝贝，七夕快乐！
*/
`
]

let n = 0

let timeId = null

function rain() {
  $(document).snowfall('clear')
  if (timeId) {
    clearTimeout(timeId)
  }
  $(document).snowfall({ flakeCount: 100, maxSpeed: 10 });
  timeId = setTimeout(() => {
    $(document).snowfall('clear')
  }, 5000)
}

function start(code) {
  let container = document.querySelector('#code')
  let styleTag = document.querySelector('#style')
  const styleEditor = document.querySelector('.styleEditor')

  setTimeout(function run() {
    n += 1
    container.innerHTML = Prism.highlight(
      code.substring(0, n),
      Prism.languages.css,
      'css'
    )
    styleTag.innerHTML = code.substring(0, n)

    styleEditor.scrollTop = container.scrollHeight
    if (n < code.length) {
      id = setTimeout(run, 5)
    } else {
      rain()
      $('.heart').on('click', () => {
        rain()
      })
    }
  }, 5)
}

start(fullStyle[0])
