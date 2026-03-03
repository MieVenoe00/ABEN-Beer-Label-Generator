const labelElement = document.querySelector(".label");

// ---------- JPG ----------
document.getElementById("gemJPG").addEventListener("click", async () => {
  const canvas = await html2canvas(labelElement, {
    scale: 3,
    useCORS: true,
  });

  const link = document.createElement("a");
  link.download = "oel-label.jpg";
  link.href = canvas.toDataURL("image/jpeg", 1.0);
  link.click();
});

// ---------- PDF ----------
document.getElementById("gemPDF").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;

  // Capture HELE labelen på én gang – alt kommer automatisk med
  const canvas = await html2canvas(labelElement, {
    scale: 6, // 355 DPI → trykkvalitet, skarp tekst
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [205, 120], // præcis 20.5 × 12 cm
  });

  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 205, 120);
  pdf.save("oel-label.pdf");
});

// ---------- SVG ----------
document.getElementById("gemSVG").addEventListener("click", async () => {
  const canvas = await html2canvas(labelElement, {
    scale: 3,
    useCORS: true,
  });

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
