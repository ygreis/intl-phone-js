import {
  applyClampedValue,
  getAllCountriesWithNames,
  IntlPhoneCore,
} from "../src";
import { CountryCode } from "libphonenumber-js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector<HTMLDivElement>("#container-output");
  const rawInput = document.querySelector<HTMLInputElement>("#raw-input");
  const applyRawBtn =
    document.querySelector<HTMLButtonElement>("#apply-raw-value");
  const allowedInput =
    document.querySelector<HTMLInputElement>("#allowed-input");
  const applyConfigBtn =
    document.querySelector<HTMLButtonElement>("#apply-config");
  const clearConfigBtn =
    document.querySelector<HTMLButtonElement>("#clear-config");

  if (
    !container ||
    !rawInput ||
    !applyRawBtn ||
    !allowedInput ||
    !applyConfigBtn ||
    !clearConfigBtn
  ) {
    return;
  }

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

  const render = (state = phone.getState()): void => {
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

      <p><strong>Formatted:</strong> ${state.formatted || "-"}</p>
      <p><strong>Raw Input:</strong> ${state.rawInput || "-"}</p>
      <p><strong>Value:</strong> ${state.value || "-"}</p>
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

    const applyAndRender = (value: string) => {
      const nextState = applyClampedValue(phone, value);
      rawInput.value = value;
      render(nextState);
    };

    document
      .querySelector<HTMLButtonElement>("#set-br-local")
      ?.addEventListener("click", () => applyAndRender("11999999999"));

    document
      .querySelector<HTMLButtonElement>("#set-br-intl")
      ?.addEventListener("click", () => applyAndRender("+5511999999999"));

    document
      .querySelector<HTMLButtonElement>("#set-us")
      ?.addEventListener("click", () => applyAndRender("+12025550123"));

    document
      .querySelector<HTMLButtonElement>("#set-pt")
      ?.addEventListener("click", () => applyAndRender("+351912345678"));

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
        rawInput.value = "";
        render();
      });
  };

  applyRawBtn.addEventListener("click", () => {
    const nextState = applyClampedValue(phone, rawInput.value);
    render(nextState);
  });

  applyConfigBtn.addEventListener("click", () => {
    const allowedCountries = parseAllowedCountries(allowedInput.value);
    phone.setOptions({ allowedCountries });
    render();
  });

  clearConfigBtn.addEventListener("click", () => {
    allowedInput.value = "";
    phone.setOptions({ allowedCountries: undefined });
    render();
  });

  render();
});
