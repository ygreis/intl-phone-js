import { IntlPhone } from "https://esm.sh/@intl-phone-js/core@latest";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#intl-phone-js");
  const container = document.querySelector("#container-output");
  const allowedInput = document.querySelector("#allowed-input");
  const applyBtn = document.querySelector("#apply-config");

  if (!input || !container || !allowedInput || !applyBtn) return;

  const phone = new IntlPhone(input);

  applyBtn.addEventListener("click", () => {
    const raw = allowedInput.value.trim();

    const allowedCountries = raw
      ? raw
          .split(",")
          .map((country) => country.trim().toUpperCase())
          .filter(Boolean)
      : undefined;

    phone.setOptions({ allowedCountries });
    render();
  });

  function render() {
    const state = phone.getState();
    const reason = phone.getValidationReason();

    container.innerHTML = `
      <h3>State Snapshot</h3>
      <p><strong>Formatted:</strong> ${state.formatted || "-"}</p>
      <p><strong>Country:</strong> ${state.country ?? "null"}</p>
      <p><strong>Calling Code:</strong> ${state.callingCode ?? "null"}</p>
      <p><strong>National Number:</strong> ${state.nationalNumber ?? "null"}</p>
      <p><strong>E164:</strong> ${state.e164 ?? "null"}</p>
      <p><strong>isValid():</strong> ${phone.isValid()}</p>
      <p><strong>ValidationReason:</strong> ${reason}</p>

      <h3>Options</h3>
      <pre>${JSON.stringify(phone.getOptions(), null, 2)}</pre>

      <h3>Raw State JSON</h3>
      <pre>${JSON.stringify(state, null, 2)}</pre>
    `;
  }

  phone.on("change", () => {
    render();
  });

  phone.on("countryChange", (state) => {
    console.log("countryChange:", state.country);
  });

  phone.on("validityChange", (state) => {
    console.log("validityChange:", state.isValid);
  });

  phone.on("blur", () => {
    console.log("blur reason:", phone.getValidationReason());
  });

  render();
});
