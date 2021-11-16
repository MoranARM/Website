class Population{
  constructor(width=windowWidth, height=windowHeight){
    this.people = [];
    this.fitSum;
    this.gen = 1;
    this.bestIndex = 0;
    this.minStep = 1000;
    this.goal = createVector(width/2, height/4);
    this.goalReached = false;
    this.width = width;
    this.height = height;
  }
  
  makePeople(sz){
    for(let i=0; i<sz; i++){
      this.people.push(new Bacteria(this.width/2, this.height-10, this.width, this.height));//two parameters are the starting pos for each bacteria
    }
  }
  
  show(){
    for(let i=0; i<this.people.length; i++){
      this.people[i].show();
    }
    this.people[0].show();//shows the first one last to draw the best from last gen on top
  }
  
  update(){
    //console.log(this.people.length);
    for(let i=0; i<this.people.length; i++){
      if(this.people[i].pos.x<0 || this.people[i].pos.y<0 || this.people[i].pos.x>this.width){
        this.people[i].dead = true;//kills if they are outside of the boarders
      }
      if(this.people[i].brain.step > this.minStep){//if the bacteria has taken more steps than the best
        this.people[i].dead = true;//kill it
      }else{
        this.people[i].update();
      }
    }
  }
  
  allDead(){
    for(let i=0; i<this.people.length; i++){
      if(!this.people[i].dead && !this.people[i].atGoal){
        return false;
      }if(this.people[i].atGoal){
        this.goalReached = true;
      }
    }return true;
  }
  
  calcFitness(){
    for(let i=0; i<this.people.length; i++){
      this.people[i].calcFitness();
    }
  }
  
  naturalSelection(){//gets the next gen of bacteria
    this.nextGen = [];
    this.setBest();
    this.calcFitnessSum();
    //console.log('Fitness Sum: ', this.fitSum);
    //console.log('firstFitness: ', this.people[0].fitness);
    this.nextGen[0] = this.people[this.bestIndex==null? this.people[0] : this.bestIndex].makeNextGen();
    this.nextGen[0].best = true;
    for(let i=1; i<this.people.length; i++){
      this.nextGen[i] = this.selectParent().makeNextGen();
    }this.people = this.nextGen;
    //console.log('nextGen People: '+this.nextGen+'/n/n people: '+this.people);
    this.gen++;
  }
  
  mutateOffspring(){
    for(let i=1; i<this.people.length; i++){
      //console.log(this.people[i].dir);
      this.people[i].brain.mutate();
    }
  }
  
  calcFitnessSum(){
    this.fitSum=0;
    for(let i=0; i<this.people.length; i++){
      this.fitSum+=this.people[i].fitness;
    }
  }
  
  selectParent(){//dots with a higher fitness have a higher chance of being chosen
    this.r = random(this.fitSum);
    this.runningSum = 0;
    for(let i=0; i<this.people.length; i++){
      this.runningSum+=this.people[i].fitness;
      if(this.runningSum > this.r){
        return this.people[i];
      }
    }return null;//will cause an error as it should never reach this
  }
  
  setBest(prevBest){
    this.max = 0;
    //console.log(this.people);
    //console.log(this.allDead());
    this.maxIndex = 0;
    //this.people[this.bestIndex] = this.people[this.bestIndex]==null ? new Bacteria(windowWidth/2, windowHeight-10) : this.people[this.bestIndex];
    for(let i=0; i<this.people.length; i++){
      if(this.people[i].fitness > this.max){
        this.max = this.people[i].fitness;
        this.maxIndex = i;
      }
    }this.bestIndex = this.maxIndex;
    //console.log(this.people[this.bestIndex==null? 0 : this.bestIndex].atGoal==true);
    if(this.people[this.bestIndex==null? 0 : this.bestIndex].atGoal==true){
      this.minStep = this.people[this.bestIndex].brain.step;
      //console.log('Step: ', this.minStep);
    }
  }
  
}
