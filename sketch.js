let skala;
let streg;
let zigzag;
let ringAfstand;

function erMørBaggrund() {
  const hex = window.labelBaggrund;
  if (!hex || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) < 128;
}

function multiLerp(farver, amt) {
  if (!farver || farver.length < 2) return color(200, 240, 0);
  const seg    = farver.length - 1;
  const scaled = amt * seg;
  let   idx    = constrain(floor(scaled), 0, seg - 1);
  return lerpColor(farver[idx], farver[idx + 1], scaled - idx);
}

function setup() {
  createCanvas(405, 708).parent("labelCanvas");

  createP("Noise skala — lav: blød form / høj: kaotisk form").class("sliderLabel").parent("p5Input");
  skala = createSlider(0.05, 5.0, 1.5, 0.001);
  skala.parent("p5Input");

  createP("Stregtykkelse").class("sliderLabel").parent("p5Input");
  streg = createSlider(0.5, 10.0, 1.0, 0.1);
  streg.parent("p5Input");

  createP("Zig-zag — lav: blød / høj: kantet").class("sliderLabel").parent("p5Input");
  zigzag = createSlider(1, 30, 15, 1);
  zigzag.parent("p5Input");

  createP("Ring afstand — lav: tætte ringe / høj: få ringe").class("sliderLabel").parent("p5Input");
  ringAfstand = createSlider(1, 30, 5, 1);
  ringAfstand.parent("p5Input");
}

function draw() {
  // Byg p5-farve-array fra window.aktivPalette (hex) eller brug standard
  let palette;
  if (window.aktivPalette && window.aktivPalette.length >= 2) {
    palette = window.aktivPalette.map(h => color(h));
  } else {
    palette = [color(200, 240, 0), color(200, 0, 120)];
  }

  blendMode(BLEND);
  if (window.labelBaggrund) {
    background(color(window.labelBaggrund));
  } else {
    background(250, 243, 237);
  }
  noFill();
  strokeWeight(streg.value());
  blendMode(erMørBaggrund() ? SCREEN : MULTIPLY);

  const peakHeight = 100;
  for (let y = height + peakHeight; y > -peakHeight; y -= ringAfstand.value()) {
    const amt = map(y, -peakHeight, height + peakHeight, 0.0, 1.0);
    stroke(multiLerp(palette, amt));
    beginShape();
    for (let x = 0; x < width; x += zigzag.value()) {
      const vinkel = map(x, 0, width, 0, TWO_PI);
      const offset = map(
        noise(cos(vinkel) * skala.value() + 100, sin(vinkel) * skala.value() + 100, y * 0.0025),
        0, 1, -peakHeight, peakHeight
      );
      vertex(width / 2 + cos(vinkel) * (220 + offset), y + sin(vinkel) * (100 + offset));
    }
    endShape(CLOSE);
  }
}
