// Verifica el sitio del taller con Playwright en Chrome.
// Uso: node verify.js <carpeta-del-sitio>
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(process.argv[2]);
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".zip": "application/zip", ".svg": "image/svg+xml" };

const fallos = [];
let pasos = 0;
function check(cond, msg) {
  pasos++;
  if (cond) console.log("  ✓ " + msg);
  else { console.log("  ✗ " + msg); fallos.push(msg); }
}

function servir() {
  return new Promise((res) => {
    const s = http.createServer((req, r) => {
      let p = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
      if (p === "/") p = "/index.html";
      const f = path.join(ROOT, p);
      fs.readFile(f, (e, b) => {
        if (e) { r.writeHead(404); r.end("404"); return; }
        r.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" });
        r.end(b);
      });
    });
    s.listen(0, "127.0.0.1", () => res(s));
  });
}

(async () => {
  const win = {};
  new Function("window", fs.readFileSync(path.join(ROOT, "assets/data.js"), "utf8"))(win);
  const T = win.TALLER;
  const retos = Object.entries(T.ejercicios).filter(([, e]) => e.reto);
  console.log(`Ejercicios: ${Object.keys(T.ejercicios).length}, con reto: ${retos.length}`);
  check(Object.keys(T.ejercicios).length === 13, "13 ejercicios");
  check(retos.length === 7, "7 retos");
  for (const [id, e] of Object.entries(T.ejercicios)) {
    check(e.objetivo && e.pasos.length && e.prompt && e.exito.length && e.pista, `${id}: objetivo, pasos, prompt, criterios y pista`);
  }

  const server = await servir();
  const base = `http://127.0.0.1:${server.address().port}/index.html`;

  let browser;
  try { browser = await chromium.launch({ channel: "chrome" }); console.log("Navegador: Google Chrome"); }
  catch (e) { browser = await chromium.launch(); console.log("Navegador: Chromium (Chrome no disponible)"); }

  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const page = await ctx.newPage();
  const errores = [];
  page.on("pageerror", (e) => errores.push(String(e)));

  async function correr(id, codigo) {
    await page.fill(`#cod-${id}`, codigo);
    await page.click(`[data-run="${id}"]`);
    const t0 = Date.now();
    const est = page.locator(`#res-${id} [data-estado]`);
    await est.waitFor({ timeout: 8000 });
    const estado = await est.getAttribute("data-estado");
    const ok = await page.locator(`#res-${id} [data-caso="ok"]`).count();
    const mal = await page.locator(`#res-${id} [data-caso="falla"]`).count();
    return { estado, ok, mal, ms: Date.now() - t0, texto: await est.innerText() };
  }

  for (const [id, e] of retos) {
    console.log(`\n■ ${id} — ${e.titulo}`);
    await page.goto(`${base}?i=1#ej-${id}`);
    await page.waitForSelector(`#cod-${id}`);
    check(await page.isVisible("#modo-instructor"), "modo instructor visible con ?i=1");
    check((await page.locator(`#sol-${id}`).count()) === 1, "solución de referencia visible al instructor");

    const nombres = [...new Set(e.reto.casos.map((c) => c.fn || e.reto.fn))];

    // 1. incorrecta: devuelve siempre null
    const malo = nombres.map((n) => `function ${n}() { return null; }`).join("\n");
    let r = await correr(id, malo);
    check(r.estado === "pendiente" && r.ok === 0 && r.mal === e.reto.casos.length, `incorrecta: ${r.mal}/${e.reto.casos.length} casos en ✗ (${r.estado})`);
    check(/Esperado:/.test(r.texto) && /Devuelto:/.test(r.texto), "muestra lo esperado y lo devuelto");
    check(!(await page.isChecked(`[data-done="${id}"]`)), "no se marca como hecho");

    // 2. error de sintaxis
    r = await correr(id, "function (");
    check(r.estado === "error" && /sintaxis/i.test(r.texto), "error de sintaxis reportado");

    // 3. bucle infinito
    const loop = nombres.map((n) => `function ${n}() { while (true) {} }`).join("\n");
    r = await correr(id, loop);
    check(r.estado === "timeout" && r.ms >= 3900 && r.ms < 6500, `bucle infinito atrapado por el timeout (${r.ms} ms)`);
    check(await page.evaluate(() => document.querySelectorAll("iframe").length === 0), "el iframe del ejecutor se eliminó");

    // 4. correcta
    r = await correr(id, e.reto.solucion);
    check(r.estado === "aprobado" && r.ok === e.reto.casos.length && r.mal === 0, `correcta: ${r.ok}/${e.reto.casos.length} casos en ✓`);
    check(await page.isChecked(`[data-done="${id}"]`), "se marca como hecho");

    // 5. persistencia
    await page.reload();
    await page.waitForSelector(`#cod-${id}`);
    check(await page.isChecked(`[data-done="${id}"]`), "hecho persiste tras recargar");
    check((await page.inputValue(`#cod-${id}`)) === e.reto.solucion, "código del alumno persiste tras recargar");
  }

  console.log("\n■ Navegación, progreso y generador");
  await page.goto(`${base}#prep`);
  await page.waitForSelector("#cfg-yaml");
  check((await page.textContent("#progreso-texto")).startsWith("7 de 13"), "progreso: 7 de 13");
  let yaml = await page.textContent("#cfg-yaml");
  const roles = [...yaml.matchAll(/^\s+- (\w+)\s*$/gm)].map((m) => m[1]);
  check(roles.join(",") === "chat,edit" && !/apiBase/.test(yaml), `YAML local: roles = ${roles.join(", ")} (sin agente ni apiBase)`);
  await page.selectOption("#cfg-modo", "servidor");
  await page.fill("#cfg-ip", "192.168.1.50");
  yaml = await page.textContent("#cfg-yaml");
  check(/apiBase: http:\/\/192\.168\.1\.50:11434/.test(yaml), "YAML servidor: apiBase con la IP");
  await page.selectOption("#cfg-nivel", "medio");
  check(/qwen2\.5-coder:3b/.test(await page.textContent("#cfg-yaml")), "nivel Medio usa el 3b");
  for (const [h, texto] of [["d1", "Fundamentos"], ["d2", "Depurar"], ["d3", "Proyecto"], ["ref", "Referencia"]]) {
    await page.goto(`${base}#${h}`);
    await page.waitForSelector("#app h2");
    check((await page.textContent("#app h2")).includes(texto), `pestaña #${h}`);
  }
  await page.goto(`${base}#d2`);
  check((await page.locator("#modo-instructor").isHidden()) && (await page.locator("[id^='sol-']").count()) === 0, "sin ?i=1 no hay notas ni soluciones");
  check(!/cdn/i.test(fs.readFileSync(path.join(ROOT, "index.html"), "utf8")), "index.html sin CDN");

  console.log("\n■ Móvil (375 px)");
  const movil = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true });
  const pm = await movil.newPage();
  for (const h of ["prep", "d2", "ref"]) {
    await pm.goto(`${base}#${h}`);
    await pm.waitForSelector("#app h2");
    const sw = await pm.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    check(sw[0] <= sw[1] + 1, `#${h} sin desplazamiento horizontal (${sw[0]}/${sw[1]})`);
  }
  await movil.close();

  check(errores.length === 0, "sin errores de JavaScript en la página" + (errores.length ? ": " + errores.join(" | ") : ""));

  await browser.close();
  server.close();
  console.log(`\n${pasos - fallos.length}/${pasos} comprobaciones correctas`);
  if (fallos.length) { console.log("FALLOS:\n - " + fallos.join("\n - ")); process.exit(1); }
})().catch((e) => { console.error(e); process.exit(1); });
