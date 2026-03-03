// ─── Standardfarver per kategori (rediger hex-koder her) ─────────────────────
const kategoriFarver = {
  "Frugtig":          "#C8F000",
  "Blomsteragtig":    "#FF80CC",
  "Sød / Aromatisk":  "#FFB347",
  "Krydret":          "#FF4500",
  "Urteagtig":        "#A8D858",
  "Græsagtig":        "#7DC143",
  "Jordagtig":        "#A07850",
  "Træagtig":         "#5C8A3C",
  "Nøddeagtig":       "#C88028",
  "Kornagtig":        "#E8C870",
  "Brændt":           "#6B2800",
  "Mejeri":           "#FFF0A0",
  "Alkoholisk":       "#8B1A2C",
};

// ─── Smagsdata ────────────────────────────────────────────────────────────────
const smagsKategorier = [
  {
    navn: "Frugtig", ikon: "🍊",
    underkategorier: [
      { navn: "Citrus",       smage: ["Grapefrugt","Appelsin","Citron","Lime"] },
      { navn: "Tropisk",      smage: ["Mango","Ananas","Papaya","Banan","Litchi","Guava","Passionsfrugt","Kokos"] },
      { navn: "Bær",          smage: ["Hindbær","Jordbær","Blåbær","Brombær","Concord-drue","Muscat-drue","Stikkelsbær","Solbær","Ribs"] },
      { navn: "Melon",        smage: ["Cantaloupe","Honningmelon","Agurk","Vandmelon"] },
      { navn: "Stenfrugt",    smage: ["Fersken","Abrikos","Nektarin","Kirsebær","Blomme"] },
      { navn: "Kernefrugt",   smage: ["Grøn æble","Rød æble","Pære","Cider"] },
      { navn: "Tørret frugt", smage: ["Sveske","Figen","Daddel","Rosin"] },
    ],
  },
  { navn: "Blomsteragtig", ikon: "🌸", smage: ["Geranium","Rose","Citronella","Lavendel","Syren","Kamille","Kaprifolie","Jasmin","Lilje","Viol","Parfume"] },
  { navn: "Sød / Aromatisk", ikon: "🍯", smage: ["Karamel","Honning","Toffee","Chokolade","Brun farin","Brændt sukker","Melasse","Vanilje","Tyggegummi","Glasur","Skumfidus","Tærtebund","Ahornsirup","Cola"] },
  { navn: "Krydret", ikon: "🌶️", smage: ["Sort peber","Hvid peber","Muskatnød","Allehånde","Nellike","Enebær","Lakrids / Anis","Koriander","Kanel","Ingefær","Spidskommen"] },
  { navn: "Urteagtig", ikon: "🌿", smage: ["Sort te","Grøn te","Mynte","Rosmarin","Dild","Timian"] },
  { navn: "Græsagtig", ikon: "🌾", smage: ["Nyslået græs","Citrongræs","Grønne blade","Hø","Tørre blade"] },
  { navn: "Jordagtig", ikon: "🍄", smage: ["Muld / jord","Lade / stald","Mose / mos","Svamp","Rødbede"] },
  { navn: "Træagtig", ikon: "🪵", smage: ["Fyr","Harpiks","Cedertræ","Tobak","Sandeltræ","Eukalyptus","Gran","Eg"] },
  { navn: "Nøddeagtig", ikon: "🥜", smage: ["Valnød","Mandel","Jordnød","Hasselnød"] },
  { navn: "Kornagtig", ikon: "🍞", smage: ["Kornet","Hvidt brød","Vandkiks","Brøddej","Grahamkiks","Morgenmadsprodukt","Kiks","Ristet brød","Majschips"] },
  { navn: "Brændt", ikon: "☕", smage: ["Kaffe","Røg","Brændt tændstik"] },
  { navn: "Mejeri", ikon: "🧈", smage: ["Smør","Butterscotch","Sur mælk","Ost","Yoghurt"] },
  { navn: "Alkoholisk", ikon: "🥃", smage: ["Sherry","Rødvin","Hvidvin","Rom","Whiskey"] },
];

// ─── Hjælp: find kategori for en smag ────────────────────────────────────────
function findKategori(smag) {
  for (const kat of smagsKategorier) {
    if (kat.smage && kat.smage.includes(smag)) return kat.navn;
    if (kat.underkategorier) {
      for (const under of kat.underkategorier) {
        if (under.smage.includes(smag)) return kat.navn;
      }
    }
  }
  return null;
}

// ─── State ────────────────────────────────────────────────────────────────────
let valgteSmage  = new Set();
let åbenKategori = null;
let åbenUnder    = null;
const MAX_FARVER = 5;
const brugerFarver = { ...kategoriFarver }; // redigerbare kopier

// ─── Palette til p5 ──────────────────────────────────────────────────────────
function getAktiveKategorier() {
  const set = new Set();
  for (const smag of valgteSmage) {
    const k = findKategori(smag);
    if (k) set.add(k);
    if (set.size >= MAX_FARVER) break;
  }
  return [...set];
}

function opdaterP5Palette() {
  const aktive = getAktiveKategorier();
  if (aktive.length >= 2) {
    window.aktivPalette = aktive.map((k) => brugerFarver[k] || "#888888");
  } else if (aktive.length === 1) {
    window.aktivPalette = ["#FFFFFF", brugerFarver[aktive[0]] || "#888888"];
  } else {
    window.aktivPalette = null;
  }
}

// ─── Farve-panel i #farvePanel (statisk i HTML) ───────────────────────────────
function renderFarvepanel() {
  const panel = document.getElementById("farvePanel");
  if (!panel) return;

  const aktive = getAktiveKategorier();
  panel.innerHTML = "";

  const titel = document.createElement("p");
  titel.className = "sliderLabel farvePanel-titel";
  titel.textContent = "Gradientfarver";
  panel.appendChild(titel);

  if (aktive.length === 0) {
    const hint = document.createElement("p");
    hint.className = "farvePanel-hint";
    hint.textContent = "Vælg smagsnoter for at aktivere farver";
    panel.appendChild(hint);
    return;
  }

  const rækker = document.createElement("div");
  rækker.className = "farveRækker";

  aktive.forEach((katNavn) => {
    const række = document.createElement("div");
    række.className = "farveRække";

    const dot = document.createElement("span");
    dot.className = "farveDot";
    dot.style.background = brugerFarver[katNavn];

    const input = document.createElement("input");
    input.type = "color";
    input.className = "farveInput";
    input.value = brugerFarver[katNavn] || "#888888";
    input.title = "Skift farve for " + katNavn;
    input.addEventListener("input", () => {
      brugerFarver[katNavn] = input.value;
      dot.style.background = input.value;
      opdaterGradientPreview();
      opdaterP5Palette();
    });

    const hexLabel = document.createElement("span");
    hexLabel.className = "farveHex";
    hexLabel.textContent = brugerFarver[katNavn];
    input.addEventListener("input", () => {
      hexLabel.textContent = input.value;
    });

    const label = document.createElement("span");
    label.className = "farveLabel";
    label.textContent = katNavn;

    række.appendChild(dot);
    række.appendChild(input);
    række.appendChild(hexLabel);
    række.appendChild(label);
    rækker.appendChild(række);
  });

  panel.appendChild(rækker);

  // Gradient preview bar
  const preview = document.createElement("div");
  preview.id = "gradientPreview";
  preview.className = "gradientPreview";
  opdaterGradientPreview(preview, aktive);
  panel.appendChild(preview);

  function opdaterGradientPreview(el, liste) {
    const bar = el || document.getElementById("gradientPreview");
    if (!bar) return;
    const kat = liste || aktive;
    const stops = kat.map((k) => brugerFarver[k]).join(", ");
    bar.style.background = `linear-gradient(to bottom, ${stops})`;
  }

  // Luk opdaterGradientPreview i scope for event listeners
  window._opdaterGradientPreview = () => opdaterGradientPreview();
}

// ─── Smagspicker ─────────────────────────────────────────────────────────────
function renderSmagsPicker() {
  const container = document.getElementById("smagsPicker");
  if (!container) return;
  container.innerHTML = "";

  smagsKategorier.forEach((kat) => {
    const erÅben = åbenKategori === kat.navn;

    const katBtn = document.createElement("button");
    katBtn.className = "smagsKat" + (erÅben ? " aktiv" : "");
    katBtn.innerHTML = `<span>${kat.ikon} ${kat.navn}</span><span class="pil">${erÅben ? "▾" : "▸"}</span>`;
    katBtn.onclick = () => {
      åbenKategori = erÅben ? null : kat.navn;
      åbenUnder = null;
      renderSmagsPicker();
    };
    container.appendChild(katBtn);

    if (!erÅben) return;

    const panelDiv = document.createElement("div");
    panelDiv.className = "smagsPanel";

    if (kat.underkategorier) {
      kat.underkategorier.forEach((under) => {
        const erUnderÅben = åbenUnder === under.navn;
        const underBtn = document.createElement("button");
        underBtn.className = "smagsUnder" + (erUnderÅben ? " aktiv" : "");
        underBtn.innerHTML = `<span>${under.navn}</span><span class="pil">${erUnderÅben ? "▾" : "▸"}</span>`;
        underBtn.onclick = () => {
          åbenUnder = erUnderÅben ? null : under.navn;
          renderSmagsPicker();
        };
        panelDiv.appendChild(underBtn);
        if (erUnderÅben) panelDiv.appendChild(renderChips(under.smage));
      });
    } else {
      panelDiv.appendChild(renderChips(kat.smage));
    }

    container.appendChild(panelDiv);
  });
}

function renderChips(smage) {
  const wrapper = document.createElement("div");
  wrapper.className = "smagsChips";
  smage.forEach((smag) => {
    const valgt = valgteSmage.has(smag);
    const chip = document.createElement("button");
    chip.className = "smagsChip" + (valgt ? " valgt" : "");
    chip.textContent = smag;
    chip.onclick = () => {
      if (valgteSmage.has(smag)) valgteSmage.delete(smag);
      else valgteSmage.add(smag);
      opdaterP5Palette();
      renderFarvepanel();
      renderSmagsPicker();
      opdaterLabel();
    };
    wrapper.appendChild(chip);
  });
  return wrapper;
}

// ─── Label smagsnoter ─────────────────────────────────────────────────────────
function opdaterLabel() {
  const el = document.getElementById("smagsnoter");
  if (!el) return;
  if (valgteSmage.size === 0) {
    el.innerHTML = "";
    el.style.display = "none";
    return;
  }
  el.style.display = "flex";
  el.innerHTML = `<span class="smagsnoterTitel">Smagsnoter:</span><span class="smagsnoterListe">${[...valgteSmage].join("  ·  ")}</span>`;
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderSmagsPicker();
  opdaterLabel();
  renderFarvepanel();
  opdaterP5Palette();
});
