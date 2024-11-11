const canvas =document.querySelector('canvas')

const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio
let canvasWidth
let canvasHeight
let particles 

function init(){
    
    canvasWidth = innerWidth
    canvasHeight = innerHeight
    canvas.style.width = canvasWidth + 'px'
    canvas.style.height = canvasHeight + 'px'

    canvas.width = canvasWidth * dpr
    canvas.height = canvasHeight * dpr
    ctx.scale(dpr,dpr)
    particles = []
    const TOTAL = canvasWidth / 30

    for(let i = 0; i < TOTAL; i++){
    const x = randomNumBetween(0, canvasWidth)
    const y = randomNumBetween(0, canvasHeight)
    const radius = randomNumBetween(50,100)
    const vy = randomNumBetween(1,5)
    const particle = new Particle(x,y, radius, vy)
    particles.push(particle)
}
}

/* dat.gui 테스트 svg 필터 셋팅 */
const controls = new function() {
    this.blurValue = 40
    this.alphaChannel = 100
    this.alphaOffset = -23
    this.acc = 1.03
}

const feGaussianBlur = document.querySelector('feGaussianBlur');
const feColorMatrix = document.querySelector('feColorMatrix')

let gui = new dat.GUI()

const f1 = gui.addFolder('Gooey Effect')
f1.open()

f1.add(controls, 'blurValue', 0, 100).onChange(value =>{
    feGaussianBlur.setAttribute('stDeviation', value)
});

f1.add(controls,'alphaChannel',1,200).onChange(value =>{
    feColorMatrix.setAttribute('values',`1 0 0 0 0   0 1 0 0 0   0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`)
})
f1.add(controls,'alphaOffset',-40,40).onChange(value =>{
    feColorMatrix.setAttribute('values',`1 0 0 0 0   0 1 0 0 0   0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`)
})
const f2 = gui.addFolder('particle Property')
f2.open()
f2.add(controls,'acc',1, 1.5, 0.01).onChange(value =>{
    particles.forEach(particle => particle.acc = value)
})
// 각도 1도는 3.14를 180으로 나눈 값과 같다.


class Particle{
    constructor(x, y, radius, vy){
        this.x = x
        this.y = y
        this.radius = radius
        this.vy = vy
        this.acc = 1.03
        //acceleration  가속도
    }
    update(){
        this.vy *= this.acc
        this.y += this.vy 
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius,0,Math.PI / 180 * 360)
        ctx.fillStyle = 'orange'
         ctx.fill()
        ctx.closePath()
    }
}

const x = 100
const y = 100
const radius = 50
const particle = new Particle(x, y, radius)

const randomNumBetween = (min, max) =>{
    return Math.random() * (max - min + 1) + min
}



let interval = 1000 / 60
let now, delta
let then = Date.now()


function animate(){
    window.requestAnimationFrame(animate) // 프레임 재생
    now = Date.now()
    delta = now - then

    if(delta < interval) return


    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

   particles.forEach(particle =>{
    particle.update()
    particle.draw()

    if(particle.y - particle.radius > canvasHeight){
        particle.y = -particle.radius
        particle.x = randomNumBetween(0, canvasWidth)
        particle.radius = randomNumBetween(50,100)
        particle.vy = randomNumBetween(1,5)
    }
   })

    then = now - (delta % interval)
}
//주사율 , fpx , frame per second 1초에 리퀘스트 애니메이션 프레임을 몇번을 실행시킬까 ?

window.addEventListener('load',()=>{
    init()
    animate()
})
window.addEventListener('resize',()=>{
    init()
})
