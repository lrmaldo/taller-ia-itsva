# Programación Asistida por IA · Jornada ISC'2026 · ITSVA

Sitio del taller (17–19 de noviembre de 2026). HTML + JavaScript + Tailwind **compilado y guardado en el repo** (`assets/tailwind.css`). Sin CDN, sin build para publicar: se sube tal cual.

Solo si agregas clases de Tailwind nuevas en `index.html`, `app.js` o `data.js` hay que regenerar el CSS (requiere Node una sola vez):
```bash
npx -p tailwindcss@3.4.17 -p @tailwindcss/forms@0.5.9 tailwindcss -c tools/tailwind.config.js -i tools/tailwind.input.css -o assets/tailwind.css --minify
```

## Publicar en GitHub Pages
1. Crea un repositorio (por ejemplo `taller-ia-itsva`) y sube el contenido de esta carpeta a la rama `main`.
2. Settings → Pages → Source: *Deploy from a branch* → rama `main`, carpeta `/ (root)` → Save.
3. En uno o dos minutos queda en `https://TU-USUARIO.github.io/taller-ia-itsva/`.

Por comandos:
```bash
git init && git add . && git commit -m "Taller IA ITSVA"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/taller-ia-itsva.git
git push -u origin main
```

## Presentación
`presentacion.html` son las diapositivas del taller (27, con motion graphics sobre cómo funciona un LLM, Ollama y los modelos). Se abre desde el botón del encabezado del sitio o directo en `.../presentacion.html`. Teclas: `←` `→` o espacio para avanzar, `N` notas del ponente, `F` pantalla completa; `#s8` enlaza una diapositiva. Es un solo archivo sin dependencias; las fuentes vienen de Google Fonts y si no hay internet usa las del sistema.

## Restricciones del laboratorio (ya están aplicadas)
- **Sin modo Agente.** La configuración generada solo declara los roles `chat` y `edit`. Los modelos pequeños no manejan herramientas y en modo agente se cuelgan.
- **Modelos chicos.** Las tres opciones son `qwen2.5-coder` en 0.5b, 1.5b y 3b. El valor por omisión es el 1.5b.
- **Autocompletado apagado por omisión.** Es lo primero que traba una laptop limitada; el alumno lo activa solo si le responde rápido.

## Retos autoevaluables
Siete ejercicios traen un recuadro donde el alumno pega el código que le dio la IA y lo ejecuta contra casos de prueba. Todo corre en el navegador del alumno: dentro de un iframe `sandbox` (origen opaco, sin acceso a la página ni a su localStorage) y, dentro de él, en un Web Worker, para que un bucle infinito no congele la pestaña y el límite de 4 segundos pueda detenerlo. No se envía nada a ningún servidor. Cada caso muestra ✓/✗ con lo esperado y lo devuelto; al pasar todos, el ejercicio se marca como hecho.

## Día 2: observar al modelo
Los modelos locales chicos no resuelven de forma confiable «encuentra todos los errores» o «refactoriza todo», así que el día 2 no les pide eso: cada ejercicio (6 a 10) parte la tarea en preguntas pequeñas y trae un recuadro **Observa** donde el alumno marca, por pregunta, si el modelo *Acertó*, *A medias*, *Falló* o *Inventó*. El alumno cierra lo que el modelo no resolvió y el reto verifica su código. Al final de la pestaña Día 2 se arma un resumen con conteos y un texto para la bitácora; a las 13:30 se comparan los resultados por tamaño de modelo (0.5b / 1.5b / 3b). Las marcas se guardan en el navegador y no afectan el «Hecho».

## Día 3: el proyecto por piezas
El gestor de tareas se construye con cinco prompts (plan, almacenamiento, operaciones, interfaz y eventos), cada uno con una prueba de consola; el alumno registra en «Observa» qué pieza salió a la primera. Si una pieza falla dos veces, la escribe él y la marca como «Falló». La v2 (ejercicio 12) observa si las pruebas que escribe el modelo atrapan el error de su propia implementación, y el 13 si el modelo te corrige o te sigue la corriente. En modo instructor está la solución de referencia completa del proyecto.

**Al cambiar contenido durante el taller** sube el número `?v=` de los tres archivos en `index.html`: GitHub Pages guarda los archivos en caché unos minutos y así los alumnos reciben la versión nueva al recargar.

## Modo instructor
Agrega `?i=1` a la dirección (`.../index.html?i=1#d2`) para ver notas por día y por ejercicio, los bugs sembrados y la solución de referencia de cada reto (con botón para cargarla en el editor). No es seguridad: cualquiera que conozca el parámetro lo ve.

También puedes enlazar un ejercicio directo: `#ej-e6` abre el día correspondiente y baja hasta él.

## Editar contenido
- `assets/data.js` — horarios, textos, ejercicios, casos de prueba y soluciones de referencia de los retos. Todo el contenido vive aquí.
- `assets/app.js` — lógica de la página y el ejecutor de retos.
- `assets/tailwind.css` — CSS compilado (no lo edites a mano; regenera con el comando de arriba).
- `tools/` — configuración de Tailwind para regenerar el CSS y `verify.js`, la prueba automática de los retos.

## Verificar los retos (opcional)
`tools/verify.js` abre el sitio en Chrome con Playwright y, para cada reto, comprueba que una solución correcta pase, que una incorrecta falle, que un bucle infinito lo detenga el límite de 4 s, y que progreso y código persistan. Requiere Node:
```bash
npm i -g playwright && node tools/verify.js .
```
- `practicas/` — archivos que descargan los alumnos.

Si cambias algo en `practicas/`, regenera el zip:
```bash
cd practicas && zip -r ../practicas.zip . && cd ..
```

## Bugs sembrados a propósito (no los "arregles")
- `e06-debug.js` — 4 errores de lógica.
- `e08-funciones.js` — 3 funciones que no cumplen lo que promete su comentario.
- `e10-seguridad.js` — XSS, eval, credenciales en el código, autorización por localStorage.
