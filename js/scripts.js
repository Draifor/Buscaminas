/*
Usa JavaScript para crear un algoritmo que reciba dos coordenadas y determine si las coordenadas serián válidas para el tamaño de tu tablero de juego
Añade al algoritmo la validación de que sean números enteros
*/

//* Declaración de variables
let ejeX;
let ejeY;

//* Ingreso de datos
ejeY = parseInt(prompt("Ingrese el número de la fila:"));
ejeX = parseInt(prompt("Ingrese el número de la columna:"));

//* Validación
if (ejeY <= 0 || ejeY > 4)
    alert("Número de fila incorrecto.");
else if (ejeX <= 0 || ejeX > 4)
    alert("Número de columna incorrecto.")
