import { describe, it, expect, vi } from "vitest";
import { IntlPhone } from "@/index";

describe("IntlPhone", () => {
  it("should initialize with empty state", () => {
    const input = document.createElement("input");
    const phone = new IntlPhone(input);

    const state = phone.getState();

    expect(state.rawInput).toBe("");
    expect(state.formatted).toBe("");
    expect(state.country).toBeNull();
    expect(state.isValid).toBe(false);
  });

  it("should format and update state when typing a valid number", () => {
    const input = document.createElement("input");
    const phone = new IntlPhone(input);

    input.value = "5511999999999";
    input.dispatchEvent(new Event("input"));

    const state = phone.getState();

    expect(state.country).toBe("BR");
    expect(state.isValid).toBe(true);
    expect(state.isPossible).toBe(true);
  });

  it("should emit change event when number updates", () => {
    const input = document.createElement("input");
    const phone = new IntlPhone(input);

    const mock = vi.fn();
    phone.on("change", mock);

    input.value = "5511999999999";
    input.dispatchEvent(new Event("input"));

    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should emit countryChange when country changes", () => {
    const input = document.createElement("input");
    const phone = new IntlPhone(input);

    const mock = vi.fn();
    phone.on("countryChange", mock);

    input.value = "5511999999999";
    input.dispatchEvent(new Event("input"));

    expect(mock).toHaveBeenCalledWith("BR");
  });

  it("should block overflow growth", () => {
    const input = document.createElement("input");
    const phone = new IntlPhone(input);

    input.value = "5511999999999";
    input.dispatchEvent(new Event("input"));

    const previousValue = input.value;

    input.value = "551199999999999999999999";
    input.dispatchEvent(new Event("input"));

    expect(input.value).toBe(previousValue);
  });

  it("should allow backspace (number shrink)", () => {
    const input = document.createElement("input");
    const phone = new IntlPhone(input);

    input.value = "5511999999999";
    input.dispatchEvent(new Event("input"));

    const previous = phone.getState();

    input.value = "551199999999"; // remove 1 digit
    input.dispatchEvent(new Event("input"));

    const updated = phone.getState();

    expect(updated.rawInput.length).toBeLessThan(previous.rawInput.length);
  });

  it("should emit validityChange when number becomes valid", () => {
    const input = document.createElement("input");
    const phone = new IntlPhone(input);

    const mock = vi.fn();
    phone.on("validityChange", mock);

    input.value = "55119"; // inválido
    input.dispatchEvent(new Event("input"));

    input.value = "5511999999999"; // válido
    input.dispatchEvent(new Event("input"));

    expect(mock).toHaveBeenCalledWith(true);
  });

  it("should reset state when input becomes empty", () => {
    const input = document.createElement("input");
    const phone = new IntlPhone(input);

    input.value = "5511999999999";
    input.dispatchEvent(new Event("input"));

    input.value = "";
    input.dispatchEvent(new Event("input"));

    const state = phone.getState();

    expect(state.rawInput).toBe("");
    expect(state.country).toBeNull();
    expect(state.isValid).toBe(false);
  });

  it("should reset state when input becomes empty", () => {
    const input = document.createElement("input");
    const phone = new IntlPhone(input);

    input.value = "5511999999999";
    input.dispatchEvent(new Event("input"));

    input.value = "";
    input.dispatchEvent(new Event("input"));

    const state = phone.getState();

    expect(state.rawInput).toBe("");
    expect(state.country).toBeNull();
  });

  it("should emit validityChange when number becomes valid", () => {
    const input = document.createElement("input");
    const phone = new IntlPhone(input);

    const mock = vi.fn();
    phone.on("validityChange", mock);

    input.value = "55119";
    input.dispatchEvent(new Event("input"));

    input.value = "5511999999999";
    input.dispatchEvent(new Event("input"));

    expect(mock).toHaveBeenCalledWith(true);
  });
});

describe("public API methods", () => {
  it("should set country programmatically", () => {
    const input = document.createElement("input");
    const phone = new IntlPhone(input);

    phone.setCountry("BR");

    expect(phone.getCountry()).toBe("BR");
  });
});
