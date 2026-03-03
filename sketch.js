let skala;
let streg;
let zigzag;
let ringAfstand;

function setup() {
  let container = document.getElementById("labelCanvas");
  let canvas = createCanvas(405, 708);
  canvas.parent("labelCanvas");
  // Tekst til skala-slideren
  let skalaLabel = createP("Noise skala — lav: blød form / høj: kaotisk form");
  skalaLabel.class("sliderLabel");
  skalaLabel.parent("p5Input");

  skala = createSlider(0.05, 5.0, 1.5, 0.001);
  skala.parent("p5Input");

  // Tekst til streg-slideren
  let stregLabel = createP("Stregtykkelse");
  stregLabel.class("sliderLabel");
  stregLabel.parent("p5Input");

  streg = createSlider(0.5, 10.0, 1.0, 0.1);
  streg.parent("p5Input");

  // Tekst til zigzag-slideren
  let zigzagLabel = createP("Zig-zag — lav: blød / høj: kantet");
  zigzagLabel.class("sliderLabel");
  zigzagLabel.parent("p5Input");

  zigzag = createSlider(1, 30, 15, 1);
  zigzag.parent("p5Input");

  // Tekst til ringAfstand-slideren
  let ringAfstandLabel = createP(
    "Ring afstand — lav: tætte ringe / høj: få ringe",
  );
  ringAfstandLabel.class("sliderLabel");
  ringAfstandLabel.parent("p5Input");

  ringAfstand = createSlider(1, 30, 5, 1);
  ringAfstand.parent("p5Input");
}

function draw() {
  blendMode(BLEND);
  background(250, 243, 237);
  noFill();
  let fra = color(200, 240, 0);
  let til = color(200, 0, 120);
  strokeWeight(streg.value());
  blendMode(MULTIPLY);
  let peakHeight = 100;
  for (
    let y = height + peakHeight;
    y > -peakHeight;
    y = y - ringAfstand.value()
  ) {
    let amt = map(y, -peakHeight, height + peakHeight, 0.0, 1.0);
    let stregfarve = lerpColor(til, fra, amt);
    stroke(stregfarve);
    beginShape();
    for (let x = 0; x < width; x = x + zigzag.value()) {
      let offsetX = 100;
      let offsetY = 100;
      let bredde = 220;
      let hoejde = 100;
      let vinkel = map(x, 0, width, 0, TWO_PI);
      let tid = y * 0.0025;
      let offset = map(
        noise(
          cos(vinkel) * skala.value() + offsetX,
          sin(vinkel) * skala.value() + offsetY,
          tid,
        ),
        0,
        1,
        -peakHeight,
        peakHeight,
      );
      vertex(
        width / 2 + cos(vinkel) * (bredde + offset),
        y + sin(vinkel) * (hoejde + offset),
      );
    }
    endShape(CLOSE);
  }
}
