const paraules = [
  { paraula: "oceà", categoria: "Geografia" },
  { paraula: "desert", categoria: "Geografia" },
  { paraula: "glacera", categoria: "Geografia" },
  { paraula: "safari", categoria: "Activitat" },
  { paraula: "excursió", categoria: "Activitat" },
  { paraula: "aeroport", categoria: "Transport" },
];

const maxErrors = 6;
let paraulaSeleccionada;
let lletresEncertades = [];
let errors = 0;
let lletresUtilitzades = [];
let usuari = "";

document.addEventListener("DOMContentLoaded", function () {
  // Referències als elements del DOM
  const formDiv = document.querySelector(".formDiv");
  const jocDiv = document.querySelector(".jocDiv");
  const btnJugar = document.getElementById("btnJugar");
  const categoriaElement = document.getElementById("categoria");
  const paraulaElement = document.getElementById("paraula");
  const lletresElement = document.getElementById("lletres");
  const numErrorsElement = document.getElementById("numErrors");
  const missatgeFinal = document.getElementById("missatgeFinal");
  const btnReiniciar = document.getElementById("reiniciar");
  const btnSortir = document.getElementById("sortir");

  // Si hi ha un estat del joc guardat, el carrega
  if (localStorage.getItem("estatJoc")) {
    const estatJoc = JSON.parse(localStorage.getItem("estatJoc"));
    paraulaSeleccionada = estatJoc.paraulaSeleccionada;
    lletresEncertades = estatJoc.lletresEncertades;
    errors = estatJoc.errors;
    lletresUtilitzades = estatJoc.lletresUtilitzades;
    usuari = estatJoc.usuari;
    mostrarCategoria(estatJoc.categoria);
    mostrarParaula();
    mostrarLletres();
    actualitzarPenjat();
    formDiv.style.display = "none";
    jocDiv.style.display = "flex";
  }

  // Event listener per al botó de jugar
  btnJugar.addEventListener("click", function (e) {
    e.preventDefault();
    iniciarJoc();
  });

  // Event listener per al botó de reiniciar el joc
  btnReiniciar.addEventListener("click", reiniciarJoc);

  // Event listener per al botó de sortir del joc
  btnSortir.addEventListener("click", sortirJoc);

  // Inicia un nou joc
  function iniciarJoc() {
    if (!usuari) {
      usuari = document.getElementById("username").value;
      if (usuari.trim() === "") {
        alert("Introdueix un nom d'usuari");
        return;
      }
    }
    const randomIndex = Math.floor(Math.random() * paraules.length);
    paraulaSeleccionada = paraules[randomIndex].paraula;
    const categoria = paraules[randomIndex].categoria;
    lletresEncertades = Array(paraulaSeleccionada.length).fill("_");
    errors = 0;
    lletresUtilitzades = [];
    guardarEstatJoc();
    mostrarCategoria(categoria);
    mostrarParaula();
    mostrarLletres();
    actualitzarPenjat();
    formDiv.style.display = "none";
    jocDiv.style.display = "flex";
  }

  // Mostra la categoria de la paraula seleccionada
  function mostrarCategoria(categoria) {
    categoriaElement.textContent = `Categoria: ${categoria}`;
  }

  // Mostra la paraula actual amb les lletres encertades
  function mostrarParaula() {
    paraulaElement.innerHTML = lletresEncertades.join(" ");
  }

  // Mostra els botons per seleccionar les lletres de l'alfabet
  function mostrarLletres() {
    const lletres = "abcdefghijklmnopqrstuvwxyz";
    lletresElement.innerHTML = "";
    for (const lletra of lletres) {
      const btnLletra = document.createElement("button");
      btnLletra.textContent = lletra;
      btnLletra.disabled = lletresUtilitzades.includes(lletra);
      btnLletra.addEventListener("click", () => seleccionarLletra(lletra));
      lletresElement.appendChild(btnLletra);
    }
  }

  // Selecciona una lletra i actualitza l'estat del joc
  function seleccionarLletra(lletra) {
    lletresUtilitzades.push(lletra);
    if (paraulaSeleccionada.includes(lletra)) {
      for (let i = 0; i < paraulaSeleccionada.length; i++) {
        if (paraulaSeleccionada[i] === lletra) {
          lletresEncertades[i] = lletra;
        }
      }
    } else {
      errors++;
    }
    guardarEstatJoc();
    mostrarParaula();
    mostrarLletres();
    actualitzarPenjat();
    comprovarFiJoc();
  }

  // Actualitza la imatge del penjat segons el nombre d'errors
  function actualitzarPenjat() {
    for (let i = 1; i <= maxErrors; i++) {
      const img = document.getElementById(`P${i}`);
      img.style.display = i <= errors ? "block" : "none";
    }
    numErrorsElement.textContent = errors;
  }

  // Comprova si el joc ha acabat
  function comprovarFiJoc() {
    if (lletresEncertades.join("") === paraulaSeleccionada) {
      mostrarMissatgeFinal("Has guanyat!");
    } else if (errors >= maxErrors) {
      mostrarMissatgeFinal("Has perdut!");
    }
  }

  // Mostra el missatge final del joc
  function mostrarMissatgeFinal(missatge) {
    missatgeFinal.textContent = missatge;
    missatgeFinal.style.display = "block";
    btnReiniciar.style.display = "block";
    btnSortir.style.display = "block";
    jocDiv
      .querySelectorAll(".lletresDiv button")
      .forEach((btn) => (btn.disabled = true));
  }

  // Reinicia el joc
  function reiniciarJoc() {
    iniciarJoc();
    missatgeFinal.style.display = "none";
    btnReiniciar.style.display = "none";
    btnSortir.style.display = "none";
    jocDiv
      .querySelectorAll(".lletresDiv button")
      .forEach((btn) => (btn.disabled = false));
  }

  // Surt del joc i elimina l'estat guardat
  function sortirJoc() {
    localStorage.removeItem("estatJoc");
    formDiv.style.display = "flex";
    jocDiv.style.display = "none";
    missatgeFinal.style.display = "none";
    btnReiniciar.style.display = "none";
    btnSortir.style.display = "none";
    document.getElementById("idForm").reset();
    usuari = "";
  }

  // Guarda l'estat actual del joc en localStorage
  function guardarEstatJoc() {
    const estatJoc = {
      paraulaSeleccionada,
      lletresEncertades,
      errors,
      lletresUtilitzades,
      usuari,
      categoria: categoriaElement.textContent.replace("Categoria: ", ""),
    };
    localStorage.setItem("estatJoc", JSON.stringify(estatJoc));
  }
});
