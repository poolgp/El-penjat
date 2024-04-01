let palabras = [
  {
    nombre: "ESPANYA",
    imagen: "./img/SagradaFamilia.jpg",
    descripcion:
      "Espanya, situada a la península ibèrica del sud-oest d'Europa, és un país divers i ric en història i cultura. Les seves encisadores ciutats, platges banyades pel sol i paisatges pintorescs de muntanya atreuen visitants de tot el món. Amb una barreja de tradició i modernitat, Espanya és coneguda per la seva arquitectura impressionant, la seva cuina deliciosa, la seva vibrante vida nocturna i els festivals colorits. Des dels majestuosos palauets fins a les bullicioses places, Espanya ofereix una experiència única que fusiona la passió i l'alegria en un entorn fascinant.",
    tematica: "Nom d'un país",
  },
  {
    nombre: "FRANÇA",
    imagen: "./img/TorreEiffel.jpg",
    descripcion:
      "França, al cor d'Europa occidental, és coneguda per la seva rica història, el seu art excepcional, la seva exquisida gastronomia i la seva diversitat geogràfica. Des dels encisadors paisatges de la Provença fins a la majestuositat dels Alps, França ofereix una barreja única de tradició i modernitat. Les seves ciutats, com París amb la Torre Eiffel, reflecteixen l'elegància i la sofisticació, mentre que els seus poblets pintorescos i el seu patrimoni cultural contribueixen al seu atractiu atemporal. Amb una influència duradora en la moda, la literatura i la filosofia, França continua sent un destí culturalment ric i captivador.",
    tematica: "Nom d'un país",
  }
];

let palabraSeleccionada;
let arrayPalabra;
let palabraDiv;
let abc = "QWERTYUIOPASDFGHJKLÇZXCVBNM";
let abcSeparado;
let letraClick;
const MAXERRORES = 6;
let numErrores = 0;
const abcContainer = document.getElementById("containerLletras");

document
  .getElementById("idForm")
  .addEventListener("submit", function startGame(event) {
    event.preventDefault();

    mostrarNombre();
    selectParaula();
    mostrarPalabra();
    mostrarTematica();
    ocultar();
    mostrarAbc();
  });

function mostrarNombre() {
  let userName = document.getElementById("inputNameUser").value;
  localStorage.setItem("nombreUsuario", userName);

  let nameStorage = localStorage.getItem("nombreUsuario");
  let nameSpan = document.getElementById("name");
  nameSpan.textContent = nameStorage;
}

function selectParaula() {
  palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
  arrayPalabra = palabraSeleccionada.nombre.split("");
}

function mostrarPalabra() {
  palabraDiv = document.getElementById("palabra");
  palabraDiv.innerHTML = "";

  for (let i = 0; i < arrayPalabra.length; i++) {
    let letraNode = document.createTextNode("_ ");
    palabraDiv.appendChild(letraNode);
  }
}

function mostrarTematica() {
  let tematicaSpan = document.getElementById("tema");
  // console.log(palabraSeleccionada.tematica);
  tematicaSpan.textContent = palabraSeleccionada.tematica;
}

function ocultar() {
  //ocultar Form i imgs
  document.getElementById("idForm").style.visibility = "hidden";

  const elementosOcultar = document.getElementsByClassName("ocultar");
  for (let i = 0; i < elementosOcultar.length; i++) {
    elementosOcultar[i].style.visibility = "hidden";
  }
}

function mostrarAbc() {
  abcSeparado = abc.split("");

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

    aElement.onclick = function (event) {
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
  letraClick = event.target.textContent;
  let letraElement = document.getElementById(`caracter-${letraClick}`);

  if (arrayPalabra.includes(letraClick)) {
    mostrarLetra(letraClick);
    letraElement.style.color = "green";
    letraElement.removeEventListener("click", comprobarLetra);
  } else {
    numErrores++;
    letraElement.style.color = "red";
    actualitzarContadorErrores();
    letraElement.removeEventListener("click", comprobarLetra);
  }
}

function mostrarLetra(letraClick) {
  for (let i = 0; i < arrayPalabra.length; i++) {
    if (arrayPalabra[i] === letraClick) {
      let indiceNodo = i;
      palabraDiv.childNodes[indiceNodo].textContent = letraClick;
    }
    palabraCompleta();
  }
}

function actualitzarContadorErrores() {
  document.getElementById("score").textContent = numErrores;

  mostrarImg();
  comprobarFiJoc();
}

function palabraCompleta() {
  elUsuarioCompletoLaPalabra = false;
  const completa = document.getElementById("palabra").textContent;

  if (palabraSeleccionada.nombre === completa) {
    finJoc();
  }
}

function mostrarImg() {
  let numErrores = document.getElementById("score").textContent;

  let imagen = document.getElementById("P" + numErrores);
  imagen.style.visibility = "visible";
}

function comprobarFiJoc() {
  if (numErrores === MAXERRORES) {
    finJoc();
  }
}

function finJoc() {
  document.getElementById("idForm").style.display = "none";
  const imgFinal = document.querySelector(".imgFinal");
  imgFinal.style.visibility = "visible";

  const finalImg = document.getElementById("finalImg");
  finalImg.src = palabraSeleccionada.imagen;

  const descripcionFinal = document.querySelector(".descripcionFinal");
  descripcionFinal.style.display = "block";

  const palabraContainer = document.getElementById("palabra");
  palabraContainer.style.display = "none";

  const abcContainer = document.getElementById("containerLletras");
  abcContainer.style.display = "none";

  const contadorErrores = document.getElementById("contadorErrores");
  contadorErrores.style.display = "none";

  const titolFinal = document.getElementById("titolFinal");
  titolFinal.textContent = palabraSeleccionada.nombre;

  const descripcion = document.getElementById("descripcion");
  descripcion.textContent = palabraSeleccionada.descripcion;

  const tornarJugar = document.getElementById("tornarJugar");
  tornarJugar.style.visibility = "visible";
}