const labelElement = document.querySelector(".label");

// ─── Erstat <img src="...svg"> med ægte inline <svg> ─────────────────────────
// html2canvas kan ikke rendere SVG via <img> — men kan godt rendere inline <svg>.
// Vi fetcher SVG-teksten, parser den, swapper elementet, og gendanner bagefter.
async function inlineSVGElements() {
  const imgs = [...labelElement.querySelectorAll('img[src$=".svg"]')];
  const restore = [];

  for (const img of imgs) {
    const src = img.getAttribute("src");
    try {
      const res    = await fetch(src);
      const text   = await res.text();
      const parser = new DOMParser();
      const doc    = parser.parseFromString(text, "image/svg+xml");
      const svgEl  = doc.querySelector("svg");

      if (!svgEl) continue;

      // Kopiér dimensioner og styling fra <img> til <svg>
      svgEl.setAttribute("width",  img.offsetWidth  || img.getAttribute("width")  || "auto");
      svgEl.setAttribute("height", img.offsetHeight || img.getAttribute("height") || "auto");
      svgEl.style.cssText = img.style.cssText;

      // Kopiér id og klasser
      if (img.id)        svgEl.id = img.id;
      if (img.className) svgEl.setAttribute("class", img.getAttribute("class"));

      img.parentNode.replaceChild(svgEl, img);
      restore.push({ svgEl, img });
    } catch (e) {
      console.warn("SVG inline fejlede:", src, e);
    }
  }

  return restore;
}

function restoreSVGElements(restore) {
  restore.forEach(({ svgEl, img }) => {
    svgEl.parentNode.replaceChild(img, svgEl);
  });
}

// ---------- JPG ----------
document.getElementById("gemJPG").addEventListener("click", async () => {
  const restore = await inlineSVGElements();

  const canvas = await html2canvas(labelElement, {
    scale: 3,
    useCORS: true,
    logging: false,
  });

  restoreSVGElements(restore);

  const link = document.createElement("a");
  link.download = "oel-label.jpg";
  link.href = canvas.toDataURL("image/jpeg", 1.0);
  link.click();
});

// ---------- PDF ----------
document.getElementById("gemPDF").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const restore = await inlineSVGElements();

  const canvas = await html2canvas(labelElement, {
    scale: 6,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  restoreSVGElements(restore);

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [205, 120],
  });

  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 205, 120);
  pdf.save("oel-label.pdf");
});

// ---------- SVG ----------
document.getElementById("gemSVG").addEventListener("click", async () => {
  const restore = await inlineSVGElements();

  const canvas = await html2canvas(labelElement, {
    scale: 3,
    useCORS: true,
    logging: false,
  });

  restoreSVGElements(restore);

  const imgData = canvas.toDataURL("image/png");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
  <image href="${imgData}" width="100%" height="100%" />
</svg>`;

  const blob = new Blob([svg], { type: "image/svg+xml" });
  const link = document.createElement("a");
  link.download = "oel-label.svg";
  link.href = URL.createObjectURL(blob);
  link.click();
});
