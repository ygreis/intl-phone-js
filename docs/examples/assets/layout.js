import { NAV_CONFIG } from "./nav.config.js";
import { mountDocsMenu } from "./menu.plugin.js";
import { getActiveTheme, toggleTheme } from "./theme.js";

function normalize(pathname) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
}

function getExamplesBasePath(pathname) {
  const marker = "/examples";
  const index = pathname.indexOf(marker);
  if (index === -1) return marker;
  return `${pathname.slice(0, index)}${marker}`;
}

function createShell({ pageTitle, pageDescription, basePath, currentPath }) {
  const root = document.createElement("div");
  root.className = "docs-root";
  root.innerHTML = `
    <aside class="docs-sidebar" data-docs-sidebar></aside>
    <div class="docs-main-wrap">
      <header class="docs-topbar">
        <div class="docs-topbar-left">
          <button type="button" class="icon-btn" data-action="toggle-menu" aria-label="Open menu">Menu</button>
          <a class="docs-brand" href="${basePath}/index.html">@intl-phone-js/core</a>
        </div>
        <div class="docs-topbar-actions">
          <button type="button" class="icon-btn" data-action="go-back">Back</button>
          <button type="button" class="icon-btn" data-action="toggle-theme">Theme</button>
        </div>
      </header>
      <section class="docs-page-header">
        <h1>${pageTitle}</h1>
        <p>${pageDescription}</p>
      </section>
      <div class="docs-main-slot" data-docs-main-slot></div>
    </div>
  `;

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="docs-main-inner">
      <div>intl-phone-js examples - ${new Date().getFullYear()}</div>
    </div>
  `;

  const sidebar = root.querySelector("[data-docs-sidebar]");
  mountDocsMenu({
    container: sidebar,
    config: NAV_CONFIG,
    basePath,
    currentPath,
  });

  return { root, footer };
}

function updateThemeButton() {
  const button = document.querySelector("[data-action='toggle-theme']");
  if (!button) return;

  const activeTheme = getActiveTheme();
  button.textContent = activeTheme === "dark" ? "Light Mode" : "Dark Mode";
}

function bindActions(basePath) {
  const toggleMenuButton = document.querySelector("[data-action='toggle-menu']");
  const backButton = document.querySelector("[data-action='go-back']");
  const themeButton = document.querySelector("[data-action='toggle-theme']");

  if (toggleMenuButton) {
    toggleMenuButton.addEventListener("click", () => {
      document.body.classList.toggle("docs-menu-open");
    });
  }

  if (backButton) {
    backButton.addEventListener("click", () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = `${basePath}/index.html`;
      }
    });
  }

  if (themeButton) {
    updateThemeButton();
    themeButton.addEventListener("click", () => {
      toggleTheme();
      updateThemeButton();
    });
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".docs-sidebar") || event.target.closest("[data-action='toggle-menu']")) {
      return;
    }
    document.body.classList.remove("docs-menu-open");
  });

  document.querySelectorAll(".docs-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("docs-menu-open");
    });
  });
}

export function mountDocsLayout(options = {}) {
  const currentPath = normalize(window.location.pathname);
  const basePath = options.basePath ?? normalize(getExamplesBasePath(currentPath));
  const main = document.querySelector("main");
  if (!main) return;

  const pageTitle = options.pageTitle || document.body.dataset.pageTitle || "Examples";
  const pageDescription =
    options.pageDescription ||
    document.body.dataset.pageDescription ||
    "Practical examples for @intl-phone-js/core";

  const { root, footer } = createShell({
    pageTitle,
    pageDescription,
    basePath,
    currentPath,
  });

  const slot = root.querySelector("[data-docs-main-slot]");
  main.classList.add("docs-main-content");
  slot.appendChild(main);

  document.body.prepend(root);
  document.body.appendChild(footer);
  bindActions(basePath);
}
