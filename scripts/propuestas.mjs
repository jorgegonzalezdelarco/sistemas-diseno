// Genera, para cada propuesta de scripts/propuestas-datos.mjs:
//  - tokens/propuestas/<id>/{claro,oscuro,fuentes,forma}.tokens.json (DTCG)
//  - docs/propuestas/<id>.html: paleta con contraste medido, tipografía, piezas y
//    cuatro pantallas de móvil (salud y finanzas, en claro y oscuro)
//  - docs/propuestas/indice.html: todas juntas para comparar
// Uso: node scripts/propuestas.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { PROPUESTAS } from "./propuestas-datos.mjs";

// --- Contraste WCAG ---
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contraste = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const nota = (r) => (r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA grande" : "Bajo");

const completar = (col) => ({
  ...col,
  "card-foreground": col["card-foreground"] ?? col.foreground,
  "popover-foreground": col["popover-foreground"] ?? col.foreground,
  "secondary-foreground": col["secondary-foreground"] ?? col.foreground,
});
const hexDtcg = (h) => ({ colorSpace: "srgb", components: [1, 3, 5].map((i) => +(parseInt(h.slice(i, i + 2), 16) / 255).toFixed(4)), hex: h });

const fuentesUrl = (p) => {
  const fam = [...new Set(Object.values(p.fuentes))];
  return "https://fonts.googleapis.com/css2?" + fam.map((f) => `family=${f.replaceAll(" ", "+")}:wght@300;400;500;600;700`).join("&") + "&display=swap";
};

const decl = (col) => Object.entries(col).map(([k, v]) => `--${k}: ${v};`).join(" ");

const MUESTRA = ["background", "foreground", "card", "muted", "muted-foreground", "border", "primary", "primary-foreground", "accent", "accent-foreground", "destructive", "aviso", "positivo", "chart-1", "chart-2"];

function paleta(col, modo) {
  const pares = [
    ["Texto sobre fondo", col.foreground, col.background],
    ["Texto tenue sobre fondo", col["muted-foreground"], col.background],
    ["Texto sobre tarjeta", col.foreground, col.card],
    ["Botón principal", col["primary-foreground"], col.primary],
    ["Acento", col["accent-foreground"], col.accent],
  ];
  return `
    <div class="panel ${modo}">
      <p class="rotulo">Colores · modo ${modo}</p>
      <div class="rejilla">${MUESTRA.map((n) => `
        <div class="color"><div class="pastilla" style="background: var(--${n})"></div><p class="nombre">${n}</p><p class="valor">${col[n]}</p></div>`).join("")}
      </div>
      <div class="contrastes">${pares.map(([t, a, b]) => {
        const r = contraste(a, b);
        return `<div class="par"><span class="muestra-par" style="background:${b};color:${a}">Aa</span><span>${t}</span><span class="valor">${r.toFixed(1)}:1 · ${nota(r)}</span></div>`;
      }).join("")}
      </div>
    </div>`;
}

function piezas(modo) {
  return `
    <div class="panel ${modo}">
      <p class="rotulo">Piezas · modo ${modo}</p>
      <div class="fila">
        <button class="boton primario">Guardar</button>
        <button class="boton secundario">Cancelar</button>
        <button class="boton contorno">Ver todo</button>
        <button class="boton peligro">Borrar</button>
      </div>
      <div class="fila">
        <label class="campo"><span>Correo</span><span class="entrada">nombre@ejemplo.com</span></label>
        <label class="campo"><span>Importe</span><span class="entrada foco">42,50 €</span></label>
      </div>
      <div class="fila">
        <span class="etiqueta">Guía clínica</span><span class="etiqueta acento">Dentro del presupuesto</span><span class="etiqueta aviso-et">Fecha aproximada</span>
      </div>
    </div>`;
}

// Línea de evolución con cuatro límites de referencia (como el LDL).
function grafica() {
  const datos = [162, 151, 138, 129, 118, 104];
  const w = 300, h = 120, min = 50, max = 200;
  const y = (v) => (h - ((v - min) / (max - min)) * h).toFixed(1);
  const x = (i) => ((i / (datos.length - 1)) * (w - 16) + 8).toFixed(1);
  const puntos = datos.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const lineas = [116, 100, 70, 55].map((v) => `<line x1="0" x2="${w}" y1="${y(v)}" y2="${y(v)}" stroke="var(--muted-foreground)" stroke-opacity="0.5" stroke-dasharray="3 4"/>`).join("");
  const circulos = datos.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="var(--chart-1)" stroke="var(--card)" stroke-width="2"/>`).join("");
  return `<svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="display:block">${lineas}<polyline points="${puntos}" fill="none" stroke="var(--chart-1)" stroke-width="2.5" stroke-linejoin="round"/>${circulos}</svg>`;
}

const nav = (activo, items) => `
  <nav class="nav">${items.map((t, i) => `<span class="nav-item ${i === activo ? "activo" : ""}"><span class="icono"></span>${t}</span>`).join("")}</nav>`;

function movilSalud(modo) {
  return `
  <div class="movil ${modo}">
    <div class="barra"><span class="marca titular">Vida de Jorge</span><span class="avatar"></span></div>
    <div class="contenido">
      <p class="rotulo">Lípidos</p>
      <h2 class="titular t-grande">Colesterol LDL</h2>
      <p class="hero"><span class="cifra c-enorme">104</span> <span class="tenue">mg/dL</span></p>
      <p class="tenue pequeno">21 sep 2026 · −14 respecto al anterior</p>
      <div class="tarjeta">
        <p class="rotulo">Evolución</p>
        ${grafica()}
        <p class="tenue diminuto">Líneas: riesgo bajo 116 · moderado 100 · alto 70 · muy alto 55</p>
      </div>
      <div class="tarjeta">
        <p class="rotulo">Qué mide</p>
        <p class="pequeno">El colesterol que transportan las LDL. Es el principal objetivo para reducir el riesgo cardiovascular.</p>
      </div>
      <div class="lista">
        <div class="fila-lista"><span>15 oct 2025</span><span class="cifra">118 <span class="tenue">mg/dL</span></span></div>
        <div class="fila-lista"><span>2 sep 2024</span><span class="cifra">129 <span class="tenue">mg/dL</span></span></div>
      </div>
    </div>
    ${nav(1, ["Inicio", "Marcadores", "Análisis", "Cuerpo", "Suplem."])}
  </div>`;
}

function movilFinanzas(modo) {
  const barras = [["Supermercado", 412, 500, "positivo"], ["Restaurantes", 186, 200, "aviso"], ["Ocio", 95, 150, "positivo"]];
  return `
  <div class="movil ${modo}">
    <div class="barra"><span class="marca titular">Finanzas</span><span class="avatar"></span></div>
    <div class="contenido">
      <p class="rotulo">Octubre 2026</p>
      <h2 class="titular t-grande">Resumen</h2>
      <div class="tarjeta destacada">
        <p class="tenue pequeno">Disponible este mes</p>
        <p class="hero"><span class="cifra c-enorme">1.284,50</span> <span class="tenue">€</span></p>
        <button class="boton primario ancho">Añadir movimiento</button>
      </div>
      <div class="tarjeta">
        <p class="rotulo">Presupuestos</p>
        ${barras.map(([n, g, t, e]) => `
        <div class="presu"><div class="presu-fila"><span class="pequeno">${n}</span><span class="cifra pequeno">${g} / ${t} €</span></div>
        <div class="pista-barra"><div class="relleno" style="width:${Math.round((g / t) * 100)}%; background: var(--${e})"></div></div></div>`).join("")}
      </div>
      <div class="lista">
        <div class="fila-lista"><span>Mercado central</span><span class="cifra negativo">−38,20 €</span></div>
        <div class="fila-lista"><span>Nómina</span><span class="cifra positivo-t">+2.150,00 €</span></div>
        <div class="fila-lista"><span>Gasolina</span><span class="cifra negativo">−62,00 €</span></div>
      </div>
    </div>
    ${nav(0, ["Resumen", "Cuentas", "Presupuesto", "Informes", "Ajustes"])}
  </div>`;
}

function estilos(p) {
  const t = p.titular;
  return `
  * { box-sizing: border-box; margin: 0; }
  body { background: #e4e2dd; font-family: var(--fuente-texto); padding: 40px; }
  .hoja { width: 1520px; margin: 0 auto; display: flex; flex-direction: column; gap: 28px; }
  .claro { ${decl(completar(p.colores.claro))} }
  .oscuro { ${decl(completar(p.colores.oscuro))} }
  :root { --fuente-titulares: "${p.fuentes.titulares}", sans-serif; --fuente-texto: "${p.fuentes.texto}", sans-serif; --fuente-cifras: "${p.fuentes.cifras}", monospace; --radius: ${p.radio}; --radio-boton: ${p.boton}; }
  .claro, .oscuro { color: var(--foreground); }
  .panel { background: var(--background); border-radius: 16px; padding: 32px; display: flex; flex-direction: column; gap: 20px; }
  .doble { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .titular { font-family: var(--fuente-titulares); font-weight: ${t.peso}; letter-spacing: ${t.tracking}; ${t.mayusculas ? "text-transform: uppercase;" : ""} line-height: 1.05; }
  .cifra { font-family: var(--fuente-cifras); font-variant-numeric: tabular-nums; }
  .rotulo { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted-foreground); font-weight: 600; }
  .tenue { color: var(--muted-foreground); }
  .pequeno { font-size: 13px; line-height: 1.45; }
  .diminuto { font-size: 11px; }
  .rejilla { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
  .color { display: flex; flex-direction: column; gap: 4px; }
  .pastilla { height: 48px; border-radius: min(var(--radius), 12px); border: 1px solid var(--border); }
  .nombre { font-size: 12px; font-weight: 600; }
  .valor { font-family: "JetBrains Mono", monospace; font-size: 11px; color: var(--muted-foreground); }
  .contrastes { display: flex; flex-direction: column; gap: 6px; }
  .par { display: grid; grid-template-columns: 44px 1fr auto; gap: 10px; align-items: center; font-size: 13px; }
  .muestra-par { display: inline-flex; align-items: center; justify-content: center; height: 28px; border-radius: 6px; font-weight: 600; border: 1px solid var(--border); }
  .fila { display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-start; }
  .boton { font: 500 14px var(--fuente-texto); height: 42px; padding: 0 20px; border-radius: var(--radio-boton); border: 1px solid transparent; }
  .primario { background: var(--primary); color: var(--primary-foreground); }
  .secundario { background: var(--secondary); color: var(--secondary-foreground); }
  .contorno { background: transparent; color: var(--foreground); border-color: var(--input); }
  .peligro { background: var(--destructive); color: #ffffff; }
  .ancho { width: 100%; margin-top: 8px; }
  .campo { display: flex; flex-direction: column; gap: 6px; font-size: 13px; font-weight: 500; width: 260px; }
  .entrada { height: 42px; display: flex; align-items: center; padding: 0 12px; background: var(--card); border: 1px solid var(--input); border-radius: min(var(--radius), 10px); font-weight: 400; }
  .foco { border-color: var(--ring); box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 28%, transparent); }
  .etiqueta { font-size: 12px; padding: 4px 10px; border-radius: 999px; background: var(--muted); color: var(--muted-foreground); border: 1px solid var(--border); }
  .etiqueta.acento { background: var(--accent); color: var(--accent-foreground); border-color: transparent; }
  .aviso-et { color: var(--aviso); }
  .tipos { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 28px; align-items: end; }
  .cabecera { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: end; }
  .ideas { display: flex; flex-direction: column; gap: 8px; font-size: 15px; line-height: 1.4; }
  .moviles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; justify-items: center; }
  .movil { width: 340px; height: 720px; background: var(--background); border-radius: 36px; border: 8px solid #1a1a1a; overflow: hidden; display: flex; flex-direction: column; position: relative; }
  .barra { height: 52px; display: flex; align-items: center; justify-content: space-between; padding: 0 18px; border-bottom: 1px solid var(--border); }
  .marca { font-size: 16px; }
  .avatar { width: 26px; height: 26px; border-radius: 999px; background: var(--muted); border: 1px solid var(--border); }
  .contenido { flex: 1; padding: 18px; display: flex; flex-direction: column; gap: 10px; overflow: hidden; }
  .t-grande { font-size: 30px; }
  .hero { display: flex; align-items: baseline; gap: 6px; }
  .c-enorme { font-size: 50px; line-height: 1; letter-spacing: -0.02em; }
  .tarjeta { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px; display: flex; flex-direction: column; gap: 8px; }
  .lista { border: 1px solid var(--border); border-radius: var(--radius); background: var(--card); }
  .fila-lista { display: flex; justify-content: space-between; padding: 11px 14px; font-size: 13px; border-top: 1px solid var(--border); }
  .fila-lista:first-child { border-top: 0; }
  .presu { display: flex; flex-direction: column; gap: 5px; }
  .presu-fila { display: flex; justify-content: space-between; }
  .pista-barra { height: 8px; border-radius: 999px; background: var(--muted); overflow: hidden; }
  .relleno { height: 100%; border-radius: 999px; }
  .negativo { color: var(--destructive); }
  .positivo-t { color: var(--positivo); }
  .nav { height: 62px; border-top: 1px solid var(--border); display: grid; grid-template-columns: repeat(5, 1fr); background: var(--card); }
  .nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; font-size: 11px; color: var(--muted-foreground); }
  .nav-item.activo { color: var(--primary); font-weight: 600; }
  .icono { width: 18px; height: 18px; border-radius: 5px; border: 2px solid currentColor; }
  .pie { font-size: 12px; color: #55524c; }`;
}

function pagina(p) {
  const cl = completar(p.colores.claro);
  const os = completar(p.colores.oscuro);
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Propuesta ${p.nombre}</title>
<link rel="stylesheet" href="${fuentesUrl(p)}">
<style>${estilos(p)}</style></head>
<body><main class="hoja">
  <section class="panel claro cabecera">
    <div>
      <p class="rotulo">Propuesta de sistema de diseño · inspirada en ${p.inspiracion}</p>
      <h1 class="titular" style="font-size: 72px; margin-top: 10px">${p.nombre}</h1>
    </div>
    <div class="ideas">${p.ideas.map((i) => `<p>· ${i}</p>`).join("")}</div>
  </section>
  <section class="moviles">
    ${movilSalud("claro")}${movilSalud("oscuro")}${movilFinanzas("claro")}${movilFinanzas("oscuro")}
  </section>
  <section class="doble">${paleta(cl, "claro")}${paleta(os, "oscuro")}</section>
  <section class="panel claro">
    <p class="rotulo">Tipografía</p>
    <div class="tipos">
      <div><p class="rotulo">Titulares · ${p.fuentes.titulares}</p><p class="titular" style="font-size: 52px; margin-top: 14px">Analíticas y cuentas</p></div>
      <div><p class="rotulo">Texto · ${p.fuentes.texto}</p><p style="font-size: 17px; line-height: 1.5">El colesterol que transportan las LDL se deposita en las arterias. Conviene verlo junto al tratamiento.</p></div>
      <div><p class="rotulo">Cifras · ${p.fuentes.cifras}</p><p class="cifra" style="font-size: 44px; margin-top: 14px">1.284,50</p></div>
    </div>
  </section>
  <section class="doble">${piezas("claro")}${piezas("oscuro")}</section>
  <p class="pie">Propuesta propia: toma ideas de un sistema público, sin su marca, su logo ni sus fuentes de pago. Generada desde scripts/propuestas-datos.mjs del repo sistemas-diseno.</p>
</main></body></html>
`;
}

function indice() {
  const tarjeta = (p) => {
    const cl = completar(p.colores.claro), os = completar(p.colores.oscuro);
    const lado = (col, modo) => `
      <div class="${modo}" style="background: var(--background); padding: 18px; display:flex; flex-direction:column; gap:10px; border-radius: 12px">
        <p class="titular" style="font-size: 28px">${p.nombre}</p>
        <p class="tenue pequeno">${p.fuentes.titulares} · ${p.fuentes.texto}</p>
        <div class="fila" style="gap:6px">${["primary", "accent", "chart-2", "foreground", "muted", "border"].map((n) => `<span style="width:26px;height:26px;border-radius:6px;background:var(--${n});border:1px solid var(--border)"></span>`).join("")}</div>
        <div class="fila"><button class="boton primario">Guardar</button><button class="boton contorno">Ver</button></div>
        <p class="hero"><span class="cifra" style="font-size:34px">104</span><span class="tenue pequeno">mg/dL</span></p>
      </div>`;
    return `<div style="display:flex; flex-direction:column; gap:8px">
      <style>.p-${p.id} .claro { ${decl(cl)} } .p-${p.id} .oscuro { ${decl(os)} } .p-${p.id} { --fuente-titulares: "${p.fuentes.titulares}"; --fuente-texto: "${p.fuentes.texto}"; --fuente-cifras: "${p.fuentes.cifras}"; --radius: ${p.radio}; --radio-boton: ${p.boton}; } .p-${p.id} .titular { font-family: "${p.fuentes.titulares}"; font-weight: ${p.titular.peso}; letter-spacing: ${p.titular.tracking}; ${p.titular.mayusculas ? "text-transform: uppercase;" : ""} } .p-${p.id} .boton { font-family: "${p.fuentes.texto}"; } .p-${p.id} .cifra { font-family: "${p.fuentes.cifras}"; }</style>
      <div class="p-${p.id}" style="display:grid; grid-template-columns:1fr 1fr; gap:8px">${lado(cl, "claro")}${lado(os, "oscuro")}</div>
      <p class="pie">Inspirada en ${p.inspiracion}</p></div>`;
  };
  const base = PROPUESTAS[0];
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Propuestas de diseño</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${[...new Set(PROPUESTAS.flatMap((p) => Object.values(p.fuentes)))].map((f) => `family=${f.replaceAll(" ", "+")}:wght@300;400;600;700`).join("&")}&display=swap">
<style>${estilos(base)} .indice { display:grid; grid-template-columns: 1fr 1fr; gap: 28px; } .claro, .oscuro { color: var(--foreground); } .tenue{color:var(--muted-foreground)}</style></head>
<body><main class="hoja">
  <section style="padding: 8px 0"><h1 style="font: 600 44px Inter, sans-serif; letter-spacing:-0.02em">Propuestas de sistema de diseño</h1>
  <p style="font: 16px Inter, sans-serif; color:#55524c; margin-top:8px">Diez direcciones para Vida de Jorge y Finanzas. Cada una tiene su página con pantallas de móvil, paleta con contraste medido, tipografía y piezas. Elige las que te gusten y lo que cambiarías.</p></section>
  <section class="indice">${PROPUESTAS.map(tarjeta).join("")}</section>
</main></body></html>
`;
}

mkdirSync("docs/propuestas", { recursive: true });
for (const p of PROPUESTAS) {
  const carpeta = `tokens/propuestas/${p.id}`;
  mkdirSync(carpeta, { recursive: true });
  for (const modo of ["claro", "oscuro"]) {
    const col = completar(p.colores[modo]);
    const grupo = { $type: "color", $description: `${p.nombre}, modo ${modo}. Inspirada en ${p.inspiracion}.` };
    for (const [k, v] of Object.entries(col)) grupo[k] = { $value: hexDtcg(v) };
    writeFileSync(`${carpeta}/${modo}.tokens.json`, JSON.stringify({ color: grupo }, null, 2) + "\n");
  }
  writeFileSync(`${carpeta}/fuentes.tokens.json`, JSON.stringify({ fuente: { $type: "fontFamily",
    titulares: { $value: [p.fuentes.titulares, "sans-serif"] }, texto: { $value: [p.fuentes.texto, "sans-serif"] }, cifras: { $value: [p.fuentes.cifras, "monospace"] } } }, null, 2) + "\n");
  const rem = (v) => (v.endsWith("rem") ? { value: parseFloat(v), unit: "rem" } : { value: parseFloat(v), unit: "px" });
  writeFileSync(`${carpeta}/forma.tokens.json`, JSON.stringify({
    radius: { $type: "dimension", $value: rem(p.radio) },
    "radio-boton": { $type: "dimension", $value: rem(p.boton) },
    titular: { $description: "Estilo de los titulares", peso: { $type: "fontWeight", $value: p.titular.peso }, mayusculas: { $value: p.titular.mayusculas }, tracking: { $type: "dimension", $value: { value: parseFloat(p.titular.tracking), unit: "em" } } },
  }, null, 2) + "\n");
  writeFileSync(`docs/propuestas/${p.id}.html`, pagina(p));
  const bajos = ["claro", "oscuro"].flatMap((m) => {
    const col = completar(p.colores[m]);
    return [["texto", col.foreground, col.background], ["tenue", col["muted-foreground"], col.background], ["botón", col["primary-foreground"], col.primary]]
      .filter(([, a, b]) => contraste(a, b) < 4.5).map(([n, a, b]) => `${m} ${n} ${contraste(a, b).toFixed(2)}`);
  });
  console.log(`${p.id}${bajos.length ? "  ⚠ contraste bajo: " + bajos.join(", ") : ""}`);
}
writeFileSync("docs/propuestas/indice.html", indice());
console.log("docs/propuestas/indice.html");
