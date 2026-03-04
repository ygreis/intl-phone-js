import { describe, it, expect, vi } from "vitest";
import { ValidationReason } from "@/core/validation/ValidationReason";
import { createIntlPhone } from "./utils/createIntlPhone";
import { typeInto, blur } from "./utils/dom";

describe("IntlPhone — core behavior", () => {
  it("should initialize with empty state", () => {
    const { phone } = createIntlPhone();

    const state = phone.getState();

    expect(state.rawInput).toBe("");
    expect(state.formatted).toBe("");
    expect(state.country).toBeNull();
    expect(state.isValid).toBe(false);
  });

  it("should format and update state when typing a valid number", () => {
    const { phone, input } = createIntlPhone();

    typeInto(input, "5511999999999");

    const state = phone.getState();

    expect(state.country).toBe("BR");
    expect(state.isValid).toBe(true);
    expect(state.isPossible).toBe(true);
  });

  it("should ignore setCountry when country is not allowed", () => {
    const { phone } = createIntlPhone({
      allowedCountries: ["US"],
    });

    phone.setCountry("BR");

    expect(phone.getCountry()).not.toBe("BR");
  });

  it("should emit change event with PhoneState", () => {
    const { phone, input } = createIntlPhone();
    const mock = vi.fn();

    phone.on("change", mock);

    typeInto(input, "5511999999999");

    expect(mock).toHaveBeenCalledTimes(1);

    const state = mock.mock.calls[0][0];

    expect(state.country).toBe("BR");
    expect(state.isValid).toBe(true);
  });

  it("should emit events when resetting state", () => {
    const { phone, input } = createIntlPhone();

    const change = vi.fn();
    const country = vi.fn();
    const validity = vi.fn();

    phone.on("change", change);
    phone.on("countryChange", country);
    phone.on("validityChange", validity);

    typeInto(input, "5511999999999");
    typeInto(input, "");

    expect(change).toHaveBeenCalled();
    expect(country).toHaveBeenCalled();
    expect(validity).toHaveBeenCalled();
  });

  it("should emit countryChange", () => {
    const { phone, input } = createIntlPhone();
    const mock = vi.fn();

    phone.on("countryChange", mock);

    typeInto(input, "5511999999999");

    expect(mock).toHaveBeenCalled();
    expect(mock.mock.calls[0][0].country).toBe("BR");
  });

  it("should emit validityChange when becoming valid", () => {
    const { phone, input } = createIntlPhone();
    const mock = vi.fn();

    phone.on("validityChange", mock);

    typeInto(input, "55119");
    typeInto(input, "5511999999999");

    expect(mock).toHaveBeenCalled();

    const lastCall = mock.mock.calls[mock.mock.calls.length - 1][0];
    expect(lastCall.isValid).toBe(true);
  });

  it("should emit blur event with state", () => {
    const { phone, input } = createIntlPhone();
    const mock = vi.fn();

    phone.on("blur", mock);

    blur(input);

    expect(mock).toHaveBeenCalled();
    expect(mock.mock.calls[0][0]).toHaveProperty("formatted");
  });

  it("should reset state when input becomes empty", () => {
    const { phone, input } = createIntlPhone();

    typeInto(input, "5511999999999");
    typeInto(input, "");

    const state = phone.getState();

    expect(state.rawInput).toBe("");
    expect(state.country).toBeNull();
    expect(state.isValid).toBe(false);
  });

  it("should respect allowedCountries restriction", () => {
    const { phone, input } = createIntlPhone({
      allowedCountries: ["US"],
    });

    typeInto(input, "5511999999999");

    expect(phone.isValid()).toBe(false);
    expect(phone.getValidationReason()).toBe(ValidationReason.INVALID_COUNTRY);
  });

  it("should update allowedCountries dynamically via setOptions()", () => {
    const { phone, input } = createIntlPhone();

    phone.setOptions({ allowedCountries: ["US"] });

    typeInto(input, "5511999999999");

    expect(phone.isValid()).toBe(false);
  });

  it("should set value programmatically via setValue()", () => {
    const { phone } = createIntlPhone();

    phone.setValue("+5511999999999");

    expect(phone.getCountry()).toBe("BR");
    expect(phone.isValid()).toBe(true);
  });

  it("should clear via setValue empty", () => {
    const { phone } = createIntlPhone();

    phone.setValue("+5511999999999");
    phone.setValue("");

    expect(phone.getState().rawInput).toBe("");
  });

  it("should remove listeners on destroy()", () => {
    const { phone, input } = createIntlPhone();
    const mock = vi.fn();

    phone.on("change", mock);

    phone.destroy();

    typeInto(input, "5511999999999");

    expect(mock).not.toHaveBeenCalled();
  });
});

describe("public API methods", () => {
  it("should set country programmatically", () => {
    const { phone } = createIntlPhone();

    phone.setCountry("BR");

    expect(phone.getCountry()).toBe("BR");
  });

  it("should return EMPTY validation reason when blank", () => {
    const { phone } = createIntlPhone();

    expect(phone.getValidationReason()).toBe(ValidationReason.EMPTY);
  });

  it("should return formatted value via getValue()", () => {
    const { phone } = createIntlPhone();

    phone.setValue("+5511999999999");

    expect(phone.getValue()).toContain("+55");
  });

  it("should return raw input", () => {
    const { phone, input } = createIntlPhone();

    typeInto(input, "5511999999999");

    expect(phone.getRawInput()).toBe("+5511999999999");
  });

  it("should return calling code", () => {
    const { phone } = createIntlPhone();

    phone.setValue("+5511999999999");

    expect(phone.getCallingCode()).toBe("55");
  });

  it("should ignore setCountry if not allowed", () => {
    const { phone } = createIntlPhone({
      allowedCountries: ["US"],
    });

    phone.setCountry("BR");

    expect(phone.getCountry()).not.toBe("BR");
  });

  it("should return input element", () => {
    const { phone, input } = createIntlPhone();

    expect(phone.getInput()).toBe(input);
  });

  it("should return formatted value via getValue()", () => {
    const { phone } = createIntlPhone();

    phone.setValue("+5511999999999");

    expect(phone.getValue()).toContain("+55");
  });
});
