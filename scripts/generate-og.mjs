// Regenerate public/og-image.png: node scripts/generate-og.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "og-image.png");

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c8ff3d" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#7c5cff" stop-opacity="0.5"/>
    </linearGradient>
    <radialGradient id="vign" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#12151b"/>
      <stop offset="100%" stop-color="#0a0c10"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M0 48 L48 48 L48 0" fill="none" stroke="#21252d" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#vign)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.6"/>

  <circle cx="1040" cy="120" r="260" fill="url(#glow)" opacity="0.22"/>
  <circle cx="120" cy="560" r="220" fill="#7c5cff" opacity="0.12"/>

  <rect x="80" y="80" width="14" height="14" rx="7" fill="#c8ff3d"/>
  <text x="106" y="93" font-family="JetBrains Mono, monospace" font-size="20" letter-spacing="3" fill="#f3f1ea" opacity="0.75">KODIFY DIGITAL</text>

  <text x="78" y="330" font-family="Space Grotesk, Arial, sans-serif" font-weight="600" font-size="92" fill="#f3f1ea" letter-spacing="-2">Custom software,</text>
  <text x="78" y="420" font-family="Space Grotesk, Arial, sans-serif" font-weight="600" font-size="92" fill="#f3f1ea" letter-spacing="-2">built with <tspan fill="#c8ff3d">intent</tspan>.</text>

  <text x="80" y="540" font-family="JetBrains Mono, monospace" font-size="22" fill="#f3f1ea" opacity="0.55">Software &#8226; Web &amp; Mobile &#8226; IT Consultancy</text>
  <text x="80" y="576" font-family="JetBrains Mono, monospace" font-size="22" fill="#f3f1ea" opacity="0.55">Kajang, Selangor &#8226; Malaysia</text>

  <rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#21252d" stroke-width="2"/>
</svg>
`;

const buf = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(OUT, buf);
console.log(`Written ${OUT} (${buf.length} bytes)`);
