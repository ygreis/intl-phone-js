const MODULES = ["./theme.js", "./layout.js"];

async function loadModules() {
  const loaded = await Promise.all(
    MODULES.map((modulePath) => import(new URL(modulePath, import.meta.url))),
  );

  return {
    theme: loaded[0],
    layout: loaded[1],
  };
}

export async function bootDocsPage(options = {}) {
  const { theme, layout } = await loadModules();
  theme.initTheme();
  layout.mountDocsLayout(options);
}
