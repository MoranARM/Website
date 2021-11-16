//Banner Sketch
var banner = function( p ) { // p represents the p5 library
  var dots;
  let debugMode = false;

  //Called once
  p.setup = function(){
    p.createCanvas(p.windowWidth, p.windowHeight/7);
    dots = [];
    //populate dots array relative to the size of the display
    for(let i=0; i<p.sqrt(p.windowWidth); i++){
      dots.push(new Dot(p.random(p.windowWidth), p.random(p.windowHeight/7)));
    }
    p.background(0);
  };
  
  //Called continuously
  p.draw = function(){
    p.background(0);
    p.fill(255);
    dots.forEach(function displayDot(dot){
      dot.update();
      dot.show();
    });
    showLines();
    showText();
  };

  //Automatically resize the canvas when the window is resized
  p.windowResized = function(){
    p.resizeCanvas(p.windowWidth, p.windowHeight/7);
    //Add more dots as needed
    while(dots.length < p.sqrt(p.windowWidth -1)){
      dots.push(new Dot(p.random(p.windowWidth), p.random(p.windowHeight/7)));
    }
    //remove dots as needed
    while(dots.length > p.sqrt(p.windowWidth + 1)){
      dots.pop();
    }
  }

  //The Dot class is used for displaying dots in the sketch
  class Dot{
    /**
     * Creates the Dot
     * @param {int} x 
     * @param {int} y 
     */
    constructor(x, y){
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(p.random(-0.5,0.5), p.random(-0.5,0.5));
      this.size = 5;
    }

    /**
     * Returns whther or not the x, y position is within the bounds of the border
     * true if within the borders with a leeway of 2 times the size
     * @param {int} x the x position to check
     * @param {int} y the y position to check
     * @param {int} size the size used for leeway (use zero for no leeway)
     * @returns whether or not the x and y pos is within the border
     */
    inBounds(x, y, size){
      return x<p.windowWidth+size*2 && x>-size*2 && y<(p.windowWidth/7)+size*2 && y>-size*2;
    }

    /**
     * Resets the position, velocity and acceleration of the dot
     */
    reset(){
      this.pos = p.createVector(p.random(p.windowWidth), p.random(p.windowHeight/7));
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(p.random(-0.5,0.5), p.random(-0.5,0.5));
    }

    /**
     * calls move and checks for collision with walls
     */
    update(){
      if(this.inBounds(this.pos.x, this.pos.y, this.size)){
        this.move();
      }else{// generate a new position
        this.reset();
      }
    }

    /**
     * Draw the Dot
     */
    show(){
      p.noStroke();
      //fill(p.random(255), 50);
      p.fill(255);
      p.ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    /**
     * Move the Dot based on its velocity and Acceleration
     */
    move(){
      //adds the acceleration to the velociy and velocity to the position
      this.vel.add(this.acc);
      this.vel.limit(1);//doesn't allow the dot to move too quickly
      this.pos.add(this.vel);
    }

    /**
     * Calculates and returns the distance between two dots
     * @param {Dot} other - Another dot
     */
    distance(other){
      return p.dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    }

    /**
     * Draws a line between this dot and the other
     * @param {Dot} other 
     */
    drawLine(other){
      p.line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    }
  }

  /**
   * Displays lines between each dot with varying weight
   * depending on how far away the dots are from each other
   * Iteration is done in O(nlogn) time
   */
  function showLines(){
    //Iterate through each dot and compare to other dots
    for(let index = 0; index<dots.length; index++){
      for(let i=index+1; i<dots.length; i++){
        //Use the distance between the two dots being compared
        let distance = dots[index].distance(dots[i]);
        if(distance<p.windowHeight/7){
          //Map the stroke transparency and weight based on the distance
          //p.stroke(255, p.map(distance, p.windowWidth^2, 0, 0, 255));
          //p.strokeWeight(p.map(distance, p.windowWidth^2, 0, 0, 0.5));
          p.stroke(255, p.map(distance, p.windowHeight^2, -p.windowHeight/4, 0, 255));
          p.strokeWeight(p.map(distance, p.windowHeight/4, 0, 0, 0.7));
          dots[index].drawLine(dots[i]);
        }
      }
    }
  }

  /**
   * Displays text on the sketch
   */
  function showText(){
    p.stroke(10);
    if(debugMode){
      p.textSize(p.windowHeight/49);
      p.fill(255);
      p.text('Dots: '+dots.length, p.windowHeight/12, p.windowHeight/14);
    }
    let helpfulText = 'Alex Remington Moran\'s Coding Journey!';
    let xLoc = p.windowWidth/2;
    let xWidth = p.windowWidth;
    p.rectMode(p.CENTER);
    //Display helpful info above each tab if a user if hovering over it
    if(p.mouseY < p.windowHeight/5){
      let tabs = 4;
      p.textSize(p.windowHeight/28);
      p.textAlign(p.CENTER);
      xWidth = p.windowWidth/tabs;
      switch(true){
        case (p.mouseX<p.windowWidth/tabs):
          helpfulText = 'What I do';
          xLoc = p.windowWidth/(2*tabs);
          break;
        case (p.mouseX>=p.windowWidth/tabs && p.mouseX<p.windowWidth*(2/tabs)):
          helpfulText = 'My experience programming';
          xLoc = p.windowWidth*3/(2*tabs);
          break;
        case (p.mouseX>=p.windowWidth*(2/tabs) && p.mouseX<p.windowWidth*3/tabs):
          helpfulText = 'Who I am';
          xLoc = p.windowWidth*5/(2*tabs);
          break;
        case (p.mouseX>=p.windowWidth*3/tabs):
          p.textWrap(p.WORD);
          helpfulText = 'Why I made this site';
          xLoc = p.windowWidth*7/(2*tabs);
          break;
      }
    }else{
      p.textSize(p.windowHeight/20);
      p.textAlign(p.CENTER);
    }
    //First one is used to create shadow effect for readability
    p.fill(150);
    p.text(helpfulText, xLoc+2, p.windowHeight/12+2, xWidth, p.windowHeight/12);
    p.fill(255);
    p.text(helpfulText, xLoc, p.windowHeight/12, xWidth, p.windowHeight/12);
  }
};

var bannerp5 = new p5(banner, 'banner-container');