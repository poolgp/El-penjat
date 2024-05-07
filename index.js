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
  },
  {
    nombre: "LLEO",
    imagen: "./img/Leon.jpg",
    descripcion:
      "El lleó és un majestuós felí que es distingeix per la seva melena en el cas dels mascles. Conegut com el 'rei de la selva', habita principalment a l'Àfrica subsahariana i en algunes àrees d'Àsia. Els lleons són animals socials que viuen en grups anomenats manades, liderades per un mascle dominant. La seva imponent presència i el seu distintiu rugit han contribuït al seu estatus com a símbol de força i noblesa en diverses cultures i mitologies.",
    tematica: "Animals del món",
  },
  {
    nombre: "KOALA",
    imagen: "./img/koala.jpg",
    descripcion:
      "El koala és un adorabl marsupial originari d'Austràlia, conegut pel seu pelatge suau i gris, grans orelles rodones i nasal prominente. La seva dieta consisteix principalment en fulles d'eucaliptus, i són animals arboris que passen la major part del seu temps descansant a les branques. Tot i que la seva aparença tendra i el seu comportament tranquil els fan estimats, els koales s'enfronten a amenaces en termes de conservació a causa de la pèrdua d'hàbitat i altres reptes ambientals.",
    tematica: "Animals del món",
  },
  {
    nombre: "COTXE",
    imagen: "./img/coche.jpg",
    descripcion:
      "El cotxe, o automòbil, és un mitjà de transport personal amplament utilitzat. Disposa de rodes i motor, oferint una manera còmoda i eficient de desplaçar-se. Els cotxes varien en mida i disseny, des de vehicles compactes fins a SUVs o cotxes esportius. Són una peça clau de la vida quotidiana, proporcionant mobilitat i comoditat a les persones en les seves rutines diàries.",
    tematica: "Vehicles de transport",
  },
  {
    nombre: "AVIO",
    imagen: "./img/avion.jpg",
    descripcion:
      "L'avió és una aeronau impulsada per motors que es desplaça a través de l'aire. Amb ales que proporcionen sustentació i motors per a la propulsió, els avions són utilitzats per al transport de passatgers, càrrega o per finalitats militars. Aquest mitjà de transport ha revolucionat les comunicacions a escala global, permetent viatges ràpids i eficients entre diferents regions del món.",
    tematica: "Vehicles de transport",
  },
];

let nombreUsuario; //nombre del inputNameUser
let nameStorage; //nombre del user del local storage
let palabraSeleccionada; //Math random palabra
let arrayPalabra; //palabra split
let palabraDiv; //Div donde se imprime la parabraSplit

function startJuego() {
  guardarNombre();
  mostrarNombre();
  generarPalabra();
  guardarPalabra();
  mostrarTematica();
  mostrarPalabra();
  ocultar();
  mostrarAbc();
}

function guardarNombre() {
  nombreUsuario = document.getElementById("inputNameUser").value;
  localStorage.setItem("nombreUsuario", nombreUsuario);
}

function mostrarNombre() {
  nameStorage = localStorage.getItem("nombreUsuario");
  let nameSpan = document.getElementById("name");
  nameSpan.textContent = nameStorage;
}

function generarPalabra() {
  palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
  arrayPalabra = palabraSeleccionada.nombre.split("");
}

function guardarPalabra() {
  localStorage.setItem("Palabra", JSON.stringify(palabraSeleccionada));
}

function mostrarTematica() {
  let palabraStorage = JSON.parse(localStorage.getItem("Palabra"));
  let tematicaSpan = document.getElementById("tema");
  tematicaSpan.textContent = palabraStorage.tematica;
}

function mostrarPalabra() {
  palabraDiv = document.getElementById("palabra");
  palabraDiv.innerHTML = "";

  for (let i = 0; i < arrayPalabra.length; i++) {
    let letraNode = document.createTextNode("_ ");
    palabraDiv.appendChild(letraNode);
  }
}

function ocultar() {
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
