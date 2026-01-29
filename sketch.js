//roughly converted from my allolib project

// IMAGES FROM THE SPHERE HERE ----->>>> 
// https://drive.google.com/file/d/1OJqO5nI-KPeKguC93LXGrdsRrH8cxuqk/view?usp=sharing

//README:
// TOGGLE 1-9 SHADERS. pics of more shaders in pdf
// VIEW RESULTS IN THE SPHERE HERE: 

// for slider 1 - 3 :
//TOP SLIDER = FAKE CENTROID - influences speed
//PRESS SPACE = FAKE ONSET





let slider;
let onset= 0.1;
let currentShader;


 


function preload() {
  shader1 = loadShader("main.vert", "fractal1.frag");
  shader2 = loadShader("main.vert", "fractal2.frag");
  shader3 = loadShader("main.vert", "fractal3.frag");
  shader4 = loadShader("main.vert", "OrganicNoise.frag");
  shader5 = loadShader("main.vert", "fractalNoise.frag");
  shader6 = loadShader("main.vert", "fractalNoise2.frag");
  shader7 = loadShader("main.vert", "psych1.frag");
  shader8 = loadShader("main.vert", "psych2.frag");
  shader9 = loadShader("main.vert", "sunExplode.frag");
}


function setup() {
  createCanvas(100, 100, WEBGL);
  noStroke();
  
   slider = createSlider(100.0, 4000.0, 1.0);
  slider.position(10, 10);
  slider.size(80)
  currentShader = shader1;
}

function draw() {
   
  if (keyIsDown(49 ) == true) {
    currentShader = shader1;
  } //asci 49 is = #1 i think
  if (keyIsDown(50 ) == true) {
    currentShader = shader2;
  }
  if (keyIsDown(51 ) == true) {
    currentShader = shader3;
  }
  if (keyIsDown(52 ) == true) {
    currentShader = shader4;
  }
  if (keyIsDown(53) == true) {
    currentShader = shader5;
  }
  
  if (keyIsDown(54) == true) {
    currentShader = shader6;
  }
  if (keyIsDown(55) == true) {
    currentShader = shader7;
  }
  if (keyIsDown(56) == true) {
    currentShader = shader8;
  }
  if (keyIsDown(57) == true) {
    currentShader = shader9;
  }
  //if (keyIsDown(58) == true) {
  //   currentShader = shader10;
  // }
  
  shader(currentShader);
  
  if (keyIsDown(32 ) == true) {
    onset +=0.1;
  }

  currentShader.setUniform("u_time", millis() / 1000.0);
  currentShader.setUniform("onset", onset);
  currentShader.setUniform("cent", slider.value()); 
  currentShader.setUniform("flux", 0.5); 

  //rect(-width / 2, -height / 2, width, height);
quad(-1, 1, 1, 1, 1, -1, -1, -1);

}

function keyPressed() {
  fullscreen(true);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
