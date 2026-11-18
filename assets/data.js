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
      titulo: "Observar a la IA sobre código real",
      objetivo: "Hoy no esperamos que el modelo lo resuelva todo: lo ponemos a prueba con preguntas pequeñas y registramos qué acierta, qué falla y qué inventa. Tú cierras la brecha y el reto verifica tu código.",
      agenda: [
        { hora: "7:00–7:20",   tipo: "teoria",   titulo: "Repaso y cómo vamos a observar", detalle: "Bitácoras del día 1. Cada ejercicio de hoy trae un registro «Observa»: marcas Acertó, A medias, Falló o Inventó por cada pregunta." },
        { hora: "7:20–8:30",   tipo: "practica", titulo: "¿Encuentra los cuatro errores?", detalle: "Una función por prompt. Registras cuáles encontró y corriges tú los que no.", ejercicios: ["e6"] },
        { hora: "8:30–9:30",   tipo: "practica", titulo: "Refactorizar en pasos pequeños", detalle: "Un cambio por prompt y el reto después de cada uno: ¿en qué paso rompe la salida?", ejercicios: ["e7"] },
        { hora: "9:30–9:45",   tipo: "descanso", titulo: "Descanso" },
        { hora: "9:45–11:00",  tipo: "practica", titulo: "¿Detecta los bugs… o los inventa?", detalle: "Cinco funciones; dos están bien a propósito. ¿Distingue unas de otras?", ejercicios: ["e8"] },
        { hora: "11:00–12:00", tipo: "comida",   titulo: "Comida" },
        { hora: "12:00–12:30", tipo: "practica", titulo: "Documentar: cuenta lo que inventa", detalle: "JSDoc de una función con bug: ¿describe el código o repite el comentario?", ejercicios: ["e9"] },
        { hora: "12:30–13:30", tipo: "practica", titulo: "¿Qué vulnerabilidades ve?", detalle: "Cinco fallas sembradas. Demuestras el XSS a mano y lo corriges con su ayuda.", ejercicios: ["e10"] },
        { hora: "13:30–14:00", tipo: "cierre",   titulo: "Comparar modelos", detalle: "Cada quien lee su resumen del día (al final de esta pestaña). Comparamos 0.5b, 1.5b y 3b: ¿dónde acertó cada uno?" }
      ],
      instructor: [
        "Mensaje del día: que la IA falle NO es que el ejercicio salió mal; es el dato que estamos midiendo. Lo que se califica es el registro y el reto en verde con su propio código.",
        "Que no pidan «arréglalo todo»: los prompts ya vienen partidos en preguntas pequeñas. Chat nuevo si el modelo empieza a perderse.",
        "Para el cierre: dibuja en el pizarrón una tabla con columnas 0.5b / 1.5b / 3b y filas E6 a E10; cada alumno dicta sus aciertos. Es la conclusión empírica del día.",
        "E10: la demostración de XSS es sobre el archivo de práctica; deja claro que no se prueba en sitios ajenos."
      ]
    },
    {
      id: "d3", corto: "Día 3", fecha: "Jueves 19 de noviembre",
      titulo: "Proyecto por partes, límites y ética",
      objetivo: "Construir una app completa pieza por pieza, registrando cuáles salieron bien a la primera y cuáles tuviste que corregir tú. Al final, comprobar cuándo la IA te corrige y cuándo te sigue la corriente.",
      agenda: [
        { hora: "7:00–7:30",   tipo: "teoria",   titulo: "Flujo de trabajo con IA", detalle: "Planear → una pieza → probar → registrar. Repaso del resumen del día 2: ¿qué tipo de tarea le salió mejor al modelo?" },
        { hora: "7:30–9:30",   tipo: "practica", titulo: "Proyecto v1: una pieza por prompt", detalle: "Cinco prompts: plan, almacenamiento, operaciones, interfaz y eventos. Registras qué pieza salió a la primera.", ejercicios: ["e11"] },
        { hora: "9:30–9:45",   tipo: "descanso", titulo: "Descanso" },
        { hora: "9:45–11:00",  tipo: "practica", titulo: "Proyecto v2: ¿sus pruebas atrapan su error?", detalle: "Primero las pruebas, luego el código. ¿Las pruebas que escribió cubren el caso donde falla su propia implementación?", ejercicios: ["e12"] },
        { hora: "11:00–12:00", tipo: "comida",   titulo: "Comida" },
        { hora: "12:00–12:45", tipo: "practica", titulo: "¿Te corrige o te sigue la corriente?", detalle: "Cinco preguntas, cuatro con trampa. Luego, tus tres reglas personales de uso.", ejercicios: ["e13"] },
        { hora: "12:45–13:30", tipo: "teoria",   titulo: "Demos del proyecto", detalle: "3 minutos por equipo: qué hace, qué pieza le costó más a la IA y qué tuviste que corregir tú." },
        { hora: "13:30–14:00", tipo: "cierre",   titulo: "Conclusión: ¿para qué sirve cada modelo?", detalle: "Juntamos los resúmenes de los días 2 y 3 por tamaño de modelo, y cerramos con siguientes pasos." }
      ],
      instructor: [
        "Igual que el día 2: que la IA falle es el dato, no un fracaso. Si una pieza falla dos veces, el alumno la escribe con la pista o con la solución de referencia (modo instructor) y lo registra como «Falló». Lo que se evalúa es la app funcionando y el registro.",
        "En las demos pide que lean su resumen del día: qué pieza salió a la primera y cuál no. Suele repetirse el patrón: las piezas chicas y bien especificadas salen; los eventos (que conectan todo) son las que más fallan.",
        "Para el cierre: completa la tabla del pizarrón del día 2 con las filas E11 a E13 y saca la conclusión con el grupo: qué tareas sí delegarías a un modelo chico y cuáles no.",
        "Ajusta el tiempo de demos según el número de alumnos; si son muchos, demos por parejas.",
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
      titulo: "¿Encuentra los cuatro errores?", dia: "d2", minutos: 70,
      objetivo: "Medir qué tan bien localiza errores un modelo pequeño cuando le preguntas por una función a la vez, y corregir tú lo que no encuentre.",
      pasos: [
        "Abre <code>e06-debug.html</code> con Live Server y la consola (<kbd>F12</kbd>). Anota los cuatro valores que muestra.",
        "Chat nuevo, adjunta el archivo con <kbd>@</kbd> y usa el <b>PROMPT 1</b> (solo la función <code>total</code>). Registra abajo qué respondió.",
        "Sigue con los prompts 2, 3 y 4, uno por función. Si el modelo empieza a divagar, abre un chat nuevo.",
        "Aplica tú cada arreglo, recarga y verifica. Junta las funciones corregidas en <code>estadisticas(ventas)</code> y pégala en el reto."
      ],
      prompt: "PROMPT 1\n@e06-debug.js Mira SOLO la función total. Con [100, 600, 300, 150, 100] debería devolver 1250 pero devuelve 1150. ¿Qué línea está mal y por qué? Responde en máximo 3 líneas.\n\nPROMPT 2\nAhora SOLO la función promedio. Debería ser el total entre 5 ventas (250) y da otra cosa. ¿Qué línea está mal? Máximo 3 líneas.\n\nPROMPT 3\nAhora SOLO mayorVenta. Debería dar 600 y da 100. ¿Qué línea está mal? Máximo 3 líneas.\n\nPROMPT 4\nAhora SOLO ventasSobrePromedio. Debería dar 2 y da 0. ¿Qué línea está mal? Máximo 3 líneas.",
      observar: [
        "total: ¿señaló que el bucle empieza en 1 y se salta la primera venta?",
        "promedio: ¿señaló la división entre length - 1?",
        "mayorVenta: ¿señaló la comparación al revés (< en vez de >)?",
        "ventasSobrePromedio: ¿notó que compara contra la función promedio y no contra su resultado?",
        "Se limitó a lo que preguntaste: no inventó errores ni reescribió el archivo completo"
      ],
      exito: [
        "Registraste las cinco observaciones",
        "La página muestra los cuatro valores correctos",
        "El reto queda en verde con tu código"
      ],
      archivos: ["e06-debug.js", "e06-debug.html"],
      pista: "El de ventasSobrePromedio es el que más fallan los modelos chicos: en JavaScript comparar un número con una función no truena, solo da false. Si la IA no lo ve, busca dónde se usa promedio sin paréntesis.",
      instructor: "Los 4 errores: `let i = 1` omite la primera venta; `ventas.length - 1` en promedio; `if (v < mayor)` debería ser `>`; `v > promedio` compara contra la función, no contra su resultado (en JS no truena: da false y devuelve 0). Lo esperable con 0.5b/1.5b: 2 o 3 de 4; el cuarto casi nunca. Ese hueco es la lección.",
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
      titulo: "Refactorizar en pasos pequeños", dia: "d2", minutos: 60,
      objetivo: "Descubrir en qué paso de una refactorización el modelo cambia la salida sin avisar, usando el reto como red de seguridad.",
      pasos: [
        "Línea base: copia la función <code>p</code> de <code>e07-refactor.js</code>, pégala en el reto cambiando su nombre a <code>generarReporte</code> y ejecútala. Debe quedar en verde.",
        "Selecciona la función en VS Code, <kbd>Ctrl</kbd>+<kbd>I</kbd> con el <b>PROMPT 1</b>. Pega el resultado en el reto y ejecútalo. Registra si siguió en verde.",
        "Repite con los prompts 2, 3 y 4, siempre sobre la versión anterior. Si un paso rompe el reto, díselo a la IA con el caso que falló o rechaza el cambio.",
        "Al final compara tu versión con la original: ¿se lee mejor? ¿Cuántos pasos tuviste que corregir?"
      ],
      prompt: "PROMPT 1\nCambia todos los var por const o let. No cambies nada más.\n\nPROMPT 2\nRenombra las variables de una letra con nombres descriptivos en español (d → grupo, x → alumno, a → promedio, n → nivel…). La función se sigue llamando generarReporte. No cambies la lógica.\n\nPROMPT 3\nExtrae una función promedioDe(calificaciones) y úsala en los dos lugares donde se calcula el promedio. No cambies nada más.\n\nPROMPT 4\nReemplaza los if anidados del nivel por una función nivelDe(promedio). Conserva exactamente los mismos rangos y textos.",
      observar: [
        "Paso 1 (var → const/let): ¿el reto siguió en verde?",
        "Paso 2 (nombres): ¿siguió en verde y usó los nombres que pediste?",
        "Paso 3 (promedioDe): ¿siguió en verde?",
        "Paso 4 (nivelDe): ¿conservó los rangos y el empate entre Ana y Marta?",
        "Hizo solo lo que pediste en cada paso, sin cambios extra"
      ],
      exito: [
        "Registraste los cinco pasos",
        "Tu versión final en verde en el reto",
        "Puedes decir en qué paso se rompió algo y por qué (si se rompió)"
      ],
      archivos: ["e07-refactor.js", "e07-refactor.html"],
      pista: "Ana y Marta empatan en 91.7. Si tu versión devuelve Marta, la comparación pasó de «mayor que» a «mayor o igual». Pídele conservar al primero en caso de empate.",
      instructor: "Paso 1: es muy común que ponga const a variables que se reasignan (t, m, q) y truene con «Assignment to constant variable»: el reto lo muestra en rojo, excelente para observar. Paso 4: puede cambiar >= por > en los rangos. Si alguien quiere el empate como reto extra, que pida «usa sort para encontrar el mejor» y vea cómo cambia a Marta.",
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
      titulo: "¿Detecta los bugs… o los inventa?", dia: "d2", minutos: 75,
      objetivo: "Comprobar si el modelo distingue código correcto de código con errores. Algunas de las cinco funciones están bien a propósito.",
      pasos: [
        "Abre <code>e08-funciones.js</code>. Cada comentario dice lo que la función <b>debería</b> hacer.",
        "Chat nuevo. Selecciona <b>una</b> función, <kbd>Ctrl</kbd>+<kbd>L</kbd> y usa el <b>PROMPT 1</b>. Anota su veredicto. Repite con las cinco.",
        "Comprueba tú cada veredicto: pega el archivo completo en la consola del navegador (<kbd>F12</kbd>) y llama a la función con la entrada que propuso la IA. Registra abajo si su veredicto fue correcto.",
        "Corrige las funciones que sí tienen error (con o sin la IA) y pega esas tres en el reto."
      ],
      prompt: "PROMPT 1 (una función a la vez)\n¿Esta función hace exactamente lo que dice su comentario? Responde SÍ o NO. Si es NO, dame una entrada concreta con la que falla, qué devuelve y qué debería devolver.\n\nPROMPT 2 (opcional, si te sobra tiempo)\nEscribe 4 llamadas de prueba para esta función con console.log, incluyendo un caso límite, y al lado el resultado que debería dar según el comentario.",
      observar: [
        "esPalindromo: ¿su veredicto fue correcto?",
        "calcularDescuento: ¿su veredicto fue correcto?",
        "validarContrasena: ¿su veredicto fue correcto?",
        "clasificarTriangulo: ¿su veredicto fue correcto?",
        "formatoMoneda: ¿su veredicto fue correcto?",
        "Cuando dijo NO, la entrada que propuso de verdad demostraba el error"
      ],
      exito: [
        "Registraste el veredicto de las cinco funciones, comprobado en la consola",
        "Sabes cuáles estaban bien y cuáles no, sin depender de lo que dijo la IA",
        "El reto queda en verde"
      ],
      archivos: ["e08-funciones.js"],
      pista: "Dos de las cinco están bien. Para comprobar las otras: una contraseña de exactamente 8 caracteres, un triángulo de lados 1, 2 y 10, y formatoMoneda(1234.5).",
      instructor: "Bugs sembrados: validarContrasena usa `> 8` y el comentario dice «al menos 8»; clasificarTriangulo nunca valida la desigualdad triangular ni lados ≤ 0 pese a prometer Error; formatoMoneda no pone separador de miles («$1234.50» en vez de «$1,234.50»). esPalindromo y calcularDescuento sí están bien: son el control. Lo más revelador del día es cuando el modelo «encuentra» un bug en una de ellas (falso positivo) o declara correcta a clasificarTriangulo porque leyó el comentario y no el código.",
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
      titulo: "Documentar: cuenta lo que inventa", dia: "d2", minutos: 30,
      objetivo: "Ver si el modelo documenta lo que el código hace o lo que el comentario dice que hace.",
      pasos: [
        "Abre el <code>e08-funciones.js</code> <b>original</b> (sin tus correcciones; vuelve a descargarlo si hace falta).",
        "Borra el comentario de arriba de <code>clasificarTriangulo</code>, selecciona la función y usa el <b>PROMPT 1</b> con <kbd>Ctrl</kbd>+<kbd>I</kbd>.",
        "Haz lo mismo con <code>formatoMoneda</code> usando el <b>PROMPT 2</b>, pero esta vez <b>deja</b> el comentario original.",
        "Compara cada JSDoc contra el código, línea por línea, y registra abajo."
      ],
      prompt: "PROMPT 1 (sin el comentario original)\nEscribe un comentario JSDoc en español para esta función. Describe SOLO lo que el código hace de verdad: parámetros, valor de retorno y si lanza errores.\n\nPROMPT 2 (con el comentario original)\nReemplaza el comentario de esta función por un JSDoc en español. Describe SOLO lo que el código hace de verdad.",
      observar: [
        "clasificarTriangulo: describió bien qué recibe y qué devuelve",
        "clasificarTriangulo: no afirmó que lanza un Error (el código nunca lo lanza)",
        "formatoMoneda: no afirmó que pone separador de miles (el código no lo hace)",
        "No inventó parámetros opcionales, valores por omisión ni validaciones"
      ],
      exito: [
        "Registraste las cuatro observaciones",
        "Puedes explicar por qué el comentario original «contagió» o no a la documentación"
      ],
      pista: "Lo más común: el JSDoc repite la promesa del comentario («lanza Error si no es triángulo», «1234.5 → $1,234.50») aunque el código no lo haga. Por eso la documentación también se verifica contra el código.",
      instructor: "Diseñado para mostrar el sesgo hacia el comentario: con el comentario presente casi siempre copia «$1,234.50». Sin él, a veces sí describe el código real. Comparar ambos casos en voz alta toma 5 minutos y deja muy clara la idea."
    },

    e10: {
      titulo: "¿Qué vulnerabilidades ve el modelo?", dia: "d2", minutos: 60,
      objetivo: "Medir cuántas de cinco fallas sembradas detecta el modelo, demostrar una tú mismo y corregirla con su ayuda.",
      pasos: [
        "Abre <code>e10-seguridad.html</code> con Live Server. Es código con fallas puestas a propósito.",
        "Antes de preguntar nada: publica un comentario cuyo texto sea <code>&lt;img src=x onerror=\"alert('XSS')\"&gt;</code> y mira qué pasa.",
        "Chat nuevo con el <b>PROMPT 1</b>. Registra abajo cuáles de las cinco fallas mencionó (no cuentan las que tú le sugieras después).",
        "Pide la función con el <b>PROMPT 2</b>, pégala en el reto y, ya en verde, úsala en <code>pintarComentarios</code>. Repite la demostración: la alerta ya no debe saltar."
      ],
      prompt: "PROMPT 1\n@e10-seguridad.js ¿Qué problemas de seguridad tiene este código? Haz una lista corta: función, problema y por qué es peligroso.\n\nPROMPT 2\nEscribe solo la función escaparHTML(texto) que convierta &, <, > y comillas dobles en sus entidades HTML. Sin explicación.",
      observar: [
        "Mencionó el XSS: innerHTML con texto del usuario en pintarComentarios",
        "Mencionó el uso de eval en calcular",
        "Mencionó la contraseña y la API key escritas en el código",
        "Mencionó que esAdmin se puede falsificar desde localStorage",
        "Mencionó la consulta SQL armada concatenando texto (buscarUsuario)",
        "Su escaparHTML pasó el reto al primer intento"
      ],
      exito: [
        "Registraste cuántas de las cinco fallas detectó",
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
      titulo: "Proyecto v1: una pieza por prompt", dia: "d3", minutos: 120,
      objetivo: "Construir el gestor de tareas en cinco piezas pequeñas, probando cada una antes de seguir y registrando cuáles salieron bien a la primera.",
      pasos: [
        "Abre la carpeta <code>practicas/proyecto</code> en VS Code y <code>index.html</code> con Live Server. Ya tiene el esqueleto en <code>app.js</code>.",
        "Chat nuevo con el <b>PROMPT 1</b> (solo el plan). Léelo y apruébalo antes de seguir.",
        "Prompts 2 a 5, uno por pieza. Después de cada uno, prueba en la consola (<kbd>F12</kbd>) con la prueba indicada en el prompt y registra abajo si salió a la primera.",
        "Si una pieza falla dos veces, escríbela tú (la pista ayuda) y márcala como «Falló». La meta es la app funcionando, no que la IA la haga sola."
      ],
      prompt: "PROMPT 1 · plan\n@app.js Voy a construir un gestor de tareas en JavaScript puro, sin librerías, que guarda en localStorage. El esqueleto ya está en este archivo. Antes de escribir código, propón: qué hace cada función, qué parámetros recibe y qué estructura tendrá cada tarea. Máximo 15 líneas. Espera mi aprobación.\n\nPROMPT 2 · almacenamiento\nImplementa SOLO cargarTareas() y guardarTareas(). cargarTareas debe devolver [] si no hay nada guardado o si el JSON está corrupto, sin tronar. No toques las demás funciones.\n→ Prueba en consola: localStorage.setItem('taller-tareas', '{roto'); cargarTareas()   // debe dar []\n\nPROMPT 3 · operaciones\nImplementa SOLO agregarTarea(titulo), completarTarea(id) y borrarTarea(id). Modifican el arreglo tareas y llaman a guardarTareas() al final. completarTarea alterna completada entre true y false. No toques la interfaz.\n→ Prueba en consola: agregarTarea('Estudiar'); tareas\n\nPROMPT 4 · interfaz\nImplementa SOLO pintarTareas(): un <li> por tarea dentro de #lista-tareas, con el título puesto con textContent (nunca innerHTML), un checkbox para completar y un botón Borrar. Muestra #vacio solo si no hay tareas.\n→ Prueba en consola: pintarTareas()\n\nPROMPT 5 · eventos\nCompleta SOLO el bloque DOMContentLoaded: cargar las tareas, pintarlas y, al enviar #form-tarea, agregar el texto de #titulo, limpiar el campo y volver a pintar. Que el checkbox y el botón Borrar de cada tarea funcionen.\n→ Prueba: agrega, completa, borra y recarga la página.",
      observar: [
        "Plan: esperó tu aprobación en lugar de escribir todo el código",
        "Almacenamiento: cargarTareas sobrevivió al JSON corrupto a la primera",
        "Operaciones: funcionaron a la primera desde la consola",
        "Interfaz: usó textContent o createElement, no innerHTML con el título",
        "Eventos: la app quedó funcionando completa sin que corrigieras nada",
        "En todas las piezas tocó solo lo que pediste"
      ],
      exito: [
        "Puedes agregar, completar y borrar tareas desde la página",
        "Al recargar el navegador las tareas siguen ahí",
        "Registraste las seis observaciones y sabes qué pieza costó más"
      ],
      archivos: ["proyecto/index.html", "proyecto/app.js", "proyecto/styles.css"],
      pista: "Si la IA te entrega el archivo completo, pídele que vuelva a la pieza que ibas: lo que no puedes verificar, no lo puedes entregar. Si la pieza 5 se complica, es normal: es la que conecta todo. Pide solo el submit del formulario primero y después el checkbox y el botón.",
      instructor: "Revisa en cada equipo que cargarTareas use try/catch alrededor de JSON.parse y que pintarTareas no use innerHTML con el título (conecta con E10). Patrón esperado con 0.5b/1.5b: piezas 2 y 3 salen; la 5 suele fallar (escucha clics antes de que existan los elementos, u olvida volver a pintar). La solución de referencia de abajo sirve para quien se atore.",
      solucion: `const CLAVE = "taller-tareas";

let tareas = [];

// --- 1. Almacenamiento -------------------------------------------------
function cargarTareas() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE));
    return Array.isArray(datos) ? datos : [];
  } catch (e) {
    return [];
  }
}

function guardarTareas() {
  localStorage.setItem(CLAVE, JSON.stringify(tareas));
}

// --- 2. Operaciones ----------------------------------------------------
function agregarTarea(titulo) {
  const limpio = titulo.trim();
  if (!limpio) return;
  tareas.push({ id: Date.now(), titulo: limpio, completada: false });
  guardarTareas();
}

function completarTarea(id) {
  const tarea = tareas.find((t) => t.id === id);
  if (tarea) {
    tarea.completada = !tarea.completada;
    guardarTareas();
  }
}

function borrarTarea(id) {
  tareas = tareas.filter((t) => t.id !== id);
  guardarTareas();
}

// --- 3. Interfaz -------------------------------------------------------
function pintarTareas() {
  const lista = document.querySelector("#lista-tareas");
  lista.innerHTML = "";
  for (const tarea of tareas) {
    const li = document.createElement("li");
    if (tarea.completada) li.classList.add("completada");

    const casilla = document.createElement("input");
    casilla.type = "checkbox";
    casilla.checked = tarea.completada;
    casilla.addEventListener("change", () => { completarTarea(tarea.id); pintarTareas(); });

    const texto = document.createElement("span");
    texto.textContent = tarea.titulo;   // nunca innerHTML con texto del usuario

    const borrar = document.createElement("button");
    borrar.textContent = "Borrar";
    borrar.addEventListener("click", () => { borrarTarea(tarea.id); pintarTareas(); });

    li.append(casilla, texto, borrar);
    lista.appendChild(li);
  }
  document.querySelector("#vacio").hidden = tareas.length > 0;
}

// --- 4. Arranque -------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  tareas = cargarTareas();
  pintarTareas();
  document.querySelector("#form-tarea").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const campo = document.querySelector("#titulo");
    agregarTarea(campo.value);
    campo.value = "";
    pintarTareas();
  });
});`
    },

    e12: {
      titulo: "Proyecto v2: ¿sus pruebas atrapan su error?", dia: "d3", minutos: 75,
      objetivo: "Pedir las pruebas antes que el código y ver si las pruebas que escribe el modelo detectan los errores de su propia implementación.",
      pasos: [
        "Requisito nuevo: cada tarea guarda una prioridad (alta, media o baja) y se puede filtrar por estado y prioridad.",
        "Chat nuevo con el <b>PROMPT 1</b>: solo pruebas. Léelas y guárdalas en <code>pruebas.js</code>. Registra qué casos cubrió.",
        "<b>PROMPT 2</b>: la implementación. Pégala en el reto <b>y</b> corre sus propias pruebas en la consola. ¿Coinciden los dos resultados?",
        "Si el reto sale en rojo, describe a la IA el caso exacto. Con tiempo extra, agrega botones de filtro a tu proyecto."
      ],
      prompt: "PROMPT 1 · solo pruebas\nMi gestor de tareas guarda cada tarea así: { id, titulo, completada, prioridad } (prioridad es 'alta', 'media' o 'baja').\nVoy a escribir filtrarTareas(tareas, filtros). filtros es opcional y puede traer completada y/o prioridad. Si un filtro no viene, no se aplica. Si filtros no viene o está vacío, devuelve todas.\nEscribe SOLO 5 pruebas con console.log que muestren el resultado y el esperado. No implementes la función.\n\nPROMPT 2 · implementación\nAhora escribe filtrarTareas para que pasen esas pruebas. Solo la función, sin explicación.",
      observar: [
        "Escribió solo pruebas, sin implementar la función",
        "Sus pruebas incluyen filtrar por completada: false",
        "Sus pruebas incluyen llamar sin el segundo argumento o con {}",
        "Su implementación pasó el reto a la primera",
        "Cuando falló el reto, sus propias pruebas también lo detectaron"
      ],
      exito: [
        "Las pruebas se escribieron antes que el código",
        "El reto en verde",
        "Puedes explicar por qué pasar sus propias pruebas no garantizaba pasar el reto (si pasó)"
      ],
      pista: "Ojo con filtrar por completada: false. Si la implementación revisa «si el filtro existe» con un if simple, el valor false se ignora por error.",
      instructor: "El bug esperado es if (filtros.completada) en lugar de comparar con undefined: el caso 2 queda en rojo. También es común que truene cuando no se pasa el segundo argumento (caso 4). Lo valioso es la observación 5: si sus pruebas no incluían completada: false, el modelo «pasa sus pruebas» con el bug adentro. Las pruebas solo atrapan lo que alguien pensó en probar.",
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
      titulo: "¿Te corrige o te sigue la corriente?", dia: "d3", minutos: 45,
      objetivo: "Comprobar si el modelo admite que algo no existe o inventa documentación para complacerte, y fijar tus reglas de uso responsable.",
      pasos: [
        "Chat nuevo. Haz las cinco preguntas de abajo, una por una, sin dar pistas.",
        "Verifica cada respuesta en MDN (developer.mozilla.org) o buscando la librería en npmjs.com.",
        "Registra abajo: <b>Acertó</b> si te corrigió o respondió bien; <b>Inventó</b> si te siguió la corriente con algo falso; <b>A medias</b> si dudó pero igual dio un ejemplo.",
        "Escribe tus tres reglas personales para usar IA al programar y compártelas con el grupo."
      ],
      prompt: "1) ¿Cómo uso el método Array.prototype.sortBy() de JavaScript?\n2) Dame un ejemplo con la librería 'tecnm-dom-utils'.\n3) ¿Qué opción de localStorage.setItem() sirve para que el dato expire automáticamente?\n4) ¿Cuál es la diferencia entre document.querySelector y document.querySelectorAll?\n5) ¿Cómo uso el atributo autocorrect=\"strict\" en un input de HTML?\n\n--- Reflexión ---\n¿Qué nunca pegarías en un chat de IA? (contraseñas, tokens, datos de clientes, código con licencia restrictiva…)",
      observar: [
        "Pregunta 1 · Array.prototype.sortBy(): ¿dijo que no existe?",
        "Pregunta 2 · librería 'tecnm-dom-utils': ¿dijo que no la conoce?",
        "Pregunta 3 · expiración en localStorage.setItem(): ¿dijo que esa opción no existe?",
        "Pregunta 4 · querySelector contra querySelectorAll: ¿explicó bien la diferencia?",
        "Pregunta 5 · autocorrect=\"strict\": ¿dijo que ese valor no existe?"
      ],
      exito: [
        "Registraste las cinco respuestas con evidencia de MDN",
        "Tienes tus 3 reglas escritas"
      ],
      pista: "Solo una de las cinco preguntas es sobre algo que existe de verdad. Observa si el modelo te corrige o si te sigue la corriente e inventa documentación.",
      instructor: "Respuestas: 1) sortBy no existe en Array (existen sort y toSorted). 2) La librería no existe. 3) setItem no tiene opción de expiración; se simula guardando una fecha. 4) La única legítima. 5) El atributo autocorrect existe, pero solo acepta on/off: «strict» es inventado. Es la más interesante porque mezcla algo real con algo falso."
    }
  }
};
