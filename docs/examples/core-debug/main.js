import { IntlPhoneCore } from "https://esm.sh/@intl-phone-js/core@latest";

const phone = new IntlPhoneCore();

const allowedInput = document.querySelector("#allowed-input");
const applyConfigButton = document.querySelector("#apply-config");
const clearConfigButton = document.querySelector("#clear-config");
const actionsContainer = document.querySelector("#actions");
const outputContainer = document.querySelector("#container-output");

if (
  !allowedInput ||
  !applyConfigButton ||
  !clearConfigButton ||
  !actionsContainer ||
  !outputContainer
) {
  throw new Error("Core debug page is missing required elements.");
}

function parseAllowedCountries(rawValue) {
  const normalized = rawValue
    .split(",")
    .map((country) => country.trim().toUpperCase())
    .filter((country) => /^[A-Z]{2}$/.test(country));

  return normalized.length ? normalized : undefined;
}

function render() {
  const state = phone.getState();
  const options = phone.getOptions();
  const validationReason = phone.getValidationReason();

  outputContainer.innerHTML = `
    <h3>State Snapshot</h3>
    <p><strong>Formatted:</strong> ${state.formatted || "-"}</p>
    <p><strong>Raw Input:</strong> ${state.rawInput || "-"}</p>
    <p><strong>Value:</strong> ${state.value || "-"}</p>
    <p><strong>Country:</strong> ${state.country ?? "null"}</p>
    <p><strong>Calling Code:</strong> ${state.callingCode ?? "null"}</p>
    <p><strong>National Number:</strong> ${state.nationalNumber ?? "null"}</p>
    <p><strong>E164:</strong> ${state.e164 ?? "null"}</p>
    <p><strong>isValid():</strong> ${phone.isValid()}</p>
    <p><strong>isPossible():</strong> ${phone.isPossible()}</p>
    <p><strong>ValidationReason:</strong> ${validationReason}</p>

    <h3>Options</h3>
    <pre>${JSON.stringify(options, null, 2)}</pre>

    <h3>State (JSON)</h3>
    <pre>${JSON.stringify(state, null, 2)}</pre>
  `;
}

function runAction(action) {
  action.run();
  render();
}

const actions = [
  { label: 'setValue("11999999999")', run: () => phone.setValue("11999999999") },
  { label: 'setValue("+5511999999999")', run: () => phone.setValue("+5511999999999") },
  { label: 'setValue("+12025550123")', run: () => phone.setValue("+12025550123") },
  { label: 'setValue("+351912345678")', run: () => phone.setValue("+351912345678") },
  { label: 'setCountry("BR")', run: () => phone.setCountry("BR") },
  { label: 'setCountry("US")', run: () => phone.setCountry("US") },
  { label: "reset()", run: () => phone.reset() },
];

for (const action of actions) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = action.label;
  button.addEventListener("click", () => runAction(action));
  actionsContainer.appendChild(button);
}

applyConfigButton.addEventListener("click", () => {
  const allowedCountries = parseAllowedCountries(allowedInput.value);
  phone.setOptions({ allowedCountries });
  render();
});

clearConfigButton.addEventListener("click", () => {
  allowedInput.value = "";
  phone.setOptions({ allowedCountries: undefined });
  render();
});

render();
