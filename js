// =============================
// Globale variabelen
// =============================
let producten = JSON.parse(localStorage.getItem("producten")) || [];
let mandje = JSON.parse(localStorage.getItem("mandje")) || [];

// =============================
// Product toevoegen
// =============================
function voegProductToe() {
  const naam = document.getElementById("naam").value;
  const prijs = parseFloat(document.getElementById("prijs").value);
  const verkoper = document.getElementById("verkoper").value;
  const beschrijving = document.getElementById("beschrijving").value;
  const fotoInput = document.getElementById("foto");

  if (!naam || isNaN(prijs) || !verkoper || !beschrijving || !fotoInput.files[0]) {
    alert("⚠ Vul alle velden in!");
    return;
  }

  // Foto uitlezen
  const reader = new FileReader();
  reader.onload = function (e) {
    const nieuwProduct = {
      id: Date.now(),
      naam,
      prijs,
      verkoper,
      beschrijving,
      foto: e.target.result,
    };

    producten.push(nieuwProduct);
    localStorage.setItem("producten", JSON.stringify(producten));
    toonProducten();
  };

  reader.readAsDataURL(fotoInput.files[0]);

  // Formulier leegmaken
  document.getElementById("naam").value = "";
  document.getElementById("prijs").value = "";
  document.getElementById("verkoper").value = "";
  document.getElementById("beschrijving").value = "";
  document.getElementById("foto").value = "";
}

// =============================
// Producten tonen
// =============================
function toonProducten() {
  const container = document.getElementById("producten");
  if (!container) return; // Alleen uitvoeren op index.html

  container.innerHTML = "";

  producten.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.foto}" alt="${p.naam}">
      <h3>${p.naam}</h3>
      <p>€${p.prijs}</p>
      <button onclick="bekijkProduct(${p.id})">Bekijk</button>
      <button onclick="voegToeAanMandje(${p.id})">In mandje</button>
    `;
    container.appendChild(div);
  });
}

// =============================
// Product detail tonen
// =============================
function bekijkProduct(id) {
  const p = producten.find((prod) => prod.id === id);
  if (!p) return;

  const detailDiv = document.getElementById("productDetail");
  const productenDiv = document.getElementById("producten");

  productenDiv.style.display = "none";
  detailDiv.style.display = "block";

  detailDiv.innerHTML = `
    <img src="${p.foto}" alt="${p.naam}">
    <h2>${p.naam}</h2>
    <p><strong>Prijs:</strong> €${p.prijs}</p>
    <p><strong>Verkoper:</strong> ${p.verkoper}</p>
    <p>${p.beschrijving}</p>
    <button onclick="voegToeAanMandje(${p.id})">In mandje</button>
    <button onclick="sluitDetail()">Terug</button>
  `;
}

function sluitDetail() {
  document.getElementById("productDetail").style.display = "none";
  document.getElementById("producten").style.display = "grid";
}

// =============================
// Winkelmandje
// =============================
function voegToeAanMandje(id) {
  const product = producten.find((p) => p.id === id);
  if (!product) return;

  mandje.push(product);
  localStorage.setItem("mandje", JSON.stringify(mandje));
  toonMandje();
}

function toonMandje() {
  const lijst = document.getElementById("mandjeLijst");
  const totaalPrijs = document.getElementById("totaalPrijs");

  if (!lijst) return; // Alleen uitvoeren als mandje zichtbaar is

  lijst.innerHTML = "";
  let totaal = 0;

  mandje.forEach((p, index) => {
    totaal += p.prijs;
    const li = document.createElement("li");
    li.textContent = `${p.naam} – €${p.prijs}`;
    lijst.appendChild(li);
  });

  totaalPrijs.textContent = `Totaal: €${totaal}`;
}

function leegMandje() {
  mandje = [];
  localStorage.setItem("mandje", JSON.stringify(mandje));
  toonMandje();
}

// =============================
// Initialiseren bij laden
// =============================
document.addEventListener("DOMContentLoaded", () => {
  toonProducten();
  toonMandje();
});
