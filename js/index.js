
const mouse={
    x:0,
    y:0,
    radius:150
}
const canvas= document.getElementById("fan_canvas")
let ctx=canvas.getContext('2d')
    canvas.width=800
    canvas.height=800
window.addEventListener(("mousemove"), (event)=>{
    mouse.x=event.clientX;
    mouse.y=event.clientY
});


function init(){
  
    ps=[]
    for(let i=0; i<1000;i++){
        let x=Math.random()*canvas.width;
        let y=Math.random()*canvas.height
        ps.push(new Particule(x,y))
    }

}

function anim(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let p of ps){
         p.imageToParticule()
         
         .update()
    }
    requestAnimationFrame(anim)
}
function anim2(p){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    for(let i=0 ; i< p.pixels.length;i++){
         p.pixels[i].imageToParticule()
           .update()
    }
    p.linkParticule("red",1)
    requestAnimationFrame(()=>{anim2(p)})
}

    ctx.fillStyle="black"
    ctx.font= '20px Verdana'
    ctx.fillText("FANIRY",0,50)
    let imageData=ctx.getImageData(0,0,1000,1000);
    let p= new Particule();
    p.retrieveImageParticule(imageData)
   
    anim2(p)




