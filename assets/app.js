(function () {
  const T = window.TALLER;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const store = {
    get(k, d) { try { const v = localStorage.getItem("taller-ia:" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("taller-ia:" + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };

  const instructor = new URLSearchParams(location.search).has("i");
  let done = store.get("done", {});
  let prep = store.get("prep", {});
  let codigos = store.get("codigos", {});
  let obs = store.get("obs", {});        // { e6: { 0: "ok", 1: "fallo", nota: "…" } }

  const IDS = Object.keys(T.ejercicios);
  const numero = (id) => IDS.indexOf(id) + 1;

  const TIPOS = {
    teoria:   { etiqueta: "Teoría",   clase: "bg-sky-100 text-sky-800" },
    practica: { etiqueta: "Práctica", clase: "bg-indigo-100 text-indigo-800" },
    descanso: { etiqueta: "Descanso", clase: "bg-slate-100 text-slate-600" },
    comida:   { etiqueta: "Comida",   clase: "bg-amber-100 text-amber-800" },
    cierre:   { etiqueta: "Cierre",   clase: "bg-emerald-100 text-emerald-800" }
  };

  // ======================= utilidades de interfaz =======================
  function copiar(texto, boton) {
    const original = boton.innerHTML;
    const ok = () => {
      boton.innerHTML = "✓ Copiado";
      boton.classList.add("!bg-emerald-600");
      setTimeout(() => { boton.innerHTML = original; boton.classList.remove("!bg-emerald-600"); }, 1500);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(ok, fallback);
    } else { fallback(); }
    function fallback() {
      const ta = document.createElement("textarea");
      ta.value = texto; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) { /* nada */ }
      document.body.removeChild(ta);
    }
  }

  function bloqueCodigo(id, texto, etiqueta) {
    return `
      <div class="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-sm">
        <div class="flex items-center justify-between gap-2 border-b border-slate-700 bg-slate-800 px-3 py-2">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">${esc(etiqueta)}</span>
          <button type="button" data-copiar="${id}" class="rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-400">Copiar</button>
        </div>
        <pre id="${id}" class="overflow-x-auto p-3.5 font-mono text-[13px] leading-relaxed text-slate-100 whitespace-pre-wrap break-words">${esc(texto)}</pre>
      </div>`;
  }

  // ======================= runner de retos =======================
  // Cómo se aísla el código del alumno:
  //  1. Un iframe con sandbox="allow-scripts" (origen opaco: no ve la página,
  //     ni su localStorage, ni sus cookies).
  //  2. Dentro del iframe, el código corre en un Web Worker. Así un bucle
  //     infinito no congela nada y, al vencer los 4 s, quitar el iframe mata
  //     al worker. Si el navegador no permite el worker, corre en el iframe.
  const LIMITE_MS = 4000;

  // Se serializa con String() y se ejecuta en el worker: no debe usar nada
  // de fuera de su propio cuerpo.
  function evaluarReto(d) {
    function iguales(a, b) {
      if (typeof a === "number" && typeof b === "number") {
        return (isNaN(a) && isNaN(b)) || Math.abs(a - b) < 0.005;
      }
      if (a && b && typeof a === "object" && typeof b === "object") {
        if (Array.isArray(a) !== Array.isArray(b)) return false;
        var ka = Object.keys(a), kb = Object.keys(b);
        if (ka.length !== kb.length) return false;
        for (var i = 0; i < ka.length; i++) {
          if (!Object.prototype.hasOwnProperty.call(b, ka[i]) || !iguales(a[ka[i]], b[ka[i]])) return false;
        }
        return true;
      }
      return a === b;
    }
    function mostrar(v) {
      if (v === undefined) return "undefined (no devolvió nada)";
      if (typeof v === "function") return "una función";
      if (typeof v === "number" && !isFinite(v)) return String(v);
      try { return JSON.stringify(v); } catch (e) { return String(v); }
    }

    var obtener;
    try {
      obtener = new Function(d.codigo + "\n;return function (n) { try { return eval(n); } catch (e) { return undefined; } };")();
    } catch (err) {
      var tipo = err && err.name === "SyntaxError" ? "Error de sintaxis en tu código: " : "Tu código lanzó un error al cargarse: ";
      return { tipo: "error", mensaje: tipo + (err && err.message ? err.message : String(err)) };
    }

    var salida = [];
    for (var i = 0; i < d.casos.length; i++) {
      var c = d.casos[i];
      var nombre = c.fn || d.fn;
      var esperado = c.lanza ? "que lance un Error" : mostrar(c.esperado);
      var f = obtener(nombre);
      if (typeof f !== "function") {
        salida.push({ ok: false, desc: c.desc, esperado: esperado, obtenido: "No encontré la función " + nombre + "(). Revisa el nombre." });
        continue;
      }
      var r, lanzo = false, msg = "";
      try { r = f.apply(null, JSON.parse(JSON.stringify(c.args))); }
      catch (e) { lanzo = true; msg = e && e.message ? e.message : String(e); }
      var obtenido = lanzo ? "Lanzó Error: " + msg : mostrar(r);
      var ok = c.lanza ? lanzo : (!lanzo && iguales(r, c.esperado));
      salida.push({ ok: ok, desc: c.desc, esperado: esperado, obtenido: obtenido });
    }
    return { tipo: "resultado", salida: salida };
  }

  const RUNNER_HTML = `<!doctype html><html><body><script>
addEventListener("message", function (ev) {
  var d = ev.data || {};
  var evaluar = new Function("return " + d.evaluar)();
  var w = null;
  try {
    var src = "var evaluar = " + d.evaluar + ";\\nonmessage = function (e) { postMessage(evaluar(e.data)); };";
    w = new Worker(URL.createObjectURL(new Blob([src], { type: "text/javascript" })));
  } catch (e) { w = null; }
  if (!w) { parent.postMessage(evaluar(d.datos), "*"); return; }
  w.onmessage = function (m) { parent.postMessage(m.data, "*"); w.terminate(); };
  w.onerror = function (e) { e.preventDefault(); parent.postMessage({ tipo: "error", mensaje: "Error al ejecutar: " + e.message }, "*"); };
  w.postMessage(d.datos);
});
parent.postMessage({ tipo: "listo" }, "*");
<\/script></body></html>`;

  function ejecutarReto(codigo, reto, cb) {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.setAttribute("title", "Ejecutor de pruebas");
    iframe.style.display = "none";
    let terminado = false;

    const limpiar = () => {
      window.removeEventListener("message", alMensaje);
      clearTimeout(temporizador);
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    };

    function alMensaje(ev) {
      if (ev.source !== iframe.contentWindow || !ev.data) return;
      if (ev.data.tipo === "listo") {
        iframe.contentWindow.postMessage({
          evaluar: String(evaluarReto),
          datos: { codigo, casos: reto.casos, fn: reto.fn }
        }, "*");
        return;
      }
      if (terminado) return;
      terminado = true;
      const d = ev.data;
      limpiar();
      if (d.tipo === "error") cb({ error: d.mensaje });
      else cb({ salida: d.salida });
    }

    const temporizador = setTimeout(() => {
      if (terminado) return;
      terminado = true;
      limpiar();
      cb({ error: `Tu código tardó más de ${LIMITE_MS / 1000} segundos y lo detuve. Suele ser un bucle infinito: revisa las condiciones de tus ciclos.`, timeout: true });
    }, LIMITE_MS);

    window.addEventListener("message", alMensaje);
    iframe.srcdoc = RUNNER_HTML;
    document.body.appendChild(iframe);
  }

  function pintarResultado(id, res) {
    const cont = document.getElementById("res-" + id);
    if (!cont) return;
    if (res.error) {
      cont.innerHTML = `<div data-estado="${res.timeout ? "timeout" : "error"}" class="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">${esc(res.error)}</div>`;
      return;
    }
    const pasaron = res.salida.filter((r) => r.ok).length;
    const total = res.salida.length;
    const todo = pasaron === total;
    const filas = res.salida.map((r) => `
      <li data-caso="${r.ok ? "ok" : "falla"}" class="flex gap-2.5 rounded-lg px-3 py-2 ${r.ok ? "bg-emerald-50" : "bg-rose-50"}">
        <span class="mt-0.5 shrink-0 font-bold ${r.ok ? "text-emerald-600" : "text-rose-600"}">${r.ok ? "✓" : "✗"}</span>
        <div class="min-w-0">
          <p class="text-sm font-medium ${r.ok ? "text-emerald-900" : "text-rose-900"}">${esc(r.desc)}</p>
          <p class="mt-0.5 break-words font-mono text-xs ${r.ok ? "text-emerald-700" : "text-rose-700"}"><span class="font-sans font-semibold">Esperado:</span> ${esc(r.esperado)}</p>
          <p class="break-words font-mono text-xs ${r.ok ? "text-emerald-700" : "text-rose-700"}"><span class="font-sans font-semibold">Devuelto:</span> ${esc(r.obtenido)}</p>
        </div>
      </li>`).join("");
    cont.innerHTML = `
      <div data-estado="${todo ? "aprobado" : "pendiente"}" class="rounded-xl border ${todo ? "border-emerald-300 bg-emerald-50/60" : "border-slate-200 bg-slate-50"} p-3">
        <p class="mb-2 text-sm font-semibold ${todo ? "text-emerald-800" : "text-slate-700"}">
          ${todo ? "¡Listo! " : ""}${pasaron} de ${total} casos correctos${todo ? " 🎉" : ""}
        </p>
        <ul class="space-y-1.5">${filas}</ul>
      </div>`;

    if (todo) marcarHecho(id, true);
  }

  function marcarHecho(id, valor) {
    done[id] = valor;
    store.set("done", done);
    const chk = document.querySelector(`[data-done="${id}"]`);
    if (chk) chk.checked = valor;
    const card = document.getElementById("ej-" + id);
    if (card) {
      card.classList.toggle("border-emerald-300", valor);
      card.classList.toggle("bg-emerald-50/30", valor);
      card.classList.toggle("border-slate-200", !valor);
      card.classList.toggle("bg-white", !valor);
    }
    actualizarProgreso();
  }

  // ======================= registro de observación =======================
  // El alumno marca qué hizo el modelo en cada pregunta. No afecta «Hecho»:
  // es el dato que se comparte al cierre del día para comparar tamaños de modelo.
  const OPCIONES_OBS = [
    { v: "ok",      t: "Acertó",   s: "✓", c: "peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-checked:text-white" },
    { v: "medio",   t: "A medias", s: "~", c: "peer-checked:border-amber-500 peer-checked:bg-amber-500 peer-checked:text-white" },
    { v: "fallo",   t: "Falló",    s: "✗", c: "peer-checked:border-rose-600 peer-checked:bg-rose-600 peer-checked:text-white" },
    { v: "invento", t: "Inventó",  s: "!", c: "peer-checked:border-violet-600 peer-checked:bg-violet-600 peer-checked:text-white" }
  ];

  function bloqueObservar(id, e) {
    const o = obs[id] || {};
    const filas = e.observar.map((q, k) => `
      <li class="rounded-lg bg-white p-3 ring-1 ring-slate-200">
        <p class="text-sm text-slate-800"><span class="mr-1 font-semibold text-sky-700">${k + 1}.</span>${esc(q)}</p>
        <div class="mt-2 flex flex-wrap gap-1.5" role="radiogroup" aria-label="${esc(q)}">
          ${OPCIONES_OBS.map((op) => `
            <label class="cursor-pointer">
              <input type="radio" class="peer sr-only" name="obs-${id}-${k}" value="${op.v}" data-obs="${id}" data-k="${k}" ${o[k] === op.v ? "checked" : ""}>
              <span class="inline-block rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 peer-focus-visible:ring-2 peer-focus-visible:ring-sky-500 ${op.c}">${op.t}</span>
            </label>`).join("")}
        </div>
      </li>`).join("");
    return `
      <div class="rounded-xl border-2 border-sky-200 bg-sky-50/60 p-4">
        <div class="mb-1 flex items-center gap-2">
          <span class="rounded-lg bg-sky-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">Observa</span>
          <span class="text-sm font-semibold text-sky-950">¿Qué hizo el modelo?</span>
        </div>
        <p class="mb-3 text-sm text-sky-900">Registra lo que respondió la IA, no lo que corregiste tú. Que falle no está mal: es justo lo que estamos midiendo.</p>
        <ol class="space-y-2">${filas}</ol>
        <textarea data-obs-nota="${id}" rows="2" class="mt-3 block w-full rounded-xl border-slate-300 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500" placeholder="Nota libre: qué te sorprendió, cuántos intentos le tomó, si tuviste que abrir otro chat…">${esc(o.nota || "")}</textarea>
      </div>`;
  }

  function guardarObs(id, k, valor) {
    obs[id] = obs[id] || {};
    obs[id][k] = valor;
    store.set("obs", obs);
    pintarResumen();
  }

  // Resumen del día: conteos y un texto listo para copiar a la bitácora o dictar al cierre.
  function pintarResumen() {
    const cont = document.getElementById("obs-resumen");
    if (!cont) return;
    const dia = cont.dataset.dia;
    const ids = IDS.filter((id) => T.ejercicios[id].dia === dia && T.ejercicios[id].observar);
    const nivel = store.get("nivel", "ligero");
    const modelo = (T.niveles[nivel] || T.niveles.ligero).chat;
    const cuenta = { ok: 0, medio: 0, fallo: 0, invento: 0 };
    let total = 0, marcadas = 0;
    const lineas = ids.map((id) => {
      const e = T.ejercicios[id], o = obs[id] || {};
      const marcas = e.observar.map((_, k) => {
        total++;
        const op = OPCIONES_OBS.find((x) => x.v === o[k]);
        if (!op) return "·";
        marcadas++; cuenta[op.v]++;
        return op.s;
      }).join(" ");
      const aciertos = e.observar.filter((_, k) => o[k] === "ok").length;
      return `E${numero(id)} ${e.titulo}: ${marcas}  (${aciertos}/${e.observar.length})${o.nota ? "\n   Nota: " + o.nota : ""}`;
    });
    const texto = `Día ${dia.slice(1)} · modelo ${modelo}\n` +
      `Acertó ${cuenta.ok} · A medias ${cuenta.medio} · Falló ${cuenta.fallo} · Inventó ${cuenta.invento}  (${marcadas} de ${total} registradas)\n` +
      `Clave: ✓ acertó  ~ a medias  ✗ falló  ! inventó  · sin registrar\n\n` + lineas.join("\n");

    const pct = total ? Math.round((cuenta.ok / total) * 100) : 0;
    $("#obs-modelo").value = nivel;
    $("#obs-conteos").innerHTML = OPCIONES_OBS.map((op) => `
      <div data-conteo="${op.v}" class="rounded-xl bg-white px-3 py-2 text-center ring-1 ring-slate-200">
        <p class="text-2xl font-bold tabular-nums text-slate-900">${cuenta[op.v]}</p>
        <p class="text-xs font-medium text-slate-500">${op.t}</p>
      </div>`).join("");
    $("#obs-pct").textContent = `${pct}% de aciertos limpios · ${marcadas} de ${total} preguntas registradas`;
    $("#obs-texto").textContent = texto;
  }

  function seccionResumen(d) {
    const tiene = IDS.some((id) => T.ejercicios[id].dia === d.id && T.ejercicios[id].observar);
    if (!tiene) return "";
    const opciones = Object.entries(T.niveles)
      .map(([k, v]) => `<option value="${k}">${esc(v.chat)} (${esc(v.nombre)})</option>`).join("");
    return `
      <div id="obs-resumen" data-dia="${d.id}" class="scroll-mt-24 space-y-4 rounded-2xl border-2 border-sky-300 bg-sky-50 p-5">
        <div>
          <h3 class="text-lg font-bold text-sky-950">Tu resumen del día: ¿cómo le fue al modelo?</h3>
          <p class="mt-1 text-sm text-sky-900">Se arma solo con lo que registraste en cada «Observa». Al cierre lo compartimos para comparar modelos de distinto tamaño.</p>
        </div>
        <label class="block text-sm font-medium text-slate-700">Modelo que usaste hoy
          <select id="obs-modelo" class="mt-1 block w-full rounded-xl border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:w-auto">${opciones}</select>
        </label>
        <div id="obs-conteos" class="grid grid-cols-2 gap-2 sm:grid-cols-4"></div>
        <p id="obs-pct" class="text-sm font-semibold text-sky-900"></p>
        ${bloqueCodigo("obs-texto", "", "Para tu bitácora")}
      </div>`;
  }

  // ======================= progreso =======================
  function actualizarProgreso() {
    const n = IDS.filter((k) => done[k]).length;
    const pct = Math.round((n / IDS.length) * 100);
    const t = $("#progreso-texto");
    if (t) t.textContent = `${n} de ${IDS.length} ejercicios`;
    const b = $("#progreso-barra");
    if (b) b.style.width = pct + "%";
  }

  // ======================= generador de configuración =======================
  function generarConfig() {
    const nivel = T.niveles[$("#cfg-nivel").value];
    const modo = $("#cfg-modo").value;
    const ip = ($("#cfg-ip").value || "IP-DEL-INSTRUCTOR").trim();
    const conAuto = $("#cfg-auto").checked;
    const apiBase = modo === "servidor" ? `\n    apiBase: http://${ip}:11434` : "";
    let y = `# Taller ISC'2026 — equipos limitados.\n# Sin rol de agente: los modelos pequeños no manejan herramientas.\nname: Taller IA ITSVA\nversion: 1.0.0\nschema: v1\nmodels:\n  - name: Chat y edición (${nivel.chat})\n    provider: ollama\n    model: ${nivel.chat}${apiBase}\n    roles:\n      - chat\n      - edit`;
    if (conAuto) {
      y += `\n  - name: Autocompletado (${nivel.auto})\n    provider: ollama\n    model: ${nivel.auto}${apiBase}\n    roles:\n      - autocomplete`;
    }
    const modelos = Array.from(new Set([nivel.chat].concat(conAuto ? [nivel.auto] : [])));
    $("#cfg-yaml").textContent = y;
    $("#cfg-pull").textContent = modo === "local"
      ? modelos.map((m) => "ollama pull " + m).join("\n")
      : "# No necesitas descargar modelos: usarás el servidor del instructor.";
    $("#cfg-ram").textContent = modo === "local"
      ? `Para ${nivel.ram}. Descarga de ${nivel.peso}. ${nivel.nota}`
      : "Los modelos corren en el equipo del instructor; el tuyo solo necesita VS Code y Continue.";
    $("#cfg-ip-wrap").classList.toggle("hidden", modo !== "servidor");
  }

  // ======================= secciones =======================
  function seccionPrep() {
    const items = T.preparacion.map((p, i) => `
      <li>
        <label class="flex cursor-pointer items-start gap-3 rounded-xl p-2.5 transition hover:bg-slate-50">
          <input type="checkbox" data-prep="${p.id}" class="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${prep[p.id] ? "checked" : ""}>
          <span class="text-slate-700"><span class="mr-1.5 font-semibold text-slate-400">${i + 1}.</span>${p.texto}</span>
        </label>
      </li>`).join("");

    const niveles = Object.entries(T.niveles)
      .map(([k, v]) => `<option value="${k}">${esc(v.nombre)} — ${esc(v.chat)} · ${esc(v.ram)}</option>`).join("");

    const antes = instructor ? `
      <div class="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-5">
        <h3 class="flex items-center gap-2 font-bold text-amber-900">⚠ Antes del taller</h3>
        <ul class="mt-2.5 list-disc space-y-1.5 pl-5 text-sm text-amber-900">
          <li>Prueba en un equipo real del CC 3: instala Ollama, descarga el modelo y mide la velocidad de respuesta.</li>
          <li>Anota la RAM de los equipos para decidir el nivel y si el autocompletado es viable.</li>
          <li>Descarga los modelos con anticipación: decenas de equipos bajando varios GB a la vez saturan la red. Ten todo en USB o carpeta compartida.</li>
          <li>Plan B: tu equipo con <code>OLLAMA_HOST=0.0.0.0</code> y el puerto 11434 abierto, y los alumnos apuntando ahí con el generador de abajo.</li>
          <li>Los retos de la página se califican solos en el navegador: no necesitan internet ni servidor.</li>
        </ul>
      </div>` : "";

    return `
      <section class="space-y-6">
        <header>
          <h2 class="text-2xl font-bold text-slate-900">Preparación del entorno</h2>
          <p class="mt-1.5 text-slate-600">Todo el taller funciona sin crear cuentas ni pagar nada: Continue es una extensión gratuita de VS Code y los modelos corren en tu máquina con Ollama.</p>
        </header>
        ${antes}

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 class="font-bold text-slate-900">Lista de verificación</h3>
          <ul class="mt-2 space-y-0.5">${items}</ul>
        </div>

        <div class="rounded-2xl border-2 border-indigo-300 bg-indigo-50 p-5">
          <h3 class="font-bold text-indigo-950">Dos reglas del taller</h3>
          <ol class="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-indigo-900">
            <li><b>Nada de modo Agente.</b> En Continue déjalo siempre en <b>Chat</b>. Los modelos de este taller son pequeños y no manejan herramientas: en modo agente se quedan dando vueltas o truenan. Todo lo que vamos a hacer se logra con Chat y con edición en línea (<kbd>Ctrl</kbd>+<kbd>I</kbd>).</li>
            <li><b>Modelos chicos a propósito.</b> Las laptops del laboratorio son limitadas. Empieza en Ligero y solo sube si te responde rápido. Si va lento, baja de nivel en vez de esperar.</li>
          </ol>
        </div>

        <div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h3 class="font-bold text-slate-900">Generador de configuración</h3>
            <p class="mt-1 text-sm text-slate-600">Elige según tu equipo y copia el resultado.</p>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <label class="block text-sm font-medium text-slate-700">Nivel de tu equipo
              <select id="cfg-nivel" class="mt-1 block w-full rounded-xl border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">${niveles}</select>
            </label>
            <label class="block text-sm font-medium text-slate-700">Dónde corre el modelo
              <select id="cfg-modo" class="mt-1 block w-full rounded-xl border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="local">En mi equipo (Ollama local)</option>
                <option value="servidor">En el servidor del instructor</option>
              </select>
            </label>
            <label id="cfg-ip-wrap" class="hidden text-sm font-medium text-slate-700 sm:col-span-2">IP del servidor (te la da el instructor)
              <input id="cfg-ip" type="text" placeholder="192.168.1.50" class="mt-1 block w-full rounded-xl border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </label>
            <label class="flex items-start gap-2.5 text-sm text-slate-700 sm:col-span-2">
              <input id="cfg-auto" type="checkbox" class="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500">
              <span>Incluir autocompletado <span class="text-slate-500">— déjalo apagado salvo que el chat ya te responda rápido. En equipos limitados es lo primero que los traba.</span></span>
            </label>
          </div>
          <p id="cfg-ram" class="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600"></p>
          <div>
            <p class="mb-1.5 text-sm font-semibold text-slate-700">1. Descarga el modelo</p>
            ${bloqueCodigo("cfg-pull", "", "Terminal")}
          </div>
          <div>
            <p class="mb-1.5 text-sm font-semibold text-slate-700">2. Pega esto en la configuración de Continue</p>
            ${bloqueCodigo("cfg-yaml", "", "config.yaml")}
            <p class="mt-2 text-sm text-slate-600">Ruta: <code>%USERPROFILE%\\.continue\\config.yaml</code> en Windows o <code>~/.continue/config.yaml</code> en macOS y Linux. También se abre desde el selector de configuración en la barra lateral de Continue. Guarda y recarga la ventana de VS Code.</p>
          </div>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 class="font-bold text-slate-900">Si algo no funciona</h3>
          <dl class="mt-3 space-y-3 text-sm text-slate-700">
            <div><dt class="font-semibold text-slate-900">Continue pide iniciar sesión</dt><dd>Omite el inicio de sesión. Con modelos locales no se necesita cuenta: basta el <code>config.yaml</code>.</dd></div>
            <div><dt class="font-semibold text-slate-900">Dice «No models configured»</dt><dd>Revisa la sangría del YAML (espacios, nunca tabuladores), guarda y recarga la ventana de VS Code.</dd></div>
            <div><dt class="font-semibold text-slate-900">No conecta con Ollama</dt><dd>Ejecuta <code>ollama list</code> en una terminal. Si responde, el servicio está activo; si no, abre la aplicación de Ollama.</dd></div>
            <div><dt class="font-semibold text-slate-900">Responde muy lento o se congela</dt><dd>En orden: apaga el autocompletado, baja de nivel (Ligero o Mínimo), cierra el navegador y lo que no uses, y verifica que estás en modo <b>Chat</b> y no en Agente. Con poca memoria el equipo empieza a usar el disco y todo se vuelve lentísimo.</dd></div>
            <div><dt class="font-semibold text-slate-900">Se queda «pensando» sin terminar</dt><dd>Casi siempre es el modo Agente encendido. Cámbialo a Chat, abre un chat nuevo y vuelve a intentar.</dd></div>
            <div><dt class="font-semibold text-slate-900">Empieza bien y luego se pierde</dt><dd>Estos modelos tienen poca memoria de conversación. Abre un <b>chat nuevo para cada ejercicio</b> en lugar de arrastrar uno largo.</dd></div>
            <div><dt class="font-semibold text-slate-900">La respuesta no se parece a lo que pedí</dt><dd>Es normal en modelos pequeños. Reformula con la plantilla de la pestaña Referencia y pide el cambio mínimo, no todo de nuevo.</dd></div>
          </dl>
        </div>

        <div class="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
          <h3 class="font-bold text-indigo-950">Archivos de práctica</h3>
          <p class="mt-1 text-sm text-indigo-900">Descomprime el zip y abre la carpeta completa en VS Code. Contiene los archivos de los ejercicios y el esqueleto del proyecto del día 3.</p>
          <a href="practicas.zip" download class="mt-3 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">⬇ Descargar practicas.zip</a>
        </div>
      </section>`;
  }

  function tarjetaEjercicio(id) {
    const e = T.ejercicios[id];
    const n = numero(id);
    const pasos = e.pasos.map((p) => `<li class="pl-1">${p}</li>`).join("");
    const exito = e.exito.map((x) => `<li class="flex gap-2"><span class="text-emerald-600">✓</span><span>${esc(x)}</span></li>`).join("");
    const archivos = (e.archivos || []).map((a) =>
      `<a href="practicas/${a}" download class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50">⬇ ${esc(a)}</a>`).join(" ");
    const nota = (instructor && e.instructor
      ? `<div class="rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-sm text-amber-900"><b>Instructor:</b> ${esc(e.instructor)}</div>` : "") +
      (instructor && e.solucion && !e.reto ? `
      <details class="rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2.5">
        <summary class="cursor-pointer text-sm font-semibold text-amber-900">Solución de referencia (instructor)</summary>
        <div class="mt-2">${bloqueCodigo("sol-" + id, e.solucion, "Solución")}</div>
      </details>` : "");
    const etiquetaPrompt = id === "e13" ? "Preguntas y reflexión" : (id === "e4" ? "Comentarios y prompt" : (e.prompt.includes("PROMPT 1") ? "Prompts (uno a la vez)" : "Prompt"));

    const reto = e.reto ? `
      <div class="rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-4">
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-lg bg-indigo-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">Reto</span>
          <span class="text-sm font-semibold text-indigo-950">Pega el código y compruébalo aquí mismo</span>
        </div>
        <p class="mb-2.5 text-sm text-indigo-900">Se ejecuta en tu navegador contra ${e.reto.casos.length} casos. Nada sale de tu equipo.</p>
        <textarea id="cod-${id}" rows="8" spellcheck="false"
          class="block w-full rounded-xl border border-slate-300 bg-slate-900 p-3 font-mono text-[13px] leading-relaxed text-slate-100 shadow-inner focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Pega aquí el código"></textarea>
        <div class="mt-2.5 flex flex-wrap gap-2">
          <button type="button" data-run="${id}" class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">▶ Ejecutar pruebas</button>
          <button type="button" data-reset="${id}" class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Restaurar plantilla</button>
        </div>
        <div id="res-${id}" class="mt-3"></div>
        ${instructor && e.reto.solucion ? `
        <details class="mt-3 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2.5">
          <summary class="cursor-pointer text-sm font-semibold text-amber-900">Solución de referencia (instructor)</summary>
          <div class="mt-2 space-y-2">
            ${bloqueCodigo("sol-" + id, e.reto.solucion, "Solución")}
            <button type="button" data-solucion="${id}" class="rounded-xl border border-amber-400 bg-white px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100">Cargar en el editor del reto</button>
          </div>
        </details>` : ""}
      </div>` : "";

    return `
      <article id="ej-${id}" class="scroll-mt-24 space-y-4 rounded-2xl border ${done[id] ? "border-emerald-300 bg-emerald-50/30" : "border-slate-200 bg-white"} p-5 shadow-sm transition-colors">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="flex items-start gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">${n}</span>
            <div>
              <h3 class="text-lg font-bold leading-tight text-slate-900">${esc(e.titulo)}</h3>
              <p class="mt-0.5 text-xs font-medium text-slate-500">${e.minutos} minutos${e.reto ? " · con reto autoevaluable" : ""}</p>
            </div>
          </div>
          <label class="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            <input type="checkbox" data-done="${id}" class="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" ${done[id] ? "checked" : ""}> Hecho
          </label>
        </div>

        <p class="rounded-xl bg-slate-50 px-3.5 py-2.5 text-slate-700"><b class="text-slate-900">Objetivo:</b> ${esc(e.objetivo)}</p>

        <div>
          <p class="mb-1.5 text-sm font-bold text-slate-900">Pasos</p>
          <ol class="list-decimal space-y-1.5 pl-5 text-slate-700 marker:font-semibold marker:text-indigo-600">${pasos}</ol>
        </div>

        ${bloqueCodigo("pr-" + id, e.prompt, etiquetaPrompt)}
        ${e.observar ? bloqueObservar(id, e) : ""}
        ${reto}

        <div>
          <p class="mb-1.5 text-sm font-bold text-slate-900">Lo logré si…</p>
          <ul class="space-y-1 text-sm text-slate-700">${exito}</ul>
        </div>

        ${archivos ? `<div class="flex flex-wrap gap-2">${archivos}</div>` : ""}

        <details class="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
          <summary class="cursor-pointer text-sm font-semibold text-slate-700">Pista (intenta primero sin ella)</summary>
          <p class="mt-2 text-sm text-slate-700">${esc(e.pista)}</p>
        </details>
        ${nota}
      </article>`;
  }

  function seccionDia(d) {
    const agenda = d.agenda.map((a) => {
      const t = TIPOS[a.tipo];
      const enlaces = (a.ejercicios || []).map((id) =>
        `<a href="#ej-${id}" data-ir="${id}" class="inline-block rounded-lg bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-200">Ejercicio ${numero(id)}</a>`).join(" ");
      return `
        <li class="flex gap-3 sm:gap-4">
          <div class="w-[4.5rem] shrink-0 pt-0.5 text-xs font-bold tabular-nums text-slate-900 sm:w-24 sm:text-sm">${esc(a.hora)}</div>
          <div class="flex-1 border-l-2 border-slate-200 pb-4 pl-3 sm:pl-4">
            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-full px-2 py-0.5 text-xs font-semibold ${t.clase}">${t.etiqueta}</span>
              <span class="font-semibold text-slate-900">${esc(a.titulo)}</span>
            </div>
            ${a.detalle ? `<p class="mt-1 text-sm text-slate-600">${esc(a.detalle)}</p>` : ""}
            ${enlaces ? `<div class="mt-1.5 flex flex-wrap gap-1.5">${enlaces}</div>` : ""}
          </div>
        </li>`;
    }).join("");

    const tarjetas = IDS.filter((id) => T.ejercicios[id].dia === d.id).map(tarjetaEjercicio).join("");
    const notas = instructor ? `
      <div class="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-5">
        <h3 class="font-bold text-amber-900">⚠ Notas del instructor</h3>
        <ul class="mt-2 list-disc space-y-1.5 pl-5 text-sm text-amber-900">${d.instructor.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>` : "";

    return `
      <section class="space-y-6">
        <header>
          <p class="text-sm font-bold uppercase tracking-wide text-indigo-600">${esc(d.fecha)}</p>
          <h2 class="mt-0.5 text-2xl font-bold text-slate-900">${esc(d.titulo)}</h2>
          <p class="mt-1.5 text-slate-600">${esc(d.objetivo)}</p>
        </header>
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 class="mb-3 font-bold text-slate-900">Agenda</h3>
          <ol>${agenda}</ol>
        </div>
        ${notas}
        <div class="space-y-5">${tarjetas}</div>
        ${seccionResumen(d)}
      </section>`;
  }

  function seccionRef() {
    const plantilla = "Rol: actúa como [perfil].\nContexto: [qué estoy construyendo y con qué tecnologías].\nTarea: [una sola cosa concreta].\nRestricciones: [lo que debe y no debe hacer; librerías permitidas].\nFormato: [solo código / explicación breve / tabla…].\nEjemplo: [entrada → salida esperada].";
    return `
      <section class="space-y-6">
        <header>
          <h2 class="text-2xl font-bold text-slate-900">Referencia rápida</h2>
          <p class="mt-1.5 text-slate-600">Para tener abierta durante los ejercicios.</p>
        </header>

        <div class="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 class="font-bold text-slate-900">Plantilla de prompt</h3>
          ${bloqueCodigo("ref-plantilla", plantilla, "Plantilla")}
          <p class="text-sm text-slate-600">No siempre necesitas los seis elementos. Lo que casi nunca debe faltar: una tarea concreta, las restricciones y un ejemplo.</p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 class="font-bold text-slate-900">Atajos de Continue en VS Code</h3>
          <div class="mt-2.5 overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="text-slate-500"><tr><th class="pb-1.5 pr-4 font-semibold">Acción</th><th class="pb-1.5 font-semibold">Atajo</th></tr></thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                <tr><td class="py-2 pr-4">Enviar la selección al chat</td><td><kbd>Ctrl</kbd>+<kbd>L</kbd></td></tr>
                <tr><td class="py-2 pr-4">Editar la selección en línea</td><td><kbd>Ctrl</kbd>+<kbd>I</kbd></td></tr>
                <tr><td class="py-2 pr-4">Aceptar el autocompletado</td><td><kbd>Tab</kbd></td></tr>
                <tr><td class="py-2 pr-4">Añadir un archivo como contexto</td><td>Escribe <kbd>@</kbd> en el chat</td></tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2 text-xs text-slate-500">En macOS usa <kbd>Cmd</kbd> en lugar de <kbd>Ctrl</kbd>. Si un atajo no responde, búscalo en la paleta de comandos.</p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 class="font-bold text-slate-900">Antes de aceptar código de la IA</h3>
          <ul class="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
            <li>¿Lo ejecuté? ¿Funciona con datos normales y con casos raros?</li>
            <li>¿Entiendo cada línea? Si no, le pido que me la explique.</li>
            <li>¿Usa métodos y propiedades que de verdad existen? (verifica en MDN)</li>
            <li>¿Maneja entradas vacías o inválidas?</li>
            <li>¿Inserta texto del usuario con <code>innerHTML</code> sin escaparlo?</li>
            <li>¿Dejé algún secreto o dato personal en el prompt o en el código?</li>
          </ul>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 class="font-bold text-slate-900">Uso responsable</h3>
          <ul class="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
            <li>Eres responsable del código que entregas, lo haya escrito una persona o una IA.</li>
            <li>No pegues contraseñas, tokens, llaves ni datos de clientes en un chat.</li>
            <li>Declara cuándo usaste IA en tareas y proyectos.</li>
            <li>Verifica en la documentación oficial antes de confiar en una API.</li>
            <li>Usa la IA para aprender más rápido, no para saltarte el entender lo que entregas.</li>
          </ul>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 class="font-bold text-slate-900">Bitácora de prompts (entregable diario)</h3>
          <p class="mt-1.5 text-slate-700">Al cerrar cada día guarda 3 prompts que funcionaron bien, 1 que falló y qué cambiaste para arreglarlo.</p>
        </div>
      </section>`;
  }

  // ======================= navegación =======================
  const SECCIONES = [
    { id: "prep", etiqueta: "Preparación", render: seccionPrep },
    ...T.dias.map((d) => ({ id: d.id, etiqueta: d.corto, render: () => seccionDia(d) })),
    { id: "ref", etiqueta: "Referencia", render: seccionRef }
  ];

  function mostrar(id) {
    const sec = SECCIONES.find((s) => s.id === id) || SECCIONES[0];
    $("#app").innerHTML = sec.render();
    $$("#nav a").forEach((a) => {
      const activo = a.dataset.sec === sec.id;
      a.className = "whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition " +
        (activo ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100");
      if (activo) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });

    if (sec.id === "prep") {
      $("#cfg-nivel").value = store.get("nivel", "ligero");
      ["cfg-nivel", "cfg-modo", "cfg-ip", "cfg-auto"].forEach((i) => $("#" + i).addEventListener("input", generarConfig));
      $("#cfg-nivel").addEventListener("change", (ev) => store.set("nivel", ev.target.value));
      generarConfig();
    }

    IDS.forEach((eid) => {
      const ta = document.getElementById("cod-" + eid);
      if (ta) ta.value = codigos[eid] || T.ejercicios[eid].reto.plantilla;
    });

    pintarResumen();
    actualizarProgreso();
  }

  // ======================= eventos =======================
  document.addEventListener("click", (ev) => {
    const copia = ev.target.closest("[data-copiar]");
    if (copia) { copiar(document.getElementById(copia.dataset.copiar).textContent, copia); return; }

    const ir = ev.target.closest("[data-ir]");
    if (ir) {
      ev.preventDefault();
      const el = document.getElementById("ej-" + ir.dataset.ir);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("ring-2", "ring-indigo-400");
        setTimeout(() => el.classList.remove("ring-2", "ring-indigo-400"), 1600);
      }
      return;
    }

    const run = ev.target.closest("[data-run]");
    if (run) {
      const id = run.dataset.run;
      const codigo = document.getElementById("cod-" + id).value;
      codigos[id] = codigo; store.set("codigos", codigos);
      run.disabled = true; run.textContent = "Ejecutando…";
      document.getElementById("res-" + id).innerHTML =
        '<p class="px-1 text-sm text-slate-500">Ejecutando las pruebas…</p>';
      ejecutarReto(codigo, T.ejercicios[id].reto, (res) => {
        run.disabled = false; run.textContent = "▶ Ejecutar pruebas";
        pintarResultado(id, res);
      });
      return;
    }

    const sol = ev.target.closest("[data-solucion]");
    if (sol) {
      const id = sol.dataset.solucion;
      const ta = document.getElementById("cod-" + id);
      ta.value = T.ejercicios[id].reto.solucion;
      codigos[id] = ta.value; store.set("codigos", codigos);
      return;
    }

    const reset = ev.target.closest("[data-reset]");
    if (reset) {
      const id = reset.dataset.reset;
      document.getElementById("cod-" + id).value = T.ejercicios[id].reto.plantilla;
      delete codigos[id]; store.set("codigos", codigos);
      document.getElementById("res-" + id).innerHTML = "";
    }
  });

  document.addEventListener("change", (ev) => {
    const d = ev.target.closest("[data-done]");
    if (d) { marcarHecho(d.dataset.done, d.checked); return; }
    const ob = ev.target.closest("[data-obs]");
    if (ob) { guardarObs(ob.dataset.obs, ob.dataset.k, ob.value); return; }
    if (ev.target.id === "obs-modelo") { store.set("nivel", ev.target.value); pintarResumen(); return; }
    const p = ev.target.closest("[data-prep]");
    if (p) { prep[p.dataset.prep] = p.checked; store.set("prep", prep); }
  });

  document.addEventListener("input", (ev) => {
    const ta = ev.target.closest("[id^='cod-']");
    if (ta) { codigos[ta.id.slice(4)] = ta.value; store.set("codigos", codigos); return; }
    const nota = ev.target.closest("[data-obs-nota]");
    if (nota) { guardarObs(nota.dataset.obsNota, "nota", nota.value); }
  });

  // Acepta #d2 (una pestaña) o #ej-e6 (abre el día de ese ejercicio y baja hasta él).
  function irAHash() {
    const id = (location.hash || "#prep").slice(1);
    const ej = id.startsWith("ej-") && T.ejercicios[id.slice(3)];
    if (ej) {
      mostrar(ej.dia);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: "start" });
      return;
    }
    mostrar(SECCIONES.some((s) => s.id === id) ? id : "prep");
    window.scrollTo({ top: 0 });
  }
  window.addEventListener("hashchange", irAHash);

  // ======================= arranque =======================
  $("#t-titulo").textContent = T.titulo;
  $("#t-evento").textContent = T.evento;
  $("#t-datos").textContent = T.datos;
  $("#t-stack").textContent = T.stack;
  $("#t-instructor").textContent = T.instructor;
  $("#modo-instructor").classList.toggle("hidden", !instructor);
  $("#nav").innerHTML = SECCIONES.map((s) =>
    `<a href="#${s.id}" data-sec="${s.id}" class="whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold">${esc(s.etiqueta)}</a>`).join("");
  irAHash();
})();
