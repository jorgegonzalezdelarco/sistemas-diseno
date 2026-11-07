# CLAUDE.md

Repo **público** con los sistemas de diseño de los proyectos personales de Jorge: <https://github.com/jorgegonzalezdelarco/sistemas-diseno>. Decisión de Jorge del 07/11/2026; el nombre es exactamente `sistemas-diseno`, en plural, porque hay un tema por proyecto.

## AL EMPEZAR CADA MENSAJE

Con cada mensaje de Jorge, antes de nada: `sh ../vida-de-jorge/scripts/sincronizar-repos.sh`, que recorre todos los repos de `~/GitHub` sin subir nada. Decirle el resultado en una línea.

## FORMA DE TRABAJAR

- **Todo en español**, también las descripciones de los comandos. Los nombres técnicos se dejan como están.
- **Si Jorge opina o pregunta «¿cómo lo ves?», responder sin ejecutar nada.**
- **Git:** trabajo directo en `main`, con commit y push automáticos de Claude (permiso de Jorge, 07/11/2026). Antes de cada push, `node scripts/construir.mjs` sin errores, y `build/` subido con los cambios. Sin force push.
- **Es público:** nada privado, ni datos, ni claves, ni nombres de clientes. Solo colores, tipografías, medidas y documentación.

## QUÉ PROYECTOS LO USAN

- **Sí:** Vida de Jorge (`vida-de-jorge`), finanzas (web de `hogar`, en Vercel) y Monetización con IA (`monetizacion-con-ia`).
- **No:** pádel (`padel-balmis`): web casi abandonada y poco usada (Jorge, 07/11/2026). No se toca.
- **Aparte:** los módulos del instituto, DIW (`diw-semipresencial`), DWEC (`dwec`) y SI (`si-semi`). Son el trabajo de Jorge como profesor y funcionario y no tienen nada que ver con sus proyectos personales y emprendimientos. No usan este sistema salvo que Jorge lo pida.

## CÓMO ESTÁ HECHO

- **Tokens DTCG**, versión estable 2025.10, en `tokens/`:
  - `tokens/base/`: lo común a todos, que casi nunca cambia: espaciado, escala de tipografía y radio.
  - `tokens/base/pantallas.tokens.json`: los **cuatro tipos de pantalla** (decisión de Jorge, 07/11/2026): móvil (menos de 640 px), tablet (640-1023), ordenador (1024-2047) y ordenador grande (2048 o más). Fija los cortes (`--breakpoint-tablet`, `--breakpoint-ordenador`, `--breakpoint-grande`, que Tailwind 4 convierte en las variantes `tablet:`, `ordenador:` y `grande:`), la letra raíz de cada tipo (16, 16, 17 y 21 px) y el ancho máximo del contenido. En pantalla ancha se aprovecha el sitio con columnas, sin estirar los párrafos.
  - `tokens/temas/<proyecto>/`: los colores en modo claro y oscuro (`claro.tokens.json` y `oscuro.tokens.json`, con los mismos nombres) y las fuentes.
- **Colores en OKLCH** y con los nombres semánticos de shadcn (`primary`, `card`, `muted-foreground`…), porque los tres proyectos usan shadcn. El código de los proyectos usa siempre las variables, nunca colores sueltos.
- **`node scripts/construir.mjs`** genera `build/<tema>.css`, sin dependencias. El formato es compatible con Style Dictionary, si algún día hace falta. `build/` se sube al repo para que los proyectos lo instalen desde GitHub (`github:jorgegonzalezdelarco/sistemas-diseno#vX.Y.Z`).
- **Muestras:** `node scripts/muestras.mjs` genera `docs/muestras/<tema>.html`, una página autocontenida con colores, tipografía, radios, espaciado y piezas, en claro y oscuro. Es la que se pasa a Figma, y la que se mira para aprobar.
- **Versiones:** una etiqueta `vX.Y.Z` por cambio que se publique. Un color nuevo sube la versión menor; quitar o renombrar un token, la mayor.
- **Contraste:** antes de aprobar un color de texto, comprobar WCAG AA (4,5:1 en texto normal).

## FIGMA Y CANVA: COPIAS PARA APROBAR

Jorge tiene licencia educativa de los dos. Son **copias para enseñarle muestras** (colores, tipografías, bordes, botones, tarjetas…) y que apruebe o descarte con un enlace. La fuente de verdad es este repo: lo aprobado se pasa a `tokens/`, y Figma y Canva se rehacen desde aquí, nunca al revés a mano.

- **Figma:** archivo [«Sistemas de Diseño»](https://www.figma.com/design/Q5ZwnNBraMxKzGstXUJzyw), en el equipo «El equipo de j.gonzalezarco» (licencia educativa), con una página por tema. Ojo: `html_to_figma` deja la muestra en la primera página; hay que moverla a la suya. La muestra se pasa con `html_to_figma` desde `docs/muestras/<tema>.html`. Pendiente: los tokens como Variables (modo claro y oscuro). El conector no puede crear carpetas (proyectos) de Figma: si Jorge quiere una, la crea él y se mueve el archivo.
- **Canva:** carpeta [«Sistemas de Diseño»](https://www.canva.com/folder/FAHaO1XH_9M), por ahora vacía. El conector no deja importar páginas generadas por Claude a través de una dirección pública, así que las muestras de Canva se hacen con sus propias herramientas de diseño o a mano. El Brand Kit (logo, colores y fuentes) se edita a mano en Canva: el conector solo lo lee.

## PROPUESTAS PARA ELEGIR

Pedidas por Jorge el 07/11/2026, porque las webs de salud y finanzas le parecen genéricas y con aspecto de hechas por IA. Son diez direcciones, cada una inspirada en el sistema público de una gran empresa (Apple, Nike, Amazon, Anthropic, OpenAI, Stripe, IBM, Google, Linear y GitHub). Llevan nombre y fuentes libres propios, y nunca la marca, el logo ni las fuentes de pago de esas empresas.

- Datos: `scripts/propuestas-datos.mjs`. `node scripts/propuestas.mjs` escribe `tokens/propuestas/<id>/` y `docs/propuestas/<id>.html` (pantallas de móvil de salud y finanzas, paleta con contraste WCAG medido, tipografía y piezas), más `docs/propuestas/indice.html`.
- En Figma, una página por propuesta y un índice. Cuando Jorge elija, la propuesta (o la mezcla) pasa a `tokens/temas/` del proyecto.

## DERIVACIONES POR PROYECTO

Pedidas por Jorge el 07/11/2026: tres versiones para cada proyecto (salud, finanzas y Monetización con IA), mezclando dos o tres de las diez propuestas. Cada derivación dice qué toma de cada una y por qué encaja con su proyecto.

- Datos: `scripts/derivados-datos.mjs`. `node scripts/derivados.mjs` escribe `tokens/derivados/<proyecto>/<id>/`, `docs/derivados/<id>.html` (dos pantallas de su proyecto, en claro y oscuro) y `docs/derivados/indice.html`.
- Piezas comunes de las dos páginas (contraste, tokens, pantallas de ejemplo): `scripts/pantallas.mjs`. Todas las pantallas usan datos inventados.
- La generación avisa si algún par baja de AA: texto, texto tenue sobre fondo y tarjeta, botón principal y acento. Además se comprobaron a mano las etiquetas de estado y las tarjetas destacadas.
- **Nada de datos de las hijas de Jorge** en este repo, que es público: ni nombres ni fotos.
- En Figma van justo después del índice de propuestas: «◆ Derivaciones por proyecto» y una página por derivación.

## ESTADO

- `vida-de-jorge`: tema sacado de la web tal como está el 07/11/2026; da exactamente los mismos colores que su `globals.css`. Muestra en Figma, pendiente de que Jorge la apruebe. La web aún no importa el CSS del repo.
- `finanzas`: sacado de `hogar/webs/finanzas/src/app/globals.css` el 07/11/2026; da exactamente sus 52 colores en claro y oscuro. Lleva además los nombres comunes (`background`, `primary`…) como referencias a los suyos (`fondo`, `acento`…). La web de finanzas aún usa sus variables propias. **Incoherencia en su origen:** en oscuro, `--tenue` vale `#848981` si sigue al sistema y `#7f847c` con el conmutador; aquí va el primero. Muestra en Figma, pendiente de aprobar.
- `monetizacion-con-ia`: sin tema. El proyecto no tiene web ni marca: tendrá marcas nuevas, mejor sin cara, y sin la marca personal de Jorge. Cuando se elija una, cada marca será su propio tema.
