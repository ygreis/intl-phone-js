import { IntlPhone } from "https://esm.sh/@intl-phone-js/core@latest";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#intl-phone-js");
  const container = document.querySelector("#container-output");
  const allowedInput = document.querySelector("#allowed-input");
  const applyBtn = document.querySelector("#apply-config");

  if (!input || !container || !allowedInput || !applyBtn) return;

  const phone = new IntlPhone(input);

  /* ========= APPLY CONFIG ========= */

  applyBtn.addEventListener("click", () => {
    const raw = allowedInput.value.trim();

    const allowedCountries = raw
      ? raw
          .split(",")
          .map((c) => c.trim().toUpperCase())
          .filter(Boolean)
      : undefined;

    phone.setOptions({ allowedCountries });

    render();
  });

  /* ========= RENDER ========= */

  function render() {
    const state = phone.getState();
    const reason = phone.getValidationReason();

    container.innerHTML = `
      <h3>Debug</h3>

      <p><strong>Formatted:</strong> ${state.formatted || "—"}</p>
      <p><strong>Country:</strong> ${state.country ?? "null"}</p>
      <p><strong>Calling Code:</strong> ${state.callingCode ?? "null"}</p>
      <p><strong>National Number:</strong> ${state.nationalNumber ?? "null"}</p>
      <p><strong>E164:</strong> ${state.e164 ?? "null"}</p>
      <p><strong>isValid():</strong> ${phone.isValid()}</p>
      <p><strong>ValidationReason:</strong> ${reason}</p>

      <hr />

      <p><strong>Options:</strong></p>
      <pre>${JSON.stringify(phone.getOptions(), null, 2)}</pre>

      <p><strong>State:</strong></p>
      <pre>${JSON.stringify(state, null, 2)}</pre>
    `;
  }

  /* ========= EVENTS ========= */

  phone.on("change", render);

  phone.on("blur", () => {
    console.log("Blur reason:", phone.getValidationReason());
    console.log("country:", phone.getCountry());
  });

  /* ========= INITIAL ========= */

  render();
});
