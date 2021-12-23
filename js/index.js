
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


function init(){
  
    ps=[]
    for(let i=0; i<200;i++){
        let x=Math.random()*canvas.width
        let y=Math.random()*canvas.height
        ps.push(new Particule(x,y))
    }
   console.log(ps)
}

function anim(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let p of ps){
         p.imageToParticule()
         .update()
    }
   new Particule().linkParticule("red",1,ps)
    requestAnimationFrame(anim)
}
function anim2(p){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    for(let i=0 ; i< p.pixels.length;i++){
         p.pixels[i].imageToParticule()
           .update()
    }
    p.linkParticule("red",.5,null)
    requestAnimationFrame(()=>{anim2(p)})
}

    let b=true
    if(b){
        ctx.fillStyle="black"
        ctx.font= '20px Verdana'
        ctx.fillText("FANIRY",0,50)
        let imageData=ctx.getImageData(0,0,1000,1000);
        let p= new Particule();
        p.retrieveImageParticule(imageData)
       
        anim2(p)
    }else{
         init()
        anim()
    }
   




