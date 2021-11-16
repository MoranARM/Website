class OddballParticle{//JS doesn't yet have interfaces to implement the methods
  constructor(){
    this.x = width/2;
    this.y = height/2;
    this.c = color(random(220, 250), random(50, 250), random(50, 80));
    this.angle = random(0, 360);
    this.speed = 2;
  }
  move(){//takes in the speed
    this.x += Math.cos(this.angle)*this.speed*2;
    this.y += Math.sin(this.angle)*this.speed*3;
    if((this.x>width||this.x<0)){
      this.x = width/2;
    }if((this.y>height||this.y<0)){
      this.y = height/2;
    }
  }
  show(){
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, 20, 20);
  }
}
