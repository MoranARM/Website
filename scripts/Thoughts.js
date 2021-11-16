class Thoughts{
  constructor(sz){
    this.dir = [];
    this.step = 0;
    this.size = sz;
  }
  
  setDirections(){//sets all vectors in directions
    for(let i=0; i<this.size; i++){
      this.dir.push(p5.Vector.fromAngle(random(2*PI)));
    }//console.log(this.dir);
  }
  
  clone(){//returns a copy of this Brain object
    this.cl = new Thoughts(this.step);
    //console.log(this.cl);
    //this.cl.setDirections();
    for(let i=0; i<this.dir.length; i++){
      this.cl.dir.push(this.dir[i].copy());
    }
    return this.cl;
  }
  
  mutate(){//mutates the brain's directions. mutation rate has been set to 0.01
    for(let i=0; i<this.dir.length; i++){//for each direction, if random number is within mutation rate, mutate
      this.dir[i] = (random(1)<0.01) ? p5.Vector.fromAngle(random(2*PI)) : this.dir[i];
    }
  }
}
