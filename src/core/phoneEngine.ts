// src/core/phoneEngine.ts
import { AsYouType, CountryCode, PhoneNumber } from "libphonenumber-js";

export interface PhoneEngineResult {
  rawDigits: string;
  formatted: string;
  country?: CountryCode;
  callingCode?: string;
  nationalNumber?: string;
  number?: PhoneNumber;
}

export function processPhoneInput(value: string) {
  const formatter = new AsYouType();
  const formatted = formatter.input(value);

  const template = formatter.getTemplate(); // ex: "+55 (__) _____-____"
  const country = formatter.getCountry();
  const number = formatter.getNumber();

  const maxDigits = template ? (template.match(/_/g) || []).length : null;

  return {
    formatted,
    country,
    number,
    maxDigits,
  };
}
