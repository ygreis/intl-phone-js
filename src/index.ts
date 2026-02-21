import { IntlPhone } from "./ui/IntlPhone";
import { CountryDropdown } from "./ui/CountryDropdown";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector<HTMLInputElement>("#intl-phone-js");
  if (!input) {
    console.error("Input #intl-phone-js não encontrado");
    return;
  }

  const phone = new IntlPhone(input);
  new CountryDropdown(phone, {
    width: "600px",
    maxHeight: "240px",
  });
});
