# Sistemas de diseño

Colores, tipografías y medidas de los proyectos personales de Jorge, en formato [DTCG](https://www.designtokens.org/) (versión estable 2025.10).

- `tokens/base/`: lo común a todos los proyectos (espaciado, escala de letra, radio).
- `tokens/temas/<proyecto>/`: colores en modo claro y oscuro, y fuentes.
- `build/<proyecto>.css`: lo que usa cada web. Se genera con `node scripts/construir.mjs`.

Los colores usan los nombres de [shadcn/ui](https://ui.shadcn.com/) (`--primary`, `--card`…), así que en un proyecto con shadcn basta con importar el CSS del tema:

```css
@import "sistemas-diseno/build/vida-de-jorge.css";
```

Instalación desde GitHub, con una versión fija:

```bash
pnpm add github:jorgegonzalezdelarco/sistemas-diseno#v0.1.0
```

Temas: `vida-de-jorge`. En preparación: `finanzas` y `monetizacion-con-ia`.
