import { CountryCode } from "libphonenumber-js";

export interface PhoneState {
  rawInput: string;
  formatted: string;
  country: CountryCode | null;
  callingCode: string | null;
  nationalNumber: string | null;
  e164: string | null;
  isValid: boolean;
  isPossible: boolean;
}
