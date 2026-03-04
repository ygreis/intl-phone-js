import { CountryCode } from "libphonenumber-js";
import { getAllCountries } from "./countryRegistry";

let regionNames: Intl.DisplayNames | null = null;

const countryNameCache = new Map<CountryCode, string>();

function getRegionNames(): Intl.DisplayNames | null {
  if (regionNames) return regionNames;

  if (typeof Intl !== "undefined" && "DisplayNames" in Intl) {
    regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  }

  return regionNames;
}

export function getCountryName(countryCode: CountryCode): string {
  const cached = countryNameCache.get(countryCode);
  if (cached) return cached;

  const displayNames = getRegionNames();
  const name = displayNames?.of(countryCode) ?? countryCode;

  countryNameCache.set(countryCode, name);

  return name;
}

export function getAllCountriesWithNames() {
  return getAllCountries().map((country) => ({
    ...country,
    name: getCountryName(country.countryCode),
  }));
}
