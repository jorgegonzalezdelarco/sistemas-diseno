// Derivaciones por proyecto (07/11/2026): cada una mezcla dos o tres de las diez
// propuestas de scripts/propuestas-datos.mjs para un proyecto concreto. Igual que
// ellas, solo toman ideas: nunca marcas, logos ni fuentes de pago.
const c = (claro, oscuro) => ({ claro, oscuro });

export const PROYECTOS = {
  salud: { nombre: "Vida de Jorge · salud", pregunta: "Analíticas, marcadores y cuerpo: tiene que dar calma y confianza, leerse bien y no alarmar." },
  finanzas: { nombre: "Finanzas", pregunta: "Cifras, presupuestos y movimientos: precisión, columnas alineadas y saber de un vistazo cómo va el mes." },
  monetizacion: { nombre: "Monetización con IA", pregunta: "Marcas faceless (salud, relaciones o dinero): portadas que conviertan y un panel de ingresos. Ninguna lleva la marca personal de Jorge." },
};

export const DERIVADOS = [
  // --- Salud ---
  {
    id: "consulta", proyecto: "salud", nombre: "Consulta",
    mezcla: [["arcilla", "papel cálido y titulares con serifa"], ["claridad", "esquinas muy redondeadas y un solo azul para lo que se toca"]],
    porque: "Parece un cuaderno de salud bien cuidado, no un panel de hospital. El azul tinta da confianza y el tono arcilla queda para lo que conviene mirar.",
    fuentes: { titulares: "Newsreader", texto: "Instrument Sans", cifras: "DM Mono" }, titular: { peso: 500, mayusculas: false, tracking: "-0.015em" },
    radio: "1rem", boton: "999px",
    colores: c(
      { background: "#f8f6f1", foreground: "#1b1a17", card: "#ffffff", popover: "#ffffff", secondary: "#ece9e1", muted: "#f1eee7", "muted-foreground": "#5f5c54", primary: "#1d5c8f", "primary-foreground": "#ffffff", accent: "#fbe9e1", "accent-foreground": "#93391b", destructive: "#b3261e", border: "#e2ddd2", input: "#cfc9bc", ring: "#1d5c8f", aviso: "#93520c", positivo: "#3a7537", "chart-1": "#1d5c8f", "chart-2": "#d97757" },
      { background: "#161513", foreground: "#f3f0e8", card: "#201f1c", popover: "#2a2825", secondary: "#2e2c28", muted: "#201f1c", "muted-foreground": "#aaa597", primary: "#7fb4e6", "primary-foreground": "#10202f", accent: "#3a2219", "accent-foreground": "#f0a587", destructive: "#ef7b6c", border: "#36332e", input: "#4a4741", ring: "#7fb4e6", aviso: "#e6b15e", positivo: "#8fc27a", "chart-1": "#7fb4e6", "chart-2": "#e08a6a" }),
  },
  {
    id: "laboratorio", proyecto: "salud", nombre: "Laboratorio",
    mezcla: [["carbono", "rejilla estricta, esquinas casi rectas y cifras en monoespaciada"], ["taller", "fondo neutro, verde para lo que está en rango y azul para el foco"]],
    porque: "Es la versión de informe de laboratorio: densa, exacta y sin adornos. Ideal si quieres comparar muchos marcadores de un vistazo.",
    fuentes: { titulares: "Red Hat Display", texto: "Red Hat Text", cifras: "Red Hat Mono" }, titular: { peso: 500, mayusculas: false, tracking: "-0.01em" },
    radio: "0.25rem", boton: "0.25rem",
    colores: c(
      { background: "#f6f8f7", foreground: "#15201b", card: "#ffffff", popover: "#ffffff", secondary: "#e6ebe8", muted: "#eef2f0", "muted-foreground": "#4f5d56", primary: "#13795b", "primary-foreground": "#ffffff", accent: "#e3f1ec", "accent-foreground": "#0b5a43", destructive: "#c4262e", border: "#dbe2de", input: "#8c9993", ring: "#0b66c3", aviso: "#875f00", positivo: "#13795b", "chart-1": "#0b66c3", "chart-2": "#13795b" },
      { background: "#0f1412", foreground: "#e8eeeb", card: "#18201c", popover: "#212a26", secondary: "#232d28", muted: "#18201c", "muted-foreground": "#9fb0a7", primary: "#3ccf9a", "primary-foreground": "#04140e", accent: "#123228", "accent-foreground": "#7fe3bd", destructive: "#ff6b6b", border: "#2b3631", input: "#4a5751", ring: "#5aa9ff", aviso: "#f1c21b", positivo: "#3ccf9a", "chart-1": "#5aa9ff", "chart-2": "#3ccf9a" }),
  },
  {
    id: "pulso", proyecto: "salud", nombre: "Pulso",
    mezcla: [["pista", "titulares altos en mayúsculas, cifras protagonistas y acento lima"], ["noche", "pensada primero para modo oscuro, bordes finos"]],
    porque: "Enfoque de rendimiento y longevidad, como un reloj deportivo: la cifra manda. Es la más enérgica de las tres; en oscuro luce más.",
    fuentes: { titulares: "Barlow Condensed", texto: "Barlow", cifras: "Barlow Condensed" }, titular: { peso: 600, mayusculas: true, tracking: "0.01em" },
    radio: "0.75rem", boton: "999px",
    colores: c(
      { background: "#f4f5f1", foreground: "#101110", card: "#ffffff", popover: "#ffffff", secondary: "#e4e6e0", muted: "#ecede8", "muted-foreground": "#5a5d56", primary: "#101110", "primary-foreground": "#f4f5f1", accent: "#d9f75c", "accent-foreground": "#101110", destructive: "#cc1f1f", border: "#dfe1da", input: "#c4c7be", ring: "#101110", aviso: "#935700", positivo: "#1b7a3e", "chart-1": "#101110", "chart-2": "#7d9100" },
      { background: "#0a0b0a", foreground: "#f2f3ee", card: "#151714", popover: "#1d201c", secondary: "#1d201c", muted: "#151714", "muted-foreground": "#9a9e94", primary: "#d9f75c", "primary-foreground": "#0a0b0a", accent: "#2a3310", "accent-foreground": "#d9f75c", destructive: "#ff6a5c", border: "#262924", input: "#383c35", ring: "#d9f75c", aviso: "#ffb547", positivo: "#5be08a", "chart-1": "#d9f75c", "chart-2": "#8f95ff" }),
  },
  // --- Finanzas ---
  {
    id: "libro-mayor", proyecto: "finanzas", nombre: "Libro mayor",
    mezcla: [["indigo", "tinta azul marino, precisión y detalles finos"], ["arcilla", "papel cálido y titulares con serifa"]],
    porque: "Conserva la idea actual de «libro de cuentas» y el verde pino, pero más fina: serifa en los titulares y azul marino en lugar de casi negro. Es la más continuista.",
    fuentes: { titulares: "Fraunces", texto: "Public Sans", cifras: "JetBrains Mono" }, titular: { peso: 500, mayusculas: false, tracking: "-0.02em" },
    radio: "0.5rem", boton: "0.375rem",
    colores: c(
      { background: "#f5f3ec", foreground: "#13213a", card: "#fffdf8", popover: "#fffdf8", secondary: "#ebe7dc", muted: "#efece3", "muted-foreground": "#565e6d", primary: "#0e6b55", "primary-foreground": "#ffffff", accent: "#dcebe3", "accent-foreground": "#0a4f3f", destructive: "#b42f23", border: "#e2ddd0", input: "#c9c2b2", ring: "#0e6b55", aviso: "#875800", positivo: "#1f6b2a", "chart-1": "#0e6b55", "chart-2": "#2a5bd7" },
      { background: "#0e1218", foreground: "#eceae3", card: "#151b23", popover: "#1c232d", secondary: "#1f2732", muted: "#151b23", "muted-foreground": "#a0a7b2", primary: "#4cc3a0", "primary-foreground": "#06130e", accent: "#133a30", "accent-foreground": "#7fdcbf", destructive: "#f07a6c", border: "#29313c", input: "#3d4653", ring: "#4cc3a0", aviso: "#e8b44c", positivo: "#6cc46a", "chart-1": "#4cc3a0", "chart-2": "#7aa2ff" }),
  },
  {
    id: "terminal", proyecto: "finanzas", nombre: "Terminal",
    mezcla: [["noche", "modo oscuro primero y bordes de un píxel"], ["carbono", "esquinas rectas y cifras en monoespaciada"], ["mercado", "ámbar para la acción principal y densidad de información"]],
    porque: "Pensada para revisar muchas cifras rápido, como una herramienta profesional. Cabe más información por pantalla que en ninguna otra.",
    fuentes: { titulares: "Archivo", texto: "Archivo", cifras: "IBM Plex Mono" }, titular: { peso: 600, mayusculas: false, tracking: "-0.02em" },
    radio: "0.25rem", boton: "0.25rem",
    colores: c(
      { background: "#f7f7f5", foreground: "#111214", card: "#ffffff", popover: "#ffffff", secondary: "#ebebe8", muted: "#f0f0ed", "muted-foreground": "#5b5d62", primary: "#e8890c", "primary-foreground": "#111214", accent: "#fff1dc", "accent-foreground": "#854800", destructive: "#d1242f", border: "#e1e1dd", input: "#b9bab5", ring: "#2563eb", aviso: "#875800", positivo: "#12804a", "chart-1": "#2563eb", "chart-2": "#e8890c" },
      { background: "#0b0c0e", foreground: "#e9eaec", card: "#131417", popover: "#1a1c20", secondary: "#1c1e22", muted: "#131417", "muted-foreground": "#8f939b", primary: "#f5a524", "primary-foreground": "#0b0c0e", accent: "#2b1f0b", "accent-foreground": "#ffc164", destructive: "#ff6b6b", border: "#24262b", input: "#34373d", ring: "#60a5fa", aviso: "#f5c451", positivo: "#3ddc84", "chart-1": "#60a5fa", "chart-2": "#f5a524" }),
  },
  {
    id: "hucha", proyecto: "finanzas", nombre: "Hucha",
    mezcla: [["tonal", "superficies tonales de un mismo verde y formas redondeadas"], ["monocromo", "mucho aire y jerarquía con tamaño y peso"], ["claridad", "botones píldora"]],
    porque: "La más amable: si algún día la usa la familia, se entiende sin explicaciones. Verde de ahorro y cifras grandes y redondas.",
    fuentes: { titulares: "Figtree", texto: "Figtree", cifras: "Figtree" }, titular: { peso: 800, mayusculas: false, tracking: "-0.02em" },
    radio: "1.25rem", boton: "999px",
    colores: c(
      { background: "#f5faf6", foreground: "#17201b", card: "#ffffff", popover: "#ffffff", secondary: "#e1eee5", muted: "#ecf4ee", "muted-foreground": "#4f5e55", primary: "#2e6b4f", "primary-foreground": "#ffffff", accent: "#d3eedc", "accent-foreground": "#1d4d37", destructive: "#ba1a1a", border: "#d6e3da", input: "#8fa197", ring: "#2e6b4f", aviso: "#7d5700", positivo: "#2e6b4f", "chart-1": "#2e6b4f", "chart-2": "#c76b3c" },
      { background: "#101512", foreground: "#e1ebe4", card: "#19211c", popover: "#222b25", secondary: "#2a3a30", muted: "#19211c", "muted-foreground": "#a7b8ad", primary: "#93d5b0", "primary-foreground": "#003822", accent: "#1f4d37", "accent-foreground": "#b9f0cf", destructive: "#ffb4ab", border: "#34433a", input: "#85968c", ring: "#93d5b0", aviso: "#f2bf4a", positivo: "#93d5b0", "chart-1": "#93d5b0", "chart-2": "#ffb68f" }),
  },
  // --- Monetización con IA ---
  {
    id: "escaparate", proyecto: "monetizacion", nombre: "Escaparate",
    mezcla: [["pista", "titulares en mayúsculas muy gruesos y contraste máximo"], ["mercado", "naranja para comprar o apuntarse"]],
    porque: "Hecha para convertir: el botón se ve desde lejos y el titular grita lo justo. Encaja con TikTok Shop y con portadas de captación.",
    fuentes: { titulares: "Archivo Black", texto: "Archivo", cifras: "Archivo Black" }, titular: { peso: 400, mayusculas: true, tracking: "-0.01em" },
    radio: "0.5rem", boton: "999px", css: ".t-hero { font-size: 29px; } .c-enorme { font-size: 44px; } .oscuro .destacada { background: var(--card); border-color: var(--accent); } .oscuro .enlace { color: var(--accent); }",
    colores: c(
      { background: "#ffffff", foreground: "#0e0e0e", card: "#f6f5f2", popover: "#ffffff", secondary: "#ebe9e4", muted: "#f4f3f0", "muted-foreground": "#5e5c57", primary: "#ff5f00", "primary-foreground": "#0e0e0e", accent: "#ffe14d", "accent-foreground": "#0e0e0e", destructive: "#d3150f", border: "#e6e4df", input: "#bdbab3", ring: "#0e0e0e", aviso: "#8f5300", positivo: "#0f7a3d", "chart-1": "#ff5f00", "chart-2": "#0e0e0e" },
      { background: "#0e0e0e", foreground: "#fafaf7", card: "#1a1a19", popover: "#232322", secondary: "#262624", muted: "#1a1a19", "muted-foreground": "#a3a19b", primary: "#ff6a14", "primary-foreground": "#0e0e0e", accent: "#ffe14d", "accent-foreground": "#0e0e0e", destructive: "#ff6b5e", border: "#2c2c2a", input: "#44443f", ring: "#ffe14d", aviso: "#ffc247", positivo: "#43d17a", "chart-1": "#ff6a14", "chart-2": "#ffe14d" }),
  },
  {
    id: "estudio", proyecto: "monetizacion", nombre: "Estudio",
    mezcla: [["arcilla", "papel cálido y serifa editorial"], ["monocromo", "blanco y negro, botones píldora y mucho aire"]],
    porque: "Da autoridad sin poner cara: parece una revista o una newsletter de pago. Encaja con una marca de salud o de dinero que quiera inspirar confianza.",
    fuentes: { titulares: "Instrument Serif", texto: "Manrope", cifras: "DM Mono" }, titular: { peso: 400, mayusculas: false, tracking: "-0.01em" },
    radio: "0.75rem", boton: "999px", css: ".t-hero { font-size: 40px; } .t-medio { font-size: 21px; }",
    colores: c(
      { background: "#fbfaf7", foreground: "#111110", card: "#f3f1ec", popover: "#ffffff", secondary: "#e9e6df", muted: "#f3f1ec", "muted-foreground": "#5d5b55", primary: "#111110", "primary-foreground": "#fbfaf7", accent: "#e4efe9", "accent-foreground": "#155e46", destructive: "#b3261e", border: "#e5e1d8", input: "#cdc8bd", ring: "#155e46", aviso: "#8c580a", positivo: "#155e46", "chart-1": "#155e46", "chart-2": "#c8643b" },
      { background: "#121211", foreground: "#f2f0ea", card: "#1c1c1a", popover: "#252523", secondary: "#2a2a27", muted: "#1c1c1a", "muted-foreground": "#a9a69d", primary: "#f2f0ea", "primary-foreground": "#121211", accent: "#173328", "accent-foreground": "#8fd6b6", destructive: "#ef7b6c", border: "#31312d", input: "#4a4a45", ring: "#8fd6b6", aviso: "#e6b15e", positivo: "#8fd6b6", "chart-1": "#8fd6b6", "chart-2": "#e08a6a" }),
  },
  {
    id: "kiosco", proyecto: "monetizacion", nombre: "Kiosco",
    mezcla: [["tonal", "formas muy redondeadas y superficies de un mismo tono"], ["pista", "un acento de color fuerte"], ["mercado", "práctica para tienda y producto"]],
    porque: "Alegre y cercana, con color: pensada para productos y para crear contenido en familia sin que parezca una herramienta seria.",
    fuentes: { titulares: "Unbounded", texto: "Nunito Sans", cifras: "Unbounded" }, titular: { peso: 700, mayusculas: false, tracking: "-0.02em" },
    radio: "1.25rem", boton: "999px", css: ".t-hero { font-size: 27px; line-height: 1.12; } .t-grande { font-size: 26px; } .c-enorme { font-size: 40px; } .t-medio { font-size: 16px; } .oscuro .destacada { background: var(--card); border-color: var(--accent); } .oscuro .enlace { color: var(--accent); }",
    colores: c(
      { background: "#fff7ee", foreground: "#1c1917", card: "#ffffff", popover: "#ffffff", secondary: "#fde9d4", muted: "#fbefe2", "muted-foreground": "#685c52", primary: "#d61f4f", "primary-foreground": "#ffffff", accent: "#ffe27a", "accent-foreground": "#1c1917", destructive: "#b91c1c", border: "#f0dfcc", input: "#c9b6a3", ring: "#d61f4f", aviso: "#8a4c00", positivo: "#15803d", "chart-1": "#d61f4f", "chart-2": "#0e7fc0" },
      { background: "#17120f", foreground: "#fbf1e6", card: "#221a16", popover: "#2b221d", secondary: "#33281f", muted: "#221a16", "muted-foreground": "#b8a898", primary: "#ff5c85", "primary-foreground": "#1a0a10", accent: "#ffe27a", "accent-foreground": "#1c1917", destructive: "#ff7a6b", border: "#3a2e26", input: "#57473b", ring: "#ff5c85", aviso: "#ffc15a", positivo: "#4ade80", "chart-1": "#ff5c85", "chart-2": "#4fb9f5" }),
  },
];
