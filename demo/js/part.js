const mouse={
    x:0,
    y:0,
    radius:150
}

let isMouseMouve= false
const canvas= document.getElementById("fan_canvas")

let ctx=canvas.getContext('2d')
    canvas.width=800
    canvas.height=800


window.addEventListener(("mousemove"), (event)=>{
    isMouseMouve=true
    mouse.x=event.clientX;
    mouse.y=event.clientY
});

let options={
    strokeColor: 'white',
    strokeLineWidth: 1,
    size:3,
    particuleColor:'white',
    maxDistLinkage:50
}

function init(){
  
    ps=[]
    for(let i=0; i<500;i++){
        let x=Math.random()*canvas.width
        let y=Math.random()*canvas.height
        ps.push(new Particule(x,y,canvas.width,canvas.height,options))
    }
  
}




/*animation nuage de particules */
function anim(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let p of ps){
         p.imageToParticule()
         .update()
        
    }
  
      new Particule().linkParticule(ps)
   
    requestAnimationFrame(anim)
}

init()
anim()