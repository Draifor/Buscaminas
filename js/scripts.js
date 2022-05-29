// ** Declaración de las constantes **
const CANT_FILAS = 10;
const CANT_COLUMNAS = 10;
const CANT_CASILLAS = CANT_FILAS * CANT_COLUMNAS;

// ** Declaración de variables **
let cant_minas = sessionStorage.getItem("minas")
  ? sessionStorage.getItem("minas")
  : 25;
let finJuego = false;
let contadorDestapadas = 0;
const parrafo = document.createElement("P");
const botonNuevoJuego = document.getElementById("new-game");
const sectionRight = document.querySelector("section.right");
const puntaje = document.getElementById("score");
const cuadricula = document.querySelector("div.grid");
const selectDificultad = document.getElementById("difficulty");

// ** Definición de la clase **
class Tablero {
  constructor() {
    // Atributos de la clase
    this.matriz = [];
    this.crearTablero();
  }

  // ** Definición de las funciones de la clase **
  // Función para crear la matriz con las respectivas minas en posiciones aleatorias
  crearTablero = () => {
    // Crear la matriz y los botones del tablero
    for (let i = 0; i < CANT_FILAS; i++) {
      this.matriz.push([]);
      for (let j = 0; j < CANT_COLUMNAS; j++) {
        this.matriz[i].push(0);

        const casillaActual = {};
        casillaActual.fila = i;
        casillaActual.columna = j;

        this.añadirCasilla(casillaActual);
      }
    }
    this.ponerBombas();
  };

  // Crear y añadir casillas (botones) al tablero
  añadirCasilla = (casillaActual) => {
    casillaActual.boton = document.createElement("BUTTON");
    casillaActual.boton.id = casillaActual.fila + "" + casillaActual.columna;
    casillaActual.boton.onclick = () => {
      if (!finJuego && !casillaActual.boton.classList.contains("bandera")) {
        this.evaluar(casillaActual);
      }
    };
    casillaActual.boton.oncontextmenu = function (e) {
      e.preventDefault();
      ponerBandera(casillaActual);
    };
    cuadricula.appendChild(casillaActual.boton);
  };

  // Función para poner las bombas en posiciones aleatorias del tablero
  ponerBombas = () => {
    let contador = 0;
    while (contador < cant_minas) {
      let fila = Math.floor(Math.random() * CANT_FILAS);
      let columna = Math.floor(Math.random() * CANT_COLUMNAS);

      if (this.matriz[fila][columna] == 0) {
        this.matriz[fila][columna] = 1;
        contador++;
      }
    }
  };

  // Función para evaluar las coordenadas recibidas
  evaluar = (casillaActual) => {
    // Validación de la posición respecto a las minas
    if (this.matriz[casillaActual.fila][casillaActual.columna] == 1)
      detonarBomba(casillaActual);
    else {
      if (!casillaActual.boton.classList.contains("destapada")) {
        const minas = minasAdyacentes(casillaActual);
        if (minas == 0) {
          casillaActual.boton.classList.add("destapada");
          destaparCasillasVacias(casillaActual);
        } else mostrarNumMinasAdyacentes(minas, casillaActual);

        contadorDestapadas++;
        mostrarPuntaje(contadorDestapadas);
      }
    }
  };
}

// ** Definición de las funciones **

// Función para mostrar la mina explotada, las demás minas y terminar el juego
const detonarBomba = (casillaActual) => {
  finJuego = true;
  casillaActual.boton.classList.add("bombaDet");
  casillaActual.boton.innerHTML =
    '<img class="img-bombaDet" src="img/bomba_det2.png" alt="explosion_bomba">';
  mostrarBombas(casillaActual);
  parrafo.innerText = "¡Perdiste! Inténtalo de nuevo";
  sectionRight.appendChild(parrafo);
};

// Función para comprobar la cantidad de minas adyacentes
const minasAdyacentes = (casillaActual) => {
  let contador = 0;

  if (casillaActual.fila == 0) {
    if (casillaActual.columna == 0) {
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
      contador +=
        tablero.matriz[casillaActual.fila + 1][casillaActual.columna + 1];
    } else if (
      casillaActual.columna > 0 &&
      casillaActual.columna < CANT_COLUMNAS - 1
    ) {
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
      contador +=
        tablero.matriz[casillaActual.fila + 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
      contador +=
        tablero.matriz[casillaActual.fila + 1][casillaActual.columna + 1];
    } else {
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador +=
        tablero.matriz[casillaActual.fila + 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
    }
  } else if (casillaActual.fila > 0 && casillaActual.fila < CANT_FILAS - 1) {
    if (casillaActual.columna == 0) {
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
      contador +=
        tablero.matriz[casillaActual.fila - 1][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
      contador +=
        tablero.matriz[casillaActual.fila + 1][casillaActual.columna + 1];
    } else if (
      casillaActual.columna > 0 &&
      casillaActual.columna < CANT_COLUMNAS - 1
    ) {
      contador +=
        tablero.matriz[casillaActual.fila - 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
      contador +=
        tablero.matriz[casillaActual.fila - 1][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
      contador +=
        tablero.matriz[casillaActual.fila + 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
      contador +=
        tablero.matriz[casillaActual.fila + 1][casillaActual.columna + 1];
    } else {
      contador +=
        tablero.matriz[casillaActual.fila - 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador +=
        tablero.matriz[casillaActual.fila + 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
    }
  } else {
    if (casillaActual.columna == 0) {
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
      contador +=
        tablero.matriz[casillaActual.fila - 1][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
    } else if (
      casillaActual.columna > 0 &&
      casillaActual.columna < CANT_COLUMNAS - 1
    ) {
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
      contador +=
        tablero.matriz[casillaActual.fila - 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
      contador +=
        tablero.matriz[casillaActual.fila - 1][casillaActual.columna + 1];
    } else {
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador +=
        tablero.matriz[casillaActual.fila - 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
    }
  }
  return contador;
};

// Función para destapar las casillas adyacentes que no tengan minas alrededor;
const destaparCasillasVacias = (casillaActual) => {
  casillaActual.boton.style.backgroundColor = "rgba(101,178,198,1)";
  const fila = casillaActual.fila;
  const columna = casillaActual.columna;
  if (fila - 1 >= 0) {
    if (columna - 1 >= 0) {
      evaluarCasillaAdyacente(fila - 1, columna - 1);
    }
    if (columna + 1 < CANT_COLUMNAS) {
      evaluarCasillaAdyacente(fila - 1, columna + 1);
    }
    evaluarCasillaAdyacente(fila - 1, columna);
  }
  if (fila + 1 < CANT_FILAS) {
    if (columna - 1 >= 0) {
      evaluarCasillaAdyacente(fila + 1, columna - 1);
    }
    if (columna + 1 < CANT_COLUMNAS) {
      evaluarCasillaAdyacente(fila + 1, columna + 1);
    }
    evaluarCasillaAdyacente(fila + 1, columna);
  }
  if (columna - 1 >= 0) {
    evaluarCasillaAdyacente(fila, columna - 1);
  }
  if (columna + 1 < CANT_COLUMNAS) {
    evaluarCasillaAdyacente(fila, columna + 1);
  }
};

// Función para recuperar una casilla adyacente y evaluarla
const evaluarCasillaAdyacente = (fila, columna) => {
  const idCasilla = fila + "" + columna;
  const casillaAdyacente = {};
  (casillaAdyacente.fila = fila),
    (casillaAdyacente.columna = columna),
    (casillaAdyacente.boton = document.getElementById(idCasilla));
  tablero.evaluar(casillaAdyacente);
};

// Función para mostrar el número de minas adyacentes
const mostrarNumMinasAdyacentes = (minas, casillaActual) => {
  casillaActual.boton.appendChild(document.createTextNode(minas));
  casillaActual.boton.style.backgroundColor = "rgba(101,178,198,1)";
  casillaActual.boton.classList.add("destapada");
  if (minas == 2) casillaActual.boton.classList.add("dos");
  else if (minas == 3) casillaActual.boton.classList.add("tres");
  else if (minas == 4) casillaActual.boton.classList.add("cuatro");
  else if (minas == 5) casillaActual.boton.classList.add("cinco");
  else if (minas == 6) casillaActual.boton.classList.add("seis");
  else if (minas == 7) casillaActual.boton.classList.add("siete");
  else if (minas == 8) casillaActual.boton.classList.add("ocho");
};

// Función para mostrar el puntaje
const mostrarPuntaje = (contadorDestapadas) => {
  puntaje.innerText =
    " " + Math.round(CANT_CASILLAS * (contadorDestapadas / CANT_CASILLAS)) * 10;
  if (contadorDestapadas == CANT_CASILLAS - cant_minas) {
    puntaje.innerText = " " + CANT_CASILLAS * 10;
    parrafo.innerText = "¡Ganaste! Eres un crack";
    finJuego = true;
    sectionRight.appendChild(parrafo);
  }
};

// Función para poner banderas
const ponerBandera = (casillaActual) => {
  if (!finJuego && !casillaActual.boton.classList.contains("destapada")) {
    if (casillaActual.boton.classList.toggle("bandera"))
      casillaActual.boton.innerHTML =
        '<img class="img-bandera" src="img/bandera.png">';
    else casillaActual.boton.innerText = "";
  }
};

// Función para mostrar todas las bombas al terminar la partida
const mostrarBombas = (casillaActual) => {
  for (let i = 0; i < CANT_FILAS; i++) {
    for (let j = 0; j < CANT_COLUMNAS; j++) {
      if (tablero.matriz[i][j] == 1) {
        const idCasilla = i + "" + j;
        const casillaBomba = document.getElementById(idCasilla);
        if (casillaActual.boton.id != idCasilla) {
          casillaBomba.classList.add("bomba");
          casillaBomba.innerHTML =
            '<img class="img-bomba" src="img/bomba.png">';
        }
      }
    }
  }
};

// Refrescar la página para iniciar un nuevo juego
botonNuevoJuego.onclick = () => {
  location.reload();
};

// Cambiar la dificultad del juego
selectDificultad.onchange = () => {
  cant_minas =
    selectDificultad.value === "easy"
      ? 20
      : selectDificultad.value === "medium"
      ? 25
      : 30;
  sessionStorage.setItem("minas", cant_minas);
  sessionStorage.setItem("difficulty", selectDificultad.value);
  location.reload();
};

// ** Inicio del juego **
selectDificultad.value = sessionStorage.getItem("difficulty")
  ? sessionStorage.getItem("difficulty")
  : "medium";
const tablero = new Tablero();
