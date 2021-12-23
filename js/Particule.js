class Particule{
    constructor(x,y,r,g,b,a){
        this.pixels=[]
        this.size=3
        this.x=x
        this.y=y
        this.plusorless=(Math.round(Math.random())) < 0.85 ? 1 : -1
        this.xOrigin=this.x
        this.yOrigin=this.y
        this.r=r
        this.g=g
        this.b=b
        this.a=a
        this.lifeTime=0;
        this.density= (Math.random() *30)+1
        this.angle=0
        
    }
    
   retrieveImageParticule(imageData){
        let pixelIndex=0;
        for(let y=0; y <imageData.height; y++){
            for(let x=0; x<imageData.width; x++){
                   let posX= x*4;
                   let posY=y*4
                   let pos=(posY*imageData.width)+posX
                   
                   if(imageData.data[pos+3] > 128){
                       let red=imageData.data[pos] 
                       let green=imageData.data[pos+ 1]
                       let blue=imageData.data[pos+ 2]  
                       let alpha=imageData.data[pos+3]
                       this.pixels[pixelIndex]=new Particule((x*10),(y*10),red,green,blue,alpha)
                       pixelIndex++;
                   }
            }
        }
    }
   
    update(){
        let dx= 0
        let dy=0
        let distNorme=0
        let fx=0
        let fy=0
        let force=0
        let directionX=0
        let directionY=0

        if(isMouseMouve){
            dx= mouse.x-this.x
            dy=mouse.y-this.y
            distNorme=Math.sqrt(dx*dx+dy*dy)
            fx=dx/distNorme
            fy=dy/distNorme
            force=(mouse.radius-distNorme) /mouse.radius
            directionX= fx * force * this.density;
            directionY=fy *force *this.density 
           if(distNorme < mouse.radius){
               this.x-=directionX; 
               this.y-=directionY ;
           }else{
               if(this.x !==this.xOrigin){
                  let dx=this.x-this.xOrigin;
                  this.x -=dx/2
               }
               if(this.y!==this.yOrigin){
                   let dy=this.y-this.yOrigin
                   this.y -=dy/2
               }
               
           }
        }
       
        
        this.x-=(((0.5*Math.random())+5) *this.plusorless)/25
        this.y-=(((0.5*Math.random())+2) *this.plusorless) /25
        /*this.targetY=this.y+10
        this.targetX=this.X+10*/
}
    
    linkParticule(strokeColor, lw,p){
        
        if(p!=null){
            this.#makeLinkage(strokeColor,lw,p)

        }else{
            this.#makeLinkage(strokeColor,lw,this.pixels)
        }
        
        return this
    }
    #makeLinkage(strokeColor,lw,a){
        
        for(let i=0; i<a.length;i++){
            for(let j=0; j<a.length;j++){
                let dx=a[i].x-a[j].x
                let dy=a[i].y-a[j].y
                let dist=Math.sqrt(dx*dx+dy*dy)
                if(dist < 50){
                    ctx.strokeStyle=strokeColor
                    ctx.lineWidth=lw
                    ctx.beginPath();
                    ctx.moveTo(a[i].x,a[i].y)
                    ctx.lineTo(a[j].x,a[j].y)
                    ctx.stroke();
                }
            }
        }
    }

    imageToParticule(){
        ctx.fillStyle= "black"//`rgb(${this.r},${this.g},${this.b})`;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
        ctx.closePath();
        ctx.fill();
        return this
    }

    
    
}

