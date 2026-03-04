import {
  IntlPhone,
  getAllCountriesWithNames,
} from "https://esm.sh/@intl-phone-js/core@latest";
import { mountCodeSnippets } from "../assets/code-snippets.js";

const DEFAULT_GLOBE = "\u{1F30D}";

const CDN_SNIPPET = String.raw`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tom-select/2.4.3/css/tom-select.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/tom-select/2.4.3/js/tom-select.complete.min.js"></script>`;

const HTML_SNIPPET = String.raw`<div class="country-picker-field">
  <button id="country-picker-trigger" type="button">&#127757;</button>
  <input id="intl-phone-js" type="text" placeholder="5511999999999" />
  <div id="country-picker-panel" hidden>
    <select id="country-picker" placeholder="Search by name, ISO, or DDI"></select>
  </div>
</div>`;

const JS_SNIPPET = String.raw`import { IntlPhone, getAllCountriesWithNames } from "@intl-phone-js/core";

const input = document.querySelector("#intl-phone-js");
const picker = document.querySelector("#country-picker");
const trigger = document.querySelector("#country-picker-trigger");
const panel = document.querySelector("#country-picker-panel");
const phone = new IntlPhone(input);
const countries = getAllCountriesWithNames();

const select = new TomSelect(picker, {
  valueField: "countryCode",
  labelField: "name",
  searchField: ["name", "countryCode", "dialCode"],
  options: countries,
  hideSelected: false,
});

trigger.addEventListener("click", () => {
  panel.hidden = false;
  select.clear(true);
  select.clearOptions();
  select.addOptions(countries);
  select.open();
  select.focus();
});

select.on("change", (countryCode) => {
  if (countryCode) phone.setCountry(countryCode);
});

phone.on("countryChange", (state) => {
  select.setValue(state.country || "", true);
  trigger.textContent = state.country || "\u{1F30D}";
});

const initialCountry = phone.getCountry();
if (initialCountry) {
  select.setValue(initialCountry, true);
}`;

function getFlagUrl(countryCode) {
  return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
}

function renderTrigger(container, countryCode) {
  if (!countryCode) {
    container.classList.add("is-empty");
    container.innerHTML = `
      <span class="country-picker-trigger-flag">${DEFAULT_GLOBE}</span>
      <span class="country-picker-trigger-caret"></span>
    `;
    return;
  }

  container.classList.remove("is-empty");
  container.innerHTML = `
    <span class="country-picker-trigger-flag">
      <img src="${getFlagUrl(countryCode)}" alt="${countryCode} flag" width="24" height="18" />
    </span>
    <span class="country-picker-trigger-caret"></span>
  `;
}

function renderMeta(container, country) {
  if (!country) {
    container.textContent = "No country selected.";
    return;
  }

  container.textContent = `${country.name} (${country.countryCode}) ${country.dialCode}`;
}

function renderOption(data, escape) {
  const flagUrl = getFlagUrl(data.countryCode);

  return `
    <div class="country-option">
      <img src="${flagUrl}" alt="${escape(data.countryCode)} flag" width="26" height="18" />
      <div>
        <div class="country-option-name">${escape(data.name)}</div>
        <div class="country-option-code">${escape(data.countryCode)}</div>
      </div>
      <div class="country-option-dial">${escape(data.dialCode)}</div>
    </div>
  `;
}

function renderItem(data, escape) {
  const flagUrl = getFlagUrl(data.countryCode);

  return `
    <div class="country-item">
      <img src="${flagUrl}" alt="${escape(data.countryCode)} flag" width="26" height="18" />
      <div class="country-item-name">${escape(data.name)}</div>
      <div class="country-item-dial">${escape(data.dialCode)}</div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#intl-phone-js");
  const picker = document.querySelector("#country-picker");
  const trigger = document.querySelector("#country-picker-trigger");
  const panel = document.querySelector("#country-picker-panel");
  const countryMeta = document.querySelector("#country-meta");
  const snippetList = document.querySelector("#snippet-list");

  if (!input || !picker || !trigger || !panel || !countryMeta || !snippetList) return;

  const phone = new IntlPhone(input);
  const countries = getAllCountriesWithNames().sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const countriesByCode = new Map(
    countries.map((country) => [country.countryCode, country]),
  );

  const select = new TomSelect(picker, {
    valueField: "countryCode",
    labelField: "name",
    searchField: ["name", "countryCode", "dialCode"],
    options: countries,
    controlInput: '<input type="search" autocomplete="off" size="1" />',
    maxItems: 1,
    closeAfterSelect: true,
    preload: true,
    allowEmptyOption: true,
    placeholder: "Search by name, ISO, or DDI",
    render: {
      option: renderOption,
      item: () => '<div class="country-picker-selected-hidden" aria-hidden="true"></div>',
      no_results: () => '<div class="no-results">No countries found.</div>',
    },
    score(search) {
      const original = this.getScoreFunction(search);
      const term = search.trim().toLowerCase();

      return (item) => {
        const score = original(item);
        if (!term) return score;

        if (item.countryCode.toLowerCase() === term) return score + 2;
        if (
          item.dialCode.toLowerCase() === term ||
          item.callingCode === term.replace("+", "")
        ) {
          return score + 2;
        }

        return score;
      };
    },
  });

  function syncCountry(countryCode) {
    const country = countryCode ? countriesByCode.get(countryCode) : null;
    renderTrigger(trigger, countryCode);
    renderMeta(countryMeta, country ?? null);
  }

  function openPicker() {
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    select.clear(true);
    select.clearOptions();
    select.addOptions(countries);
    select.open();
    window.setTimeout(() => {
      select.focus();
      select.control_input?.focus();
    }, 0);
  }

  function closePicker({ closeSelect = true } = {}) {
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    if (closeSelect) {
      select.close();
    }
  }

  select.on("change", (countryCode) => {
    if (!countryCode) {
      syncCountry(null);
      closePicker();
      return;
    }

    phone.setCountry(countryCode);
    syncCountry(countryCode);
    closePicker();
  });

  select.on("dropdown_close", () => {
    closePicker({ closeSelect: false });
  });

  select.on("type", () => {
    trigger.setAttribute("aria-expanded", "true");
  });

  phone.on("countryChange", (state) => {
    const nextCountry = state.country ?? "";

    if (!nextCountry) {
      select.clear(true);
      syncCountry(null);
      return;
    }

    if (select.getValue() !== nextCountry) {
      select.setValue(nextCountry, true);
    }

    syncCountry(nextCountry);
  });

  const initialCountry = phone.getCountry();
  if (initialCountry) {
    select.setValue(initialCountry, true);
  }
  syncCountry(initialCountry);

  trigger.addEventListener("click", () => {
    if (panel.hidden) {
      openPicker();
      return;
    }

    closePicker();
  });

  mountCodeSnippets({
    container: snippetList,
    snippets: [
      {
        title: "CDN Assets",
        language: "html",
        description: "Tom Select styles and script loaded directly from CDN.",
        code: CDN_SNIPPET,
      },
      {
        title: "HTML",
        language: "html",
        description: "Phone input with a fixed trigger button and searchable country select.",
        code: HTML_SNIPPET,
      },
      {
        title: "JavaScript",
        language: "js",
        description:
          "Tom Select + IntlPhone synchronized through country selection and countryChange.",
        code: JS_SNIPPET,
      },
    ],
  });
});
