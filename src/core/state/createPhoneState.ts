import { PhoneState } from "./phoneState";

export function createInitialPhoneState(): PhoneState {
  return {
    rawInput: "",
    formatted: "",
    value: "",
    country: null,
    callingCode: null,
    nationalNumber: null,
    e164: null,
    isValid: false,
    isPossible: true,
  };
}
