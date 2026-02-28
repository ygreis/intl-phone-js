import metadata from "libphonenumber-js/metadata.min.json";
import {
  getCountries,
  getCountryCallingCode,
  CountryCode,
} from "libphonenumber-js/core";

export interface CountryData {
  iso: CountryCode;
  callingCode: string;
}

export function getAllCountries(): CountryData[] {
  return getCountries(metadata).map((iso) => ({
    iso,
    callingCode: getCountryCallingCode(iso, metadata),
  }));
}
