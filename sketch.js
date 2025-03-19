var x = 0 , y = 0, canvas, alphabet, song, bubble; 

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
  canvas.style("z-index","-1");
  background(0);
  strokeWeight(0.7);

  alphabet = createA("alphabet.html", "alphabet");
  alphabet.style("font-size", "25px");
  alphabet.style("color", "black");
  alphabet.style("text-align", "center");
  alphabet.position(random(350, width-350), random(300, height-300));

  song = createA("song.html", "song");
  song.style("font-size", "25px");
  song.style("color", "black");
  song.style("text-align", "center");
  song.position(random(350, width-350), random(300, height-300));

  bubble = createA("bubble.html", "bubble");
  bubble.style("font-size", "25px");
  bubble.style("color", "black");
  bubble.style("text-align", "center");
  bubble.position(random(350, width-350), random(300, height-300));
}

function draw() {
  push();
  noStroke();
  ellipse(random(20, width-20), random(20, height-20), 5);
  pop();

  push();
  fill(0, 0);
  stroke(230 + random(-100, 100), 230 + random(-100, 100), 230 + random(-100, 100));
  ellipse(width/2, height/2, random((width+300)/2), random((height+300)/2));
  filter(BLUR, 0.001);
  pop();
}

function mousePressed() {
  background(0);
}