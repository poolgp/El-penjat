document.addEventListener("DOMContentLoaded", () => {
  let palabras = [
    {
      nombre: "ESPANYA",
      imagen: "./img/SagradaFamilia.jpg",
      descripcion: "Espanya, situada a la península ibèrica del sud-oest d'Europa...",
      tematica: "Nom d'un país"
    },
    {
      nombre: "FRANÇA",
      imagen: "./img/TorreEiffel.jpg",
      descripcion: "França, al cor d'Europa occidental, és coneguda per la seva rica història...",
      tematica: "Nom d'un país"
    },
    {
      nombre: "LLEO",
      imagen: "./img/Leon.jpg",
      descripcion: "El lleó és un majestuós felí que es distingeix per la seva melena...",
      tematica: "Animals del món"
    },
    {
      nombre: "KOALA",
      imagen: "./img/koala.jpg",
      descripcion: "El koala és un adorabl marsupial originari d'Austràlia...",
      tematica: "Animals del món"
    },
    {
      nombre: "COTXE",
      imagen: "./img/coche.jpg",
      descripcion: "El cotxe, o automòbil, és un mitjà de transport personal...",
      tematica: "Vehicles de transport"
    },
    {
      nombre: "AVIO",
      imagen: "./img/avion.jpg",
      descripcion: "L'avió és una aeronau impulsada per motors que es desplaça a través de l'aire...",
      tematica: "Vehicles de transport"
    }
  ];

  let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let palabraActual = "";
  let arrayPalabra = [];
  let letraCorrecta = [];
  let letraIncorrecta = [];
  let numErrores = 0;
  const MAXERRORES = 6;

  document.getElementById("idForm").addEventListener("submit", function (event) {
    event.preventDefault();
    startJuego();
  });

  function startJuego() {
    const username = document.getElementById("inputNameUser").value;
    document.getElementById("name").textContent = username;

    document.querySelector(".userContainer").style.display = "none";
    document.querySelector(".cuerpo").style.visibility = "visible";
    document.querySelector(".letras").style.visibility = "visible";

    selectParaula();
    mostrarPalabra();
    mostrarLetras();
    mostrarTematica();
  }

  function selectParaula() {
    const randomIndex = Math.floor(Math.random() * palabras.length);
    const palabraObj = palabras[randomIndex];
    palabraActual = palabraObj.nombre;
    arrayPalabra = palabraActual.split("");
    localStorage.setItem("Palabra", JSON.stringify(palabraActual));
    document.getElementById("tema").textContent = palabraObj.tematica;
  }

  function mostrarPalabra() {
    const palabraDiv = document.getElementById("palabra");
    palabraDiv.innerHTML = "";

    arrayPalabra.forEach(() => {
      const span = document.createElement("span");
      span.textContent = "_ ";
      palabraDiv.appendChild(span);
    });
  }

  function mostrarLetras() {
    const abcSeparado = abc.split("");
    const container = document.getElementById("containerLletras");

    const abc1 = document.createElement("div");
    abc1.className = "abc1";

    const abc2 = document.createElement("div");
    abc2.className = "abc2";

    const abc3 = document.createElement("div");
    abc3.className = "abc3";

    abcSeparado.forEach((caracter, i) => {
      const aElement = document.createElement("a");
      aElement.href = "#";
      aElement.id = `caracter-${caracter}`;
      aElement.textContent = caracter;
      aElement.className = "letra";

      aElement.onclick = function (event) {
        event.preventDefault();
        comprobarLetra(event);
        aElement.onclick = null;
      };

      if (i < 10) {
        abc1.appendChild(aElement);
      } else if (i < 19) {
        abc2.appendChild(aElement);
      } else {
        abc3.appendChild(aElement);
      }
    });

    container.appendChild(abc1);
    container.appendChild(abc2);
    container.appendChild(abc3);
  }

  function comprobarLetra(event) {
    const letraClick = event.target.textContent;
    const letraElement = document.getElementById(`caracter-${letraClick}`);

    if (arrayPalabra.includes(letraClick)) {
      mostrarLetra(letraClick);
      letraElement.style.color = "green";
      letraCorrecta.push(letraClick);
      localStorage.setItem("letraCorrecta", JSON.stringify(letraCorrecta));
    } else {
      numErrores++;
      localStorage.setItem("Errors", JSON.stringify(numErrores));
      letraElement.style.color = "red";
      actualitzarContadorErrores();
      letraIncorrecta.push(letraClick);
      localStorage.setItem("letraIncorrecta", JSON.stringify(letraIncorrecta));
    }

    if (numErrores >= MAXERRORES) {
      gameOver();
    } else if (letraCorrecta.length === arrayPalabra.filter((letra) => letraCorrecta.includes(letra)).length) {
      gameWon();
    }
  }

  function mostrarLetra(letra) {
    const spans = document.getElementById("palabra").getElementsByTagName("span");
    arrayPalabra.forEach((char, index) => {
      if (char === letra) {
        spans[index].textContent = letra + " ";
      }
    });

    if (letraCorrecta.length === arrayPalabra.length) {
      gameWon();
    }
  }

  function actualitzarContadorErrores() {
    document.getElementById("score").textContent = numErrores;
    if (numErrores > 0) {
      document.getElementById(`P${numErrores}`).style.visibility = "visible";
    }
  }

  function gameWon() {
    alert("Has guanyat!");
    mostrarImagenFinal();
    mostrarDescripcionFinal();
  }

  function gameOver() {
    alert("Has perdut!");
    mostrarImagenFinal();
    mostrarDescripcionFinal();
  }

  function mostrarImagenFinal() {
    const palabraObj = palabras.find(p => p.nombre === palabraActual);
    document.getElementById("finalImg").src = palabraObj.imagen;
    document.getElementById("imgFinal").style.visibility = "visible";
  }

  function mostrarDescripcionFinal() {
    const palabraObj = palabras.find(p => p.nombre === palabraActual);
    document.getElementById("titolFinal").textContent = palabraObj.nombre;
    document.getElementById("descripcion").textContent = palabraObj.descripcion;
    document.getElementById("descripcionFinal").style.display = "block";
  }

  function tornarJugar() {
    numErrores = 0;
    document.getElementById("score").textContent = numErrores;
    document.getElementById("idForm").style.visibility = "visible";
    document.querySelector(".imgFinal").style.visibility = "hidden";
    document.querySelector(".descripcionFinal").style.display = "none";
    document.getElementById("palabra").style.display = "block";
    document.getElementById("containerLletras").style.display = "block";
    document.getElementById("contadorErrores").style.display = "block";
    document.getElementById("tornarJugar").style.visibility = "hidden";

    localStorage.removeItem("Palabra");
    localStorage.removeItem("letraCorrecta");
    localStorage.removeItem("letraIncorrecta");
    localStorage.removeItem("Errors");

    letraCorrecta = [];
    letraIncorrecta = [];

    const abcSeparado = abc.split("");
    abcSeparado.forEach((caracter) => {
      const letraElement = document.getElementById(`caracter-${caracter}`);
      letraElement.style.color = "";
      letraElement.onclick = function (event) {
        comprobarLetra(event);
        letraElement.onclick = null;
      };
    });

    selectParaula();
    mostrarPalabra();
    mostrarTematica();

    for (let i = 1; i <= MAXERRORES; i++) {
      document.getElementById("P" + i).style.visibility = "hidden";
    }
  }

  function limpiarLocalStorage() {
    localStorage.clear();
    location.reload();
  }

  function mostrarTematica() {
    const palabraObj = palabras.find(p => p.nombre === palabraActual);
    document.getElementById("tema").textContent = palabraObj.tematica;
  }

  document.getElementById("containerLletras").addEventListener("click", function (event) {
    if (event.target.classList.contains("letra")) {
      comprobarLetra(event);
    }
  });
});
