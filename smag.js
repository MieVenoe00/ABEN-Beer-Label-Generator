// ─── Alle smage med individuelle farver ──────────────────────────────────────
const smagsKategorier = [
  {
    navn: "Frugtig",
    ikon: "🍊",
    underkategorier: [
      {
        navn: "Citrus",
        smage: [
          { navn: "Grapefrugt", farve: "#FF6B35" },
          { navn: "Appelsin", farve: "#FF8C00" },
          { navn: "Citron", farve: "#FFE135" },
          { navn: "Lime", farve: "#A8E060" },
        ],
      },
      {
        navn: "Tropisk",
        smage: [
          { navn: "Mango", farve: "#FFAD00" },
          { navn: "Ananas", farve: "#FFD700" },
          { navn: "Papaya", farve: "#FF7043" },
          { navn: "Banan", farve: "#FFE97F" },
          { navn: "Litchi", farve: "#FFB3BA" },
          { navn: "Guava", farve: "#FF8FAB" },
          { navn: "Passionsfrugt", farve: "#FF5C8A" },
          { navn: "Kokos", farve: "#FFF5E1" },
        ],
      },
      {
        navn: "Bær",
        smage: [
          { navn: "Hindbær", farve: "#E8003D" },
          { navn: "Jordbær", farve: "#FF3355" },
          { navn: "Blåbær", farve: "#4A3880" },
          { navn: "Brombær", farve: "#6A1B4D" },
          { navn: "Concord-drue", farve: "#5C2D91" },
          { navn: "Muscat-drue", farve: "#9B7FC7" },
          { navn: "Stikkelsbær", farve: "#88AA00" },
          { navn: "Solbær", farve: "#3D0C5E" },
          { navn: "Ribs", farve: "#C0002A" },
        ],
      },
      {
        navn: "Melon",
        smage: [
          { navn: "Cantaloupe", farve: "#FFAA55" },
          { navn: "Honningmelon", farve: "#D4F07A" },
          { navn: "Agurk", farve: "#7BC67E" },
          { navn: "Vandmelon", farve: "#FF4D6D" },
        ],
      },
      {
        navn: "Stenfrugt",
        smage: [
          { navn: "Fersken", farve: "#FFAC8E" },
          { navn: "Abrikos", farve: "#FF8C42" },
          { navn: "Nektarin", farve: "#FF6B5B" },
          { navn: "Kirsebær", farve: "#9B1B30" },
          { navn: "Blomme", farve: "#7B2D8B" },
        ],
      },
      {
        navn: "Kernefrugt",
        smage: [
          { navn: "Grøn æble", farve: "#6DB33F" },
          { navn: "Rød æble", farve: "#CC2929" },
          { navn: "Pære", farve: "#C5D96E" },
          { navn: "Cider", farve: "#D4A017" },
        ],
      },
      {
        navn: "Tørret frugt",
        smage: [
          { navn: "Sveske", farve: "#5C2340" },
          { navn: "Figen", farve: "#7D3C5A" },
          { navn: "Daddel", farve: "#8B4513" },
          { navn: "Rosin", farve: "#6B3226" },
        ],
      },
    ],
  },
  {
    navn: "Blomsteragtig",
    ikon: "🌸",
    smage: [
      { navn: "Geranium", farve: "#FF6F8E" },
      { navn: "Rose", farve: "#FF3366" },
      { navn: "Citronella", farve: "#EEFF80" },
      { navn: "Lavendel", farve: "#9B72CF" },
      { navn: "Syren", farve: "#C39BD3" },
      { navn: "Kamille", farve: "#FFE680" },
      { navn: "Kaprifolie", farve: "#FFEC8B" },
      { navn: "Jasmin", farve: "#FFF9A0" },
      { navn: "Lilje", farve: "#FFFFFF" },
      { navn: "Viol", farve: "#7B4FA6" },
      { navn: "Parfume", farve: "#E8B4D0" },
    ],
  },
  {
    navn: "Sød / Aromatisk",
    ikon: "🍯",
    smage: [
      { navn: "Karamel", farve: "#C47A1E" },
      { navn: "Honning", farve: "#FFB300" },
      { navn: "Toffee", farve: "#A0522D" },
      { navn: "Chokolade", farve: "#5C2E00" },
      { navn: "Brun farin", farve: "#8B5E1A" },
      { navn: "Brændt sukker", farve: "#CC5500" },
      { navn: "Melasse", farve: "#4A2000" },
      { navn: "Vanilje", farve: "#F3E0BE" },
      { navn: "Tyggegummi", farve: "#FF8FAB" },
      { navn: "Glasur", farve: "#FADADD" },
      { navn: "Skumfidus", farve: "#FFD1DC" },
      { navn: "Tærtebund", farve: "#D4A05A" },
      { navn: "Ahornsirup", farve: "#B5451B" },
      { navn: "Cola", farve: "#3B1E08" },
    ],
  },
  {
    navn: "Krydret",
    ikon: "🌶️",
    smage: [
      { navn: "Sort peber", farve: "#2C2C2C" },
      { navn: "Hvid peber", farve: "#E8E0D0" },
      { navn: "Muskatnød", farve: "#A0522D" },
      { navn: "Allehånde", farve: "#7B3F00" },
      { navn: "Nellike", farve: "#8B4513" },
      { navn: "Enebær", farve: "#4A6741" },
      { navn: "Lakrids / Anis", farve: "#1A1A2E" },
      { navn: "Koriander", farve: "#A8C060" },
      { navn: "Kanel", farve: "#8B3A00" },
      { navn: "Ingefær", farve: "#D4851A" },
      { navn: "Spidskommen", farve: "#9B7B3A" },
    ],
  },
  {
    navn: "Urteagtig",
    ikon: "🌿",
    smage: [
      { navn: "Sort te", farve: "#3D2B1F" },
      { navn: "Grøn te", farve: "#7DB560" },
      { navn: "Mynte", farve: "#00C49A" },
      { navn: "Rosmarin", farve: "#4A7C59" },
      { navn: "Dild", farve: "#90C060" },
      { navn: "Timian", farve: "#6B8E4E" },
    ],
  },
  {
    navn: "Græsagtig",
    ikon: "🌾",
    smage: [
      { navn: "Nyslået græs", farve: "#C8F000" },
      { navn: "Citrongræs", farve: "#D4E860" },
      { navn: "Grønne blade", farve: "#3A9A3A" },
      { navn: "Hø", farve: "#D4B860" },
      { navn: "Tørre blade", farve: "#A09040" },
    ],
  },
  {
    navn: "Jordagtig",
    ikon: "🍄",
    smage: [
      { navn: "Muld / jord", farve: "#5C3D1E" },
      { navn: "Lade / stald", farve: "#7A5C2E" },
      { navn: "Mose / mos", farve: "#5A6E2A" },
      { navn: "Svamp", farve: "#8B7355" },
      { navn: "Rødbede", farve: "#8B0038" },
    ],
  },
  {
    navn: "Træagtig",
    ikon: "🪵",
    smage: [
      { navn: "Fyr", farve: "#4A7C3F" },
      { navn: "Harpiks", farve: "#8B6914" },
      { navn: "Cedertræ", farve: "#8B5E3C" },
      { navn: "Tobak", farve: "#7B4E2D" },
      { navn: "Sandeltræ", farve: "#C19A6B" },
      { navn: "Eukalyptus", farve: "#44918A" },
      { navn: "Gran", farve: "#2D6A4F" },
      { navn: "Eg", farve: "#9B6B2A" },
    ],
  },
  {
    navn: "Nøddeagtig",
    ikon: "🥜",
    smage: [
      { navn: "Valnød", farve: "#4A2C0A" },
      { navn: "Mandel", farve: "#C49A6C" },
      { navn: "Jordnød", farve: "#C8860A" },
      { navn: "Hasselnød", farve: "#8B5E1A" },
    ],
  },
  {
    navn: "Kornagtig",
    ikon: "🍞",
    smage: [
      { navn: "Kornet", farve: "#E8C870" },
      { navn: "Hvidt brød", farve: "#F5E6C8" },
      { navn: "Vandkiks", farve: "#E8D8B0" },
      { navn: "Brøddej", farve: "#D4B870" },
      { navn: "Grahamkiks", farve: "#B89050" },
      { navn: "Morgenmadsprodukt", farve: "#E0A840" },
      { navn: "Kiks", farve: "#D4C090" },
      { navn: "Ristet brød", farve: "#A07030" },
      { navn: "Majschips", farve: "#F0C040" },
    ],
  },
  {
    navn: "Brændt",
    ikon: "☕",
    smage: [
      { navn: "Kaffe", farve: "#3D1C00" },
      { navn: "Røg", farve: "#555555" },
      { navn: "Brændt tændstik", farve: "#2A1A00" },
    ],
  },
  {
    navn: "Mejeri",
    ikon: "🧈",
    smage: [
      { navn: "Smør", farve: "#FFE97F" },
      { navn: "Butterscotch", farve: "#C87941" },
      { navn: "Sur mælk", farve: "#F0EAD6" },
      { navn: "Ost", farve: "#E8C840" },
      { navn: "Yoghurt", farve: "#F5F0E8" },
    ],
  },
  {
    navn: "Alkoholisk",
    ikon: "🥃",
    smage: [
      { navn: "Sherry", farve: "#8B2500" },
      { navn: "Rødvin", farve: "#6B0020" },
      { navn: "Hvidvin", farve: "#E8E0A0" },
      { navn: "Rom", farve: "#7B3800" },
      { navn: "Whiskey", farve: "#C45A00" },
    ],
  },
];

// ─── Fladt opslag: smagsnavn → farve ─────────────────────────────────────────
const smagsOpslag = {};
for (const kat of smagsKategorier) {
  const lister = kat.underkategorier
    ? kat.underkategorier.map((u) => u.smage)
    : [kat.smage];
  for (const liste of lister) {
    for (const s of liste) {
      smagsOpslag[s.navn] = s.farve;
    }
  }
}

// ─── State ────────────────────────────────────────────────────────────────────
// valgteSmage: Map<navn, farve>  — maks 5
const valgteSmage = new Map();
const brugerFarver = {}; // navn → tilpasset hex
let åbenKategori = null;
let åbenUnder = null;
const MAX_FARVER = 5;

function getSmagFarve(navn) {
  return brugerFarver[navn] ?? smagsOpslag[navn] ?? "#888888";
}

// ─── Opdater p5 palette ───────────────────────────────────────────────────────
function opdaterP5Palette() {
  const farver = [...valgteSmage.keys()].map(getSmagFarve);
  window.aktivPalette =
    farver.length >= 2
      ? farver
      : farver.length === 1
        ? ["#FFFFFF", farver[0]]
        : null;
}

// ─── Smagspicker ─────────────────────────────────────────────────────────────
function renderSmagsPicker() {
  const container = document.getElementById("smagsPicker");
  if (!container) return;
  container.innerHTML = "";

  for (const kat of smagsKategorier) {
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

    if (!erÅben) continue;

    const panelDiv = document.createElement("div");
    panelDiv.className = "smagsPanel";

    if (kat.underkategorier) {
      for (const under of kat.underkategorier) {
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
      }
    } else {
      panelDiv.appendChild(renderChips(kat.smage));
    }
    container.appendChild(panelDiv);
  }
}

function renderChips(smage) {
  const wrapper = document.createElement("div");
  wrapper.className = "smagsChips";

  for (const s of smage) {
    const valgt = valgteSmage.has(s.navn);
    const fuld = !valgt && valgteSmage.size >= MAX_FARVER;
    const farve = getSmagFarve(s.navn);

    const chip = document.createElement("button");
    chip.className =
      "smagsChip" + (valgt ? " valgt" : "") + (fuld ? " disabled" : "");
    chip.disabled = fuld;
    chip.title = fuld ? `Maks ${MAX_FARVER} smage valgt` : "";

    // Farvedot + navn
    chip.innerHTML = `<span class="chipDot" style="background:${farve}"></span>${s.navn}`;

    chip.style.setProperty("--chip-farve", farve);

    chip.onclick = () => {
      if (valgteSmage.has(s.navn)) valgteSmage.delete(s.navn);
      else if (valgteSmage.size < MAX_FARVER) valgteSmage.set(s.navn, farve);
      opdaterP5Palette();
      renderFarvepanel();
      renderSmagsPicker();
      opdaterLabel();
    };
    wrapper.appendChild(chip);
  }
  return wrapper;
}

// ─── Farve-panel ─────────────────────────────────────────────────────────────
function renderFarvepanel() {
  const panel = document.getElementById("farvePanel");
  if (!panel) return;
  panel.innerHTML = "";

  // Titel
  const titel = document.createElement("p");
  titel.className = "sliderLabel farvePanel-titel";
  titel.textContent = `Gradientfarver (${valgteSmage.size}/${MAX_FARVER})`;
  panel.appendChild(titel);

  if (valgteSmage.size === 0) {
    const hint = document.createElement("p");
    hint.className = "farvePanel-hint";
    hint.textContent = "Vælg smagsnoter for at aktivere farver";
    panel.appendChild(hint);
    return;
  }

  // Gradient preview bar
  const stops = [...valgteSmage.keys()].map(getSmagFarve).join(", ");
  const bar = document.createElement("div");
  bar.id = "gradientBar";
  bar.style.cssText = `width:200px;height:10px;border-radius:5px;border:1px solid rgba(0,0,0,0.12);margin-bottom:8px;background:linear-gradient(to right,${stops});`;
  panel.appendChild(bar);

  // Én række per valgt smag
  for (const [navn] of valgteSmage) {
    const hex = getSmagFarve(navn);

    const row = document.createElement("div");
    row.className = "farveRække";

    const dot = document.createElement("span");
    dot.className = "farveDot";
    dot.style.background = hex;

    const input = document.createElement("input");
    input.type = "color";
    input.value = hex;
    input.className = "farveInput";

    const hexTxt = document.createElement("span");
    hexTxt.className = "farveHex";
    hexTxt.textContent = hex;

    const lbl = document.createElement("span");
    lbl.className = "farveLabel";
    lbl.textContent = navn;

    const fjernBtn = document.createElement("button");
    fjernBtn.className = "fjernSmagBtn";
    fjernBtn.innerHTML = "&#x2715;";
    fjernBtn.title = `Fjern ${navn}`;
    fjernBtn.onclick = () => {
      valgteSmage.delete(navn);
      opdaterP5Palette();
      renderFarvepanel();
      renderSmagsPicker();
      opdaterLabel();
    };

    input.addEventListener("input", () => {
      brugerFarver[navn] = input.value;
      dot.style.background = input.value;
      hexTxt.textContent = input.value;
      opdaterP5Palette();
      const nyStops = [...valgteSmage.keys()].map(getSmagFarve).join(", ");
      const b = document.getElementById("gradientBar");
      if (b) b.style.background = `linear-gradient(to right,${nyStops})`;
    });

    row.appendChild(dot);
    row.appendChild(input);
    row.appendChild(hexTxt);
    row.appendChild(lbl);
    row.appendChild(fjernBtn);
    panel.appendChild(row);
  }
}

// // ─── Label smagsnoter ─────────────────────────────────────────────────────────
// function opdaterLabel() {
//   const el = document.getElementById("smagsnoter");
//   if (!el) return;
//   if (valgteSmage.size === 0) { el.innerHTML = ""; el.style.display = "none"; return; }
//   el.style.display = "flex";
//   el.innerHTML = `<span class="smagsnoterTitel">Smagsnoter:</span><span class="smagsnoterListe">${[...valgteSmage.keys()].join("  ·  ")}</span>`;
// }

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderSmagsPicker();
  renderFarvepanel();
  opdaterLabel();
  opdaterP5Palette();
});
