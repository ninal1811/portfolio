let songs = [];
let particles = [];
let amp;
let currSong = null;
let alphabet, e, bubble, alphabetTime, ellipseTime, bubbleTime;
let alphabetVisible = false, ellipseVisible = false, bubbleVisible = false;

function preload() {
  songs[0] = loadSound("songs/121.mp3");
  songs[1] = loadSound("songs/81.mp3");
  songs[2] = loadSound("songs/93.mp3");
  songs[3] = loadSound("songs/154.mp3");
  songs[4] = loadSound("songs/125.mp3");
}

class Particle {
  constructor(x, y, v1, v2, level) {
    this.position = createVector(x, y);
    this.velocity = createVector(v1, v2);
    this.size = map(level, 0, 1, 5, 30);
    this.life = 255;
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
  }

  update() {
    this.position.add(this.velocity);
    this.life -= 5;
  }

  render() {
    noStroke();
    fill(this.color, this.color, this.color, this.life);
    ellipse(this.position.x, this.position.y, this.size);
  }

  isDead() {
    return this.life <= 0;
  }
}

function triggerParticles(level) {
  let pNum = floor(map(level, 0, 1, 5, 20));
  for (var i = 0; i < pNum; i++) {
    let angle = map(i, 0, pNum, 0, TWO_PI);
    let speed = map(level, 0, 1, 2, 10);
    let v1 = cos(angle) * speed;
    let v2 = sin(angle) * speed;
    particles.push(new Particle(mouseX, mouseY, v1, v2, level));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  amp = new p5.Amplitude();

  alphabetTime = random(3000, 7000);
  ellipseTime = random(3000, 7000);
  bubbleTime = random(3000, 7000);
}

function draw() {
  background(0, 50);
  let level = amp.getLevel();

  if (level > 0.1) {
    triggerParticles(level);
  }

  for (var i = particles.length-1; i >= 0; i--) {
    particles[i].update();
    particles[i].render();

    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

  if (millis() > alphabetTime) {
    alphabetVisible = !alphabetVisible;
    alphabetTime = millis() + random(3000, 7000);
  }

  if (alphabetVisible && !alphabet) {
    alphabet = createA("alphabet.html", "alphabet");
    alphabet.style("font-size", "25px");
    alphabet.style("color", "white");
    alphabet.style("text-align", "center");
    alphabet.position(random(350, width - 350), random(300, height - 300));
  } else if (!alphabetVisible && alphabet) {
    alphabet.remove();
    alphabet = null;
  }

  if (millis() > ellipseTime) {
    ellipseVisible = !ellipseVisible;
    ellipseTime = millis() + random(3000, 7000);
  }

  if (ellipseVisible && !e) {
    e = createA("index.html", "ellipse");
    e.style("font-size", "25px");
    e.style("color", "white");
    e.style("text-align", "center");
    e.position(random(350, width - 350), random(300, height - 300));
  } else if (!ellipseVisible && e) {
    e.remove();
    e = null;
  }

  if (millis() > bubbleTime) {
    bubbleVisible = !bubbleVisible;
    bubbleTime = millis() + random(3000, 7000);
  }

  if (bubbleVisible && !bubble) {
    bubble = createA("bubble.html", "bubble");
    bubble.style("font-size", "25px");
    bubble.style("color", "white");
    bubble.style("text-align", "center");
    bubble.position(random(350, width - 350), random(300, height - 300));
  } else if (!bubbleVisible && bubble) {
    bubble.remove();
    bubble = null;
  }
}

function mousePressed() {
  do {
    song = floor(random(0, 5));
  } while (currSong === songs[song]);

  if (currSong) {
    currSong.stop();
  }

  currSong = songs[song];
  currSong.loop();
  amp.setInput(currSong);
}
