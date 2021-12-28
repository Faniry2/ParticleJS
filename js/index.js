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
let timeout
window.addEventListener(("mousemove"), (event)=>{
    isMouseMouve=true
    mouse.x=event.clientX;
    mouse.y=event.clientY
});

let options={
    strokeColor: 'red',
    strokeLineWidth: 1,
    size:3,
    particuleColor:'black',
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


/*animation for text */
function anim2(p){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i=0 ; i< p.pixels.length;i++){
         p.pixels[i].imageToParticule()
         .update()
       
    }
   p.linkParticule(null)
   requestAnimationFrame(()=>{anim2(p)})
}
let isTextAnimation=false


if(isTextAnimation){
    ctx.fillStyle="black"
    ctx.font= '20px Verdana'
    ctx.fillText("FANIRY",0,40)
    let imageData=ctx.getImageData(0,0,1000,1000);
    let p= new Particule();
    p.retrieveImageParticule(imageData,options)
    anim2(p)
}else{
     init()
     anim()
 }
   




