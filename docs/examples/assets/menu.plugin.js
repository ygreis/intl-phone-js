function normalize(pathname) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
}

function renderGroups({ config, basePath, currentPath }) {
  return config
    .map((group) => {
      const items = group.items
        .map((item) => {
          const href = `${basePath}${item.path}`;
          const active = normalize(currentPath) === normalize(href);
          const description = item.description
            ? `<span class="docs-nav-desc">${item.description}</span>`
            : "";

          return `
            <li class="docs-nav-item" data-nav-item data-search-text="${`${item.label} ${item.description || ""}`.toLowerCase()}">
              <a class="docs-nav-link${active ? " is-active" : ""}" href="${href}">
                <span>${item.label}</span>
                ${description}
              </a>
            </li>
          `;
        })
        .join("");

      return `
        <section class="docs-nav-group" data-nav-group>
          <h3>${group.title}</h3>
          <ul>${items}</ul>
        </section>
      `;
    })
    .join("");
}

function bindSearch(container) {
  const input = container.querySelector("[data-nav-search]");
  if (!input) return;

  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    const items = container.querySelectorAll("[data-nav-item]");
    const groups = container.querySelectorAll("[data-nav-group]");

    items.forEach((item) => {
      const text = item.getAttribute("data-search-text") || "";
      const visible = !term || text.includes(term);
      item.style.display = visible ? "" : "none";
    });

    groups.forEach((group) => {
      const visibleItems = group.querySelectorAll(
        "[data-nav-item]:not([style*='display: none'])",
      );
      group.style.display = visibleItems.length > 0 ? "" : "none";
    });
  });
}

export function mountDocsMenu({
  container,
  config,
  basePath,
  currentPath,
}) {
  container.innerHTML = `
    <div class="docs-sidebar-header">
      <div class="docs-sidebar-brand">INTL PHONE JS</div>
      <a
        class="docs-sidebar-github"
        href="https://github.com/ygreis/intl-phone-js"
        target="_blank"
        rel="noreferrer"
        aria-label="Open intl-phone-js on GitHub"
        title="View on GitHub"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 .5C5.649.5.5 5.649.5 12c0 5.084 3.292 9.398 7.86 10.92.574.106.784-.25.784-.555 0-.273-.01-.997-.016-1.957-3.197.695-3.872-1.54-3.872-1.54-.523-1.329-1.278-1.683-1.278-1.683-1.045-.714.079-.7.079-.7 1.156.08 1.764 1.187 1.764 1.187 1.027 1.76 2.694 1.252 3.35.958.104-.744.402-1.252.731-1.54-2.552-.29-5.236-1.276-5.236-5.68 0-1.255.448-2.282 1.183-3.087-.119-.291-.513-1.46.112-3.046 0 0 .965-.309 3.162 1.18a10.97 10.97 0 0 1 5.758 0c2.195-1.489 3.158-1.18 3.158-1.18.627 1.586.233 2.755.115 3.046.737.805 1.18 1.832 1.18 3.087 0 4.415-2.688 5.387-5.249 5.671.413.355.781 1.055.781 2.126 0 1.536-.014 2.775-.014 3.151 0 .308.207.667.79.554C20.211 21.395 23.5 17.082 23.5 12 23.5 5.649 18.351.5 12 .5Z"
          />
        </svg>
      </a>
    </div>
    <div class="docs-nav-search-wrap">
      <input data-nav-search type="search" placeholder="Search examples..." />
    </div>
    <div class="docs-nav-groups">
      ${renderGroups({ config, basePath, currentPath })}
    </div>
  `;

  bindSearch(container);
}
