/* E10 — Código con fallas de seguridad A PROPÓSITO.
   Es material de práctica: nunca pruebes estas técnicas en sistemas ajenos.
   Ábrelo con e10-seguridad.html.
*/

const API_KEY = "sk-demo-1234567890abcdef"; // clave de ejemplo (falsa)
const USUARIO_ADMIN = "admin";
const PASSWORD_ADMIN = "admin123";

const comentarios = [];

function publicarComentario() {
  const autor = document.querySelector("#autor").value;
  const texto = document.querySelector("#comentario").value;
  comentarios.push({ autor, texto });
  pintarComentarios();
}

function pintarComentarios() {
  const cont = document.querySelector("#lista");
  cont.innerHTML = "";
  for (const c of comentarios) {
    cont.innerHTML += "<div class='c'><b>" + c.autor + "</b>: " + c.texto + "</div>";
  }
}

function iniciarSesion() {
  const u = document.querySelector("#usuario").value;
  const p = document.querySelector("#password").value;
  if (u === USUARIO_ADMIN && p === PASSWORD_ADMIN) {
    localStorage.setItem("token", "admin-" + API_KEY);
    localStorage.setItem("esAdmin", "true");
    document.querySelector("#estado").textContent = "Sesión iniciada como administrador";
  } else {
    document.querySelector("#estado").textContent = "Credenciales incorrectas";
  }
}

function esAdmin() {
  return localStorage.getItem("esAdmin") === "true";
}

function calcular() {
  const expr = document.querySelector("#expresion").value;
  document.querySelector("#resultado").textContent = eval(expr);
}

function buscarUsuario(nombre) {
  // Simula la consulta que se enviaría al servidor
  return "SELECT * FROM usuarios WHERE nombre = '" + nombre + "'";
}
