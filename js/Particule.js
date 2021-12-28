class Particule{

    #plusorless=0
   
    #xOrigin=0
    #yOrigin=0
    #density=0
    constructor(x,y,w,h,options){
       
        this.options=Object.assign({},options)
        this.pixels=[]
        this.x=x,
        this.y=y,
        this.w=w,
        this.h=h
        this.#plusorless=(Math.round(Math.random())) < 0.85 ? 1 : -1
        this.#xOrigin=this.x
        this.#yOrigin=this.y
        this.#density= (Math.random() *30)+1
    }
    
   retrieveImageParticule(imageData,o){
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
                       let op=Object.assign({},{
                           r:red,
                           g: green,
                           b: blue,
                           a:alpha,
                        },o)
                      
                       this.pixels[pixelIndex]=new Particule((x*10),(y*10),800,800,op)
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
            directionX= fx * force * this.#density;
            directionY=fy *force *this.#density 
           if(distNorme < mouse.radius){
               this.x-=directionX; 
               this.y-=directionY ;
           }else{
               if(this.x !==this.#xOrigin){
                  let dx=this.x-this.#xOrigin;
                  this.x -=dx/2
               }
               if(this.y!==this.#yOrigin){
                   let dy=this.y-this.#yOrigin
                   this.y -=dy/2
               }
               
           }
           
        }else{
            this.x-=(((0.5*Math.random())+5) *this.#plusorless)/9
            this.y-=(((0.5*Math.random())+2) *this.#plusorless) /9
            
        }
        this.#collisionDetectForBTLR();
        
}
    
    linkParticule(p){
        
        if(p!=null){
            this.#makeLinkage(p)

        }else{
            this.#makeLinkage(this.pixels)
        }
        
        return this
    }
    #makeLinkage(a){
        
        for(let i=0; i<a.length;i++){
            for(let j=0; j<a.length;j++){
                let dx=a[i].x-a[j].x
                let dy=a[i].y-a[j].y
                let dist=Math.sqrt(dx*dx+dy*dy)
                if(dist < a[0].options.maxDistLinkage){
                    ctx.strokeStyle=a[0].options.strokeColor
                    ctx.lineWidth=a[0].options.strokeLineWidth
                    ctx.beginPath();
                    ctx.moveTo(a[i].x,a[i].y)
                    ctx.lineTo(a[j].x,a[j].y)
                    ctx.stroke();
                }
            }
        }
    }

    #collisionDetectForBTLR(){
       
        //( (this.x >= 0) && (this.x <= this.width) ) && 
        
        if( (this.x >=0 && this.x <= this.w) && (this.y<=0) ){
             this.y+=this.y/2
             this.#plusorless=-1
        }
        if( (this.y>=0 && this.y<= this.h) && this.x<=0){
            this.x-=this.x*Math.random()/2
            this.#plusorless=-1
        }
        if((this.y>=0 && this.y<= this.h) && this.x >= this.w){
            this.x-=(Math.random()*6)/2
            this.#plusorless=1
        }
        if(((this.x >=0 && this.x <= this.w)) && this.y>=(this.h)){
            this.y-=(Math.random()*6)/2
            this.#plusorless=1
        }
        
    }
    
    
    imageToParticule(){
        ctx.fillStyle= this.options.particuleColor
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.options.size,0,Math.PI*2)
        ctx.closePath();
        ctx.fill();
        return this
    }

    
    
}



