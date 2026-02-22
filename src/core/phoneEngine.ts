// src/core/phoneEngine.ts
import { AsYouType } from "libphonenumber-js/core";
import { CountryCode, PhoneNumber } from "libphonenumber-js";
import metadata from "libphonenumber-js/metadata.full.json";
import getPossibleLengthsForCountry from "libphonenumber-js/core";

export function processPhoneInput(value: string) {
  const formatter = new AsYouType(undefined, metadata);

  const formatted = formatter.input(value);
  const country = formatter.getCountry();
  const number = formatter.getNumber();
  const template = formatter.getTemplate();

  const maxDigits = template ? (template.match(/_/g) ?? []).length : null;

  return {
    formatted,
    country,
    number,
    template,
    maxDigits,
  };
}

/*export function countFilledSlots(template: string, formatted: string): number {
  let filled = 0;

  for (let i = 0; i < template.length; i++) {
    if (template[i] === "_" && /\d/.test(formatted[i] ?? "")) {
      filled++;
    }
  }

  return filled;
}

export function getMaxNationalLength(country: CountryCode): number {
  const lengths = getPossibleLengthsForCountry(
    country,
    metadata,
  );

  return Math.max(...lengths);
}*/
