class Particule{
    constructor(x,y,r,g,b,a){
        this.pixels=[]
        this.size=3
        this.x=x
        this.y=y
        this.xOrigin=this.x
        this.yOrigin=this.y
        this.r=r
        this.g=g
        this.b=b
        this.a=a
        this.density= (Math.random() *30)+1
        
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
        let dx= mouse.x-this.x
        let dy=mouse.y-this.y
        let distNorme=Math.sqrt(dx*dx+dy*dy)
        let fx=dx/distNorme
        let fy=dy/distNorme
        let force=(mouse.radius-distNorme) /mouse.radius
        let directionX= fx * force * this.density;
        let directionY=fy *force *this.density 
        if(distNorme < mouse.radius){
            this.x-=directionX; 
            this.y-=directionY ;
        }else{
            if(this.x !==this.xOrigin){
               let dx=this.x-this.xOrigin;
               this.x -=dx/20
            }
            if(this.y!==this.yOrigin){
                let dy=this.y-this.yOrigin
                this.y -=dy/20
            }
            
        }
    }
    
    linkParticule(strokeColor, lw,){
        for(let i=0; i<this.pixels.length;i++){
            for(let j=0; j<this.pixels.length;j++){
                let dx=this.pixels[i].x-this.pixels[j].x
                let dy=this.pixels[i].y-this.pixels[j].y
                let dist=Math.sqrt(dx*dx+dy*dy)
                if(dist < 50){
                    ctx.strokeStyle=strokeColor
                    ctx.lineWidth=lw
                    ctx.beginPath();
                    ctx.moveTo(this.pixels[i].x,this.pixels[i].y)
                    ctx.lineTo(this.pixels[j].x,this.pixels[j].y)
                    ctx.stroke();
                }
            }
        }
        return this
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

