// Propuestas de sistema de diseño para que Jorge elija (07/11/2026). Cada una toma
// ideas de un sistema público de una gran empresa, con nombre y fuentes propios:
// nunca su marca, su logo ni sus fuentes de pago.
const c = (claro, oscuro) => ({ claro, oscuro });

export const PROPUESTAS = [
  {
    id: "claridad", nombre: "Claridad", inspiracion: "Apple, Human Interface Guidelines",
    ideas: ["El contenido manda: interfaz casi invisible, gris muy claro y blanco", "Un único azul para todo lo que se puede tocar", "Esquinas muy redondeadas y titulares grandes y apretados"],
    fuentes: { titulares: "Inter", texto: "Inter", cifras: "Inter" }, titular: { peso: 600, mayusculas: false, tracking: "-0.025em" },
    radio: "1.125rem", boton: "999px",
    colores: c(
      { background: "#f5f5f7", foreground: "#1d1d1f", card: "#ffffff", popover: "#ffffff", secondary: "#e8e8ed", muted: "#ececf0", "muted-foreground": "#6e6e73", primary: "#0071e3", "primary-foreground": "#ffffff", accent: "#e8f1fc", "accent-foreground": "#0058b0", destructive: "#d70015", border: "#d2d2d7", input: "#d2d2d7", ring: "#0071e3", aviso: "#b25000", positivo: "#1d8a3a", "chart-1": "#0071e3", "chart-2": "#86868b" },
      { background: "#000000", foreground: "#f5f5f7", card: "#1c1c1e", popover: "#2c2c2e", secondary: "#2c2c2e", muted: "#1c1c1e", "muted-foreground": "#a1a1a6", primary: "#2997ff", "primary-foreground": "#000000", accent: "#0a2a4a", "accent-foreground": "#8ac4ff", destructive: "#ff453a", border: "#38383a", input: "#48484a", ring: "#2997ff", aviso: "#ff9f0a", positivo: "#30d158", "chart-1": "#2997ff", "chart-2": "#8e8e93" }),
  },
  {
    id: "pista", nombre: "Pista", inspiracion: "Nike",
    ideas: ["Contraste máximo: negro, blanco y un solo acento lima", "Titulares altos, en mayúsculas, como un marcador deportivo", "Botones píldora y cifras protagonistas"],
    fuentes: { titulares: "Anton", texto: "Archivo", cifras: "Anton" }, titular: { peso: 400, mayusculas: true, tracking: "0.005em" },
    radio: "0.5rem", boton: "999px",
    colores: c(
      { background: "#ffffff", foreground: "#111111", card: "#f5f5f5", popover: "#ffffff", secondary: "#e5e5e5", muted: "#f5f5f5", "muted-foreground": "#6b6b6d", primary: "#111111", "primary-foreground": "#ffffff", accent: "#d4ff3a", "accent-foreground": "#111111", destructive: "#d30005", border: "#e5e5e5", input: "#cacacb", ring: "#111111", aviso: "#a35d00", positivo: "#007d48", "chart-1": "#111111", "chart-2": "#9e9ea0" },
      { background: "#111111", foreground: "#ffffff", card: "#1f1f1f", popover: "#1f1f1f", secondary: "#2b2b2b", muted: "#1f1f1f", "muted-foreground": "#9e9ea0", primary: "#ffffff", "primary-foreground": "#111111", accent: "#d4ff3a", "accent-foreground": "#111111", destructive: "#ff5a5f", border: "#2f2f2f", input: "#3d3d3d", ring: "#ffffff", aviso: "#ffb547", positivo: "#3ddc84", "chart-1": "#d4ff3a", "chart-2": "#9e9ea0" }),
  },
  {
    id: "mercado", nombre: "Mercado", inspiracion: "Amazon (tienda y Cloudscape, su sistema para AWS)",
    ideas: ["Práctico y denso: mucha información sin agobiar", "Naranja para la acción principal y azul para enlaces y foco", "Bordes de campo marcados, pensados para formularios"],
    fuentes: { titulares: "Open Sans", texto: "Open Sans", cifras: "Open Sans" }, titular: { peso: 700, mayusculas: false, tracking: "-0.01em" },
    radio: "1rem", boton: "999px",
    colores: c(
      { background: "#f2f3f3", foreground: "#0f141a", card: "#ffffff", popover: "#ffffff", secondary: "#e9ebed", muted: "#f2f3f3", "muted-foreground": "#5f6b7a", primary: "#ff9900", "primary-foreground": "#0f141a", accent: "#e6f2ff", "accent-foreground": "#0055b8", destructive: "#d91515", border: "#d1d5db", input: "#8c8c94", ring: "#0972d3", aviso: "#8d6605", positivo: "#037f0c", "chart-1": "#0972d3", "chart-2": "#ff9900" },
      { background: "#0f141a", foreground: "#e9ebed", card: "#1b232d", popover: "#1b232d", secondary: "#232f3e", muted: "#161d26", "muted-foreground": "#a4aab3", primary: "#ffa31a", "primary-foreground": "#0f141a", accent: "#0d2a4d", "accent-foreground": "#75b7ff", destructive: "#ff7a7a", border: "#414d5c", input: "#5f6b7a", ring: "#42b4ff", aviso: "#ffe347", positivo: "#2bb534", "chart-1": "#42b4ff", "chart-2": "#ffa31a" }),
  },
  {
    id: "arcilla", nombre: "Arcilla", inspiracion: "Anthropic",
    ideas: ["Papel crema y tinta casi negra: cálido y tranquilo", "Un acento arcilla, usado con mucha moderación", "Titulares con serifa, como un libro; texto limpio"],
    fuentes: { titulares: "Source Serif 4", texto: "Instrument Sans", cifras: "DM Mono" }, titular: { peso: 400, mayusculas: false, tracking: "-0.015em" },
    radio: "0.75rem", boton: "0.5rem",
    colores: c(
      { background: "#faf9f5", foreground: "#141413", card: "#f0eee6", popover: "#ffffff", secondary: "#e8e6dc", muted: "#f0eee6", "muted-foreground": "#66655f", primary: "#141413", "primary-foreground": "#faf9f5", accent: "#d97757", "accent-foreground": "#141413", destructive: "#b53333", border: "#e3dacc", input: "#d1cfc5", ring: "#d97757", aviso: "#9a5b13", positivo: "#5a7a3a", "chart-1": "#d97757", "chart-2": "#6a9bcc" },
      { background: "#141413", foreground: "#faf9f5", card: "#1f1e1d", popover: "#262624", secondary: "#30302e", muted: "#1f1e1d", "muted-foreground": "#b0aea5", primary: "#faf9f5", "primary-foreground": "#141413", accent: "#d97757", "accent-foreground": "#141413", destructive: "#e5735c", border: "#3d3d3a", input: "#4a4a46", ring: "#d97757", aviso: "#e3a857", positivo: "#8fae6b", "chart-1": "#d97757", "chart-2": "#6a9bcc" }),
  },
  {
    id: "monocromo", nombre: "Monocromo", inspiracion: "OpenAI",
    ideas: ["Blanco y negro puros, sin color salvo lo imprescindible", "Mucho espacio en blanco y jerarquía solo con tamaño y peso", "Botones píldora y superficies muy suaves"],
    fuentes: { titulares: "Hanken Grotesk", texto: "Hanken Grotesk", cifras: "Geist Mono" }, titular: { peso: 600, mayusculas: false, tracking: "-0.02em" },
    radio: "1rem", boton: "999px",
    colores: c(
      { background: "#ffffff", foreground: "#0d0d0d", card: "#f9f9f9", popover: "#ffffff", secondary: "#ececec", muted: "#f4f4f4", "muted-foreground": "#5d5d5d", primary: "#0d0d0d", "primary-foreground": "#ffffff", accent: "#f0f0f0", "accent-foreground": "#0d0d0d", destructive: "#e02e2a", border: "#e5e5e5", input: "#d9d9d9", ring: "#0d0d0d", aviso: "#8a5a00", positivo: "#0f8a6b", "chart-1": "#0d0d0d", "chart-2": "#10a37f" },
      { background: "#171717", foreground: "#ececec", card: "#212121", popover: "#2f2f2f", secondary: "#2f2f2f", muted: "#212121", "muted-foreground": "#b4b4b4", primary: "#ececec", "primary-foreground": "#0d0d0d", accent: "#2f2f2f", "accent-foreground": "#ececec", destructive: "#ff6b6b", border: "#303030", input: "#424242", ring: "#ececec", aviso: "#f0b429", positivo: "#19c37d", "chart-1": "#ececec", "chart-2": "#19c37d" }),
  },
  {
    id: "indigo", nombre: "Índigo", inspiracion: "Stripe",
    ideas: ["Azul marino como tinta y violeta como acción", "Fondo levemente azulado y tarjetas blancas muy limpias", "Precisión: cifras alineadas y detalles finos"],
    fuentes: { titulares: "Plus Jakarta Sans", texto: "Plus Jakarta Sans", cifras: "JetBrains Mono" }, titular: { peso: 700, mayusculas: false, tracking: "-0.02em" },
    radio: "0.5rem", boton: "0.375rem",
    colores: c(
      { background: "#f6f9fc", foreground: "#0a2540", card: "#ffffff", popover: "#ffffff", secondary: "#e3e8ee", muted: "#eef3f8", "muted-foreground": "#425466", primary: "#635bff", "primary-foreground": "#ffffff", accent: "#efeeff", "accent-foreground": "#4b45c6", destructive: "#df1b41", border: "#e3e8ee", input: "#cfd7df", ring: "#635bff", aviso: "#a35200", positivo: "#0e8a5f", "chart-1": "#635bff", "chart-2": "#00a3d9" },
      { background: "#0a2540", foreground: "#f6f9fc", card: "#0f2d4f", popover: "#133459", secondary: "#1a3a63", muted: "#0f2d4f", "muted-foreground": "#adbdcc", primary: "#8f89ff", "primary-foreground": "#0a2540", accent: "#1d2e6b", "accent-foreground": "#c9c6ff", destructive: "#ff6b8b", border: "#1f4170", input: "#2c5282", ring: "#8f89ff", aviso: "#ffb547", positivo: "#2fd08f", "chart-1": "#8f89ff", "chart-2": "#00d4ff" }),
  },
  {
    id: "carbono", nombre: "Carbono", inspiracion: "IBM, Carbon Design System",
    ideas: ["Esquinas rectas y rejilla estricta: ingeniería", "Azul intenso para la acción y grises por capas", "Titulares ligeros y grandes, cifras en monoespaciada"],
    fuentes: { titulares: "IBM Plex Sans", texto: "IBM Plex Sans", cifras: "IBM Plex Mono" }, titular: { peso: 300, mayusculas: false, tracking: "0em" },
    radio: "0rem", boton: "0rem",
    colores: c(
      { background: "#f4f4f4", foreground: "#161616", card: "#ffffff", popover: "#ffffff", secondary: "#e0e0e0", muted: "#e8e8e8", "muted-foreground": "#525252", primary: "#0f62fe", "primary-foreground": "#ffffff", accent: "#edf5ff", "accent-foreground": "#0043ce", destructive: "#da1e28", border: "#e0e0e0", input: "#8d8d8d", ring: "#0f62fe", aviso: "#8e6a00", positivo: "#198038", "chart-1": "#6929c4", "chart-2": "#1192e8" },
      { background: "#161616", foreground: "#f4f4f4", card: "#262626", popover: "#393939", secondary: "#393939", muted: "#262626", "muted-foreground": "#c6c6c6", primary: "#0f62fe", "primary-foreground": "#ffffff", accent: "#001d6c", "accent-foreground": "#a6c8ff", destructive: "#fa4d56", border: "#393939", input: "#6f6f6f", ring: "#ffffff", aviso: "#f1c21b", positivo: "#42be65", "chart-1": "#a56eff", "chart-2": "#33b1ff" }),
  },
  {
    id: "tonal", nombre: "Tonal", inspiracion: "Google, Material Design 3",
    ideas: ["Superficies tonales: todo comparte un mismo matiz", "Formas redondeadas y botones píldora", "Colores suaves y accesibles en claro y oscuro"],
    fuentes: { titulares: "Roboto Flex", texto: "Roboto Flex", cifras: "Roboto Mono" }, titular: { peso: 400, mayusculas: false, tracking: "0em" },
    radio: "1rem", boton: "999px",
    colores: c(
      { background: "#fef7ff", foreground: "#1d1b20", card: "#f3edf7", popover: "#ece6f0", secondary: "#e8def8", muted: "#f7f2fa", "muted-foreground": "#49454f", primary: "#6750a4", "primary-foreground": "#ffffff", accent: "#eaddff", "accent-foreground": "#21005d", destructive: "#b3261e", border: "#cac4d0", input: "#79747e", ring: "#6750a4", aviso: "#7d5700", positivo: "#386a20", "chart-1": "#6750a4", "chart-2": "#7d5260" },
      { background: "#141218", foreground: "#e6e0e9", card: "#211f26", popover: "#2b2930", secondary: "#4a4458", muted: "#1d1b20", "muted-foreground": "#cac4d0", primary: "#d0bcff", "primary-foreground": "#381e72", accent: "#4f378b", "accent-foreground": "#eaddff", destructive: "#f2b8b5", border: "#49454f", input: "#938f99", ring: "#d0bcff", aviso: "#f8bd47", positivo: "#9cd67d", "chart-1": "#d0bcff", "chart-2": "#efb8c8" }),
  },
  {
    id: "noche", nombre: "Noche", inspiracion: "Linear",
    ideas: ["Pensada primero para modo oscuro, casi negro", "Un violeta discreto y bordes de un píxel", "Densa y rápida: herramienta de trabajo, no escaparate"],
    fuentes: { titulares: "Geist", texto: "Geist", cifras: "Geist Mono" }, titular: { peso: 600, mayusculas: false, tracking: "-0.025em" },
    radio: "0.625rem", boton: "0.5rem",
    colores: c(
      { background: "#fbfbfc", foreground: "#1b1c1f", card: "#ffffff", popover: "#ffffff", secondary: "#f0f1f4", muted: "#f4f5f8", "muted-foreground": "#62666d", primary: "#5e6ad2", "primary-foreground": "#ffffff", accent: "#eef0ff", "accent-foreground": "#4450b5", destructive: "#d93f3f", border: "#e6e6e9", input: "#dcdde0", ring: "#5e6ad2", aviso: "#b45309", positivo: "#2f8f5b", "chart-1": "#5e6ad2", "chart-2": "#4cb782" },
      { background: "#08090a", foreground: "#f7f8f8", card: "#141516", popover: "#1c1d1f", secondary: "#1c1d1f", muted: "#141516", "muted-foreground": "#8a8f98", primary: "#5e6ad2", "primary-foreground": "#ffffff", accent: "#1e2040", "accent-foreground": "#a5adff", destructive: "#eb5757", border: "#23252a", input: "#2e3035", ring: "#7a83e8", aviso: "#f2c94c", positivo: "#4cb782", "chart-1": "#7a83e8", "chart-2": "#4cb782" }),
  },
  {
    id: "taller", nombre: "Taller", inspiracion: "GitHub, Primer",
    ideas: ["Neutro y funcional, hecho para usar a diario", "Verde para confirmar y azul para enlaces y foco", "Tipografía propia de carácter técnico y amable"],
    fuentes: { titulares: "Mona Sans", texto: "Mona Sans", cifras: "JetBrains Mono" }, titular: { peso: 600, mayusculas: false, tracking: "-0.015em" },
    radio: "0.375rem", boton: "0.375rem",
    colores: c(
      { background: "#ffffff", foreground: "#1f2328", card: "#f6f8fa", popover: "#ffffff", secondary: "#eff2f5", muted: "#f6f8fa", "muted-foreground": "#59636e", primary: "#1f883d", "primary-foreground": "#ffffff", accent: "#ddf4ff", "accent-foreground": "#0969da", destructive: "#cf222e", border: "#d1d9e0", input: "#d1d9e0", ring: "#0969da", aviso: "#9a6700", positivo: "#1a7f37", "chart-1": "#0969da", "chart-2": "#1f883d" },
      { background: "#0d1117", foreground: "#f0f6fc", card: "#151b23", popover: "#212830", secondary: "#212830", muted: "#151b23", "muted-foreground": "#9198a1", primary: "#238636", "primary-foreground": "#ffffff", accent: "#121d2f", "accent-foreground": "#4493f8", destructive: "#f85149", border: "#3d444d", input: "#3d444d", ring: "#4493f8", aviso: "#d29922", positivo: "#3fb950", "chart-1": "#4493f8", "chart-2": "#3fb950" }),
  },
];
