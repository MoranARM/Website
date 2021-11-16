class JumboParticle extends NormalParticle{//NormalParticle.js must be loaded in index.html before JumboParticle to avoid reference error
  constructor(){
    super();
    this.c = color(random(50, 200), random(50, 200), random(50, 200));//stores the color of the JumboParticle
  }
  move(){
    super.move();
  }
  show(){
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, 40, 40);
  }
}
