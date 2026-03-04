import { describe, it, expect } from "vitest";
import { getAllCountries } from "@/core";

describe("countryRegistry", () => {
  it("should return list of countries", () => {
    const countries = getAllCountries();

    expect(countries.length).toBeGreaterThan(200);
  });

  it("should include Brazil", () => {
    const countries = getAllCountries();

    const br = countries.find((c) => c.countryCode === "BR");

    expect(br).toBeDefined();
    expect(br?.callingCode).toBe("55");
    expect(br?.dialCode).toBe("+55");
  });

  it("should return same countries on subsequent calls", () => {
    const first = getAllCountries();
    const second = getAllCountries();

    expect(first).toStrictEqual(second);
  });
});
