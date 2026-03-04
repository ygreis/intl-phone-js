import { describe, it, expect } from "vitest";
import {
  getCountryName,
  getAllCountriesWithNames,
} from "@/core/country/countryName";

describe("countryName helpers", () => {
  it("should resolve country name", () => {
    const name = getCountryName("BR");

    expect(name).toBe("Brazil");
  });

  it("should cache country names", () => {
    const first = getCountryName("US");
    const second = getCountryName("US");

    expect(first).toBe(second);
  });

  it("should return list with country names", () => {
    const countries = getAllCountriesWithNames();

    const br = countries.find((c) => c.countryCode === "BR");

    expect(br).toHaveProperty("name");
    expect(br?.name).toBe("Brazil");
  });
});
