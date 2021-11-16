class Bacteria{
  constructor(x1, y1, c1){
    this.x = x1;
    this.y = y1;
    this.c = c1;//c is for the color of the bacteria
  }
  move(){
    this.x+=(Math.random()<0.6?Math.random()<0.5?Math.random():Math.random()*-1:0)*5;//change the number here to adjust the size of each step taken
    this.y+=(Math.random()<0.6?Math.random()<0.5?Math.random():Math.random()*-1:0)*5;
    //See longer code Move1 below that could replace the two lines above
    
    switch(mode){//code without a switch shown below
      case 0://slightly moves away the bacteria from the mouse in random mode
        this.x+=mouseY<this.y+15&&mouseY>this.y-15?mouseX<this.x+15&&mouseX>this.x?-20:mouseX>this.x-15&&mouseX<this.x?20:0:0;
        this.y+=mouseX<this.x+15&&mouseX>this.x-15?mouseY<this.y+15&&mouseY>this.y?-20:mouseY>this.y-15&&mouseY<this.y?20:0:0;
        break;
      case 1://chase the mouse
        this.x+=mouseX<this.x+5?-5:mouseX>this.x-5?5:0;
        this.y+=mouseY<this.y+5?-5:mouseY>this.y-5?5:0;
        break;
      case 2://Run from the mouse if it is too close
        this.x+=mouseX>this.x+5?-5:mouseX<this.x-5?5:0;
        this.y+=mouseY>this.y+5?-5:mouseY<this.y-5?5:0;
        break;
    }
    //keeps the bacteria to not run off forever
    this.x=this.x>width?width+5:this.x<0?-5:this.x;
    this.y=this.y>height?height+5:this.y<0?-5:this.y;
  }//Move4 could replace the two lines above
  
  show(){
    fill(this.c);
    ellipse(this.x, this.y, 10, 10);
  }
}

/*If not using a switch can also be done with if statements
  if(mode==0){//slightly moves away the bacteria from the mouse in random mode
    this.x+=mouseY<this.y+15&&mouseY>this.y-15?mouseX<this.x+15&&mouseX>this.x?-20:mouseX>this.x-15&&mouseX<this.x?20:0:0;
    this.y+=mouseX<X+15&&mouseX>this.x-15?mouseY<this.y+15&&mouseY>this.y?-20:mouseY>this.y-15&&mouseY<this.y?20:0:0;
  }//move2 could replace the two lines above
  
  if(mode==1){//chase the mouse
    this.x+=mouseX<this.x+5?-5:mouseX>this.x-5?5:0;
    this.y+=mouseY<this.y+5?-5:mouseY>this.y-5?5:0;
  }//Move3 could replace the two lines above
  
  if(mode==2){//Run from the mouse if it is too close
    this.x+=mouseX>this.x+5?-5:mouseX<this.x-5?5:0;
    this.y+=mouseY>this.y+5?-5:mouseY<this.y-5?5:0;
  }

  These examples below are for those who don't yet understand ternary operators (the short lines above)
  Move1: this is another way to write the same thing, it is longer but easier to read
  if(Math.random()<0.6){//checks if there will be a movement in that direction
    if(Math.random()<0.6){//then checks if it will be positive or negative
      this.x+=Math.random()*5;
    }else{
      this.x+=Math.random()*-5;
    }
  }if(Math.random()<0.6){//if y will change
    if(Math.random()<0.6){//positive
      this.y+=Math.random()*5;
    }else{//negative
      this.y+=Math.random()*-5;
    }
  }
  
  Move2: slightly moves away the bacteria from the mouse in random mode
  if(mouseY<this.y+15&&mouseY>this.y-15){
        if(mouseX<this.x+15&&mouseX>this.x){
          this.x-=20;
        }if(mouseX>this.x-15&&mouseX<this.x){
          this.x+=20;
        }
      }if(mouseX<this.x+15&&mouseX>this.x-15){
        if(mouseY<this.y+15&&mouseY>this.y){
          this.y-=20;
        }if(mouseY>this.y-15&&mouseY<this.y){
          this.y+=20;
        }
      }
  
  Move3: for chasing the mouse
  if(mouseX<this.x+5){
    this.x-=5;
  }if(mouseX>this.x-5){
    this.x+=5;
  }
  if(mouseY<this.y+5){
    this.y-=5;
  }if(mouseY>this.y-5){
    this.y+=5;
  }
  
  Move4: for not going over 5 past the boarder
  if(this.x>width){
    this.x=width+5;
  }if(this.x<0){
    this.x=-5;
  }if(this.y>height){
    this.y=height+5;
  }if(this.y<0){
    this.y=-5;
  }
  */
