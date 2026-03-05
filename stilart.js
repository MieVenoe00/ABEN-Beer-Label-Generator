// ─── Øl-stilarter med farver ──────────────────────────────────────────────────
const stilarter = [
  { navn: "— Vælg øl-stilart —", bg: "#FAF3ED", tekst: "#1A1A1A" },
  { navn: "Pilsner", bg: "#fbf5db", tekst: "#2d391c" },
  { navn: "IPA (India Pale Ale)", bg: "#FFF0D0", tekst: "#7A3B00" },
  { navn: "Hazy IPA / NEIPA", bg: "#f9f3ac", tekst: "#007168" },
  { navn: "DIPA (Double IPA)", bg: "#FFE4A0", tekst: "#5A2800" },
  { navn: "Stout", bg: "#2D1A0B", tekst: "#F5E5C1" },
  { navn: "Imperial Stout", bg: "#0D0806", tekst: "#b59365" },
  { navn: "Pastry Stout", bg: "#2A1400", tekst: "#F0D0A0" },
  { navn: "Wheat Beer / Hvedeøl", bg: "#FFF8E8", tekst: "#013764" },
  { navn: "Pale Ale", bg: "#FFF0C0", tekst: "#4A3000" },
  { navn: "Brown Ale", bg: "#381c10", tekst: "#F0C080" },
  { navn: "Porter", bg: "#1E1208", tekst: "#D4B890" },
  { navn: "Sour / Wild Ale", bg: "#f4baba", tekst: "#600d0d" },
  { navn: "Gose", bg: "#F0FAE8", tekst: "#2A4A20" },
  { navn: "Belgian Tripel", bg: "#FDF0C0", tekst: "#6B4800" },
  { navn: "Saison", bg: "#FFF8D8", tekst: "#5A4820" },
  { navn: "Amber Ale", bg: "#FFE8C8", tekst: "#5A2000" },
  { navn: "Barley Wine", bg: "#3A1000", tekst: "#F0D0A0" },
  { navn: "Berliner Weisse", bg: "#F8FFF8", tekst: "#203830" },
  { navn: "Quadrupel", bg: "#180800", tekst: "#D4A060" },
  { navn: "Røget øl / Rauchbier", bg: "#230e00", tekst: "#d0aa01" },
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

// ─── Inline #stregkodeTekst som ægte SVG ved sideload ────────────────────────
async function inlinStregkodeTekst() {
  const img = document.getElementById("stregkodeTekst");
  if (!img) return;
  try {
    const res = await fetch(img.getAttribute("src"));
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, "image/svg+xml");
    const svgEl = doc.querySelector("svg");
    if (!svgEl) return;
    svgEl.id = "stregkodeTekst";
    svgEl.style.cssText = img.style.cssText;
    svgEl.style.height = "149px";
    svgEl.style.width = "auto";
    img.parentNode.replaceChild(svgEl, img);
  } catch (e) {
    console.warn("Kunne ikke inline stregkodeTekst:", e);
  }
}

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

  // stregkodeTekst — nu inline SVG, så vi kan farve den
  document
    .querySelectorAll(
      "#stregkodeTekst path, #stregkodeTekst polygon, #stregkodeTekst rect, #stregkodeTekst text",
    )
    .forEach((el) => (el.style.fill = tekst));

  // Divider-linje
  const labelBorder = document.querySelector(".label");
  if (labelBorder) labelBorder.style.borderColor = tekst + "40";

  // Gem aktiv stilart til select-visning
  window.aktivStiIart = stilart;
}

// ─── Byg select-element ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  await inlinStregkodeTekst();

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
