import { IntlPhone } from "https://esm.sh/@intl-phone-js/core@latest";
import { mountCodeSnippets } from "../assets/code-snippets.js";

const HTML_SNIPPET = String.raw`<div class="input-with-preview">
  <input id="intl-phone-js" type="text" placeholder="5511999999999" />
  <div id="flag-output" class="flag-preview is-empty">
    Waiting for country
  </div>
</div>`;

const JS_SNIPPET = String.raw`import { IntlPhone } from "@intl-phone-js/core";

const input = document.querySelector("#intl-phone-js");
const flagOutput = document.querySelector("#flag-output");
const phone = new IntlPhone(input);

function renderFlag(state) {
  if (!state.country) {
    flagOutput.textContent = "Waiting for country";
    return;
  }

  const countryCode = state.country.toLowerCase();
  const flagUrl = \`https://flagcdn.com/\${countryCode}.svg\`;

  flagOutput.innerHTML = \`
    <span class="flag-preview-inner">
      <img src="\${flagUrl}" alt="\${state.country} flag" width="28" height="20" />
      <span>\${state.country}</span>
    </span>
  \`;
}

phone.on("countryChange", renderFlag);
renderFlag(phone.getState());`;

function getFlagUrl(countryCode) {
  return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
}

function renderFlag(container, state) {
  if (!state.country) {
    container.classList.add("is-empty");
    container.textContent = "Waiting for country";
    return;
  }

  container.classList.remove("is-empty");
  container.innerHTML = `
    <span class="flag-preview-inner">
      <img src="${getFlagUrl(state.country)}" alt="${state.country} flag" width="28" height="20" />
      <span>${state.country}</span>
    </span>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#intl-phone-js");
  const flagOutput = document.querySelector("#flag-output");
  const snippetList = document.querySelector("#snippet-list");

  if (!input || !flagOutput || !snippetList) return;

  const phone = new IntlPhone(input);

  phone.on("countryChange", (state) => {
    renderFlag(flagOutput, state);
  });

  renderFlag(flagOutput, phone.getState());

  mountCodeSnippets({
    container: snippetList,
    snippets: [
      {
        title: "HTML",
        language: "html",
        description: "Minimal markup for the input and flag container.",
        code: HTML_SNIPPET,
      },
      {
        title: "JavaScript",
        language: "js",
        description: "Listen to countryChange and render the flag from FlagCDN.",
        code: JS_SNIPPET,
      },
    ],
  });
});
