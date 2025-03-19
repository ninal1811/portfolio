let alphabet = "abcdefghijklmnopqrstuvwxyz";
let x = [], y = [], tsize = [], tspeed = [], colors = [], angles = [];
let radius = 100;
let strength = 7;

let song, e, bubble, songY, ellipseY, bubbleY;
let songX, songWidth, ellipseX, ellipseWidth, bubbleX, bubbleWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  
  for (let i = 0; i < alphabet.length; i++) {
    x[i] = random(width);
    y[i] = random(-500, 0);
    tsize[i] = random(25, 75);
    tspeed[i] = random(3, 7);
    colors[i] = color(230 + random(-100, 100), 230 + random(-100, 100), 230 + random(-100, 100));
    angles[i] = random(0, TWO_PI);
  }
  
  song = createA("song.html", "song");
  song.position(random(100, width-100), random(-500, 0));
  song.style("font-size", "25px");
  song.style("color", "white");
  song.style("text-align", "center");
  songX = song.position().x;
  songWidth = song.size().width;
  songY = song.position().y;
  
  e = createA("index.html", "ellipse");
  e.position(random(100, width-100), random(-500, 0));
  e.style("font-size", "25px");
  e.style("color", "white");
  e.style("text-align", "center");
  ellipseX = e.position().x;
  ellipseWidth = e.size().width;
  ellipseY = e.position().y;

  bubble = createA("bubble.html", "bubble");
  bubble.position(random(100, width-100), random(-500, 0));
  bubble.style("font-size", "25px");
  bubble.style("color", "white");
  bubble.style("text-align", "center");
  bubbleX = bubble.position().x;
  bubbleWidth = bubble.size().width;
  bubbleY = bubble.position().y;
}

function draw() {
  background(0);

  push();
  noFill();
  stroke(0);
  ellipse(mouseX, mouseY, radius * 2);
  pop();

  for (let i = 0; i < alphabet.length; i++) {
    let dx = x[i] - mouseX;
    let dy = y[i] - mouseY;
    let distance = sqrt(dx * dx + dy * dy);
    
    if (distance < radius && distance > 0) {
      let force = (radius - distance) / radius;
      let angle = atan2(dy, dx);
      x[i] += cos(angle) * strength * force;
      y[i] += sin(angle) * strength * force;
    }

    push();
    translate(x[i], y[i]);
    rotate(angles[i]);
    textSize(tsize[i]);
    fill(colors[i]);
    text(alphabet[i], 0, 0);
    pop();

    y[i] += tspeed[i];
    angles[i] += 0.02;

    if (y[i] > height + tsize[i] / 2) {
      y[i] = random(-100, 0);
      x[i] = random(width);
      tsize[i] = random(20, 50);
      tspeed[i] = random(2, 5);
      colors[i] = color(230 + random(-100, 100), 230 + random(-100, 100), 230 + random(-100, 100));
      angles[i] = random(0, TWO_PI);
    }
  }
  
  songY += 3;
  song.position(song.position().x, songY);
  
  if (songY > height) {
    songY = random(-500, 0);
    song.position(random(100, width-100), songY);
  }
  
  ellipseY += 3;
  e.position(e.position().x, ellipseY);
  
  if (ellipseY > height) {
    ellipseY = random(-500, 0);
    e.position(random(100, width-100), ellipseY);
  }

  bubbleY += 3;
  bubble.position(bubble.position().x, bubbleY);
  
  if (bubbleY > height) {
    bubbleY = random(-500, 0);
    bubble.position(random(100, width-100), bubbleY);
  }
}

function mousePressed() {
  if (mouseX > songX && mouseX < songX + songWidth && mouseY > songY && mouseY < songY + 25) {
    window.location.href = "song.html";
  }
  
  if (mouseX > ellipseX && mouseX < ellipseX + ellipseWidth && mouseY > ellipseY && mouseY < ellipseY + 25) {
    window.location.href = "index.html";
  }

  if (mouseX > bubbleX && mouseX < bubbleX + bubbleWidth && mouseY > bubbleY && mouseY < bubbleY + 25) {
    window.location.href = "bubble.html";
  }
}
