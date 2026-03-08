import { describe, it, expect } from "vitest";
import { IntlPhoneCore, ValidationReason } from "@/index";

describe("IntlPhoneCore", () => {
  it("should construct without DOM", () => {
    const phone = new IntlPhoneCore();

    expect(phone.getState()).toMatchObject({
      rawInput: "",
      formatted: "",
      value: "",
      country: null,
      callingCode: null,
      nationalNumber: null,
      e164: null,
      isValid: false,
      isPossible: true,
    });
  });

  it("should not require DOM APIs on the instance", () => {
    const phone = new IntlPhoneCore();

    expect((phone as unknown as Record<string, unknown>).getInput).toBeUndefined();
    expect((phone as unknown as Record<string, unknown>).on).toBeUndefined();
    expect((phone as unknown as Record<string, unknown>).off).toBeUndefined();
  });

  it("should apply initial value from constructor options", () => {
    const phone = new IntlPhoneCore({ value: "11999999999" });

    expect(phone.getRawInput()).toBe("+11999999999");
    expect(phone.getCallingCode()).toBe("1");
  });

  it("should update state when setValue is called", () => {
    const phone = new IntlPhoneCore();

    phone.setValue("5511999999999");

    expect(phone.getCountry()).toBe("BR");
    expect(phone.isValid()).toBe(true);
    expect(phone.isPossible()).toBe(true);
    expect(phone.getE164()).toBe("+5511999999999");
  });

  it("should keep the same state reference after updates", () => {
    const phone = new IntlPhoneCore();
    const stateRef = phone.getState();

    phone.setValue("5511999999999");
    phone.setCountry("US");

    expect(phone.getState()).toBe(stateRef);
  });

  it("should reset values while keeping the same state reference", () => {
    const phone = new IntlPhoneCore();
    const stateRef = phone.getState();

    phone.setValue("5511999999999");
    phone.reset();

    expect(phone.getState()).toBe(stateRef);
    expect(phone.getState()).toMatchObject({
      rawInput: "",
      formatted: "",
      value: "",
      country: null,
      callingCode: null,
      nationalNumber: null,
      e164: null,
      isValid: false,
      isPossible: true,
    });
  });

  it("should enforce allowedCountries validation", () => {
    const phone = new IntlPhoneCore({ allowedCountries: ["US"] });

    phone.setValue("5511999999999");

    expect(phone.isValid()).toBe(false);
    expect(phone.getValidationReason()).toBe(ValidationReason.INVALID_COUNTRY);
  });

  it("should update allowedCountries via setOptions", () => {
    const phone = new IntlPhoneCore();

    phone.setOptions({ allowedCountries: ["US"] });
    phone.setValue("5511999999999");

    expect(phone.isValid()).toBe(false);
    expect(phone.getValidationReason()).toBe(ValidationReason.INVALID_COUNTRY);
  });

  it("should set country and calling code", () => {
    const phone = new IntlPhoneCore();

    phone.setCountry("BR");

    expect(phone.getCountry()).toBe("BR");
    expect(phone.getCallingCode()).toBe("55");
  });

  it("should return EMPTY validation reason when no value", () => {
    const phone = new IntlPhoneCore();

    expect(phone.getValidationReason()).toBe(ValidationReason.EMPTY);
  });

  it("should expose options copy", () => {
    const phone = new IntlPhoneCore({ allowedCountries: ["US"] });
    const options = phone.getOptions();

    expect(options).toEqual({ allowedCountries: ["US"], value: undefined });

    options.allowedCountries?.push("BR");

    expect(phone.getOptions().allowedCountries).toEqual(["US"]);
  });

  it("should not export EventEmitter from public entry", async () => {
    const api = await import("@/index");

    expect(api).not.toHaveProperty("EventEmitter");
  });
});
