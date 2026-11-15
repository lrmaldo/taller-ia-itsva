/* Proyecto del día 3 — Gestor de tareas.
   Punto de partida: solo el esqueleto. Construye cada parte con la IA,
   una a la vez, probando en el navegador después de cada pieza.

   Orden sugerido (así lo pide el ejercicio E11):
   1. almacenamiento: cargarTareas() y guardarTareas()
   2. operaciones:    agregarTarea(), completarTarea(), borrarTarea()
   3. interfaz:       pintarTareas()
   4. eventos:        enlazar el formulario y los botones
*/

const CLAVE = "taller-tareas";

let tareas = [];

// --- 1. Almacenamiento -------------------------------------------------
function cargarTareas() {
  // TODO: leer de localStorage; si no hay nada o está corrupto, devolver []
}

function guardarTareas() {
  // TODO: escribir el arreglo `tareas` en localStorage
}

// --- 2. Operaciones ----------------------------------------------------
function agregarTarea(titulo) {
  // TODO: crear { id, titulo, completada: false } y guardarlo
}

function completarTarea(id) {
  // TODO
}

function borrarTarea(id) {
  // TODO
}

// --- 3. Interfaz -------------------------------------------------------
function pintarTareas() {
  // TODO: dibujar la lista en #lista-tareas y mostrar/ocultar #vacio
}

// --- 4. Arranque -------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // TODO: cargar tareas, pintarlas y enlazar el formulario
});
