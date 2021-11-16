class NormalParticle{//JS doesn't yet have interfaces to implement the methods
  constructor(){
    this.x = width/2;
    this.y = height/2;
    this.c = color(random(150, 200), random(150, 200), random(150, 200));
    this.angle = random(0, 360);
    this.speed = 5;
  }
  move(){//takes in the speed
    this.x += Math.cos(this.angle)*this.speed;
    this.y += Math.sin(this.angle)*this.speed;
    if((this.x>width||this.x<0) && (this.y>height||this.y<0)){
      this.x = width/2;
      this.y = height/2;
      this.angle = random(0, 360);
    }
  }
  show(){
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }
}
