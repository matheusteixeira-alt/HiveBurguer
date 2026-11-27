// Gera a pasta "site-netlify" com o site 100% estático, pronta para arrastar no Netlify (app.netlify.com/drop).
// Uso: npm run build:netlify
import { spawn, execSync } from "node:child_process";
import { cpSync, rmSync, writeFileSync, existsSync } from "node:fs";

const OUT = "site-netlify";
const PORT = 4317;

console.log("1/3 Gerando o build…");
rmSync(".output", { recursive: true, force: true });
execSync("npx vite build", { stdio: "inherit", env: { ...process.env, NITRO_PRESET: "node-server" } });

console.log("2/3 Renderizando as páginas…");
const server = spawn(process.execPath, [".output/server/index.mjs"], { env: { ...process.env, PORT: String(PORT), HOST: "127.0.0.1" }, stdio: "ignore" });
const fetchPage = async (path) => {
  for (let i = 0; i < 50; i++) {
    try { return await fetch(`http://127.0.0.1:${PORT}${path}`); } catch { await new Promise((r) => setTimeout(r, 200)); }
  }
  throw new Error("O servidor de build não respondeu.");
};

try {
  const home = await fetchPage("/");
  if (!home.ok) throw new Error(`A página inicial respondeu ${home.status}.`);
  const notFound = await fetchPage("/pagina-que-nao-existe");

  rmSync(OUT, { recursive: true, force: true });
  cpSync(".output/public", OUT, { recursive: true });
  writeFileSync(`${OUT}/index.html`, await home.text());
  writeFileSync(`${OUT}/404.html`, await notFound.text());
  // Cache longo para arquivos com hash no nome.
  writeFileSync(`${OUT}/_headers`, "/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n");
} finally {
  server.kill();
}

console.log(`3/3 Pronto: pasta "${OUT}" gerada${existsSync(`${OUT}/index.html`) ? "" : " (sem index.html!)"}.`);
