let skala;
let streg;
let zigzag;
let ringAfstand;

// ─── Multi-stop lerpColor ─────────────────────────────────────────────────────
function multiLerp(farver, amt) {
  if (!farver || farver.length < 2) return color(200, 240, 0);
  const seg = farver.length - 1;
  const skaleret = amt * seg;
  let idx = floor(skaleret);
  const lokal = skaleret - idx;
  idx = constrain(idx, 0, seg - 1);
  return lerpColor(farver[idx], farver[idx + 1], lokal);
}

function setup() {
  let canvas = createCanvas(405, 708);
  canvas.parent("labelCanvas");

  let skalaLabel = createP("Noise skala — lav: blød form / høj: kaotisk form");
  skalaLabel.class("sliderLabel");
  skalaLabel.parent("p5Input");
  skala = createSlider(0.05, 5.0, 1.5, 0.001);
  skala.parent("p5Input");

  let stregLabel = createP("Stregtykkelse");
  stregLabel.class("sliderLabel");
  stregLabel.parent("p5Input");
  streg = createSlider(0.5, 10.0, 1.0, 0.1);
  streg.parent("p5Input");

  let zigzagLabel = createP("Zig-zag — lav: blød / høj: kantet");
  zigzagLabel.class("sliderLabel");
  zigzagLabel.parent("p5Input");
  zigzag = createSlider(1, 30, 15, 1);
  zigzag.parent("p5Input");

  let ringAfstandLabel = createP("Ring afstand — lav: tætte ringe / høj: få ringe");
  ringAfstandLabel.class("sliderLabel");
  ringAfstandLabel.parent("p5Input");
  ringAfstand = createSlider(1, 30, 5, 1);
  ringAfstand.parent("p5Input");
}

function draw() {
  // Byg palette fra window.aktivPalette (hex-strenge) eller brug standard
  let palette;
  if (window.aktivPalette && window.aktivPalette.length >= 2) {
    palette = window.aktivPalette.map((hex) => color(hex));
  } else {
    palette = [color(200, 240, 0), color(200, 0, 120)];
  }

  blendMode(BLEND);
  background(250, 243, 237);
  noFill();
  strokeWeight(streg.value());
  blendMode(MULTIPLY);

  let peakHeight = 100;
  for (let y = height + peakHeight; y > -peakHeight; y -= ringAfstand.value()) {
    let amt = map(y, -peakHeight, height + peakHeight, 0.0, 1.0);
    stroke(multiLerp(palette, amt));

    beginShape();
    for (let x = 0; x < width; x += zigzag.value()) {
      let vinkel = map(x, 0, width, 0, TWO_PI);
      let tid = y * 0.0025;
      let offset = map(
        noise(cos(vinkel) * skala.value() + 100, sin(vinkel) * skala.value() + 100, tid),
        0, 1, -peakHeight, peakHeight
      );
      vertex(width / 2 + cos(vinkel) * (220 + offset), y + sin(vinkel) * (100 + offset));
    }
    endShape(CLOSE);
  }
}
