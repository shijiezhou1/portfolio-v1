var y = 0;
var yy = 0;
var img;

function setup() {
  // put setup code here
  createCanvas(800, 800);
  img = loadImage("https://pbs.twimg.com/profile_images/502135348663578624/-oslcYof.png");
}

function draw() {

  image(img, 0, 0, width, height);
  width = width - 1;
  height = height - 1;
  if (width == 1 || height == 1) {
    width = 800;
    height = 800;
  }
  // var x = random(width);
  // // put drawing code here
  // background("darkblue");
  // ellipse(width / 2, y, 50, 50);
  // ellipse(x, yy, 50, 50);
  // y = y + 2;
  // yy = yy + 3;
  // if (y == height) {
  //   y = 0;
  // }

  // if (yy == height) {
  //   yy = 0;
  // }
}