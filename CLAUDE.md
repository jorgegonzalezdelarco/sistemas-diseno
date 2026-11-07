# CLAUDE.md

Repo **público** con los sistemas de diseño de los proyectos personales de Jorge: <https://github.com/jorgegonzalezdelarco/sistemas-diseno>. Decisión de Jorge del 07/11/2026; el nombre es exactamente `sistemas-diseno`, en plural, porque hay un tema por proyecto.

## AL EMPEZAR CADA MENSAJE

Con cada mensaje de Jorge, antes de nada: `sh ../vida-de-jorge/scripts/sincronizar-repos.sh`, que recorre todos los repos de `~/GitHub` sin subir nada. Decirle el resultado en una línea.

## FORMA DE TRABAJAR

- **Todo en español**, también las descripciones de los comandos. Los nombres técnicos se dejan como están.
- **Si Jorge opina o pregunta «¿cómo lo ves?», responder sin ejecutar nada.**
- **Git:** trabajo directo en `main`, con commit y push. Antes de cada push, `node scripts/construir.mjs` sin errores, y `build/` subido con los cambios. Sin force push.
- **Es público:** nada privado, ni datos, ni claves, ni nombres de clientes. Solo colores, tipografías, medidas y documentación.

## QUÉ PROYECTOS LO USAN

- **Sí:** Vida de Jorge (`vida-de-jorge`), finanzas (web de `hogar`, en Vercel) y Monetización con IA (`monetizacion-con-ia`).
- **No:** pádel (`padel-balmis`), que se queda como está.
- **Aparte:** los módulos del instituto, DIW (`diw-semipresencial`), DWEC (`dwec`) y SI (`si-semi`). Son el trabajo de Jorge como profesor y funcionario y no tienen nada que ver con sus proyectos personales y emprendimientos. No usan este sistema salvo que Jorge lo pida.

## CÓMO ESTÁ HECHO

- **Tokens DTCG**, versión estable 2025.10, en `tokens/`:
  - `tokens/base/`: lo común a todos, que casi nunca cambia: espaciado, escala de tipografía y radio.
  - `tokens/temas/<proyecto>/`: los colores en modo claro y oscuro (`claro.tokens.json` y `oscuro.tokens.json`, con los mismos nombres) y las fuentes.
- **Colores en OKLCH** y con los nombres semánticos de shadcn (`primary`, `card`, `muted-foreground`…), porque los tres proyectos usan shadcn. El código de los proyectos usa siempre las variables, nunca colores sueltos.
- **`node scripts/construir.mjs`** genera `build/<tema>.css`, sin dependencias. El formato es compatible con Style Dictionary, si algún día hace falta. `build/` se sube al repo para que los proyectos lo instalen desde GitHub (`github:jorgegonzalezdelarco/sistemas-diseno#vX.Y.Z`).
- **Versiones:** una etiqueta `vX.Y.Z` por cambio que se publique. Un color nuevo sube la versión menor; quitar o renombrar un token, la mayor.
- **Contraste:** antes de aprobar un color de texto, comprobar WCAG AA (4,5:1 en texto normal).

## FIGMA Y CANVA: COPIAS PARA APROBAR

Jorge tiene licencia educativa de los dos. Son **copias para enseñarle muestras** (colores, tipografías, bordes, botones, tarjetas…) y que apruebe o descarte con un enlace. La fuente de verdad es este repo: lo aprobado se pasa a `tokens/`, y Figma y Canva se rehacen desde aquí, nunca al revés a mano.

- **Figma:** un archivo «Sistemas de Diseño», con una página por tema, y los tokens como Variables (modo claro y oscuro).
- **Canva:** una carpeta «Sistemas de Diseño» con un diseño de muestras por tema y, si hace falta, su Brand Kit (logo, colores y fuentes). El Brand Kit se edita a mano en Canva: el conector solo lo lee.

## ESTADO

- `vida-de-jorge`: tema sacado de la web tal como está el 07/11/2026; da exactamente los mismos colores que su `globals.css`.
- `finanzas` y `monetizacion-con-ia`: pendientes. Hay que leer sus estilos actuales, lo que pide permiso a Jorge si están fuera de las carpetas permitidas.
