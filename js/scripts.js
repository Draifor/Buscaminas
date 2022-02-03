// ** Declaración de las constantes **
const CANT_FILAS = 10;
const CANT_COLUMNAS = 10;
const CANT_CASILLAS = CANT_FILAS * CANT_COLUMNAS;
const CANT_MINAS = 30;

// ** Declaración de variables **
let finJuego = false;
let contadorDestapadas = 0;
const parrafo = document.createElement("P");
const botonNuevoJuego = document.querySelector(".left button");
const sectionRight = document.querySelector("section.right");
const puntaje = document.getElementById("puntaje");
const cuadricula = document.querySelector("div.cuadricula");

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
    // Variables auxiliares
    let codigo;
    let contador = 0;

    // Crear la matriz y usar la función añadirCasilla() para crear los botones del tablero
    while (contador < CANT_MINAS) {
      for (let i = 0; i < CANT_FILAS; i++) {
        this.matriz.push([]);
        for (let j =  0; this.matriz[i].length < CANT_COLUMNAS;) {
          codigo = Math.round(Math.random());
          if (codigo == 1 && contador < CANT_MINAS) {
            this.matriz[i].push(codigo);
            contador++;
          } else if (codigo == 0) this.matriz[i].push(codigo);
          else continue;

          const casillaActual = {};
          casillaActual.fila = i;
          casillaActual.columna = j;

          this.añadirCasilla(casillaActual);
          j++;
        }
      }
    };
  }

  // Crear y añadir casillas (botones) al tablero
  añadirCasilla = (casillaActual) => {
    casillaActual.boton = document.createElement("BUTTON");
    casillaActual.boton.id = casillaActual.fila + "" + casillaActual.columna;
    casillaActual.boton.onclick = () => {
      if (!finJuego && !casillaActual.boton.classList.contains("bandera")){
        this.evaluar(casillaActual);
      }
    }
    casillaActual.boton.oncontextmenu = function(e) {
      e.preventDefault();
      ponerBandera(casillaActual);
    }
    cuadricula.appendChild(casillaActual.boton);
  }

  // Función para evaluar las coordenadas recibidas
  evaluar = (casillaActual) => {
    // Validación de la posición respecto a las minas
    if (this.matriz[casillaActual.fila][casillaActual.columna] == 1) {
      finJuego = true;
      casillaActual.boton.classList.add("bombaDet")
      casillaActual.boton.innerHTML = '<img class="img-bombaDet" src="img/bomba_det2.png" alt="explosion_bomba">';
      mostrarBombas(casillaActual);
      // puntaje.innerText = " " + Math.round((CANT_CASILLAS) * (contadorDestapadas / CANT_CASILLAS));
      parrafo.innerText = "¡Perdiste! Inténtalo de nuevo"
      sectionRight.appendChild(parrafo);
    } else {
      if (!casillaActual.boton.classList.contains("destapada")){
        const minas = minasAdyacentes(casillaActual);
        if (minas == 0) {
          destaparCasillasVacias(casillaActual);
          casillaActual.boton.classList.add("destapada");
        } else {
          casillaActual.boton.appendChild(document.createTextNode(minas));
          casillaActual.boton.style.backgroundColor = "rgba(101,178,198,1)";
          casillaActual.boton.classList.add("destapada");
          }
          contadorDestapadas++;
          puntaje.innerText = " " + Math.round((CANT_CASILLAS) * (contadorDestapadas / CANT_CASILLAS)) * 10;
          if (contadorDestapadas == CANT_CASILLAS - CANT_MINAS) {
            puntaje.innerText = " " + CANT_CASILLAS * 10;
            parrafo.innerText = "¡Ganaste! Enhorabuena"
            sectionRight.appendChild(parrafo);
          }
        }
    }
  }
};

// ** Definición de las funciones **

// Función para comprobar la cantidad de minas adyacentes
const minasAdyacentes = (casillaActual) => {
  let contador = 0;

  if (casillaActual.fila == 0) {
    if (casillaActual.columna == 0) {
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna + 1];
    } else if (casillaActual.columna > 0 && casillaActual.columna < CANT_COLUMNAS - 1) {
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna + 1];
    } else {
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
    }
  } else if (casillaActual.fila > 0 && casillaActual.fila < CANT_FILAS - 1) {
    if (casillaActual.columna == 0) {
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna + 1];
    } else if (casillaActual.columna > 0 && casillaActual.columna < CANT_COLUMNAS - 1) {
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna + 1];
    } else {
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila + 1][casillaActual.columna];
    }
  } else {
    if (casillaActual.columna == 0) {
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
    } else if (casillaActual.columna > 0 && casillaActual.columna < CANT_COLUMNAS - 1) {
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna + 1];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna + 1];
    } else {
      contador += tablero.matriz[casillaActual.fila][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna - 1];
      contador += tablero.matriz[casillaActual.fila - 1][casillaActual.columna];
    }
  }
  return contador;
};

// Función para destapar las casillas adyacentes que no tengan minas alrededor;
const destaparCasillasVacias = (casillaActual) => {
  casillaActual.boton.style.backgroundColor = "rgba(101,178,198,1)";
  let idCasilla;
  if (casillaActual.fila == 0) {
    if (casillaActual.columna == 0) {
      idCasilla = casillaActual.fila + 1;
    }
  }
}

// Función para poner banderas
const ponerBandera = (casillaActual) => {
  if (!finJuego && !casillaActual.boton.classList.contains("destapada")){
    if (casillaActual.boton.classList.toggle("bandera")) casillaActual.boton.innerHTML = '<img class="img-bandera" src="img/bandera.png">';
    else casillaActual.boton.innerText = "";
  }
}

// Función para mostrar todas las bombas al terminar la partida
const mostrarBombas = (casillaActual) => {
  for (let i = 0; i < CANT_FILAS; i++) {
    for (let j = 0; j < CANT_COLUMNAS; j++){
      if (tablero.matriz[i][j] == 1) {
        const idCasilla = i + "" + j;
        const casillaBomba = document.getElementById(idCasilla);
        if (casillaActual.boton.id != idCasilla) {
          casillaBomba.classList.add("bomba");
          casillaBomba.innerHTML = '<img class="img-bomba" src="img/bomba.png">';
        }
      }
    }
  }
}
// Refrescar la página para iniciar un nuevo juego
botonNuevoJuego.onclick = () => {
  location.reload();
}
// ** Inicio del juego **
const tablero = new Tablero();
console.log(tablero.matriz);
