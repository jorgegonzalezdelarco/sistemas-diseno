// Genera, para cada propuesta de scripts/propuestas-datos.mjs:
//  - tokens/propuestas/<id>/{claro,oscuro,fuentes,forma}.tokens.json (DTCG)
//  - docs/propuestas/<id>.html: paleta con contraste medido, tipografía, piezas y
//    cuatro pantallas de móvil (salud y finanzas, en claro y oscuro)
//  - docs/propuestas/indice.html: todas juntas para comparar
// Uso: node scripts/propuestas.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { PROPUESTAS } from "./propuestas-datos.mjs";
import { completar, decl, estilos, hoja, movilSalud, movilFinanzas, escribirTokens, contrastesBajos } from "./pantallas.mjs";

function pagina(p) {
  return hoja(p, {
    titulo: `Propuesta ${p.nombre}`,
    cabecera: `<section class="panel claro cabecera">
    <div>
      <p class="rotulo">Propuesta de sistema de diseño · inspirada en ${p.inspiracion}</p>
      <h1 class="titular" style="font-size: 72px; margin-top: 10px">${p.nombre}</h1>
    </div>
    <div class="ideas">${p.ideas.map((i) => `<p>· ${i}</p>`).join("")}</div>
  </section>`,
    moviles: movilSalud("claro") + movilSalud("oscuro") + movilFinanzas("claro") + movilFinanzas("oscuro"),
    muestraTitular: "Analíticas y cuentas",
    muestraTexto: "El colesterol que transportan las LDL se deposita en las arterias. Conviene verlo junto al tratamiento.",
    muestraCifra: "1.284,50",
    pie: "Propuesta propia: toma ideas de un sistema público, sin su marca, su logo ni sus fuentes de pago. Generada desde scripts/propuestas-datos.mjs del repo sistemas-diseno.",
  });
}

function indice() {
  const tarjeta = (p) => {
    const cl = completar(p.colores.claro), os = completar(p.colores.oscuro);
    const lado = (col, modo) => `
      <div class="${modo}" style="min-width:0; overflow:hidden; background: var(--background); padding: 18px; display:flex; flex-direction:column; gap:10px; border-radius: 12px">
        <p class="titular" style="font-size: 28px">${p.nombre}</p>
        <p class="tenue pequeno">${p.fuentes.titulares} · ${p.fuentes.texto}</p>
        <div class="fila" style="gap:6px">${["primary", "accent", "chart-2", "foreground", "muted", "border"].map((n) => `<span style="width:26px;height:26px;border-radius:6px;background:var(--${n});border:1px solid var(--border)"></span>`).join("")}</div>
        <div class="fila"><button class="boton primario">Guardar</button><button class="boton contorno">Ver</button></div>
        <p class="hero"><span class="cifra" style="font-size:34px">104</span><span class="tenue pequeno">mg/dL</span></p>
      </div>`;
    return `<div style="display:flex; flex-direction:column; gap:8px">
      <style>.p-${p.id} .claro { ${decl(cl)} } .p-${p.id} .oscuro { ${decl(os)} } .p-${p.id} { --fuente-titulares: "${p.fuentes.titulares}"; --fuente-texto: "${p.fuentes.texto}"; --fuente-cifras: "${p.fuentes.cifras}"; --radius: ${p.radio}; --radio-boton: ${p.boton}; } .p-${p.id} .titular { font-family: "${p.fuentes.titulares}"; font-weight: ${p.titular.peso}; letter-spacing: ${p.titular.tracking}; ${p.titular.mayusculas ? "text-transform: uppercase;" : ""} } .p-${p.id} .boton { font-family: "${p.fuentes.texto}"; } .p-${p.id} .cifra { font-family: "${p.fuentes.cifras}"; }</style>
      <div class="p-${p.id}" style="display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:8px">${lado(cl, "claro")}${lado(os, "oscuro")}</div>
      <p class="pie">Inspirada en ${p.inspiracion}</p></div>`;
  };
  const base = PROPUESTAS[0];
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Propuestas de diseño</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${[...new Set(PROPUESTAS.flatMap((p) => Object.values(p.fuentes)))].map((f) => `family=${f.replaceAll(" ", "+")}:wght@300;400;600;700`).join("&")}&display=swap">
<style>${estilos(base)} .indice { display:grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 28px; } .indice > div { min-width: 0; } .claro, .oscuro { color: var(--foreground); } .tenue{color:var(--muted-foreground)}</style></head>
<body><main class="hoja">
  <section style="padding: 8px 0"><h1 style="font: 600 44px Inter, sans-serif; letter-spacing:-0.02em">Propuestas de sistema de diseño</h1>
  <p style="font: 16px Inter, sans-serif; color:#55524c; margin-top:8px">Diez direcciones para Vida de Jorge y Finanzas. Cada una tiene su página con pantallas de móvil, paleta con contraste medido, tipografía y piezas. Elige las que te gusten y lo que cambiarías.</p></section>
  <section class="indice">${PROPUESTAS.map(tarjeta).join("")}</section>
</main></body></html>
`;
}


mkdirSync("docs/propuestas", { recursive: true });
for (const p of PROPUESTAS) {
  escribirTokens(p, `tokens/propuestas/${p.id}`);
  writeFileSync(`docs/propuestas/${p.id}.html`, pagina(p));
  const bajos = contrastesBajos(p);
  console.log(`${p.id}${bajos.length ? "  ⚠ contraste bajo: " + bajos.join(", ") : ""}`);
}
writeFileSync("docs/propuestas/indice.html", indice());
console.log("docs/propuestas/indice.html");
