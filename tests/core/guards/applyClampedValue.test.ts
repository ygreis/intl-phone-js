import { describe, it, expect } from "vitest";
import { applyClampedValue, IntlPhoneCore, ValidationReason } from "@/index";

const digitRegex = /\D/g;

function digitsCount(value: string): number {
  return value.replace(digitRegex, "").length;
}

describe("applyClampedValue", () => {
  it("should clear the core when value is empty", () => {
    const phone = new IntlPhoneCore();
    const stateRef = phone.getState();

    phone.setValue("+5511999999999");

    const result = applyClampedValue(phone, "   ");

    expect(result).toBe(stateRef);
    expect(result.rawInput).toBe("");
    expect(result.country).toBeNull();
  });

  it("should apply a full valid value normally", () => {
    const phone = new IntlPhoneCore();

    const result = applyClampedValue(phone, "+12025550123");

    expect(result.e164).toBe("+12025550123");
    expect(result.country).toBe("US");
    expect(result.isPossible).toBe(true);
  });

  it("should clamp overflow to the last acceptable value", () => {
    const phone = new IntlPhoneCore();
    phone.setValue("+5491123456789");

    const overflowRaw = "+549112345678912345";
    const result = applyClampedValue(phone, overflowRaw);

    expect(result.rawInput).not.toBe(overflowRaw);
    expect(result.isPossible).toBe(true);
    expect(digitsCount(result.rawInput)).toBeLessThan(digitsCount(overflowRaw));
  });

  it("should return the final state reference", () => {
    const phone = new IntlPhoneCore();

    const result = applyClampedValue(phone, "+5511999999999");

    expect(result).toBe(phone.getState());
  });

  it("should update the received core instance internally", () => {
    const phone = new IntlPhoneCore();

    const result = applyClampedValue(phone, "11999999999");

    expect(phone.getRawInput()).toBe(result.rawInput);
    expect(phone.getCountry()).toBe(result.country);
    expect(phone.getE164()).toBe(result.e164);
  });

  it("should respect allowedCountries rules", () => {
    const phone = new IntlPhoneCore({ allowedCountries: ["US"] });

    const result = applyClampedValue(phone, "+5511999999999");

    expect(result.isValid).toBe(false);
    expect(phone.getValidationReason()).toBe(ValidationReason.INVALID_COUNTRY);
  });

  it("should handle non-numeric characters safely", () => {
    const phone = new IntlPhoneCore();

    const result = applyClampedValue(phone, " +55 (11) 99999-9999 abc ");

    expect(result.country).toBe("BR");
    expect(result.e164).toBe("+5511999999999");
  });

  it("should clamp when growth causes semantic regression", () => {
    const phone = new IntlPhoneCore();

    // This value keeps partial semantic progress even while impossible.
    phone.setValue("+120255501230000000");
    const previous = { ...phone.getState() };

    // Appending one digit makes callingCode/e164 disappear in parser output.
    const regressiveRaw = "+1202555012300000000";
    const result = applyClampedValue(phone, regressiveRaw);

    expect(previous.isPossible).toBe(false);
    expect(previous.callingCode).toBe("1");
    expect(previous.e164).toBe("+120255501230000000");

    expect(result.rawInput).toBe(previous.rawInput);
    expect(result.callingCode).toBe(previous.callingCode);
    expect(result.e164).toBe(previous.e164);
  });

  it("should prevent infinite growth on invalid numbers after semantic clamp", () => {
    const phone = new IntlPhoneCore();
    phone.setValue("+120255501230000000");

    let candidate = "+1202555012300000000";
    const firstClamp = applyClampedValue(phone, candidate);
    const clampedRaw = firstClamp.rawInput;

    for (let i = 0; i < 5; i += 1) {
      candidate += "9";
      const next = applyClampedValue(phone, candidate);
      expect(next.rawInput).toBe(clampedRaw);
      expect(next.callingCode).toBe("1");
      expect(next.e164).toBe("+120255501230000000");
    }
  });
});
