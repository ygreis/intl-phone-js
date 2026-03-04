function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function renderSnippets(snippets) {
  return snippets
    .map(
      (snippet, index) => `
        <article class="code-snippet-card">
          <div class="code-snippet-head">
            <div>
              <h3>${snippet.title}</h3>
              ${snippet.description ? `<p>${snippet.description}</p>` : ""}
            </div>
            <button
              type="button"
              class="icon-btn code-copy-btn"
              data-copy-index="${index}"
            >
              Copy
            </button>
          </div>
          <pre><code class="language-${snippet.language || "txt"}">${escapeHtml(snippet.code)}</code></pre>
        </article>
      `,
    )
    .join("");
}

export function mountCodeSnippets({ container, snippets }) {
  if (!container) return;

  container.innerHTML = renderSnippets(snippets);

  container.querySelectorAll("[data-copy-index]").forEach((button) => {
    button.addEventListener("click", async () => {
      const index = Number(button.getAttribute("data-copy-index"));
      const snippet = snippets[index];
      if (!snippet) return;

      const originalText = button.textContent;
      button.disabled = true;

      try {
        await copyText(snippet.code);
        button.textContent = "Copied";
      } catch {
        button.textContent = "Failed";
      }

      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1400);
    });
  });
}
