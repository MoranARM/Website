//Organize all vars at the top an make sure there are no name duplicates

//Chemotaxis project 01
var bacteria;
var mode;//stores if random, chasing mouse or running away

//Starfield project 02
var particles;//holds all of the stars
var starCount = 1000;//how many stars there are

//Booleans for controlling project shown and set up
var projectRunning = 0;//0 is menu, other numbers should be placed in a comment next to the name of the project above
var projectSetup = [];
var canvas;
var projectList = ['Choose a Project','Chemotaxis', 'Starfield'];//load project names into here
var sel;//used to say which project is selected

function setup() {
  let canvasMain = createCanvas(800, 800);
  canvasMain.parent('sketch-div');
  background(0);
  textAlign(CENTER);
  background(200);
  sel = createSelect();
  //sel.position(650, 650);
  sel.position(windowWidth/3, windowHeight*2/3);
  for(let i=0; i<projectList.length; i++){
    sel.option(projectList[i]);
  }sel.changed(changeProject);
  //setupChemotaxis();
  //setupStarfield();
}

function draw() {
  switch(projectRunning){
    case 0:
    menu();
    break;
    case 1:
    drawChemotaxis();
    break;
    case 2:
    drawStarfield();
    break;
  }
}

function menu(){//displays the available projects to choose from
  background(0);
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text("Choose which project to display", width/2, height/3);
  //buttons to select project
}

function changeProject() {
  let changeTo = projectList.indexOf(sel.value());
  //perform project setup if not already done
  if(!projectSetup.includes(changeTo)){
    switch(changeTo){
      case 1: // Chemotaxis
        setupChemotaxis();
        break;
      case 2: //Starfield
        setupStarfield();
        break;
    }
  }
  projectRunning = changeTo;
  updateSelPos();
}

function mousePressed(){
  if(projectRunning == 1){
    mode = mode==2?0:mode+1;//increments mode
  }
}

//Chemotaxis functions 1
function drawChemotaxis(){
  background(0);
  for(let b of bacteria){
    b.move();
    b.show();
  }fill(255);
  textSize(40);
  textAlign(LEFT);
  text((mode==0?"Random":mode==1?"Chase":"Run")+"!", 20, 50);
  if(frameCount<300){
    text("Click to change how they move!", 60, height*2/3);
  }
}

function setupChemotaxis(){
  mode = 0;//random
  bacteria = [];
  for(let i=0; i<500; i++){//in js you don't need to instantiate a length for an array
    bacteria[i] = new Bacteria(width/2, height/2, (Math.random()*150)+100);//First two are starting x and y, third input is the color
  }projectSetup.push(1);//adds to the list of setup projects
}

//Starfield functions 2
function setupStarfield(){
  resizeCanvas(1000, 1000);//(windowWidth, windowHeight) can be used to make it appear "fullscreen"
  particles = [];
  for(let i=0; i<starCount; i++){//creates starCount nuber of NormalParticle
    particles.push(new NormalParticle());
  }for(let i=0; i<starCount/16; i++){//creates starCount/16 number of JumboParticle
    particles.push(new JumboParticle());
  }for(let i=0; i<starCount/4; i++){//creates starCount/16 number of OddballParticle
    particles.push(new OddballParticle());
  }projectSetup.push(2);//adds to the list of setup projects
}

function drawStarfield(){
  background(0);
  displayStars();
}

function displayStars(){
  for(let particle of particles){
    particle.move();
    particle.show();
  }
}

function updateSelPos(){
  if(projectRunning!=0){
    sel.position(windowWidth/16, windowHeight*2/3);
  }else{
    sel.position(windowWidth/3, windowHeight*2/3);
  }
}