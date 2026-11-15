// Contenido del taller. Edita aquí horarios, textos, ejercicios y retos.
// Los "retos" se califican solos en la página: se ejecuta el código del alumno
// contra los casos y se marca cada uno en verde o rojo.
window.TALLER = {
  titulo: "Programación Asistida por Inteligencia Artificial",
  evento: "Jornada Académica ISC'2026 · ITSVA",
  instructor: "Ing. Leonardo Maldonado",
  datos: "17, 18 y 19 de noviembre de 2026 · CC 3 · 5.º y 7.º semestre",
  stack: "HTML · CSS · JavaScript",

  // Modelos deliberadamente pequeños: las laptops del laboratorio son limitadas.
  // No se usa modo agente en ningún momento (los modelos chicos no manejan herramientas).
  niveles: {
    minimo: { nombre: "Mínimo", chat: "qwen2.5-coder:0.5b", auto: "qwen2.5-coder:0.5b", ram: "4 GB de RAM", peso: "≈ 400 MB", nota: "Calidad limitada: sirve para explicar código y correcciones chicas." },
    ligero: { nombre: "Ligero", chat: "qwen2.5-coder:1.5b", auto: "qwen2.5-coder:1.5b", ram: "6–8 GB de RAM", peso: "≈ 1 GB", nota: "El punto de equilibrio para este taller. Empieza por aquí." },
    medio:  { nombre: "Medio",  chat: "qwen2.5-coder:3b",   auto: "qwen2.5-coder:1.5b", ram: "8 GB o más",   peso: "≈ 2 GB", nota: "Solo si el equipo responde bien con el Ligero." }
  },

  preparacion: [
    { id: "p1", texto: "Instalar <b>Visual Studio Code</b>" },
    { id: "p2", texto: "Instalar la extensión <b>Live Server</b> (para abrir las páginas con recarga automática)" },
    { id: "p3", texto: "Instalar <b>Ollama</b> desde ollama.com/download y comprobar con <code>ollama --version</code>" },
    { id: "p4", texto: "Descargar el modelo con <code>ollama pull …</code> (según el nivel de tu equipo)" },
    { id: "p5", texto: "Instalar la extensión <b>Continue</b> en VS Code — al abrirla, <b>omite el inicio de sesión</b>" },
    { id: "p6", texto: "Pegar la configuración en <code>config.yaml</code> y recargar Continue" },
    { id: "p7", texto: "En Continue, dejar el selector en <b>Chat</b>: en este taller <b>no usamos modo Agente</b>" },
    { id: "p8", texto: "Prueba: en el chat pide «Escribe una función JavaScript que invierta un texto»" },
    { id: "p9", texto: "Descargar <code>practicas.zip</code> y abrir la carpeta en VS Code" }
  ],

  dias: [
    {
      id: "d1", corto: "Día 1", fecha: "Martes 17 de noviembre",
      titulo: "Fundamentos y buen prompting",
      objetivo: "Dejar el entorno funcionando, entender cómo trabaja un modelo de código y aprender a pedirle las cosas de forma que el resultado sirva.",
      agenda: [
        { hora: "7:00–7:30",   tipo: "teoria",   titulo: "Bienvenida: programar con IA", detalle: "Qué es un modelo de lenguaje, tokens, ventana de contexto y alucinaciones. Tu rol: tú diriges, tú revisas y tú respondes por el código." },
        { hora: "7:30–8:15",   tipo: "practica", titulo: "Instalación y configuración", detalle: "Ollama + Continue sin cuentas. Checklist de la pestaña Preparación." },
        { hora: "8:15–9:30",   tipo: "practica", titulo: "Anatomía de un prompt", detalle: "Rol, contexto, tarea, restricciones, formato y ejemplo.", ejercicios: ["e1", "e2"] },
        { hora: "9:30–9:45",   tipo: "descanso", titulo: "Descanso" },
        { hora: "9:45–11:00",  tipo: "practica", titulo: "Generar funciones a partir de requisitos", detalle: "Pedir una función completa y revisar los casos borde por tu cuenta.", ejercicios: ["e3"] },
        { hora: "11:00–12:00", tipo: "comida",   titulo: "Comida" },
        { hora: "12:00–13:15", tipo: "practica", titulo: "IA dentro del editor y el peso del contexto", detalle: "Edición en línea y la diferencia entre preguntar con o sin el archivo.", ejercicios: ["e4", "e5"] },
        { hora: "13:15–14:00", tipo: "cierre",   titulo: "Cierre y bitácora", detalle: "Cada alumno guarda 3 prompts que funcionaron y 1 que falló, con la razón." }
      ],
      instructor: [
        "El bloque de instalación es el de mayor riesgo: ten el instalador de Ollama y los modelos en USB o carpeta compartida.",
        "Insiste desde el minuto uno: modo Chat, nunca Agente, y autocompletado apagado. Es lo que traba las laptops.",
        "Si un equipo va lento con el 1.5b, bájalo al 0.5b sin dudar: para explicar, depurar y corregir funciones chicas alcanza.",
        "En E2 pide que comparen en voz alta: ¿qué cambió entre el prompt vago y el estructurado?"
      ]
    },
    {
      id: "d2", corto: "Día 2", fecha: "Miércoles 18 de noviembre",
      titulo: "Depurar, refactorizar, probar y asegurar",
      objetivo: "Usar la IA sobre código que ya existe: encontrar errores, mejorarlo, escribir pruebas y revisar seguridad, verificando siempre el resultado.",
      agenda: [
        { hora: "7:00–7:20",   tipo: "teoria",   titulo: "Repaso y calentamiento", detalle: "Revisión de bitácoras del día 1: ¿qué prompt falló y por qué?" },
        { hora: "7:20–8:30",   tipo: "practica", titulo: "Depuración guiada", detalle: "Leer la consola del navegador, dar contexto y corregir de uno en uno.", ejercicios: ["e6"] },
        { hora: "8:30–9:30",   tipo: "practica", titulo: "Refactorización sin romper nada", detalle: "Mismo comportamiento, mejor código: de var y bucles anidados a funciones claras.", ejercicios: ["e7"] },
        { hora: "9:30–9:45",   tipo: "descanso", titulo: "Descanso" },
        { hora: "9:45–11:00",  tipo: "practica", titulo: "Pruebas con IA", detalle: "La IA escribe las pruebas; tú decides si el error está en el código o en la prueba.", ejercicios: ["e8"] },
        { hora: "11:00–12:00", tipo: "comida",   titulo: "Comida" },
        { hora: "12:00–13:00", tipo: "practica", titulo: "Documentar sin inventar", detalle: "JSDoc y README verificados contra el código.", ejercicios: ["e9"] },
        { hora: "13:00–14:00", tipo: "practica", titulo: "Seguridad en el navegador", detalle: "XSS, eval, secretos en el código y datos en localStorage.", ejercicios: ["e10"] }
      ],
      instructor: [
        "E6: que no pidan «arréglalo todo». Un error a la vez, recargando la página después de cada cambio.",
        "E8: el momento clave es cuando una prueba falla porque el código está mal, no la prueba. Detente ahí y hazlo notar.",
        "E10: la demostración de XSS es sobre el archivo de práctica; deja claro que no se prueba en sitios ajenos."
      ]
    },
    {
      id: "d3", corto: "Día 3", fecha: "Jueves 19 de noviembre",
      titulo: "Proyecto integrador, límites y ética",
      objetivo: "Construir una aplicación web completa trabajando con IA por partes, y reconocer dónde la IA falla.",
      agenda: [
        { hora: "7:00–7:30",   tipo: "teoria",   titulo: "Flujo de trabajo con IA", detalle: "Planear → implementar por partes → probar → revisar. Por qué no se pide «la app completa» de un jalón." },
        { hora: "7:30–9:30",   tipo: "practica", titulo: "Proyecto: gestor de tareas (v1)", detalle: "Plan, almacenamiento en localStorage, operaciones e interfaz.", ejercicios: ["e11"] },
        { hora: "9:30–9:45",   tipo: "descanso", titulo: "Descanso" },
        { hora: "9:45–11:00",  tipo: "practica", titulo: "Proyecto (v2): pruebas primero", detalle: "Prioridades y filtros, escribiendo las pruebas antes que el código.", ejercicios: ["e12"] },
        { hora: "11:00–12:00", tipo: "comida",   titulo: "Comida" },
        { hora: "12:00–12:45", tipo: "practica", titulo: "Alucinaciones, privacidad y ética", detalle: "Detectar respuestas inventadas y fijar reglas personales de uso.", ejercicios: ["e13"] },
        { hora: "12:45–13:30", tipo: "teoria",   titulo: "Demos del proyecto", detalle: "3 minutos por equipo: qué hace, qué le pidió a la IA y qué tuvo que corregir." },
        { hora: "13:30–14:00", tipo: "cierre",   titulo: "Cierre y siguientes pasos", detalle: "Cómo seguir aprendiendo y retroalimentación del taller." }
      ],
      instructor: [
        "Ajusta el tiempo de demos según el número de alumnos; si son muchos, demos por parejas.",
        "Evaluación sugerida: retos verdes en la página, proyecto funcionando y bitácora de prompts.",
        "Cierra recordando que el uso de IA se declara y que el responsable del código sigue siendo quien lo entrega."
      ]
    }
  ],

  ejercicios: {
    e1: {
      titulo: "Explícame este código", dia: "d1", minutos: 20,
      objetivo: "Usar el chat para entender código ajeno y detectar qué lo hace difícil de leer.",
      pasos: [
        "Abre la carpeta <code>practicas</code> en VS Code y abre <code>e07-refactor.html</code> con Live Server para ver qué produce.",
        "Abre <code>e07-refactor.js</code>, selecciona todo y envíalo al chat de Continue (<kbd>Ctrl</kbd>+<kbd>L</kbd>).",
        "Pega el prompt y lee la explicación completa.",
        "Compara la explicación con lo que realmente muestra la página."
      ],
      prompt: "Explícame este código JavaScript línea por línea, como si fuera alumno de 5.º semestre. Al final dime: 1) qué hace en una sola frase, 2) las tres cosas que lo hacen difícil de leer y por qué.",
      exito: [
        "La explicación coincide con lo que muestra la página",
        "Identificaste al menos 3 problemas de legibilidad (nombres de una letra, anidación, código repetido, uso de var)"
      ],
      archivos: ["e07-refactor.js", "e07-refactor.html"],
      pista: "Si la explicación queda vaga, pídele que siga el flujo usando los datos reales del arreglo GRUPO.",
      instructor: "Problemas esperados: nombres de una letra (p, d, x, t, n, s, m, q), if anidados en escalera, el promedio se calcula dos veces (bucle copiado), var en todo, números mágicos 90/80/70. Si el 0.5b inventa comportamientos, es buen momento para la primera charla de alucinaciones."
    },

    e2: {
      titulo: "Prompt vago contra prompt estructurado", dia: "d1", minutos: 35,
      objetivo: "Comprobar con tus propios ojos cuánto mejora el resultado cuando especificas bien.",
      pasos: [
        "En un chat nuevo escribe solo: <i>«haz una calculadora de propinas»</i>. Guarda la respuesta.",
        "En otro chat nuevo usa el prompt estructurado de abajo.",
        "Pega la función que te dio el segundo chat en el reto y ejecútalo.",
        "Anota qué parte del prompt estructurado produjo cada diferencia."
      ],
      prompt: "Actúa como desarrollador JavaScript senior que enseña a estudiantes.\nContexto: página web de un restaurante en México.\nTarea: escribe la función calcularCuenta(subtotal, propinaPct) que devuelva el total a pagar: el subtotal más 16% de IVA más la propina calculada sobre el subtotal.\nRestricciones: JavaScript puro, sin librerías. Si subtotal es menor o igual a 0, o propinaPct está fuera del rango 0 a 100, lanza un Error.\nFormato: solo la función con un comentario JSDoc arriba. Sin explicación.\nEjemplo: calcularCuenta(500, 10) debe devolver 630 (500 + 80 de IVA + 50 de propina).",
      exito: [
        "El reto queda en verde con los 5 casos",
        "Tienes las dos respuestas guardadas y una lista de diferencias entre ellas"
      ],
      pista: "Si el resultado no cuadra, revisa si calculó la propina sobre el subtotal o sobre el subtotal con IVA ya sumado. El enunciado pide sobre el subtotal.",
      instructor: "Fallo típico de los modelos chicos: propina sobre el total con IVA (500 → 638 en vez de 630) u olvidar las validaciones. Ambos se ven en rojo en el reto. El prompt vago suele producir HTML completo sin validar nada: úsalo para la comparación.",
      reto: {
        fn: "calcularCuenta",
        plantilla: "// Pega aquí la función que te dio la IA\nfunction calcularCuenta(subtotal, propinaPct) {\n\n}",
        solucion: `/**
 * Total a pagar: subtotal + 16% de IVA + propina sobre el subtotal.
 * @param {number} subtotal  mayor que 0
 * @param {number} propinaPct  de 0 a 100
 * @returns {number}
 */
function calcularCuenta(subtotal, propinaPct) {
  if (subtotal <= 0 || propinaPct < 0 || propinaPct > 100) {
    throw new Error("Subtotal o propina fuera de rango");
  }
  const IVA = 0.16;
  return subtotal + subtotal * IVA + subtotal * (propinaPct / 100);
}`,
        casos: [
          { args: [500, 10], esperado: 630, desc: "500 con 10% de propina" },
          { args: [100, 0], esperado: 116, desc: "100 sin propina (solo IVA)" },
          { args: [200, 15], esperado: 262, desc: "200 con 15% de propina" },
          { args: [-5, 10], lanza: true, desc: "Subtotal negativo debe lanzar Error" },
          { args: [100, 150], lanza: true, desc: "Propina de 150% debe lanzar Error" }
        ]
      }
    },

    e3: {
      titulo: "Una función a partir de requisitos", dia: "d1", minutos: 45,
      objetivo: "Pedir una función completa y descubrir los casos borde que la IA no consideró.",
      pasos: [
        "Pega el prompt en el chat y revisa el código que devuelve.",
        "Pégalo en el reto y ejecútalo.",
        "Si algún caso sale en rojo, no lo corrijas tú: descríbele a la IA exactamente qué caso falla y pídele el cambio mínimo.",
        "Repite hasta que los 6 casos estén en verde."
      ],
      prompt: "Escribe en JavaScript la función normalizarTelefono(texto) que reciba teléfonos mexicanos escritos de formas distintas y los devuelva siempre en el formato '+52' seguido de 10 dígitos.\nEjemplos de entrada válida: '999 123 4567', '(999) 123-4567', '+52 999 123 4567', '52-999-1234567'.\nReglas: quita todo lo que no sea dígito; si quedan 12 dígitos y empiezan con 52, quita ese prefijo; si al final no hay exactamente 10 dígitos, lanza un Error con mensaje claro.\nDevuelve solo la función, sin explicación.",
      exito: [
        "Los 6 casos del reto en verde",
        "Puedes explicar por qué la regla del prefijo 52 necesita la condición de los 12 dígitos"
      ],
      pista: "El error clásico: quitar el 52 siempre. Un número que empieza con 52 en sus 10 dígitos propios quedaría mutilado.",
      instructor: "El caso 5 (5212345678) es la trampa: casi todas las respuestas hacen replace(/^52/, '') sin revisar la longitud. Deja que lo descubran con el reto y que se lo describan a la IA en lugar de corregirlo a mano.",
      reto: {
        fn: "normalizarTelefono",
        plantilla: "// Pega aquí la función que te dio la IA\nfunction normalizarTelefono(texto) {\n\n}",
        solucion: `function normalizarTelefono(texto) {
  let digitos = String(texto).replace(/\\D/g, "");
  if (digitos.length === 12 && digitos.startsWith("52")) {
    digitos = digitos.slice(2);
  }
  if (digitos.length !== 10) {
    throw new Error("Un teléfono mexicano debe tener 10 dígitos");
  }
  return "+52" + digitos;
}`,
        casos: [
          { args: ["999 123 4567"], esperado: "+529991234567", desc: "Con espacios" },
          { args: ["(999) 123-4567"], esperado: "+529991234567", desc: "Con paréntesis y guion" },
          { args: ["+52 999 123 4567"], esperado: "+529991234567", desc: "Con lada internacional" },
          { args: ["52-999-1234567"], esperado: "+529991234567", desc: "Con 52 y guiones" },
          { args: ["5212345678"], esperado: "+525212345678", desc: "10 dígitos que empiezan con 52: NO se recorta" },
          { args: ["12345"], lanza: true, desc: "Número incompleto debe lanzar Error" }
        ]
      }
    },

    e4: {
      titulo: "Edición en línea dentro del editor", dia: "d1", minutos: 40,
      objetivo: "Usar la IA sin salir del editor, con <kbd>Ctrl</kbd>+<kbd>I</kbd>, que es lo que sí corre bien en estos equipos.",
      pasos: [
        "Crea un archivo <code>e04.js</code> en la carpeta de prácticas y pega ahí los tres comentarios de abajo.",
        "Pon el cursor en el primer comentario, selecciónalo y pulsa <kbd>Ctrl</kbd>+<kbd>I</kbd>. Pide: «implementa esta función». Revisa el diff y acepta o rechaza.",
        "Repite con los otros dos comentarios.",
        "Al final selecciona una función completa y usa <kbd>Ctrl</kbd>+<kbd>I</kbd> con el último prompt. Revisa el diff línea por línea antes de aceptar."
      ],
      prompt: "// función que reciba un arreglo de calificaciones y devuelva el promedio con un decimal\n// función que reciba un arreglo de calificaciones y devuelva solo las reprobatorias (menores a 70)\n// función que reciba un arreglo de tareas y devuelva un elemento <li> por cada una\n\n--- Prompt para edición en línea (Ctrl+I) ---\nAgrega validación de arreglo vacío y un comentario JSDoc, sin cambiar el comportamiento actual.",
      exito: [
        "Las tres funciones existen y las probaste con datos reales desde la consola del navegador",
        "Rechazaste al menos un cambio del diff que no te convenció, o explicas por qué aceptaste todo"
      ],
      pista: "Si tienes el autocompletado encendido y tu equipo lo aguanta, prueba también escribiendo el comentario y esperando la sugerencia gris (<kbd>Tab</kbd> para aceptar). Si va lento, apágalo: la edición en línea basta para el ejercicio."
    },

    e5: {
      titulo: "Preguntar con contexto y sin contexto", dia: "d1", minutos: 40,
      objetivo: "Comprobar que el modelo solo conoce lo que ve: sin el archivo adivina, con el archivo diagnostica.",
      pasos: [
        "Abre <code>e06-debug.html</code> con Live Server. Verás números incorrectos.",
        "En un chat nuevo pregunta solo: <i>«¿Por qué mi reporte de ventas muestra mal el total?»</i> y observa qué responde.",
        "En otro chat nuevo adjunta el archivo escribiendo <kbd>@</kbd> y usa el prompt de abajo.",
        "Anota 3 diferencias entre las dos respuestas. No corrijas todavía: eso es el ejercicio 6."
      ],
      prompt: "@e06-debug.js La página muestra Total: 1150, Promedio: 287.5, Mayor venta: 100, Ventas sobre el promedio: 0. Debería mostrar Total: 1250, Promedio: 250, Mayor venta: 600, Ventas sobre el promedio: 2. Señala en qué línea está cada problema, sin reescribir el archivo todavía.",
      exito: [
        "La respuesta con contexto señala líneas concretas",
        "Puedes explicar con tus palabras por qué la respuesta sin contexto fue inútil"
      ],
      archivos: ["e06-debug.js", "e06-debug.html"],
      pista: "Si no encuentras cómo adjuntar el archivo, selecciona todo el código y envíalo al chat con Ctrl+L: también cuenta como contexto."
    },

    e6: {
      titulo: "Depurar un archivo con cuatro errores", dia: "d2", minutos: 70,
      objetivo: "Corregir todos los errores de uno en uno, verificando en el navegador después de cada cambio.",
      pasos: [
        "Abre <code>e06-debug.html</code> con Live Server y abre la consola del navegador (<kbd>F12</kbd>).",
        "Usa el prompt con el archivo adjunto para obtener la lista de errores.",
        "Aplica <b>un</b> arreglo, guarda, recarga y verifica. Repite hasta que los cuatro números sean correctos.",
        "Junta tus cuatro funciones corregidas en una sola función <code>estadisticas(ventas)</code> y pégala en el reto."
      ],
      prompt: "@e06-debug.js Este archivo debería mostrar Total: 1250, Promedio: 250, Mayor venta: 600 y Ventas sobre el promedio: 2, pero muestra 1150, 287.5, 100 y 0. Encuentra TODOS los errores. Para cada uno dime: en qué línea está, por qué ocurre y cuál es el arreglo mínimo. No reescribas el archivo completo.\n\nCuando ya estén corregidos, júntalos en una sola función estadisticas(ventas) que devuelva un objeto { total, promedio, mayor, sobrePromedio }.",
      exito: [
        "La página muestra los cuatro valores correctos",
        "El reto queda en verde",
        "Explicas cada error con tus palabras, sin mirar la respuesta de la IA"
      ],
      archivos: ["e06-debug.js", "e06-debug.html"],
      pista: "Hay cuatro: un bucle que arranca en el índice equivocado, una división entre el número equivocado, una comparación al revés y una función a la que le faltan los paréntesis al usarla.",
      instructor: "Los 4 errores: `let i = 1` omite la primera venta; `ventas.length - 1` en promedio; `if (v < mayor)` debería ser `>`; `v > promedio` compara contra la función, no contra su resultado (en JS no truena: da NaN y devuelve 0).",
      reto: {
        fn: "estadisticas",
        plantilla: "// Junta aquí tus funciones corregidas\nfunction estadisticas(ventas) {\n  return { total: 0, promedio: 0, mayor: 0, sobrePromedio: 0 };\n}",
        solucion: `function estadisticas(ventas) {
  let total = 0;
  for (let i = 0; i < ventas.length; i++) total += ventas[i];   // antes: i = 1
  const promedio = total / ventas.length;                         // antes: length - 1
  let mayor = ventas[0];
  for (const v of ventas) if (v > mayor) mayor = v;               // antes: v < mayor
  let sobrePromedio = 0;
  for (const v of ventas) if (v > promedio) sobrePromedio++;      // antes: v > promedio (la función)
  return { total, promedio, mayor, sobrePromedio };
}`,
        casos: [
          { args: [[100, 600, 300, 150, 100]], esperado: { total: 1250, promedio: 250, mayor: 600, sobrePromedio: 2 }, desc: "Las ventas del ejercicio" },
          { args: [[10]], esperado: { total: 10, promedio: 10, mayor: 10, sobrePromedio: 0 }, desc: "Una sola venta" },
          { args: [[5, 15]], esperado: { total: 20, promedio: 10, mayor: 15, sobrePromedio: 1 }, desc: "Dos ventas" }
        ]
      }
    },

    e7: {
      titulo: "Refactorizar sin cambiar el comportamiento", dia: "d2", minutos: 60,
      objetivo: "Mejorar la legibilidad con ayuda de la IA y demostrar que la salida sigue siendo exactamente la misma.",
      pasos: [
        "Abre <code>e07-refactor.html</code> y copia la salida original a un archivo de texto.",
        "Selecciona el contenido de <code>e07-refactor.js</code> y pide la refactorización con el prompt.",
        "Recarga la página y compara línea por línea contra la salida que guardaste.",
        "Pega tu función refactorizada en el reto: compara el arreglo completo, incluido el empate."
      ],
      prompt: "Refactoriza este código JavaScript para que sea legible y mantenible: nombres descriptivos, const y let en lugar de var, métodos de arreglo en lugar de bucles anidados, constantes con nombre en lugar de números sueltos, y funciones pequeñas con una sola responsabilidad.\nNO cambies el comportamiento: la salida debe ser idéntica, incluido el caso de empate en el mejor promedio.\nDeja la función principal con el nombre generarReporte(grupo) y que devuelva el arreglo de cadenas.",
      exito: [
        "El reto en verde: la salida es idéntica a la original",
        "El código nuevo usa const/let y funciones con nombres claros",
        "Ana sigue siendo el mejor promedio aunque Marta tenga el mismo número"
      ],
      archivos: ["e07-refactor.js", "e07-refactor.html"],
      pista: "Ana y Marta empatan en 91.7. Si tu versión devuelve Marta, la comparación pasó de «mayor que» a «mayor o igual». Pídele conservar al primero en caso de empate.",
      instructor: "Lo que suele romperse: el empate (>= en lugar de >, o un sort que no es estable a ojos del alumno), y toFixed omitido en «Mejor promedio». Ambos los atrapa el reto. Remarca que «refactorizar» significa misma salida exacta.",
      reto: {
        fn: "generarReporte",
        plantilla: "// Pega aquí tu versión refactorizada\nfunction generarReporte(grupo) {\n\n}",
        solucion: `const MINIMO_APROBATORIO = 70;
const NIVELES = [
  { minimo: 90, nombre: "Excelente" },
  { minimo: 80, nombre: "Notable" },
  { minimo: 70, nombre: "Suficiente" }
];

function promedioDe(calificaciones) {
  const suma = calificaciones.reduce((acum, c) => acum + c, 0);
  return suma / calificaciones.length;
}

function nivelDe(promedio) {
  const nivel = NIVELES.find((n) => promedio >= n.minimo);
  return nivel ? nivel.nombre : "Reprobado";
}

function lineaDeAlumno({ nombre, promedio }) {
  const acredita = promedio >= MINIMO_APROBATORIO ? "SI" : "NO";
  return nombre + ": " + promedio.toFixed(1) + " - " + nivelDe(promedio) + " - Acredita: " + acredita;
}

function generarReporte(grupo) {
  const alumnos = grupo.map(([nombre, calificaciones]) => ({ nombre, promedio: promedioDe(calificaciones) }));
  // ">" estricto: en un empate se queda el primero, igual que el original
  const mejor = alumnos.reduce((m, a) => (a.promedio > m.promedio ? a : m), { nombre: "", promedio: 0 });
  return alumnos.map(lineaDeAlumno)
    .concat("Mejor promedio: " + mejor.nombre + " (" + mejor.promedio.toFixed(1) + ")");
}`,
        casos: [
          {
            args: [[["Ana", [95, 88, 92]], ["Luis", [70, 65, 80]], ["Marta", [100, 90, 85]], ["Pedro", [50, 60, 40]]]],
            esperado: [
              "Ana: 91.7 - Excelente - Acredita: SI",
              "Luis: 71.7 - Suficiente - Acredita: SI",
              "Marta: 91.7 - Excelente - Acredita: SI",
              "Pedro: 50.0 - Reprobado - Acredita: NO",
              "Mejor promedio: Ana (91.7)"
            ],
            desc: "El grupo original, con el empate entre Ana y Marta"
          },
          {
            args: [[["Sol", [80, 80, 80]]]],
            esperado: ["Sol: 80.0 - Notable - Acredita: SI", "Mejor promedio: Sol (80.0)"],
            desc: "Un solo alumno en el límite de Notable"
          }
        ]
      }
    },

    e8: {
      titulo: "Pruebas: ¿falla el código o falla la prueba?", dia: "d2", minutos: 75,
      objetivo: "Dejar que la IA escriba las pruebas y decidir tú quién tiene la razón cuando una falla.",
      pasos: [
        "Abre <code>e08-funciones.js</code> y lee los comentarios: dicen lo que cada función <b>debería</b> hacer.",
        "Pide las pruebas con el prompt. Guárdalas en <code>e08-pruebas.js</code> y ejecútalas desde una página o con la consola.",
        "Por cada prueba que falle decide: ¿el error está en la función o en la prueba? Corrige lo que corresponda.",
        "Pega tus tres funciones corregidas en el reto."
      ],
      prompt: "@e08-funciones.js Escribe pruebas en JavaScript puro (sin librerías) para todas las funciones de este archivo. Usa una función auxiliar probar(descripcion, resultado, esperado) que imprima en consola si pasa o falla.\nCubre casos normales, casos borde (vacío, cero, negativos, los límites exactos) y los errores que el comentario promete.\nImportante: si encuentras una función que NO hace lo que dice su comentario, NO ajustes la prueba para que pase. Avísame del bug y déjalo marcado.",
      exito: [
        "Al menos 12 pruebas ejecutándose",
        "Encontraste los tres bugs reales y los corregiste en el código, no en las pruebas",
        "El reto queda en verde"
      ],
      archivos: ["e08-funciones.js"],
      pista: "Prueba una contraseña de exactamente 8 caracteres, un triángulo de lados 1, 2 y 10, y formatea 1234.5.",
      instructor: "Bugs sembrados: validarContrasena usa `> 8` y el comentario dice «al menos 8»; clasificarTriangulo nunca valida la desigualdad triangular ni lados ≤ 0 pese a prometer Error; formatoMoneda no pone separador de miles («$1234.50» en vez de «$1,234.50»). esPalindromo y calcularDescuento sí están bien: sirven para ver que no todo lo que la IA toca está roto.",
      reto: {
        fn: "validarContrasena",
        plantilla: "// Pega aquí tus tres funciones corregidas\nfunction validarContrasena(pwd) {\n\n}\n\nfunction clasificarTriangulo(a, b, c) {\n\n}\n\nfunction formatoMoneda(n) {\n\n}",
        solucion: `function validarContrasena(pwd) {
  return pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);   // antes: > 8
}

function clasificarTriangulo(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || a + c <= b || b + c <= a) {
    throw new Error("Los lados no forman un triángulo válido");
  }
  if (a === b && b === c) return "equilatero";
  if (a === b || b === c || a === c) return "isosceles";
  return "escaleno";
}

function formatoMoneda(n) {
  const [enteros, decimales] = n.toFixed(2).split(".");
  return "$" + enteros.replace(/\\B(?=(\\d{3})+$)/g, ",") + "." + decimales;
}`,
        casos: [
          { fn: "validarContrasena", args: ["Abcdef12"], esperado: true, desc: "Exactamente 8 caracteres: debe aceptarse" },
          { fn: "validarContrasena", args: ["Abcdefg"], esperado: false, desc: "7 caracteres y sin número" },
          { fn: "validarContrasena", args: ["abcdefgh1"], esperado: false, desc: "Sin mayúscula" },
          { fn: "clasificarTriangulo", args: [3, 4, 5], esperado: "escaleno", desc: "Triángulo válido escaleno" },
          { fn: "clasificarTriangulo", args: [5, 5, 5], esperado: "equilatero", desc: "Equilátero" },
          { fn: "clasificarTriangulo", args: [1, 2, 10], lanza: true, desc: "Lados que no forman triángulo: debe lanzar Error" },
          { fn: "clasificarTriangulo", args: [0, 0, 0], lanza: true, desc: "Lados en cero: debe lanzar Error" },
          { fn: "formatoMoneda", args: [1234.5], esperado: "$1,234.50", desc: "Con separador de miles" },
          { fn: "formatoMoneda", args: [999], esperado: "$999.00", desc: "Sin miles, con dos decimales" }
        ]
      }
    },

    e9: {
      titulo: "Documentar sin inventar", dia: "d2", minutos: 55,
      objetivo: "Generar documentación útil y cazar las afirmaciones que el código no respalda.",
      pasos: [
        "Usa tu versión refactorizada del ejercicio 7 o el archivo <code>e08-funciones.js</code> ya corregido.",
        "Pide JSDoc y README con el prompt.",
        "Revisa afirmación por afirmación: marca cada una como verdadera o inventada.",
        "Corrige lo inventado y escribe en una línea qué aprendiste."
      ],
      prompt: "Genera comentarios JSDoc en español para cada función de este archivo y un README.md breve con: qué hace, cómo abrirlo en el navegador y un ejemplo de uso.\nDescribe SOLO lo que el código hace de verdad. No inventes funcionalidades, parámetros opcionales, validaciones ni dependencias que no estén en el código.",
      exito: [
        "Todas las funciones tienen JSDoc y existe un README",
        "Encontraste y corregiste al menos una afirmación inventada"
      ],
      pista: "Lo más común: documentación que promete «maneja errores» o «valida la entrada» cuando el código no lo hace. Búscalo."
    },

    e10: {
      titulo: "Seguridad en el navegador", dia: "d2", minutos: 60,
      objetivo: "Detectar vulnerabilidades web, demostrar una en el archivo de práctica y corregirla.",
      pasos: [
        "Abre <code>e10-seguridad.html</code> con Live Server. Es código con fallas puestas a propósito.",
        "Antes de pedir nada: publica un comentario cuyo texto sea <code>&lt;img src=x onerror=\"alert('XSS')\"&gt;</code> y mira qué pasa.",
        "Pide la revisión completa con el prompt.",
        "Escribe la función <code>escaparHTML</code> con ayuda de la IA, pégala en el reto y después aplícala en el archivo. Repite la demostración: ya no debe saltar la alerta."
      ],
      prompt: "@e10-seguridad.js Actúa como revisor de seguridad web. Lista las vulnerabilidades ordenadas por gravedad. Para cada una: dónde está, cómo se explota con un ejemplo concreto de entrada, y el arreglo.\nDespués escríbeme solo la función escaparHTML(texto) que convierta &, <, > y comillas dobles en sus entidades HTML, para usarla antes de insertar texto del usuario.",
      exito: [
        "Identificaste XSS por innerHTML, uso de eval, contraseña y clave en el código, y confianza en un valor de localStorage para dar permisos de administrador",
        "La alerta salta antes del arreglo y ya no después",
        "El reto queda en verde"
      ],
      archivos: ["e10-seguridad.js", "e10-seguridad.html"],
      pista: "Escapa primero el & y después los demás; si lo haces al revés, conviertes los & que acabas de generar y queda todo mal.",
      instructor: "Fallas sembradas: innerHTML con texto del usuario (XSS), eval en la calculadora, credenciales y API key en el código, autorización basada en localStorage.esAdmin (editable desde la consola), y buscarUsuario arma SQL por concatenación. Pide que abran la consola y hagan localStorage.setItem('esAdmin','true') para ver lo frágil que es.",
      reto: {
        fn: "escaparHTML",
        plantilla: "// Pega aquí la función que te dio la IA\nfunction escaparHTML(texto) {\n\n}",
        solucion: `function escaparHTML(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")   // primero el &
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}`,
        casos: [
          { args: ["<b>hola</b>"], esperado: "&lt;b&gt;hola&lt;/b&gt;", desc: "Etiquetas HTML" },
          { args: ["Tom & Jerry"], esperado: "Tom &amp; Jerry", desc: "El ampersand" },
          { args: ["<img src=x onerror=\"alert(1)\">"], esperado: "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;", desc: "El ataque XSS del ejercicio" },
          { args: ["texto normal"], esperado: "texto normal", desc: "Texto sin caracteres especiales" }
        ]
      }
    },

    e11: {
      titulo: "Proyecto v1: gestor de tareas", dia: "d3", minutos: 120,
      objetivo: "Construir una aplicación web por partes: primero el plan, después cada pieza con su verificación.",
      pasos: [
        "Abre la carpeta <code>practicas/proyecto</code>: ya tiene <code>index.html</code>, <code>app.js</code> con el esqueleto y <code>styles.css</code>.",
        "Pide <b>solo el plan</b> (primer prompt). No avances hasta entenderlo.",
        "Implementa el almacenamiento (segundo prompt) y pruébalo desde la consola antes de seguir.",
        "Pide después las operaciones, luego la interfaz y al final los eventos. Una pieza a la vez, recargando el navegador en cada paso."
      ],
      prompt: "PROMPT 1 (plan)\n@app.js Voy a construir un gestor de tareas en JavaScript puro, sin librerías, que guarda en localStorage. Funciones: agregar, listar, completar y borrar. El esqueleto ya está en este archivo. Antes de escribir código, propón: qué hace cada función, qué parámetros recibe y qué estructura tendrá cada tarea. Máximo 20 líneas. Espera mi aprobación.\n\nPROMPT 2 (primera pieza)\nImplementa SOLO cargarTareas() y guardarTareas(). cargarTareas debe devolver un arreglo vacío si no hay nada guardado o si el JSON está corrupto, sin tronar la página. No toques las demás funciones todavía.",
      exito: [
        "Puedes agregar, completar y borrar tareas desde la página",
        "Al recargar el navegador las tareas siguen ahí",
        "Explicas qué hace cada función sin leer el código"
      ],
      pista: "Si la IA te entrega todo el archivo de un jalón, pídele que vuelva a la pieza que ibas: lo que no puedes verificar, no lo puedes entregar.",
      instructor: "Revisa en cada equipo que cargarTareas use try/catch alrededor de JSON.parse y que pintarTareas use textContent o createElement, no innerHTML con el título (conecta con E10). Prueba rápida: localStorage.setItem('taller-tareas','{roto') y recargar; la página no debe tronar."
    },

    e12: {
      titulo: "Proyecto v2: prioridades con pruebas primero", dia: "d3", minutos: 75,
      objetivo: "Practicar el orden inverso: las pruebas antes que el código.",
      pasos: [
        "Requisito nuevo: cada tarea guarda una prioridad (alta, media o baja) y se pueden filtrar por estado y prioridad.",
        "Pide primero las pruebas (prompt) y léelas antes de continuar.",
        "Pide después la implementación mínima para que esas pruebas pasen.",
        "Pega <code>filtrarTareas</code> en el reto y después intégrala en tu proyecto con botones de filtro."
      ],
      prompt: "Mi gestor de tareas ahora guarda una prioridad ('alta', 'media' o 'baja') en cada tarea, así: { id, titulo, completada, prioridad }.\nNecesito la función filtrarTareas(tareas, filtros) donde filtros es un objeto opcional que puede traer completada y/o prioridad. Si un filtro no viene, no se aplica. Si filtros no viene o está vacío, devuelve todas.\nPrimero escribe SOLO las pruebas, cubriendo filtros combinados, filtro vacío y arreglo vacío. No implementes nada todavía.",
      exito: [
        "Las pruebas se escribieron antes que el código",
        "El reto en verde y los filtros funcionan en tu proyecto"
      ],
      pista: "Ojo con filtrar por completada: false. Si la implementación revisa «si el filtro existe» con un if simple, el valor false se ignora por error.",
      instructor: "El bug esperado es if (filtros.completada) en lugar de comparar con undefined: el caso 2 queda en rojo. También es común que truene cuando no se pasa el segundo argumento (caso 4).",
      reto: {
        fn: "filtrarTareas",
        plantilla: "// Pega aquí tu función\nfunction filtrarTareas(tareas, filtros) {\n\n}",
        solucion: `function filtrarTareas(tareas, filtros) {
  const f = filtros || {};
  return tareas.filter((t) =>
    (f.completada === undefined || t.completada === f.completada) &&
    (f.prioridad === undefined || t.prioridad === f.prioridad)
  );
}`,
        casos: [
          {
            args: [[{ id: 1, titulo: "A", completada: false, prioridad: "alta" }, { id: 2, titulo: "B", completada: true, prioridad: "baja" }], {}],
            esperado: [{ id: 1, titulo: "A", completada: false, prioridad: "alta" }, { id: 2, titulo: "B", completada: true, prioridad: "baja" }],
            desc: "Filtros vacíos: devuelve todas"
          },
          {
            args: [[{ id: 1, titulo: "A", completada: false, prioridad: "alta" }, { id: 2, titulo: "B", completada: true, prioridad: "baja" }], { completada: false }],
            esperado: [{ id: 1, titulo: "A", completada: false, prioridad: "alta" }],
            desc: "Filtrar por completada: false (el caso de la pista)"
          },
          {
            args: [[{ id: 1, titulo: "A", completada: false, prioridad: "alta" }, { id: 2, titulo: "B", completada: false, prioridad: "alta" }, { id: 3, titulo: "C", completada: true, prioridad: "alta" }], { completada: false, prioridad: "alta" }],
            esperado: [{ id: 1, titulo: "A", completada: false, prioridad: "alta" }, { id: 2, titulo: "B", completada: false, prioridad: "alta" }],
            desc: "Dos filtros combinados"
          },
          {
            args: [[{ id: 1, titulo: "A", completada: true, prioridad: "media" }]],
            esperado: [{ id: 1, titulo: "A", completada: true, prioridad: "media" }],
            desc: "Sin segundo argumento: devuelve todas"
          },
          { args: [[], { prioridad: "alta" }], esperado: [], desc: "Arreglo vacío" }
        ]
      }
    },

    e13: {
      titulo: "Alucinaciones, privacidad y ética", dia: "d3", minutos: 45,
      objetivo: "Detectar respuestas inventadas y fijar tus reglas de uso responsable.",
      pasos: [
        "Pregunta al modelo cada punto de la lista de abajo, uno por uno.",
        "Verifica cada respuesta en la documentación oficial (MDN: developer.mozilla.org).",
        "Clasifica cada una: correcta, parcialmente correcta o inventada.",
        "Escribe tus tres reglas personales para usar IA al programar y compártelas con el grupo."
      ],
      prompt: "1) ¿Cómo uso el método Array.prototype.sortBy() de JavaScript?\n2) Dame un ejemplo con la librería 'tecnm-dom-utils'.\n3) ¿Qué opción de localStorage.setItem() sirve para que el dato expire automáticamente?\n4) ¿Cuál es la diferencia entre document.querySelector y document.querySelectorAll?\n5) ¿Cómo uso el atributo autocorrect=\"strict\" en un input de HTML?\n\n--- Reflexión ---\n¿Qué nunca pegarías en un chat de IA? (contraseñas, tokens, datos de clientes, código con licencia restrictiva…)",
      exito: [
        "Clasificaste las 5 respuestas con evidencia de MDN",
        "Tienes tus 3 reglas escritas"
      ],
      pista: "Solo una de las cinco preguntas es sobre algo que existe de verdad. Observa si el modelo te corrige o si te sigue la corriente e inventa documentación.",
      instructor: "Respuestas: 1) sortBy no existe en Array (existen sort y toSorted). 2) La librería no existe. 3) setItem no tiene opción de expiración; se simula guardando una fecha. 4) La única legítima. 5) El atributo autocorrect existe, pero solo acepta on/off: «strict» es inventado. Es la más interesante porque mezcla algo real con algo falso."
    }
  }
};
