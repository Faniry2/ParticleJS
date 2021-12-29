const mouse={
    x:0,
    y:0,
    radius:150
}
let options={
    strokeColor: 'white',
    strokeLineWidth: 1,
    size:3,
    particuleColor:'blac',
    maxDistLinkage:35
}

let isMouseMouve= false
const canvas= document.getElementById("fan_canvas")
let ctx=canvas.getContext('2d')
    canvas.width=800
    canvas.height=800
let timeout
window.addEventListener(("mousemove"), (event)=>{
    isMouseMouve=true
    mouse.x=event.clientX;
    mouse.y=event.clientY
});


let link=false

let choose=document.getElementById("text_particle");

choose.onclick=(event)=>{
    link=event.target.checked
}

/*animation for text */

function anim2(p){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i=0 ; i< p.pixels.length;i++){
         p.pixels[i].imageToParticule()
         .update()
       
    }
   if(link){
    p.linkParticule(null)
   }
  
   requestAnimationFrame(()=>{anim2(p)})
}


ctx.fillStyle="black"
ctx.font= '20px Verdana'
ctx.fillText("FANIRY",0,40)
let imageData=ctx.getImageData(0,0,1000,1000);
let p= new Particule();
p.retrieveImageParticule(imageData,options)
anim2(p)

        
 




   




