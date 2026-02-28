import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js/core";
import metadata from "libphonenumber-js/metadata.min.json";
import { PhoneState } from "../state/phoneState";

export function processPhoneInput(rawValue: string): PhoneState {
  const formatter = new AsYouType(undefined, metadata);

  const formatted = formatter.input(rawValue);
  const country = formatter.getCountry() ?? null;

  const parsed = parsePhoneNumberFromString(rawValue, metadata);

  let e164: string | null = null;
  let nationalNumber: string | null = null;
  let callingCode: string | null = null;
  let isValid = false;
  let isPossible = false;

  if (parsed) {
    e164 = parsed.number ?? null;
    nationalNumber = parsed.nationalNumber ?? null;
    callingCode = parsed.countryCallingCode ?? null;
    isValid = parsed.isValid();
    isPossible = parsed.isPossible();
  }

  return {
    rawInput: rawValue,
    formatted,
    country,
    callingCode,
    nationalNumber,
    e164,
    isValid,
    isPossible,
  };
}
