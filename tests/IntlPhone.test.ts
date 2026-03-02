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

  it("should emit change event", () => {
    const { phone, input } = createIntlPhone();
    const mock = vi.fn();

    phone.on("change", mock);

    typeInto(input, "5511999999999");

    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should emit countryChange", () => {
    const { phone, input } = createIntlPhone();
    const mock = vi.fn();

    phone.on("countryChange", mock);

    typeInto(input, "5511999999999");

    expect(mock).toHaveBeenCalledWith("BR");
  });

  it("should emit validityChange when becoming valid", () => {
    const { phone, input } = createIntlPhone();
    const mock = vi.fn();

    phone.on("validityChange", mock);

    typeInto(input, "55119");
    typeInto(input, "5511999999999");

    expect(mock).toHaveBeenCalledWith(true);
  });

  it("should emit blur event", () => {
    const { phone, input } = createIntlPhone();
    const mock = vi.fn();

    phone.on("blur", mock);

    blur(input);

    expect(mock).toHaveBeenCalled();
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
});
