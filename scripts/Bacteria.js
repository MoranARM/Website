class Bacteria{
    constructor(x, y, width=windowWidth, height=windowHeight){
        this.pos = createVector(x, y);
        this.vel = new createVector(0, 0);
        this.acc = new createVector(0, 0);
        this.goal = createVector(width/2, height/4);
        this.brain;//new brain with 1,000 fairly random instructions
        this.dead = false;
        this.best = false;
        this.atGoal = false;
        this.fitness = 0;
        this.wallsHit = 0;
        this.width = width;
        this.height = height;
    }
    
    update(){//calls move and checks for collision with walls
      if(!this.dead && !this.atGoal){
        this.move();
        this.wallsHit = (this.pos.x<0 || this.pos.y<0 || this.pos.x>this.width || this.pos.y>this.height) ? this.wallsHit++ : this.wallsHit;//checks collision with boarder
        //this.atGoal = (this.pos.dist(this.goal)<5);
      }this.atGoal = (this.pos.dist(this.goal)<5);
      //this.pos.x = this.pos.x+this.vel.x>windowWidth ? windowWidth : this.pos.x+this.vel.x;
      //this.pos.y = this.pos.y+this.vel.y>windowHeight ? windowHeight : this.pos.y+this.vel.y;
    }
    
    show(){
      if(this.best){//draws the best from previous generation bigger with a bright color
        fill(0, 255, 0);
        ellipse(this.pos.x, this.pos.y, 10, 10);
      }else{
        fill(255, 255, 0);
        ellipse(this.pos.x, this.pos.y, 5, 5);
      }
    }
    
    move(){//moves the dot by listening to the brain
      if(this.brain.dir.length > this.brain.step){//sets the direction as the acceleration if there are direction left
        this.acc = this.brain.dir[this.brain.step];
        this.brain.step++;
      }else{//kill the dot once it is done with directions
        if(this.brain.dir.length>0){
          this.dead = true;
        }
      }//adds the acceleration to the velociy and velocity to the position
      this.vel.add(this.acc);
      this.vel.limit(5);//doesn't allow it to move too quickly in a step
      this.pos.add(this.vel);
    }
    
    calcFitness(){
      this.fitness = this.atGoal ? 1.0/16.0 + 10000.0/(float)(this.brain.step * this.brain.step + this.wallsHit) : 1.0/(this.pos.dist(this.goal));
    }
    
    makeNextGen(){//returns a bacteria offspring
      this.cl = new Bacteria(this.width/2, this.height-10, this.width, this.height);
      this.cl.brain = this.brain.clone();
      return this.cl;
    }
    
}
