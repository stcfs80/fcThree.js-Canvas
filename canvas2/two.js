
import CanvasOption from "./canvasOption"
//canvasOption이라는 파일에서 CanvasOption이라는 클래스를 가져옵니다. 

class Canvas extends CanvasOption{
//Canvas라는 새로운 클래스를 정의합니다. 이 클래스는 CanvasOption 클래스를 "상속"합니다. 즉, CanvasOption 클래스의 모든 속성과 메서드를 물려받습니다. 
//Canvas 클래스는 CanvasOption의 기능을 확장하거나 변경하여 사용할 수 있습니다.
    constructor(){
        super()
    }
//Canvas 클래스의 생성자입니다. 생성자는 클래스의 인스턴스가 만들어질 때 실행되는 특별한 메서드입니다. 
//super()는 부모 클래스(CanvasOption)의 생성자를 호출합니다. 즉, CanvasOption 클래스의 생성자에서 하는 초기화 작업을 그대로 수행합니다.
    init(){
        this.canvasWidth = innerWidth
        this.canvasHeight = innerHeight
        ctx.scale(this.dpr,this.dpr)

        this.style.width = this.Width + 'px'
        this.style.height = thisHeight + 'px'
    }
    render(){
        let now, delta
        let then = Date.now()

        const frame = () =>{
            requestAnimationFrame(frame)
            now = Date.now()
            delta = now - then
            if(delta < this.interval) return
            this.ctx.fillRect(100, 100, 200, 200)
            then = now - (delta % this.interval)
        }
        requestAnimationFrame(frame)
    }
}

const canvas = new Canvas()



window.addEventListener('load',() =>{
    canvas.init()
    canvas.render()
});

window.addEventListener('resize',() =>{
    canvas.init()

});