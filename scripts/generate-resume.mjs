import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "..", "public", "ranjan-gogoi-resume.pdf");
mkdirSync(dirname(outPath), { recursive: true });

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 56, bottom: 56, left: 56, right: 56 },
  info: {
    Title: "Ranjan Gogoi — Frontend Web Developer Resume",
    Author: "Ranjan Gogoi",
    Subject: "Resume / CV",
  },
});

doc.pipe(createWriteStream(outPath));

const ACCENT = "#0891b2";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const RULE = "#e2e8f0";

function h1(text) {
  doc.fillColor(TEXT).font("Helvetica-Bold").fontSize(26).text(text);
}
function tagline(text) {
  doc.moveDown(0.15);
  doc.fillColor(ACCENT).font("Helvetica").fontSize(11).text(text.toUpperCase(), { characterSpacing: 1.2 });
}
function meta(text) {
  doc.moveDown(0.2);
  doc.fillColor(MUTED).font("Helvetica").fontSize(10).text(text);
}
function rule() {
  doc.moveDown(0.6);
  const y = doc.y;
  doc.strokeColor(RULE).lineWidth(0.75).moveTo(56, y).lineTo(556, y).stroke();
  doc.moveDown(0.6);
}
function h2(text) {
  doc.moveDown(0.4);
  doc.fillColor(ACCENT).font("Helvetica-Bold").fontSize(10).text(text.toUpperCase(), { characterSpacing: 1.4 });
  doc.moveDown(0.3);
}
function body(text) {
  doc.fillColor(TEXT).font("Helvetica").fontSize(10.5).text(text, { lineGap: 2 });
}
function bullet(text) {
  doc.fillColor(TEXT).font("Helvetica").fontSize(10.5)
     .text(`•  ${text}`, { lineGap: 2, indent: 4, paragraphGap: 2 });
}
function role(title, where, when) {
  doc.fillColor(TEXT).font("Helvetica-Bold").fontSize(11).text(title, { continued: true })
     .font("Helvetica").fillColor(MUTED).text(`   ${where}`, { continued: false });
  doc.fillColor(MUTED).font("Helvetica-Oblique").fontSize(9.5).text(when);
  doc.moveDown(0.2);
}

h1("Ranjan Gogoi");
tagline("Frontend Web Developer  ·  2D & 3D Website Specialist");
meta("gogoi78ranjan@gmail.com   ·   WhatsApp: +91 60001 75974  /  +91 91017 80140   ·   India  ·  Available Worldwide");
rule();

h2("Profile");
body(
  "Frontend web developer focused on building modern, responsive 2D and 3D websites for startups, " +
  "creators, small businesses, and personal brands. I work with React, Tailwind CSS, and Three.js to deliver " +
  "premium UI/UX, smooth animations, and clean, maintainable code. I take communication, deadlines, and " +
  "client satisfaction seriously on every Fiverr order."
);

h2("What I Offer");
bullet("Modern Responsive Websites — React + Tailwind CSS, mobile-first, polished on every screen.");
bullet("2D & 3D Web Experiences — subtle, performant Three.js scenes that feel premium, not gimmicky.");
bullet("Landing Pages & Portfolios — high-impact single-page sites built to convert and impress.");
bullet("Modern UI/UX — clean layouts, considered typography, and tasteful animations end-to-end.");
bullet("Fast Delivery & Clear Communication — daily updates, predictable timelines, easy revisions.");

h2("Core Skills");
body(
  "React  ·  TypeScript  ·  Vite  ·  Tailwind CSS  ·  HTML5  ·  CSS3  ·  JavaScript (ES6+)\n" +
  "Three.js  ·  React Three Fiber  ·  Drei  ·  Framer Motion  ·  GSAP  ·  Responsive Design\n" +
  "Figma to Code  ·  Git / GitHub  ·  Vercel / Netlify  ·  REST APIs  ·  Performance & SEO basics"
);

h2("Selected Portfolio Projects");
role("SaaS Dashboard Demo", "Personal Portfolio Project", "2026");
bullet("Modern responsive dashboard layout with charts, sidebar navigation, and dark theme.");
bullet("Built with React, TypeScript, and Tailwind CSS for a clean, scalable component system.");

role("3D Product Showcase", "Personal Portfolio Project", "2026");
bullet("Interactive 3D product viewer using React Three Fiber with smooth camera and lighting.");
bullet("Optimized assets and graceful fallback for devices without WebGL support.");

role("Fashion Store Demo", "Personal Portfolio Project", "2026");
bullet("E-commerce style product grid with elegant hover transitions and a responsive layout.");
bullet("Built mobile-first with Tailwind utility classes and accessible markup.");

role("Portfolio Website", "Personal Portfolio Project", "2026");
bullet("Premium dark-theme portfolio with subtle 3D hero and scroll-triggered animations.");
bullet("React + Vite + Tailwind + Framer Motion, fully responsive across phones, tablets, desktops.");

role("Business Landing Page", "Personal Portfolio Project", "2026");
bullet("Conversion-focused single-page site with hero, features, testimonials, and contact.");
bullet("Clean code structure ready to plug into any business or service brand.");

role("Startup Website Demo", "Personal Portfolio Project", "2026");
bullet("Multi-section startup site with bold typography, smooth motion, and a working contact form.");
bullet("Easy to customize copy and branding for early-stage founders.");

h2("Experience");
role("Freelance Frontend Web Developer", "Self-employed  ·  Fiverr", "2025 — Present  ·  6 months");
bullet("Building responsive, modern, animated websites for clients and personal portfolio projects.");
bullet("Specializing in React, Tailwind CSS, and Three.js with a focus on premium UI/UX.");
bullet("Reliable delivery, clear communication, and follow-up support after every order.");

h2("Approach");
bullet("Discovery → wireframe → design pass → build → polish → handoff.");
bullet("Daily check-ins on Fiverr / WhatsApp so you always know where things stand.");
bullet("Clean, commented code with a short walkthrough at delivery.");

h2("Education & Continuous Learning");
role("Self-taught Frontend Developer", "Online (React, Three.js, UI/UX)", "Ongoing");
bullet("Constantly learning the latest in React, modern CSS, animation, and 3D on the web.");

h2("Contact");
body(
  "Email: gogoi78ranjan@gmail.com\n" +
  "WhatsApp: +91 60001 75974   ·   +91 91017 80140\n" +
  "Status: Available for freelance work on Fiverr."
);

doc.end();

doc.on("end", () => {
  console.log(`Resume written to ${outPath}`);
});
