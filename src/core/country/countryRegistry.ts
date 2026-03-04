import { getCountries, getCountryCallingCode } from "libphonenumber-js/core";
import metadata from "libphonenumber-js/metadata.min.json";
import { CountryCode } from "libphonenumber-js";

export interface PhoneCountry {
  countryCode: CountryCode;
  callingCode: string;
  dialCode: string;
}

export function getAllCountries(): PhoneCountry[] {
  return getCountries(metadata).map((countryCode) => {
    const callingCode = getCountryCallingCode(
      countryCode as CountryCode,
      metadata,
    );

    return {
      countryCode: countryCode as CountryCode,
      callingCode,
      dialCode: `+${callingCode}`,
    };
  });
}
