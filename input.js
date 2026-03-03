// Navn på øllen
document.getElementById("olNavn").addEventListener("input", function () {
  document.getElementById("navn").textContent = this.value;
});

// Type af øllen
document.getElementById("olType").addEventListener("input", function () {
  document.getElementById("type").textContent = this.value;
});

// Alkoholprocent
document.getElementById("alcoholpc").addEventListener("input", function () {
  document.getElementById("doseAlc").textContent =
    "Alc. " + this.value + "% vol.";
});

// Tekst om Øllen
document.getElementById("tekstOl").addEventListener("input", function () {
  document.getElementById("omol").textContent = this.value;
});

// Ingredienser
document
  .getElementById("ingredienterInput")
  .addEventListener("input", function () {
    document.getElementById("ingredienser").textContent = this.value;
  });
