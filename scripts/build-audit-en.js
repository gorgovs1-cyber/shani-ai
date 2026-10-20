// Builds public/audit-en.html from public/audit.html with an English <head>, so link
// previews (WhatsApp, Facebook) for /en/audit show English tags. The page body is the
// same file: its script switches the text to English from the /en/audit URL.
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "public", "audit.html");
const out = path.join(__dirname, "..", "public", "audit-en.html");

const TITLE = "Free business fit check · Shani AI";
const DESC = "A free fit check for your business: AI chatbots and agents, CRM, websites and automations. About a minute, and I will get back to you within a business day with first directions.";
const OG_DESC = "AI chatbots and agents, CRM, websites and automations. About a minute, and I will get back to you within a business day.";
const IMG = "https://shani-ai.com/og-en-v4.jpg";
const ALT = "Shani Gorgov, Shani AI: chatbots, websites and modular CRM systems powered by AI for your business";

const attr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const swaps = [
  [/<html lang="he" dir="rtl">/, '<html lang="en" dir="ltr">'],
  [/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`],
  [/<meta name="description" content="[^"]*">/, `<meta name="description" content="${attr(DESC)}">`],
  [/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="https://shani-ai.com/en/audit">'],
  [/<meta property="og:locale" content="[^"]*">/, '<meta property="og:locale" content="en_US">'],
  [/<meta property="og:locale:alternate" content="[^"]*">/, '<meta property="og:locale:alternate" content="he_IL">'],
  [/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="https://shani-ai.com/en/audit">'],
  [/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${attr(TITLE)}">`],
  [/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${attr(OG_DESC)}">`],
  [/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${IMG}">`],
  [/<meta property="og:image:secure_url" content="[^"]*">/, `<meta property="og:image:secure_url" content="${IMG}">`],
  [/<meta property="og:image:alt" content="[^"]*">/, `<meta property="og:image:alt" content="${attr(ALT)}">`],
  [/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${attr(TITLE)}">`],
  [/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${attr(OG_DESC)}">`],
  [/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${IMG}">`],
];

let html = fs.readFileSync(src, "utf8");
for (const [re, to] of swaps) {
  if (!re.test(html)) throw new Error(`build-audit-en: pattern not found in audit.html: ${re}`);
  html = html.replace(re, to);
}
fs.writeFileSync(out, html);
console.log("build-audit-en: wrote public/audit-en.html");
