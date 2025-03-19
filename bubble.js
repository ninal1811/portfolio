let bubbles = [];
let poppedCount = 0;
let song, alphabet, e;
let songShown = false, alphabetShown = false, ellipseShown = false;
let links = [];

class Bubble {
  constructor() {
    this.x = random(100, width - 100);
    this.y = random(100, height - 100);
    this.size = random(20, 200);
    this.color = color(75, 125, random(175, 255));
  }
  
  render() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
  
  isClicked(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    return d < this.size / 2;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  generateBubbles();
  
  links = [
    { link: "song.html", text: "song" },
    { link: "alphabet.html", text: "alphabet" },
    { link: "index.html", text: "ellipse" }
  ];
}

function draw() {
  background(255);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].render();  
  }

  if (bubbles.length === 0) {
    generateBubbles();
    songShown = false;
    alphabetShown = false;
    ellipseShown = false;
  }

  if (poppedCount >= 7 && !songShown) {
    displayRandomLink();
    songShown = true;
  }

  if (poppedCount >= 5 && !alphabetShown) {
    displayRandomLink();
    alphabetShown = true;
  }

  if (poppedCount >= 3 && !ellipseShown) {
    displayRandomLink();
    ellipseShown = true;
  }
}

function displayRandomLink() {
  if (songShown) song.remove();
  if (alphabetShown) alphabet.remove();
  if (ellipseShown) e.remove();

  let randomLink = random(links);

  let newLink = createA(randomLink.link, randomLink.text);
  newLink.style("font-size", "25px");
  newLink.style("color", "black");
  newLink.style("text-align", "center");
  newLink.position(random(350, width - 350), random(300, height - 300));

  if (randomLink.link === "song.html") {
    song = newLink;
  } else if (randomLink.link === "alphabet.html") {
    alphabet = newLink;
  } else if (randomLink.link === "index.html") {
    e = newLink;
  }
}

function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].isClicked(mouseX, mouseY)) {
      bubbles.splice(i, 1);
      poppedCount++;
    }
  }
}

function generateBubbles() {
  for (let i = 0; i < 10; i++) {
    bubbles.push(new Bubble());
  }
}
