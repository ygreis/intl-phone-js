import { IntlPhoneCore, getAllCountriesWithNames } from "../src";
import { CountryCode } from "libphonenumber-js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector<HTMLDivElement>("#container-output");
  const allowedInput =
    document.querySelector<HTMLInputElement>("#allowed-input");
  const applyBtn = document.querySelector<HTMLButtonElement>("#apply-config");
  const clearBtn = document.querySelector<HTMLButtonElement>("#clear-config");

  if (!container || !allowedInput || !applyBtn || !clearBtn) return;

  const phone = new IntlPhoneCore();

  console.log("allCountries", getAllCountriesWithNames());

  const parseAllowedCountries = (raw: string): CountryCode[] | undefined => {
    const parsed = raw
      .trim()
      .split(",")
      .map((country) => country.trim().toUpperCase())
      .filter(Boolean)
      .map((country) => country as CountryCode);

    return parsed.length ? parsed : undefined;
  };

  const render = (): void => {
    const state = phone.getState();

    container.innerHTML = `
      <h3>Debug</h3>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
        <button id="set-br-local">setValue(11999999999)</button>
        <button id="set-br-intl">setValue(+5511999999999)</button>
        <button id="set-us">setValue(+12025550123)</button>
        <button id="set-pt">setValue(+351912345678)</button>
        <button id="set-country-br">setCountry(BR)</button>
        <button id="set-country-us">setCountry(US)</button>
        <button id="reset-phone">reset()</button>
      </div>

      <p><strong>Formatted:</strong> ${state.formatted || "—"}</p>
      <p><strong>Raw Input:</strong> ${state.rawInput || "—"}</p>
      <p><strong>Value:</strong> ${state.value || "—"}</p>
      <p><strong>Country:</strong> ${state.country ?? "null"}</p>
      <p><strong>Calling Code:</strong> ${state.callingCode ?? "null"}</p>
      <p><strong>National Number:</strong> ${state.nationalNumber ?? "null"}</p>
      <p><strong>E164:</strong> ${state.e164 ?? "null"}</p>
      <p><strong>isValid():</strong> ${phone.isValid()}</p>
      <p><strong>isPossible():</strong> ${phone.isPossible()}</p>
      <p><strong>ValidationReason:</strong> ${phone.getValidationReason()}</p>

      <hr />

      <p><strong>Options:</strong></p>
      <pre>${JSON.stringify(phone.getOptions(), null, 2)}</pre>

      <p><strong>State:</strong></p>
      <pre>${JSON.stringify(state, null, 2)}</pre>
    `;

    document
      .querySelector<HTMLButtonElement>("#set-br-local")
      ?.addEventListener("click", () => {
        phone.setValue("11999999999");
        render();
      });

    document
      .querySelector<HTMLButtonElement>("#set-br-intl")
      ?.addEventListener("click", () => {
        phone.setValue("+5511999999999");
        render();
      });

    document
      .querySelector<HTMLButtonElement>("#set-us")
      ?.addEventListener("click", () => {
        phone.setValue("+12025550123");
        render();
      });

    document
      .querySelector<HTMLButtonElement>("#set-pt")
      ?.addEventListener("click", () => {
        phone.setValue("+351912345678");
        render();
      });

    document
      .querySelector<HTMLButtonElement>("#set-country-br")
      ?.addEventListener("click", () => {
        phone.setCountry("BR");
        render();
      });

    document
      .querySelector<HTMLButtonElement>("#set-country-us")
      ?.addEventListener("click", () => {
        phone.setCountry("US");
        render();
      });

    document
      .querySelector<HTMLButtonElement>("#reset-phone")
      ?.addEventListener("click", () => {
        phone.reset();
        render();
      });
  };

  applyBtn.addEventListener("click", () => {
    const allowedCountries = parseAllowedCountries(allowedInput.value);
    phone.setOptions({ allowedCountries });
    render();
  });

  clearBtn.addEventListener("click", () => {
    allowedInput.value = "";
    phone.setOptions({ allowedCountries: undefined });
    render();
  });

  render();
});
