// Solo se usa para regenerar assets/tailwind.css cuando agregues clases nuevas.
// El sitio publicado no necesita Node: tailwind.css ya va compilado en el repo.
// Comando (desde la raíz del sitio), ver README:
//   npx tailwindcss@3.4.17 -c tools/tailwind.config.js -i tools/tailwind.input.css -o assets/tailwind.css --minify
module.exports = {
  content: {
    relative: true,
    files: ["../index.html", "../assets/app.js", "../assets/data.js"]
  },
  theme: { extend: {} },
  plugins: [require("@tailwindcss/forms")]
};
