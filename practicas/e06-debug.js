/* E6 — Depuración con IA.
   Este archivo calcula estadísticas de ventas y las pinta en la página.
   Ábrelo con e06-debug.html (clic derecho → Open with Live Server, o abre el HTML en el navegador).

   Salida CORRECTA que deberías ver cuando esté arreglado:
     Total: 1250
     Promedio: 250
     Mayor venta: 600
     Ventas sobre el promedio: 2
*/

const VENTAS = [100, 600, 300, 150, 100];

function total(ventas) {
  let suma = 0;
  for (let i = 1; i < ventas.length; i++) {
    suma += ventas[i];
  }
  return suma;
}

function promedio(ventas) {
  return total(ventas) / (ventas.length - 1);
}

function mayorVenta(ventas) {
  let mayor = ventas[0];
  for (const v of ventas) {
    if (v < mayor) {
      mayor = v;
    }
  }
  return mayor;
}

function ventasSobrePromedio(ventas) {
  let cuantas = 0;
  for (const v of ventas) {
    if (v > promedio) {
      cuantas++;
    }
  }
  return cuantas;
}

function mostrarResultados() {
  document.querySelector("#total").textContent = total(VENTAS);
  document.querySelector("#promedio").textContent = promedio(VENTAS);
  document.querySelector("#mayor").textContent = mayorVenta(VENTAS);
  document.querySelector("#sobre").textContent = ventasSobrePromedio(VENTAS);
}

document.addEventListener("DOMContentLoaded", mostrarResultados);
