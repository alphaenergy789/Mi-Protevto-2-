# Cómo cambiar este sitio

Este es el sitio de **AlphaEnergi** (Miami, Florida). Se edita pidiéndole los cambios a un asistente de IA, en español, con frases cortas. No necesitás saber programar.

## Antes que nada: cómo verlo corriendo

1. Abrí una terminal (la ventana de texto de tu computadora) dentro de esta carpeta.
2. Escribí `npm install` y apretá Enter. Descarga las piezas que usa el sitio. Se hace una sola vez.
3. Escribí `npm run dev` y apretá Enter. Abrí en el navegador la dirección que te muestra (normalmente `http://localhost:3000`).
4. Cada vez que guardes un cambio, la página se actualiza sola.

## Los dos únicos archivos que tenés que tocar

| Archivo | Para qué |
| --- | --- |
| `src/lib/content.ts` | **Todo**: textos, imágenes, fondos, teléfono, correo, dirección y horario. |
| `src/app/globals.css` | Los colores y las tipografías: el bloque `@theme` (marca) y los bloques de tema claro/oscuro justo debajo. |

Las secciones (cuáles se ven y en qué orden) están en `src/sections.ts`. Sacar una sección es poner `active: false`; no se borra la línea, así se puede volver atrás.

## Las 3 cosas que vas a querer cambiar

1. **Un fondo.** En `content.ts`, bloque `BACKGROUNDS`. Ejemplo: dejar el hero con una foto = una sola capa `{ type: "image", src: "https://tu-foto.jpg" }`.
2. **Un texto.** En `content.ts`, buscá la frase y cambiala entre las comillas. Cambia en computadora y celular a la vez.
3. **Un color.** En `globals.css`. `--color-sun` es el naranja del logo; `--hero-a` … `--hero-d` son las cuatro paradas del degradado blanco→azul del hero. Cambiás el valor y cambia en todo el sitio.

## Comandos listos para copiar y pegar

1. "Cambiá el teléfono de contacto por `<número>`."
2. "Cambiá el fondo del hero por esta imagen: `<dirección>`."
3. "Cambiá el color de acento del sitio a `<color>`."
4. "Sacá la sección de Servicios."
5. "Poné la sección de Contacto antes de la de Servicios."
6. "Cambiá el horario de atención a `<horario>`."
7. "Agregá un quinto servicio llamado `<nombre>` con este texto: `<texto>`."
8. "Reemplazá las dos tarjetas de números del hero por estos datos: `<datos>`."
9. "Cambiá el texto del botón principal del hero por `<texto>`."
10. "Cambiá el logo por esta imagen: `<dirección>`."

Si el asistente pregunta dónde vive algo, pegale esto: **"Todo el contenido está en `src/lib/content.ts`. Los colores y las tipografías, en `src/app/globals.css`. Las secciones, en `src/sections.ts`. No edites los componentes para cambiar contenido."**

## Lo que NO es fácil en este sitio

**1. El título grande del hero.** "ALPHA / ENERGI" no es un texto corrido: son cinco piezas colocadas a mano (`Alpha`, el anillo blanco, un `Ener` desenfocado, la barra blanca y un `gi` nítido) con el logo en el medio, y la parte de arriba del logo pasa por delante de las letras. Está hecho así para lograr ese efecto. Si cambiás el nombre de la marca, las piezas no se acomodan solas.
- Comando que sí funciona: *"Reemplazá el título partido del hero por un solo título centrado que lea `HERO.brand`, y borrá el anillo, la barra blanca y el recorte frontal del logo."*
- Costo: se pierde el anillo y el logo pasando por delante; el resto del sitio queda igual.

**2. Los textos están en dos idiomas.** Cada texto de `content.ts` existe en `es` y en `en`. Si cambiás uno, pedí que cambie también el otro, o la versión en inglés queda desactualizada. Comando: *"Cambiá `<texto>` en español y en inglés por `<texto nuevo>`."*

**3. El hero se coloca por coordenadas.** Podés cambiar *qué* se muestra (textos, imágenes), pero *dónde* queda cada cosa no se mueve con una frase: hay que recalcular las coordenadas. Pedí cambios de posición de a uno y revisá el resultado.

## Si algo se rompe

1. Deshacé el último cambio (en el editor, `Ctrl+Z` o `Cmd+Z`) y mirá si vuelve a andar.
2. Revisá que no falte ninguna coma ni ninguna comilla en `content.ts`: cada línea termina en coma y cada texto va entre comillas.
3. Mirá la terminal donde corre `npm run dev`: ahí aparece el error en rojo.
4. Copiá ese error completo y pegáselo al asistente diciendo: "Me aparece este error, arreglalo".
