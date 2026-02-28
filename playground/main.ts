import { IntlPhone } from "../src";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector<HTMLInputElement>("#intl-phone-js");
  const container = document.querySelector<HTMLDivElement>("#container-output");

  if (!input || !container) return;

  const phone = new IntlPhone(input);

  const renderOutput = () => {
    const state = phone.getState();

    container.innerHTML = `
      <div style="
        margin-top:16px;
        padding:16px;
        border:1px solid #e0e0e0;
        border-radius:8px;
        font-family:monospace;
        background:#fafafa;
      ">
        <h3 style="margin-top:0;">📱 IntlPhone Debug</h3>

        <p><strong>Formatted:</strong> ${state.formatted || "—"}</p>
        <p><strong>Country:</strong> ${state.country ?? "null"}</p>
        <p><strong>Calling Code:</strong> ${state.callingCode ?? "null"}</p>
        <p><strong>National Number:</strong> ${state.nationalNumber ?? "null"}</p>
        <p><strong>E164:</strong> ${state.e164 ?? "null"}</p>
        <p><strong>isValid():</strong> ${phone.isValid()}</p>

        <hr />

        <pre style="
          background:#f0f0f0;
          padding:12px;
          border-radius:6px;
          overflow:auto;
        ">
${JSON.stringify(state, null, 2)}
        </pre>
      </div>
    `;
  };

  // 🔄 Render inicial ao carregar
  renderOutput();

  // 🔄 Atualiza automaticamente a cada mudança
  phone.on("change", () => {
    renderOutput();
  });
});
