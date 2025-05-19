📘 Aplicación de Diccionario – Prueba Técnica
Este proyecto es una aplicación web de diccionario desarrollada como parte de una prueba técnica para el cargo de Desarrollador Frontend (Nivel Bajo-Medio). La app fue construida utilizando Next.js, TypeScript y Tailwind CSS, siguiendo los lineamientos especificados en el enunciado.

🚀 Funcionalidades principales
🔍 Buscar definiciones de palabras usando la API pública de Free Dictionary.

💬 Visualizar resultados detallados: definiciones, clases gramaticales y fonética.

🔊 Reproducir audio de pronunciación (si está disponible).

🧠 Historial de palabras buscadas, con fecha y hora.

🆎 Selector de fuente tipográfica: serif, sans-serif y monospace.

🌗 Cambio entre tema claro y oscuro.

🌐 Diseño completamente responsive adaptado a diferentes tamaños de pantalla.

🧪 Validación de formulario al enviar búsquedas vacías.

🖱️ Estados visuales de hover y focus para todos los elementos interactivos.

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >

🧱 Tecnologías utilizadas
Framework: Next.js

Estilos: Tailwind CSS

Lenguaje: TypeScript

Manejo de estado: Redux Toolkit

Testing: Jest + React Testing Library

API de definiciones: Free Dictionary API

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >

🧑‍💻 Cómo ejecutar el proyecto localmente
Clona el repositorio:

git clone https://github.com/ckcristock/dictionary-app.git
cd dictionary-app

Instala las dependencias:
npm install

Inicia el servidor de desarrollo:
npm run dev

Abre tu navegador y entra a http://localhost:3000

> > Puedes navegar por el historial de palabras buscadas utilizando la tecla TAB, así como las teclas de flecha arriba y abajo, lo que mejora la experiencia para usuarios que, en sus labores diarias con software, minimizan el uso del mouse y completan formularios rápidamente mediante el uso del teclado.
> > El diccionario incluye validación de formatos y verifica tanto palabras permitidas como prohibidas.
> > El listado de palabras prohibidas en inglés se encuentra en el archivo SearchBar.tsx, dentro de la constante blacklist.
