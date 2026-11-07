// Genera, para cada derivación de scripts/derivados-datos.mjs:
//  - tokens/derivados/<proyecto>/<id>/{claro,oscuro,fuentes,forma}.tokens.json (DTCG)
//  - docs/derivados/<id>.html: cuatro pantallas de su proyecto (dos pantallas, en
//    claro y oscuro), paleta con contraste medido, tipografía y piezas
//  - docs/derivados/indice.html: las nueve, agrupadas por proyecto
// Uso: node scripts/derivados.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { PROPUESTAS } from "./propuestas-datos.mjs";
import { DERIVADOS, PROYECTOS } from "./derivados-datos.mjs";
import {
  UN_PESO, completar, decl, estilos, hoja, escribirTokens, contrastesBajos,
  movilSalud, movilFinanzas, movilInicioSalud, movilMovimientos, movilLanding, movilIngresos,
} from "./pantallas.mjs";

const BASE = Object.fromEntries(PROPUESTAS.map((p) => [p.id, p]));
const nombreBase = (id) => `${BASE[id].nombre} (${BASE[id].inspiracion.split(/[,(]/)[0].trim()})`;

const PANTALLAS = {
  salud: (m) => movilInicioSalud(m),
  salud2: (m) => movilSalud(m),
  finanzas: (m) => movilFinanzas(m),
  finanzas2: (m) => movilMovimientos(m),
  monetizacion: (m) => movilLanding(m),
  monetizacion2: (m) => movilIngresos(m),
};

const MUESTRAS = {
  salud: ["Tus analíticas, claras", "La ferritina guarda el hierro del cuerpo. Mírala junto a la hemoglobina y comenta los cambios con tu médico.", "41,2"],
  finanzas: ["Cuentas en orden", "Este mes llevas gastado el 82 % del presupuesto de supermercado. Quedan nueve días.", "8.412,37"],
  monetizacion: ["Ahorra sin apps raras", "Un correo cada domingo con una idea que se aplica en diez minutos. Sin spam.", "412,80"],
};

function pagina(d) {
  const proy = PROYECTOS[d.proyecto];
  const [mt, mx, mc] = MUESTRAS[d.proyecto];
  return hoja(d, {
    titulo: `Derivación ${d.nombre}`,
    cabecera: `<section class="panel claro cabecera">
    <div>
      <p class="tenue pequeno">Derivación para ${proy.nombre}</p>
      <h1 class="titular" style="font-size: 72px; margin-top: 10px">${d.nombre}</h1>
      <p style="font-size: 16px; line-height: 1.45; margin-top: 14px; max-width: 640px">${d.porque}</p>
    </div>
    <div class="ideas">
      <p class="fuerte">Mezcla</p>
      ${d.mezcla.map(([id, toma]) => `<p>· <span class="fuerte">${nombreBase(id)}:</span> ${toma}</p>`).join("")}
      <p class="tenue pequeno" style="margin-top: 6px">${d.fuentes.titulares} · ${d.fuentes.texto} · ${d.fuentes.cifras}</p>
    </div>
  </section>`,
    moviles: ["claro", "oscuro"].map((m) => PANTALLAS[d.proyecto](m)).join("") + ["claro", "oscuro"].map((m) => PANTALLAS[d.proyecto + "2"](m)).join(""),
    muestraTitular: mt, muestraTexto: mx, muestraCifra: mc,
    pie: `Derivación propia para ${proy.nombre}, mezcla de ${d.mezcla.map(([id]) => BASE[id].nombre).join(", ")}. Toma ideas de sistemas públicos, sin sus marcas, logos ni fuentes de pago. Datos inventados. Generada desde scripts/derivados-datos.mjs del repo sistemas-diseno.`,
  });
}

function indice() {
  const tarjeta = (d) => {
    const cl = completar(d.colores.claro), os = completar(d.colores.oscuro);
    const cifra = MUESTRAS[d.proyecto][2];
    const lado = (modo) => `
      <div class="${modo}" style="min-width:0; overflow:hidden; background: var(--background); padding: 18px; display:flex; flex-direction:column; gap:10px; border-radius: 12px">
        <p class="titular" style="font-size: 28px">${d.nombre}</p>
        <p class="tenue pequeno">${d.fuentes.titulares} · ${d.fuentes.texto}</p>
        <div class="fila" style="gap:6px">${["primary", "accent", "chart-1", "chart-2", "foreground", "muted", "border"].map((n) => `<span style="width:24px;height:24px;border-radius:6px;background:var(--${n});border:1px solid var(--border)"></span>`).join("")}</div>
        <div class="fila"><button class="boton primario">Guardar</button><button class="boton contorno">Ver</button></div>
        <p class="hero"><span class="cifra" style="font-size:34px">${cifra}</span></p>
      </div>`;
    return `<div style="display:flex; flex-direction:column; gap:8px; min-width:0">
      <style>.d-${d.id} .claro { ${decl(cl)} } .d-${d.id} .oscuro { ${decl(os)} } .d-${d.id} { --radius: ${d.radio}; --radio-boton: ${d.boton}; } .d-${d.id} .titular { font-family: "${d.fuentes.titulares}"; font-weight: ${d.titular.peso}; letter-spacing: ${d.titular.tracking}; ${d.titular.mayusculas ? "text-transform: uppercase;" : ""} } .d-${d.id} .boton, .d-${d.id} .tenue { font-family: "${d.fuentes.texto}"; } .d-${d.id} .cifra { font-family: "${d.fuentes.cifras}"; }</style>
      <div class="d-${d.id}" style="display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:8px">${lado("claro")}${lado("oscuro")}</div>
      <p class="pie"><b>Mezcla:</b> ${d.mezcla.map(([id]) => nombreBase(id)).join(" + ")}</p></div>`;
  };
  const familias = [...new Set(DERIVADOS.flatMap((d) => Object.values(d.fuentes)))];
  const url = familias.map((f) => `family=${f.replaceAll(" ", "+")}${UN_PESO.has(f) ? "" : ":wght@300;400;500;600;700;800"}`).join("&");
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Derivaciones por proyecto</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${url}&family=Inter:wght@400;600&display=swap">
<style>${estilos(PROPUESTAS[0])} .indice { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 24px; } .claro, .oscuro { color: var(--foreground); } .tenue{color:var(--muted-foreground)} .grupo { display:flex; flex-direction:column; gap:14px; }</style></head>
<body><main class="hoja">
  <section style="padding: 8px 0"><h1 style="font: 600 44px Inter, sans-serif; letter-spacing:-0.02em">Derivaciones por proyecto</h1>
  <p style="font: 16px Inter, sans-serif; color:#55524c; margin-top:8px">Tres versiones para cada proyecto, mezclando las diez propuestas. Cada una tiene su página con cuatro pantallas de su proyecto, paleta con contraste medido, tipografía y piezas.</p></section>
  ${Object.entries(PROYECTOS).map(([id, p]) => `
  <section class="grupo">
    <div><h2 style="font: 600 30px Inter, sans-serif; letter-spacing:-0.01em">${p.nombre}</h2><p style="font: 15px Inter, sans-serif; color:#55524c; margin-top:4px">${p.pregunta}</p></div>
    <div class="indice">${DERIVADOS.filter((d) => d.proyecto === id).map(tarjeta).join("")}</div>
  </section>`).join("")}
</main></body></html>
`;
}

mkdirSync("docs/derivados", { recursive: true });
for (const d of DERIVADOS) {
  for (const [id] of d.mezcla) if (!BASE[id]) throw new Error(`${d.id}: no existe la propuesta ${id}`);
  escribirTokens(d, `tokens/derivados/${d.proyecto}/${d.id}`);
  writeFileSync(`docs/derivados/${d.id}.html`, pagina(d));
  const bajos = contrastesBajos(d);
  console.log(`${d.proyecto}/${d.id}${bajos.length ? "  ⚠ contraste bajo: " + bajos.join(", ") : ""}`);
}
writeFileSync("docs/derivados/indice.html", indice());
console.log("docs/derivados/indice.html");
