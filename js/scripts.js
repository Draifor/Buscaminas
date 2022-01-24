/*
Crea una función que determine el número de bombas adyacentes a la
coordenada que se acaba de ingresar.
*/

//* Declaración de variables
let detonarBomba = false;
let tablero = [];

// Declaración de constantes
const CANT_CASILLAS = 16;
const CANT_FILAS = 4;
const CANT_COLUMNAS = 4;

// Función para pedir las coordenadas
const jugar = () => {
  let ejeX = parseInt(prompt("Ingrese el número de la fila:")) - 1;
  let ejeY = parseInt(prompt("Ingrese el número de la columna:")) - 1;

  evaluar(ejeX, ejeY);
  console.log(tabl)
};

// Función para evaluar las coordenadas recibidas
//* Evaluar el rango de las coordenadas
const evaluar = (ejeX, ejeY) => {
  if (ejeX < 0 || ejeX + 1 > tablero.length)
    alert("Número de fila incorrecto.");
  else if (ejeY < 0 || ejeY + 1 > tablero[ejeX].length)
    alert("Número de columna incorrecto.");

  //* Validación de la posición respecto a las bombas
  if (tablero[ejeX][ejeY] == 1) {
    alert("Kaboooooooooooommmm!!!!");
    detonarBomba = true;
  } else alert(`Hay ${bombasAdyacentes(ejeX, ejeY)} bombas alrededor`);
};

// Función para inicializar el tablero
const inicializarTablero = (cantBombas) => {
  let codigo;
  let contador = 0;
  for (let i = 0; i < CANT_FILAS; i++) {
    tablero.push([]);
    while (tablero[i].length < CANT_COLUMNAS) {
      codigo = Math.round(Math.random());
      if (codigo == 1 && contador < cantBombas) {
        tablero[i].push(codigo);
        contador++;
      } else if (codigo == 0) tablero[i].push(codigo);
    }
  }
};

// Función para comprobar la cantidad de bombas adyacentes
const bombasAdyacentes = (ejeX, ejeY) => {
  let contador = 0;

  if (ejeX == 0) {
    if (ejeY == 0) {
      contador += tablero[ejeX][ejeY + 1];
      contador += tablero[ejeX + 1][ejeY];
      contador += tablero[ejeX + 1][ejeY + 1];
    } else if (ejeY > 0 && ejeY < CANT_COLUMNAS - 1) {
      contador += tablero[ejeX][ejeY - 1];
      contador += tablero[ejeX][ejeY + 1];
      contador += tablero[ejeX + 1][ejeY - 1];
      contador += tablero[ejeX + 1][ejeY];
      contador += tablero[ejeX + 1][ejeY + 1];
    } else {
      contador += tablero[ejeX][ejeY - 1];
      contador += tablero[ejeX + 1][ejeY - 1];
      contador += tablero[ejeX + 1][ejeY];
    }
  } else if (ejeX > 0 && ejeX < CANT_FILAS - 1) {
    if (ejeY == 0) {
      contador += tablero[ejeX - 1][ejeY];
      contador += tablero[ejeX - 1][ejeY + 1];
      contador += tablero[ejeX][ejeY + 1];
      contador += tablero[ejeX + 1][ejeY];
      contador += tablero[ejeX + 1][ejeY + 1];
    } else if (ejeY > 0 && ejeY < CANT_COLUMNAS - 1) {
      contador += tablero[ejeX - 1][ejeY - 1];
      contador += tablero[ejeX - 1][ejeY];
      contador += tablero[ejeX - 1][ejeY + 1];
      contador += tablero[ejeX][ejeY - 1];
      contador += tablero[ejeX][ejeY + 1];
      contador += tablero[ejeX + 1][ejeY - 1];
      contador += tablero[ejeX + 1][ejeY];
      contador += tablero[ejeX + 1][ejeY + 1];
    } else {
      contador += tablero[ejeX - 1][ejeY - 1];
      contador += tablero[ejeX - 1][ejeY];
      contador += tablero[ejeX][ejeY - 1];
      contador += tablero[ejeX + 1][ejeY - 1];
      contador += tablero[ejeX + 1][ejeY];
    }
  } else {
    if (ejeY == 0) {
      contador += tablero[ejeX - 1][ejeY];
      contador += tablero[ejeX - 1][ejeY + 1];
      contador += tablero[ejeX][ejeY + 1];
    } else if (ejeY > 0 && ejeY < CANT_COLUMNAS - 1) {
      contador += tablero[ejeX][ejeY - 1];
      contador += tablero[ejeX][ejeY + 1];
      contador += tablero[ejeX - 1][ejeY - 1];
      contador += tablero[ejeX - 1][ejeY];
      contador += tablero[ejeX - 1][ejeY + 1];
    } else {
      contador += tablero[ejeX][ejeY - 1];
      contador += tablero[ejeX - 1][ejeY - 1];
      contador += tablero[ejeX - 1][ejeY];
    }
  }
  return contador;
};

// Inicio del juego
inicializarTablero(6);
console.log(tablero);
do {
  jugar();
} while (!detonarBomba);
