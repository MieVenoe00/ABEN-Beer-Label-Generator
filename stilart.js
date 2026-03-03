// ─── Øl-stilarter med farver ──────────────────────────────────────────────────
const stilarter = [
  { navn: "— Vælg øl-stilart —", bg: "#FAF3ED", tekst: "#1A1A1A" },
  { navn: "Pilsner", bg: "#FBF4D4", tekst: "#354024" },
  { navn: "IPA (India Pale Ale)", bg: "#FFF0D0", tekst: "#7A3B00" },
  { navn: "Hazy IPA / NEIPA", bg: "#FFF5C8", tekst: "#6B4400" },
  { navn: "DIPA (Double IPA)", bg: "#FFE4A0", tekst: "#5A2800" },
  { navn: "Stout", bg: "#1A1008", tekst: "#E8DCC8" },
  { navn: "Imperial Stout", bg: "#0D0806", tekst: "#C8A87A" },
  { navn: "Pastry Stout", bg: "#2A1400", tekst: "#F0D0A0" },
  { navn: "Wheat Beer / Hvedeøl", bg: "#FFF8E8", tekst: "#5A4010" },
  { navn: "Pale Ale", bg: "#FFF0C0", tekst: "#4A3000" },
  { navn: "Porter", bg: "#1E1208", tekst: "#D4B890" },
  { navn: "Sour / Wild Ale", bg: "#fd9b9bff", tekst: "#70000dff" },
  { navn: "Gose", bg: "#F0FAE8", tekst: "#2A4A20" },
  { navn: "Belgian Tripel", bg: "#FDF0C0", tekst: "#6B4800" },
  { navn: "Saison", bg: "#FFF8D8", tekst: "#5A4820" },
  { navn: "Amber Ale", bg: "#FFE8C8", tekst: "#5A2000" },
  { navn: "Barley Wine", bg: "#3A1000", tekst: "#F0D0A0" },
  { navn: "Berliner Weisse", bg: "#F8FFF8", tekst: "#203830" },
  { navn: "Quadrupel", bg: "#180800", tekst: "#D4A060" },
];

// ─── Elementer der skal have tekstfarven ─────────────────────────────────────
const tekstElementer = [
  "#navn",
  "#type",
  "#doseindhold",
  "#doseAlc",
  "#omol",
  "#unpasteurised",
  "#ingredienterInput",
  "#bryggeriet p",
  "#smagsnoterTitel",
  ".smagsnoterListe",
  "#overskrift",
  "#pTekst",
];

// ─── Anvend stilart ───────────────────────────────────────────────────────────
function anvendStiIart(stilart) {
  const { bg, tekst } = stilart;

  // Label baggrund
  document.querySelector(".label").style.backgroundColor = bg;

  // p5 canvas baggrund — sketch.js læser window.labelBaggrund
  window.labelBaggrund = bg;

  // Tekstelementer
  document
    .querySelectorAll(
      "#navn, #type, #doseindhold, #doseAlc, #omol, #unpasteurised, #ingredienterInput",
    )
    .forEach((el) => el && (el.style.color = tekst));

  document
    .querySelectorAll("#bryggeriet p")
    .forEach((el) => (el.style.color = tekst));
  document
    .querySelectorAll(".smagsnoterTitel, .smagsnoterListe")
    .forEach((el) => el && (el.style.color = tekst));

  // SVG logoer — alle path og polygon elementer
  document
    .querySelectorAll(
      "#logo path, #logo polygon, #miniLogo path, #miniLogo polygon",
    )
    .forEach((el) => (el.style.fill = tekst));

  // Divider-linje
  const labelBorder = document.querySelector(".label");
  if (labelBorder) labelBorder.style.borderColor = tekst + "40";

  // Gem aktiv stilart til select-visning
  window.aktivStiIart = stilart;
}

// ─── Byg select-element ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.createElement("div");
  wrapper.id = "stilartWrapper";

  const label = document.createElement("label");
  label.htmlFor = "stilartSelect";
  label.className = "stilartLabel";
  label.textContent = "Øl-stilart";
  wrapper.appendChild(label);

  const select = document.createElement("select");
  select.id = "stilartSelect";
  select.className = "stilartSelect";

  stilarter.forEach((s, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = s.navn;
    select.appendChild(opt);
  });

  select.addEventListener("change", () => {
    const s = stilarter[parseInt(select.value)];
    // Opdater option-baggrundsfarver
    updateSelectPreview(select, s);
    anvendStiIart(s);
  });

  wrapper.appendChild(select);

  // Indsæt i inputElementer, efter de tre text-inputs
  const inputEl = document.getElementById("olInput");
  if (inputEl) inputEl.appendChild(wrapper);
});

function updateSelectPreview(select, stilart) {
  // Sæt en lille farveindikator som border-left på select
  select.style.borderLeftWidth = "6px";
  select.style.borderLeftColor =
    stilart.bg === "#FAF3ED" ? "transparent" : stilart.bg;
  select.style.backgroundColor =
    stilart.bg === "#FAF3ED" ? "" : stilart.bg + "55";
}
