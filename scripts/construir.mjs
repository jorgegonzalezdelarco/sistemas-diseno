// Genera un CSS por tema a partir de los tokens DTCG, sin dependencias.
// Uso: node scripts/construir.mjs  →  build/<tema>.css
// Nombres: los colores salen con el nombre de shadcn (--primary, --card…), para que
// cualquier proyecto con shadcn los use sin cambiar nada. El resto, con su ruta:
// --espacio-4, --texto-lg, --fuente-titulares, --radius.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const leer = (carpeta) =>
  readdirSync(carpeta)
    .filter((f) => f.endsWith(".tokens.json"))
    .map((f) => JSON.parse(readFileSync(join(carpeta, f), "utf8")));

function aplanar(arbol, ruta = [], tipo, salida = new Map()) {
  const tipoAqui = arbol.$type ?? tipo;
  if ("$value" in arbol) {
    salida.set(ruta.join("."), { valor: arbol.$value, tipo: tipoAqui });
    return salida;
  }
  for (const [clave, hijo] of Object.entries(arbol)) {
    if (!clave.startsWith("$")) aplanar(hijo, [...ruta, clave], tipoAqui, salida);
  }
  return salida;
}

function aCss(valor, tipo, tokens) {
  if (typeof valor === "string" && /^\{.+\}$/.test(valor)) {
    const ref = tokens.get(valor.slice(1, -1));
    if (!ref) throw new Error(`Referencia sin destino: ${valor}`);
    return aCss(ref.valor, ref.tipo, tokens);
  }
  if (tipo === "color") {
    if (valor.colorSpace === "srgb" && valor.hex) return valor.hex;
    if (valor.colorSpace !== "oklch") throw new Error("Solo se admite oklch o srgb con hex");
    const [l, c, h] = valor.components;
    const alfa = valor.alpha !== undefined && valor.alpha !== 1 ? ` / ${Math.round(valor.alpha * 100)}%` : "";
    return `oklch(${l} ${c} ${h}${alfa})`;
  }
  if (tipo === "dimension") return `${valor.value}${valor.unit}`;
  if (tipo === "fontFamily") {
    return [valor].flat().map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(", ");
  }
  return String(valor);
}

const nombreCss = (ruta) =>
  `--${ruta.startsWith("color.") ? ruta.slice(6) : ruta.replaceAll(".", "-")}`;

function bloque(selector, tokens, todos) {
  const lineas = [...tokens].map(([ruta, t]) => `  ${nombreCss(ruta)}: ${aCss(t.valor, t.tipo, todos)};`);
  return `${selector} {\n${lineas.join("\n")}\n}`;
}

const base = new Map(leer("tokens/base").flatMap((t) => [...aplanar(t)]));
mkdirSync("build", { recursive: true });

for (const tema of readdirSync("tokens/temas")) {
  const carpeta = join("tokens/temas", tema);
  const ficheros = readdirSync(carpeta);
  const comun = new Map(
    ficheros
      .filter((f) => !["claro.tokens.json", "oscuro.tokens.json"].includes(f) && f.endsWith(".tokens.json"))
      .flatMap((f) => [...aplanar(JSON.parse(readFileSync(join(carpeta, f), "utf8")))]),
  );
  const claro = aplanar(JSON.parse(readFileSync(join(carpeta, "claro.tokens.json"), "utf8")));
  const oscuro = aplanar(JSON.parse(readFileSync(join(carpeta, "oscuro.tokens.json"), "utf8")));
  const todos = new Map([...base, ...comun, ...claro]);
  // En oscuro, las referencias apuntan a los valores oscuros.
  const todosOscuro = new Map([...todos, ...oscuro]);

  const faltan = [...claro.keys()].filter((k) => !oscuro.has(k));
  if (faltan.length) throw new Error(`${tema}: sin modo oscuro para ${faltan.join(", ")}`);

  const css = [
    `/* Tema ${tema}. Generado por scripts/construir.mjs desde tokens/: no editar a mano. */`,
    bloque(":root", new Map([...base, ...comun, ...claro]), todos),
    `@media (prefers-color-scheme: dark) {\n${bloque(":root:not([data-theme=\"light\"])", oscuro, todosOscuro).replace(/^/gm, "  ")}\n}`,
    bloque(':root[data-theme="dark"]', oscuro, todosOscuro),
    "",
  ].join("\n\n");
  writeFileSync(join("build", `${tema}.css`), css);
  console.log(`build/${tema}.css: ${claro.size} colores, ${base.size + comun.size} tokens comunes`);
}
