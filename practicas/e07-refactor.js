/* E1 y E7 — Código difícil de leer, para explicar y refactorizar.
   Funciona correctamente: genera un reporte de calificaciones.
   Ábrelo con e07-refactor.html.
   REGLA DEL EJERCICIO: al refactorizar, la salida debe quedar IDÉNTICA.
*/

function p(d) {
  var r = [];
  for (var i = 0; i < d.length; i++) {
    var x = d[i];
    var t = 0;
    for (var j = 0; j < x[1].length; j++) {
      t = t + x[1][j];
    }
    var a = t / x[1].length;
    var n;
    if (a >= 90) {
      n = "Excelente";
    } else {
      if (a >= 80) {
        n = "Notable";
      } else {
        if (a >= 70) {
          n = "Suficiente";
        } else {
          n = "Reprobado";
        }
      }
    }
    var s;
    if (a < 70) {
      s = "NO";
    } else {
      s = "SI";
    }
    r.push(x[0] + ": " + a.toFixed(1) + " - " + n + " - Acredita: " + s);
  }
  var m = 0;
  var q = "";
  for (var k = 0; k < d.length; k++) {
    var t2 = 0;
    for (var l = 0; l < d[k][1].length; l++) {
      t2 = t2 + d[k][1][l];
    }
    var a2 = t2 / d[k][1].length;
    if (a2 > m) {
      m = a2;
      q = d[k][0];
    }
  }
  r.push("Mejor promedio: " + q + " (" + m.toFixed(1) + ")");
  return r;
}

const GRUPO = [
  ["Ana", [95, 88, 92]],
  ["Luis", [70, 65, 80]],
  ["Marta", [100, 90, 85]],
  ["Pedro", [50, 60, 40]],
];

document.addEventListener("DOMContentLoaded", function () {
  const ul = document.querySelector("#reporte");
  p(GRUPO).forEach(function (linea) {
    const li = document.createElement("li");
    li.textContent = linea;
    ul.appendChild(li);
  });
});
