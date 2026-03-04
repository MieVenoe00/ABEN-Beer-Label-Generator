const labelElement = document.querySelector(".label");

// ─── Hent alle SVG <img> og sæt dem midlertidigt som base64 ──────────────────
// html2canvas kan ikke rendere SVG-filer fra <img src="...svg"> direkte.
// Vi fetcher dem (same-origin på Netlify), konverterer til base64 data-URI,
// og gendanner de originale src-stier efter capture.
async function inlineSVGs() {
  const imgs = [...labelElement.querySelectorAll('img[src$=".svg"]')];
  const restore = [];

  await Promise.all(imgs.map(async (img) => {
    const src = img.getAttribute("src");
    try {
      const res  = await fetch(src);
      const text = await res.text();
      const b64  = btoa(unescape(encodeURIComponent(text)));
      img.setAttribute("src", "data:image/svg+xml;base64," + b64);
      restore.push({ img, src });
    } catch (e) {
      console.warn("SVG fetch fejlede:", src, e);
    }
  }));

  return restore;
}

function restoreSVGs(restore) {
  restore.forEach(({ img, src }) => img.setAttribute("src", src));
}

// ---------- JPG ----------
document.getElementById("gemJPG").addEventListener("click", async () => {
  const restore = await inlineSVGs();

  const canvas = await html2canvas(labelElement, {
    scale: 3,
    useCORS: true,
  });

  restoreSVGs(restore);

  const link = document.createElement("a");
  link.download = "oel-label.jpg";
  link.href = canvas.toDataURL("image/jpeg", 1.0);
  link.click();
});

// ---------- PDF ----------
document.getElementById("gemPDF").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const restore = await inlineSVGs();

  const canvas = await html2canvas(labelElement, {
    scale: 6,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  restoreSVGs(restore);

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
  const restore = await inlineSVGs();

  const canvas = await html2canvas(labelElement, {
    scale: 3,
    useCORS: true,
  });

  restoreSVGs(restore);

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
