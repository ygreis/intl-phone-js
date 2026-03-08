import { IntlPhoneCore } from "../../IntlPhoneCore";
import type { PhoneState } from "../state/phoneState";

const digitRegex = /\D/g;

function formattingCount(value: string): number {
  return value.replace(/\d/g, "").length;
}

function digitsCount(value: string): number {
  return value.replace(digitRegex, "").length;
}

function shouldClamp(
  previousState: PhoneState,
  nextState: PhoneState,
  rawValue: string,
): boolean {
  const prevFormatted = previousState.formatted ?? "";
  const prevDigits = digitsCount(previousState.rawInput ?? "");
  const nextDigits = digitsCount(rawValue ?? "");
  const numberGrew = nextDigits > prevDigits;

  if (!numberGrew) {
    return false;
  }

  const prevFormatting = formattingCount(prevFormatted);
  const nextFormatting = formattingCount(nextState.formatted ?? "");

  const formattingGotWorse =
    prevFormatted.length > 0 && nextFormatting < prevFormatting;

  const becameImpossible =
    previousState.country !== null &&
    previousState.isPossible === true &&
    nextState.isPossible === false;

  const semanticRegression =
    previousState.isPossible === false &&
    ((previousState.callingCode !== null && nextState.callingCode === null) ||
      (previousState.e164 !== null && nextState.e164 === null));

  return formattingGotWorse || becameImpossible || semanticRegression;
}

export function applyClampedValue(
  phone: IntlPhoneCore,
  rawValue: string,
): PhoneState {
  const previousState = { ...phone.getState() };

  // Empty input should always clear the core state.
  if (!rawValue.trim()) {
    phone.setValue("");
    return phone.getState();
  }

  // First attempt: try the full value.
  phone.setValue(rawValue);
  const fullState = phone.getState();

  if (!shouldClamp(previousState, fullState, rawValue)) {
    return fullState;
  }

  // If overflow happened, progressively trim digits until the value becomes acceptable.
  const digits = rawValue.replace(digitRegex, "");

  for (let length = digits.length - 1; length >= 0; length -= 1) {
    const candidate = digits.slice(0, length);
    phone.setValue(candidate);

    const nextState = phone.getState();

    if (!shouldClamp(previousState, nextState, candidate)) {
      return nextState;
    }
  }

  phone.setValue("");
  return phone.getState();
}
