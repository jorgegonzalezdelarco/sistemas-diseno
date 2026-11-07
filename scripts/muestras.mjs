// Página de muestras de cada tema (colores, tipografía, radios, espaciado y piezas),
// autocontenida, para revisar a ojo y para pasarla a Figma. Lee build/<tema>.css.
// Uso: node scripts/muestras.mjs  →  docs/muestras/<tema>.html
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const variables = (texto) =>
  Object.fromEntries([...texto.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));

// Textos de ejemplo de cada tema, para que las piezas se parezcan a su web.
const EJEMPLOS = {
  "vida-de-jorge": { frase: "Analíticas, suplementos y medidas", rotulo: "Lípidos", titulo: "Colesterol LDL", cifra: "104", unidad: "mg/dL", nota: "21 sep 2026 · −14 respecto al anterior", aviso: "⚠ Fecha aproximada: el informe no la indica.", etiquetas: ["Guía clínica", "Riesgo bajo"] },
  finanzas: { frase: "Presupuesto, cuentas y movimientos", rotulo: "Gastos del mes", titulo: "Supermercado", cifra: "412,30", unidad: "€", nota: "Octubre · 38 € menos que en septiembre", aviso: "⚠ Te quedan 87 € de presupuesto en esta categoría.", etiquetas: ["Variable", "Dentro del presupuesto"] },
};
const familia = (valor) => valor.split(",")[0].replaceAll('"', "").trim();

for (const fichero of readdirSync("build").filter((f) => f.endsWith(".css"))) {
  const tema = fichero.replace(/\.css$/, "");
  const css = readFileSync(`build/${fichero}`, "utf8");
  const claro = variables(css.split(":root {")[1].split("}")[0]);
  const oscuro = variables(css.split(':root[data-theme="dark"] {')[1].split("}")[0]);
  const colores = Object.keys(oscuro);
  const x = EJEMPLOS[tema] ?? EJEMPLOS["vida-de-jorge"];
  const decl = (v) => Object.entries(v).map(([k, x]) => `--${k}: ${x};`).join(" ");

  const muestra = (nombre, valor) => `
        <div class="color">
          <div class="pastilla" style="background: var(--${nombre})"></div>
          <p class="nombre">${nombre}</p>
          <p class="valor">${valor}</p>
        </div>`;

  const piezas = (modo) => `
    <section class="panel ${modo}">
      <h3 class="rotulo">Piezas · modo ${modo}</h3>
      <div class="fila">
        <button class="boton primario">Guardar</button>
        <button class="boton secundario">Cancelar</button>
        <button class="boton contorno">Ver todo</button>
        <button class="boton peligro">Borrar</button>
      </div>
      <div class="fila">
        <label class="campo"><span>Correo</span><span class="entrada">nombre@ejemplo.com</span></label>
        <label class="campo"><span>Altura (cm)</span><span class="entrada foco">170</span></label>
      </div>
      <div class="fila">
        <div class="tarjeta">
          <p class="rotulo">${x.rotulo}</p>
          <p class="titular grande">${x.titulo}</p>
          <p><span class="cifra enorme">${x.cifra}</span> <span class="tenue">${x.unidad}</span></p>
          <p class="tenue pequeno">${x.nota}</p>
        </div>
        <div class="tarjeta">
          <p class="aviso">${x.aviso}</p>
          <p class="pequeno">Información general, no sustituye a tu médico.</p>
          <div class="fila"><span class="etiqueta">${x.etiquetas[0]}</span><span class="etiqueta acento">${x.etiquetas[1]}</span></div>
        </div>
      </div>
    </section>`;

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Muestras · ${tema}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Newsreader:opsz@6..72&display=swap">
<style>
  :root, .claro { ${decl(claro)} }
  .oscuro { ${decl(claro)} ${decl(oscuro)} }
  * { box-sizing: border-box; margin: 0; }
  body { font-family: var(--fuente-texto); background: #e9e6e0; padding: 40px; }
  .hoja { width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 32px; }
  .panel { background: var(--background); color: var(--foreground); border-radius: 16px; padding: 40px; display: flex; flex-direction: column; gap: 24px; }
  .titular { font-family: var(--fuente-titulares); font-weight: 400; letter-spacing: -0.015em; }
  .cifra { font-family: var(--fuente-cifras); font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
  .rotulo { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted-foreground); font-weight: 500; }
  .tenue { color: var(--muted-foreground); }
  .pequeno { font-size: 13px; }
  .grande { font-size: 28px; }
  .enorme { font-size: 56px; line-height: 1; }
  .rejilla { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
  .color { display: flex; flex-direction: column; gap: 6px; }
  .pastilla { height: 64px; border-radius: var(--radius); border: 1px solid var(--border); }
  .nombre { font-size: 13px; font-weight: 600; }
  .valor { font-family: var(--fuente-cifras); font-size: 11px; color: var(--muted-foreground); }
  .fila { display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap; }
  .boton { font: 500 14px var(--fuente-texto); height: 44px; padding: 0 20px; border-radius: var(--radius); border: 1px solid transparent; }
  .primario { background: var(--primary); color: var(--primary-foreground); }
  .secundario { background: var(--secondary); color: var(--secondary-foreground); }
  .contorno { background: var(--card); color: var(--foreground); border-color: var(--border); }
  .peligro { background: var(--destructive); color: white; }
  .campo { display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 500; width: 280px; }
  .entrada { height: 44px; display: flex; align-items: center; padding: 0 12px; background: var(--card); border: 1px solid var(--input); border-radius: var(--radius); font-weight: 400; }
  .foco { border-color: var(--ring); box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent); }
  .tarjeta { background: var(--card); color: var(--card-foreground); border: 1px solid var(--border); border-radius: calc(var(--radius) * 1.4); padding: 20px; width: 360px; display: flex; flex-direction: column; gap: 8px; }
  .aviso { color: var(--aviso); font-size: 14px; font-weight: 500; }
  .etiqueta { display: inline-block; align-self: flex-start; font-size: 12px; padding: 4px 10px; border-radius: 999px; background: var(--muted); color: var(--muted-foreground); }
  .etiqueta.acento { background: var(--accent); color: var(--accent-foreground); }
  .tipos { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
  .escala { display: flex; flex-direction: column; gap: 8px; }
  .radios, .espacios { display: flex; gap: 24px; align-items: flex-end; }
  .radio { width: 72px; height: 72px; background: var(--accent); border: 1px solid var(--border); }
  .espacio { background: var(--primary); height: 16px; }
</style>
</head>
<body>
<main class="hoja">
  <section class="panel claro">
    <p class="rotulo">Sistemas de diseño · tema</p>
    <h1 class="titular" style="font-size: 56px">${tema}</h1>
    <p class="tenue">Generado desde los tokens del repo sistemas-diseno. Para aprobar o descartar: dile a Claude qué cambiarías.</p>
  </section>

  <section class="panel claro">
    <h2 class="rotulo">Colores · modo claro</h2>
    <div class="rejilla">${colores.map((n) => muestra(n, claro[n])).join("")}
    </div>
  </section>

  <section class="panel oscuro">
    <h2 class="rotulo">Colores · modo oscuro</h2>
    <div class="rejilla">${colores.map((n) => muestra(n, oscuro[n])).join("")}
    </div>
  </section>

  <section class="panel claro">
    <h2 class="rotulo">Tipografía</h2>
    <div class="tipos">
      <div><p class="rotulo">Titulares</p><p class="titular" style="font-size: 40px">${familia(claro["fuente-titulares"])}</p><p class="tenue pequeno">${claro["fuente-titulares"]}</p></div>
      <div><p class="rotulo">Texto</p><p style="font-size: 32px">${familia(claro["fuente-texto"])}</p><p class="tenue pequeno">${claro["fuente-texto"]}</p></div>
      <div><p class="rotulo">Cifras</p><p class="cifra" style="font-size: 32px">0123456789</p><p class="tenue pequeno">${claro["fuente-cifras"]}</p></div>
    </div>
    <div class="escala">${["4xl", "3xl", "2xl", "xl", "lg", "base", "sm", "xs"].map((t) => `
      <p style="font-size: var(--texto-${t})"><span class="cifra tenue" style="font-size: 12px; display: inline-block; width: 170px; white-space: nowrap">texto-${t} · ${claro[`texto-${t}`]}</span>${x.frase}</p>`).join("")}
    </div>
  </section>

  <section class="panel claro">
    <h2 class="rotulo">Radios y espaciado</h2>
    <div class="radios">${[["0.6", "sm"], ["0.8", "md"], ["1", "lg"], ["1.4", "xl"], ["1.8", "2xl"]].map(([f, n]) => `
      <div><div class="radio" style="border-radius: calc(var(--radius) * ${f})"></div><p class="valor">radius-${n}</p></div>`).join("")}
    </div>
    <div class="espacios">${["1", "2", "3", "4", "6", "8", "12", "16"].map((n) => `
      <div><div class="espacio" style="width: var(--espacio-${n})"></div><p class="valor">espacio-${n}</p></div>`).join("")}
    </div>
  </section>
${piezas("claro")}
${piezas("oscuro")}
</main>
</body>
</html>
`;
  writeFileSync(`docs/muestras/${tema}.html`, html);
  console.log(`docs/muestras/${tema}.html`);
}
