import { describe, it, expect } from "vitest";
import { processPhoneInput } from "@/core";

describe("phoneEngine — processPhoneInput", () => {
  describe("Brazil numbers", () => {
    it("should parse a valid Brazilian mobile number", () => {
      const result = processPhoneInput("+5511999999999");

      expect(result.country).toBe("BR");
      expect(result.isValid).toBe(true);
      expect(result.isPossible).toBe(true);
      expect(result.e164).toBe("+5511999999999");
    });

    it("should return consistent state structure", () => {
      const result = processPhoneInput("+5511999999999");

      expect(result).toMatchObject({
        rawInput: expect.any(String),
        formatted: expect.any(String),
        country: expect.any(String),
        callingCode: expect.any(String),
        nationalNumber: expect.any(String),
        e164: expect.any(String),
        isValid: expect.any(Boolean),
        isPossible: expect.any(Boolean),
      });
    });
  });

  describe("Argentina numbers", () => {
    it("should parse a valid Argentinian mobile number", () => {
      const result = processPhoneInput("+5491123456789");

      expect(result.country).toBe("AR");
      expect(result.isValid).toBe(true);
      expect(result.isPossible).toBe(true);
    });

    it("should mark overflow Argentina number as impossible", () => {
      const result = processPhoneInput("+549112345678912345");

      expect(result.isPossible).toBe(false);
      expect(result.isValid).toBe(false);
    });
  });

  describe("Invalid or absurd numbers", () => {
    it("should return impossible for absurd long number", () => {
      const result = processPhoneInput("+999999999999999999");

      expect(result.isPossible).toBe(false);
      expect(result.isValid).toBe(false);
    });

    it("should return safe defaults when parsed is null", () => {
      const result = processPhoneInput("+");

      expect(result.country).toBeNull();
      expect(result.e164).toBeNull();
      expect(result.nationalNumber).toBeNull();
      expect(result.callingCode).toBeNull();
      expect(result.isPossible).toBe(false);
      expect(result.isValid).toBe(false);
    });
  });
});
