import { CountryCode } from "libphonenumber-js";

export interface PhoneCountry {
  countryCode: CountryCode;
  name: string;
  callingCode: string;
  dialCode: string;
}
