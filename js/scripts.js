/*
Crea una clase tablero que tenga como características la matriz del tablero
Mueve la función evaluar(x,y) a la clase tablero
Haz un refactor al código y usa un constructor para crear el tablero, usa el
objeto creado para interactuar en tus algoritmos y usar la función evaluar(x,y)
desde el objeto
*/
// ** Declaración de las constantes **
const CANT_FILAS = 4;
const CANT_COLUMNAS = 4;
const CANT_MINAS = 6;

// ** Declaración de variables **
let detonarMina = false;

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

    while (contador < CANT_MINAS) {
      for (let i = 0; i < CANT_FILAS; i++) {
        this.matriz.push([]);
        while (this.matriz[i].length < CANT_COLUMNAS) {
          codigo = Math.round(Math.random());
          if (codigo == 1 && contador < CANT_MINAS) {
            this.matriz[i].push(codigo);
            contador++;
          } else if (codigo == 0) this.matriz[i].push(codigo);
        }
      }
    }
  };

  // Función para evaluar las coordenadas recibidas
  evaluar = (fila, columna) => {
    // Evaluar el rango de las coordenadas
    if (fila < 0 || fila + 1 > this.matriz.length)
      return alert("Número de fila incorrecto.");
    else if (columna < 0 || columna + 1 > this.matriz[fila].length)
      return alert("Número de columna incorrecto.");

    // Validación de la posición respecto a las minas
    if (this.matriz[fila][columna] == 1) {
      alert("Kaboooooooooooommmm!!!!");
      detonarMina = true;
    } else alert(`Hay ${minasAdyacentes(fila, columna)} minas alrededor`);
  }
};

// ** Definición de las funciones **

// Función para pedir las coordenadas
const jugar = (tablero) => {
  let fila = parseInt(prompt("Ingrese el número de la fila:")) - 1;
  let columna = parseInt(prompt("Ingrese el número de la columna:")) - 1;

  tablero.evaluar(fila, columna);
};

// Función para comprobar la cantidad de minas adyacentes
const minasAdyacentes = (fila, columna) => {
  let contador = 0;

  if (fila == 0) {
    if (columna == 0) {
      contador += tablero.matriz[fila][columna + 1];
      contador += tablero.matriz[fila + 1][columna];
      contador += tablero.matriz[fila + 1][columna + 1];
    } else if (columna > 0 && columna < CANT_COLUMNAS - 1) {
      contador += tablero.matriz[fila][columna - 1];
      contador += tablero.matriz[fila][columna + 1];
      contador += tablero.matriz[fila + 1][columna - 1];
      contador += tablero.matriz[fila + 1][columna];
      contador += tablero.matriz[fila + 1][columna + 1];
    } else {
      contador += tablero.matriz[fila][columna - 1];
      contador += tablero.matriz[fila + 1][columna - 1];
      contador += tablero.matriz[fila + 1][columna];
    }
  } else if (fila > 0 && fila < CANT_FILAS - 1) {
    if (columna == 0) {
      contador += tablero.matriz[fila - 1][columna];
      contador += tablero.matriz[fila - 1][columna + 1];
      contador += tablero.matriz[fila][columna + 1];
      contador += tablero.matriz[fila + 1][columna];
      contador += tablero.matriz[fila + 1][columna + 1];
    } else if (columna > 0 && columna < CANT_COLUMNAS - 1) {
      contador += tablero.matriz[fila - 1][columna - 1];
      contador += tablero.matriz[fila - 1][columna];
      contador += tablero.matriz[fila - 1][columna + 1];
      contador += tablero.matriz[fila][columna - 1];
      contador += tablero.matriz[fila][columna + 1];
      contador += tablero.matriz[fila + 1][columna - 1];
      contador += tablero.matriz[fila + 1][columna];
      contador += tablero.matriz[fila + 1][columna + 1];
    } else {
      contador += tablero.matriz[fila - 1][columna - 1];
      contador += tablero.matriz[fila - 1][columna];
      contador += tablero.matriz[fila][columna - 1];
      contador += tablero.matriz[fila + 1][columna - 1];
      contador += tablero.matriz[fila + 1][columna];
    }
  } else {
    if (columna == 0) {
      contador += tablero.matriz[fila - 1][columna];
      contador += tablero.matriz[fila - 1][columna + 1];
      contador += tablero.matriz[fila][columna + 1];
    } else if (columna > 0 && columna < CANT_COLUMNAS - 1) {
      contador += tablero.matriz[fila][columna - 1];
      contador += tablero.matriz[fila][columna + 1];
      contador += tablero.matriz[fila - 1][columna - 1];
      contador += tablero.matriz[fila - 1][columna];
      contador += tablero.matriz[fila - 1][columna + 1];
    } else {
      contador += tablero.matriz[fila][columna - 1];
      contador += tablero.matriz[fila - 1][columna - 1];
      contador += tablero.matriz[fila - 1][columna];
    }
  }
  return contador;
};

// ** Inicio del juego **
// const tablero = new Tablero(CANT_FILAS, CANT_COLUMNAS, CANT_MINAS);
// console.log(tablero.matriz);

// do {
//   jugar(tablero);
// } while (!detonarMina);
