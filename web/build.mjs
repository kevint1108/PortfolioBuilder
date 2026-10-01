// Builds the static version of the portfolio for Vercel.
// Content is read from the ASP.NET project's Data/PortfolioData.cs, so there is
// only one place to edit. CSS, JavaScript and images are copied from wwwroot so
// both versions look the same.
//
// Run locally:  node web/build.mjs   → output in web/dist

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const project = join(here, "..", "PortfolioBuilder-main", "PortfolioBuilder");
const wwwroot = join(project, "wwwroot");
const dist = join(here, "dist");
const data = readPortfolioData(readFileSync(join(project, "Data", "PortfolioData.cs"), "utf8"));

// ---------- read PortfolioData.cs ----------
// Remove // and /* */ comments, leaving string literals (which may contain "//") untouched.
function stripComments(text) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i + 1];
    if (c === '"') {
      const j = i++;
      while (i < text.length && text[i] !== '"') { if (text[i] === "\\") i++; i++; }
      out += text.slice(j, i + 1);
    } else if (c === "/" && n === "/") {
      while (i < text.length && text[i] !== "\n") i++;
      out += "\n";
    } else if (c === "/" && n === "*") {
      i = text.indexOf("*/", i + 2) + 1;
    } else out += c;
  }
  return out;
}

// Understands the simple object/collection initializers used in that file.
function readPortfolioData(src) {
  src = stripComments(src);
  const unq = (s) => s.slice(1, -1).replace(/\\(["\\])/g, "$1").replace(/\\n/g, "\n");
  const STR = /"(?:[^"\\]|\\.)*"/g;

  // Return the text inside the braces that follow `start` (matching nested braces, ignoring strings).
  function block(text, start) {
    const open = text.indexOf("{", start);
    let depth = 0;
    for (let i = open; i < text.length; i++) {
      const c = text[i];
      if (c === '"') { i++; while (text[i] !== '"') { if (text[i] === "\\") i++; i++; } continue; }
      if (c === "{") depth++;
      if (c === "}" && --depth === 0) return text.slice(open + 1, i);
    }
    throw new Error("Unbalanced braces in PortfolioData.cs");
  }
  // Remove nested { ... } blocks so field lookups only see the current level.
  function topLevel(text) {
    let out = "", depth = 0;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') { const j = i; i++; while (text[i] !== '"') { if (text[i] === "\\") i++; i++; } if (!depth) out += text.slice(j, i + 1); continue; }
      if (c === "{") { depth++; continue; }
      if (c === "}") { depth--; continue; }
      if (!depth) out += c;
    }
    return out;
  }
  const str = (text, name) => { const m = topLevel(text).match(new RegExp(`\\b${name}\\s*=\\s*("(?:[^"\\\\]|\\\\.)*")`)); return m ? unq(m[1]) : ""; };
  const bool = (text, name) => new RegExp(`\\b${name}\\s*=\\s*true\\b`).test(topLevel(text));
  const int = (text, name) => { const m = topLevel(text).match(new RegExp(`\\b${name}\\s*=\\s*(\\d+)`)); return m ? Number(m[1]) : 0; };
  const field = (text, name) => { const m = new RegExp(`\\b${name}\\s*=\\s*new`).exec(text); return m ? block(text, m.index) : ""; };
  const strings = (text, name) => (field(text, name).match(STR) || []).map(unq);
  const items = (text, marker) => {
    const out = []; const re = new RegExp(marker, "g"); let m;
    while ((m = re.exec(text))) { const b = block(text, m.index); out.push(b); re.lastIndex = text.indexOf(b, m.index) + b.length; }
    return out;
  };

  const start = /Portfolio\s*\{\s*get;\s*\}\s*=\s*new\s+Portfolio/.exec(src);
  if (!start) throw new Error("Could not find `Portfolio { get; } = new Portfolio` in PortfolioData.cs");
  const root = block(src, start.index + start[0].length);
  return {
    fullName: str(root, "FullName"),
    title: str(root, "Title"),
    intro: str(root, "Intro"),
    about: strings(root, "About"),
    avatar: str(root, "Avatar"),
    githubUrl: str(root, "GitHubUrl"),
    linkedinUrl: str(root, "LinkedInUrl"),
    email: str(root, "Email"),
    resumeUrl: str(root, "ResumeUrl"),
    skillGroups: items(field(root, "SkillGroups"), "new SkillGroup").map((g) => ({ name: str(g, "Name"), skills: strings(g, "Skills") })),
    projects: items(field(root, "Projects"), "new Project\\b").map((p) => ({
      id: int(p, "Id"),
      slug: str(p, "Slug"),
      title: str(p, "Title"),
      featured: bool(p, "Featured"),
      platform: /Platform\s*=\s*ProjectPlatform\.Mobile/.test(p) ? "mobile" : "web",
      summary: str(p, "Summary"),
      description: strings(p, "Description"),
      features: strings(p, "Features"),
      techStack: strings(p, "TechStack"),
      githubUrl: str(p, "GitHubUrl"),
      liveUrl: str(p, "LiveUrl"),
      images: [...field(p, "Images").matchAll(/new\s*\(\s*("(?:[^"\\]|\\.)*")\s*,\s*("(?:[^"\\]|\\.)*")\s*\)/g)].map((m) => ({ file: unq(m[1]), caption: unq(m[2]) })),
    })),
  };
}

// ---------- helpers ----------
const esc = (value = "") =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const each = (list, fn) => (list || []).map(fn).join("");
const when = (cond, html) => (cond ? html : "");
const imageUrl = (file) => "/images/Project/" + encodeURIComponent(file);
const projectUrl = (p) => "/projects/" + p.slug;
const year = new Date().getFullYear();

const githubIcon =
  '<svg class="icon" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';

const tags = (list, large = false) =>
  `<ul class="tags${large ? " tags--large" : ""}" aria-label="Built with">${each(list, (t) => `<li>${esc(t)}</li>`)}</ul>`;

function screenshot(image, platform, eager = false) {
  const loading = eager ? "eager" : "lazy";
  if (platform === "mobile") {
    return `<div class="device device--phone"><img src="${imageUrl(image.file)}" alt="${esc(image.caption)}" loading="${loading}" width="1080" height="2340" /></div>`;
  }
  return `<div class="device device--browser"><div class="device__bar" aria-hidden="true"><span></span><span></span><span></span></div><img src="${imageUrl(image.file)}" alt="${esc(image.caption)}" loading="${loading}" /></div>`;
}

// ---------- layout ----------
function layout({ title, description, body, scripts = "" }) {
  const fullTitle = title ? `${title} · ${data.fullName}` : `${data.fullName} · ${data.title}`;
  const desc = description || data.intro;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta property="og:title" content="${esc(fullTitle)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${esc(data.avatar)}" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap" />
  <link rel="stylesheet" href="/css/site.css" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap site-header__inner">
      <a class="site-header__name" href="/">${esc(data.fullName)}</a>
      <nav aria-label="Main">
        <ul class="site-nav">
          <li><a href="/#projects">Projects</a></li>
          <li><a href="/about">About</a></li>
          ${when(data.githubUrl, `<li><a href="${esc(data.githubUrl)}" target="_blank" rel="noopener">${githubIcon}<span>GitHub</span></a></li>`)}
        </ul>
      </nav>
    </div>
  </header>
  <main id="main">
${body}
  </main>
  <footer class="site-footer" id="contact">
    <div class="wrap site-footer__inner">
      <div>
        <p class="site-footer__lead">Want to work together?</p>
        <ul class="contact-list">
          ${when(data.email, `<li><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></li>`)}
          ${when(data.linkedinUrl, `<li><a href="${esc(data.linkedinUrl)}" target="_blank" rel="noopener">LinkedIn</a></li>`)}
          ${when(data.githubUrl, `<li><a href="${esc(data.githubUrl)}" target="_blank" rel="noopener">GitHub</a></li>`)}
          ${when(data.resumeUrl, `<li><a href="${esc(data.resumeUrl)}" target="_blank" rel="noopener">Résumé</a></li>`)}
        </ul>
      </div>
      <p class="site-footer__copy">&copy; ${year} ${esc(data.fullName)}</p>
    </div>
  </footer>
  <script src="/js/site.js"></script>
${scripts}
</body>
</html>
`;
}

// ---------- pages ----------
function projectCard(p) {
  const url = projectUrl(p);
  const cover = p.images && p.images[0];
  return `<article class="project${p.featured ? " project--featured" : ""}">
  <a class="project__cover project__cover--${p.platform}" href="${url}" tabindex="-1" aria-hidden="true">${cover ? screenshot(cover, p.platform) : ""}</a>
  <div class="project__body">
    <h3 class="project__title"><a href="${url}">${esc(p.title)}</a></h3>
    <p class="project__summary">${esc(p.summary)}</p>
    ${tags(p.techStack)}
    <div class="project__links">
      <a class="link-strong" href="${url}">View project</a>
      ${when(p.githubUrl, `<a class="link-quiet" href="${esc(p.githubUrl)}" target="_blank" rel="noopener">${githubIcon}Code</a>`)}
    </div>
  </div>
</article>`;
}

function homePage() {
  const web = data.projects.filter((p) => p.platform === "web");
  const mobile = data.projects.filter((p) => p.platform === "mobile");
  const secondary = data.email
    ? `<a class="button" href="mailto:${esc(data.email)}">Email me</a>`
    : when(data.githubUrl, `<a class="button" href="${esc(data.githubUrl)}" target="_blank" rel="noopener">${githubIcon}GitHub profile</a>`);

  return layout({
    body: `<section class="hero">
  <div class="wrap hero__inner">
    <div class="hero__text">
      <p class="hero__role">${esc(data.title)}</p>
      <h1 class="hero__name">${esc(data.fullName)}</h1>
      <p class="hero__intro">${esc(data.intro)}</p>
      <div class="hero__actions">
        <a class="button button--solid" href="#projects">See my projects</a>
        ${secondary}
      </div>
    </div>
    <img class="hero__photo" src="${esc(data.avatar)}" alt="Photo of ${esc(data.fullName)}" width="2160" height="2160" />
  </div>
</section>

<section class="skills" aria-labelledby="skills-heading">
  <div class="wrap">
    <h2 id="skills-heading" class="section-title">What I work with</h2>
    <dl class="skills__grid">
      ${each(data.skillGroups, (g) => `<div class="skills__group"><dt>${esc(g.name)}</dt><dd><ul class="tags tags--large">${each(g.skills, (s) => `<li>${esc(s)}</li>`)}</ul></dd></div>`)}
    </dl>
  </div>
</section>

<section class="projects" id="projects" aria-labelledby="projects-heading">
  <div class="wrap">
    <h2 id="projects-heading" class="section-title">Projects</h2>
    ${when(web.length, `<h3 class="projects__group">Web apps</h3><div class="project-grid project-grid--web">${each(web, projectCard)}</div>`)}
    ${when(mobile.length, `<h3 class="projects__group">Mobile apps</h3><div class="project-grid project-grid--mobile">${each(mobile, projectCard)}</div>`)}
  </div>
</section>`,
  });
}

function aboutPage() {
  return layout({
    title: "About",
    body: `<section class="page">
  <div class="wrap about">
    <img class="about__photo" src="${esc(data.avatar)}" alt="Photo of ${esc(data.fullName)}" width="2160" height="2160" />
    <div class="about__text">
      <h1 class="page__title">About me</h1>
      ${each(data.about, (p) => `<p>${esc(p)}</p>`)}
      <div class="hero__actions">
        <a class="button button--solid" href="/#projects">See my projects</a>
        ${when(data.githubUrl, `<a class="button" href="${esc(data.githubUrl)}" target="_blank" rel="noopener">${githubIcon}GitHub profile</a>`)}
      </div>
    </div>
  </div>
</section>`,
  });
}

function projectPage(p, next) {
  const isPhone = p.platform === "mobile";
  const primary = p.liveUrl
    ? `<a class="button button--solid" href="${esc(p.liveUrl)}" target="_blank" rel="noopener">Open live site</a>`
    : "";
  const code = when(
    p.githubUrl,
    `<a class="button${p.liveUrl ? "" : " button--solid"}" href="${esc(p.githubUrl)}" target="_blank" rel="noopener">${githubIcon}View code on GitHub</a>`
  );
  const gallery = p.images && p.images.length
    ? `<section aria-labelledby="screens-heading">
      <h2 id="screens-heading" class="section-title">Screenshots</h2>
      <ul class="gallery ${isPhone ? "gallery--phone" : "gallery--web"}">
        ${each(p.images, (img, i) => `<li><figure><a href="${imageUrl(img.file)}" data-lightbox="${i}" aria-label="Open ${esc(img.caption)} full size">${screenshot(img, p.platform, i < 3)}</a><figcaption>${esc(img.caption)}</figcaption></figure></li>`)}
      </ul>
    </section>`
    : `<p class="muted">Screenshots for this project are coming soon.</p>`;

  return layout({
    title: p.title,
    description: p.summary,
    body: `<article class="page">
  <div class="wrap">
    <a class="back-link" href="/#projects">All projects</a>
    <header class="detail__header">
      <p class="hero__role">${isPhone ? "Mobile app" : "Web app"}</p>
      <h1 class="page__title">${esc(p.title)}</h1>
      <p class="detail__summary">${esc(p.summary)}</p>
      ${tags(p.techStack, true)}
      <div class="hero__actions">${primary}${code}</div>
    </header>
    <div class="detail__info">
      <div class="detail__description">${each(p.description, (d) => `<p>${esc(d)}</p>`)}</div>
      ${when(p.features && p.features.length, `<div class="detail__features"><h2>Features</h2><ul>${each(p.features, (f) => `<li>${esc(f)}</li>`)}</ul></div>`)}
    </div>
    ${gallery}
    ${when(next && next.slug !== p.slug, `<a class="next-project" href="${projectUrl(next)}"><span class="next-project__label">Next project</span><span class="next-project__title">${esc(next.title)}</span></a>`)}
  </div>
</article>
<dialog class="lightbox" id="lightbox" aria-label="Screenshot viewer">
  <form method="dialog"><button class="lightbox__close" aria-label="Close">Close</button></form>
  <figure><img alt="" /><figcaption></figcaption></figure>
  <div class="lightbox__nav">
    <button type="button" data-step="-1">Previous</button>
    <span class="lightbox__count"></span>
    <button type="button" data-step="1">Next</button>
  </div>
</dialog>`,
  });
}

function notFoundPage() {
  return layout({
    title: "Page not found",
    body: `<section class="page">
  <div class="wrap error-page">
    <p class="error-page__code">404</p>
    <h1 class="page__title">This page doesn't exist</h1>
    <p>The link may be old or mistyped. Head back to the home page to see all projects.</p>
    <a class="button button--solid" href="/">Go to home page</a>
  </div>
</section>`,
  });
}

// ---------- write ----------
function write(path, html) {
  const full = join(dist, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const folder of ["css", "js", "images"]) {
  cpSync(join(wwwroot, folder), join(dist, folder), { recursive: true });
}
if (existsSync(join(wwwroot, "favicon.ico"))) cpSync(join(wwwroot, "favicon.ico"), join(dist, "favicon.ico"));

// Fail the build early if a screenshot listed in the JSON is missing.
const missing = data.projects.flatMap((p) => p.images.filter((i) => !existsSync(join(wwwroot, "images", "Project", i.file))).map((i) => `${p.slug}: ${i.file}`));
if (missing.length) {
  console.error("Missing screenshots:\n  " + missing.join("\n  "));
  process.exit(1);
}

write("index.html", homePage());
write("about.html", aboutPage());
write("404.html", notFoundPage());
data.projects.forEach((p, i) => write(`projects/${p.slug}.html`, projectPage(p, data.projects[(i + 1) % data.projects.length])));

console.log(`Built ${data.projects.length + 3} pages into ${dist}`);
