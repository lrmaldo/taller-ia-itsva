/* E8 — Funciones a las que la IA debe escribir pruebas.
   Léelas con cuidado: el comentario dice lo que DEBERÍAN hacer.
   Si una prueba falla, decide tú si está mal la prueba o la función.
*/

/** Devuelve true si el texto se lee igual al derecho y al revés.
 *  Ignora mayúsculas, espacios, acentos y signos. */
function esPalindromo(texto) {
  const limpio = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");
  return limpio === limpio.split("").reverse().join("");
}

/** Aplica un descuento y devuelve el precio final.
 *  precio no puede ser negativo; porcentaje debe estar entre 0 y 100.
 *  Lanza Error si los datos no son válidos. */
function calcularDescuento(precio, porcentaje) {
  if (precio < 0 || porcentaje < 0 || porcentaje > 100) {
    throw new Error("Datos inválidos");
  }
  return precio * (1 - porcentaje / 100);
}

/** Devuelve true si la contraseña tiene AL MENOS 8 caracteres,
 *  al menos una mayúscula y al menos un número. */
function validarContrasena(pwd) {
  return pwd.length > 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);
}

/** Clasifica un triángulo: 'equilatero', 'isosceles' o 'escaleno'.
 *  Lanza Error si los lados no forman un triángulo válido
 *  (lados positivos y la suma de dos cualesquiera mayor que el tercero). */
function clasificarTriangulo(a, b, c) {
  if (a === b && b === c) return "equilatero";
  if (a === b || b === c || a === c) return "isosceles";
  return "escaleno";
}

/** Formatea un número como moneda mexicana: 1234.5 -> "$1,234.50" */
function formatoMoneda(n) {
  return "$" + n.toFixed(2);
}
