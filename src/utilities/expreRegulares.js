
export const exRegFecha = /^\d{2}\/\d{2}\/\d{4}$/;     // Formato: dd/mm/yyyy
const exRegMod = /^M0\d/;


// Ejemplo de uso de las expresiones regulares (RegEx)
const string = '415x';
const cadena = "Hola 123 Mundo 456!";

const numRegex = /\d+/g;
const letterRegex = /[a-zA-Z]+/g;

const nums = cadena.match(numRegex);       // ['415', ...otherNums]
const letters = cadena.match(letterRegex); // ['x', ...otherLetters]
