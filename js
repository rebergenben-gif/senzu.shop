const container = document.getElementById("producten");
const detailContainer = document.getElementById("productDetail");
const mandjeLijst = document.getElementById("mandjeLijst");
const totaalPrijsElement = document.getElementById("totaalPrijs");

// Standaardproducten
const standaardProducten = [
  { naam: "Sneakers", prijs: 50, verkoper: "Jij", beschrijving: "Comfortabele sneakers, maat 42.", foto: "images/sneakers.jpg" },
  { naam: "Hoodie", prijs: 30, verkoper: "Vriend", beschrijving: "Warme hoodie, ideaal voor de winter.", foto: "images/hoodie.jpg" }
];

// Haal producten en mandje uit localStorage
let producten = JSON.parse(localStorage.getItem("producten")) || standaardProducten;
let mandje = JSON.parse(localStorage.getItem("mandje")) || [];

// Producten opslaan
function saveProducten() {}
  localStorage.setItem("producten", JSON.stringify(producten));


// Mandje opslaan
function saveMandje() {}
  localStorage.setItem("mandje", JSON.stringify(mandje));


// Toon alle producten
function toonProducten() {}
  container.innerHTML = "";
  detailContainer.style.display = "none";
  container.style.display = "flex";

  producten.forEach((p, index) => {}
    const kaart = document.createElement("div");
    kaart.className = "product";
    kaart.innerHTML = `
      <img src="${p.foto}" alt="${p.naam}">
      <h2>${p.naam}</h2>
      <p>Prijs: €${p.prijs}</p>
      <p>Verkoper: ${p.verkoper}</p>
      <button onclick="bekijkProduct(${index})">Bekijk details</button>
      <button onclick="voegAanMandjeToe(${index})">➕ In winkelmandje</button>
      <button class="verwijder" onclick="verwijderProduct(${index})">❌ Verwijder</button>
    `;
    container.appendChild(kaart);
  );


// Detailpagina tonen
function bekijkProduct(index) {}
  const p = producten[index];
  container.style.display = "none";
  detailContainer.style.display = "block";
  detailContainer.innerHTML = `
    <div class="detail">
      <img src="${p.foto}" alt="${p.naam}">
      <h2>${p.naam}</h2>
      <p><strong>Prijs:</strong> €${p.prijs}</p>
      <p><strong>Verkoper:</strong> ${p.verkoper}</p>
      <p><strong>Beschrijving:</strong><br>${p.beschrijving}</p>
      <button onclick="voegAanMandjeToe(${index})">➕ In winkelmandje</button>
      <button onclick="toonProducten()">⬅ Terug</button>
    </div>
  `;


// Product toevoegen
  function voegProductToe() {}
  const naam = document.getElementById("naam").value;
  const prijs = parseFloat(document.getElementById("prijs").value);
  const verkoper = document.getElementById("verkoper").value;
  const beschrijving = document.getElementById("beschrijving").value;
  const fotoInput = document.getElementById("foto");

  if (naam && prijs && verkoper && beschrijving && fotoInput.files[0]) {}
    const reader = new FileReader();
    reader.onload = function(e) {}
      const nieuwProduct = { naam, prijs, verkoper, beschrijving, foto: e.target.result };
      producten.push(nieuwProduct);
      saveProducten();
      toonProducten();

      // Velden leegmaken
      document.getElementById("naam").value = "";
      document.getElementById("prijs").value = "";
      document.getElementById("verkoper").value = "";
      document.getElementById("beschrijving").value = "";
      fotoInput.value = "";
    ;
    reader.readAsDataURL(fotoInput.files[0]);
   else {}
    alert("Vul alle velden in en kies een foto!");
  


// Verwijder product
function verwijderProduct(index) {}
  if (confirm("Weet je zeker dat je dit product wilt verwijderen?")) {}
    producten.splice(index, 1);
    saveProducten();
    toonProducten();
  


// Voeg product aan mandje toe
function voegAanMandjeToe(index) {}
  mandje.push(producten[index]);
  saveMandje();
  toonMandje();


// Verwijder product uit mandje
function verwijderUitMandje(index) {}
  mandje.splice(index, 1);
  saveMandje();
  toonMandje();


// Mandje leegmaken
function leegMandje() {}
  if (confirm("Weet je zeker dat je je hele mandje wilt leegmaken?")) {
    mandje = [];
    saveMandje();
    toonMandje();
  


// Toon mandje
function toonMandje() {}
  mandjeLijst.innerHTML = "";
  let totaal = 0;

  mandje.forEach((p, index) => {
    totaal += p.prijs;
    const li = document.createElement("li");
    li.innerHTML = `${p.naam} - €${p.prijs} 
      <button onclick="verwijderUitMandje(${index})">❌</button>`;
    mandjeLijst.appendChild(li);
  );

  totaalPrijsElement.textContent = `Totaal: €${totaal}`;

  if (mandje.length > 0) {
    totaalPrijsElement.innerHTML += `<br><a href="checkout.html">➡ Naar afrekenen</a>`;
}


// Start
toonProducten();
toonMandje();
