ParticleJS
================================
particlesJS will help you make particle systems more easily or help you better understand how particles work for javascript

## Demo links  
https://codepen.io/faniry2/pen/PoJEzJM  
https://codepen.io/faniry2/pen/PoJQNOQ

## How to use it
Add canvas html balise with id ="fan_canvas" and after add Particle.js in your html document
 ```html
        <canvas id="fan_canvas"></canvas>
        <script src="Particule.js"></script>
  ```
After create a javascript file with an arbitrary name like for example index.js and add it in your html file  
Your html file should look like this
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>my porfolio</title>
    
</head>
<body>
    
    <canvas id="fan_canvas"></canvas>
    <script src="Particule_min.js"></script>
    <script src="index.js"></script>
</body>
</html>
```  
In your javascript index.js file copy the following code 
```javascript
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

//create particle
function init(){
  
    ps=[]
    for(let i=0; i<500;i++){
        let x=Math.random()*canvas.width
        let y=Math.random()*canvas.height
        ps.push(new Particule(x,y,canvas.width,canvas.height,options))
    }
  
}

/*particles animation */
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
```  
## Options
option | type | Description
-------|------|------------
strokeColor|string| Color of the lines that bind the particles together
strokeLineWidth| int| Size of the lines that bind the particles together
size|int| Particle Size
particuleColor|string| Particle color
maxDistLinkage|int | If the distance between two particles is less than maxDistLinkage then they will be linked together

