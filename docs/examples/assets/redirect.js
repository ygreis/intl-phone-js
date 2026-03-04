(() => {
  const path = window.location.pathname;
  const hasFileExtension = /\.[a-z0-9]+$/i.test(path);

  if (!path.endsWith("/") && !hasFileExtension) {
    window.location.replace(`${path}/${window.location.search}${window.location.hash}`);
  }
})();
