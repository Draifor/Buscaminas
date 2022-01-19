/*
Usa JavaScript para crear un algoritmo que reciba dos coordenadas y determine si las coordenadas serián válidas para el tamaño de tu tablero de juego
Añade al algoritmo la validación de que sean números enteros
*/

//* Declaración de variables
let fila;
let columna;
let hayBomba = false;
let tablero;

/* Inicialización del tablero, los ceros representan las posiciones
seguras, los unos representan las bombas */
tablero = [[0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0], [1, 0, 0, 1]];

do {
  //* Ingreso de datos
  fila = parseInt(prompt("Ingrese el número de la fila:"));
  columna = parseInt(prompt("Ingrese el número de la columna:"));

  //* Validación de las coordenadas
  if (fila <= 0 || fila > 4)
    alert("Número de fila incorrecto.");
  else if (columna <= 0 || columna > 4)
    alert("Número de columna incorrecto.");

  // Validación de la posición respecto a las bombas
  if (tablero[fila - 1][columna - 1] == 1) {
    alert("Kaboooooooooooommmm!!!!");
    hayBomba = true;
  } else {
    alert("Bien hecho, una vez más");
  }
}while (!hayBomba);
