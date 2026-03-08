import { processPhoneInput } from "./core/engine/phoneEngine";
import { createInitialPhoneState } from "./core/state/createPhoneState";
import type { PhoneState } from "./core/state/phoneState";
import { CountryCode } from "libphonenumber-js";
import { getCountryCallingCode } from "libphonenumber-js/core";
import metadata from "libphonenumber-js/metadata.min.json";
import { ValidationReason } from "./core/validation/ValidationReason";

const digitRegex = /\D/g;

export interface IntlPhoneOptions {
  allowedCountries?: CountryCode[];
  value?: string;
}

export class IntlPhoneCore {
  private readonly state: PhoneState;
  private options: IntlPhoneOptions = {};
  private allowedCountriesSet?: Set<CountryCode>;

  constructor(options: IntlPhoneOptions = {}) {
    this.state = createInitialPhoneState();

    this.setOptions(options, false);

    if (this.options.value) {
      this.setValue(this.options.value);
    }
  }

  private update(rawValue: string): void {
    const trimmed = rawValue.trim();
    const digits = trimmed.replace(digitRegex, "");

    if (!digits) {
      Object.assign(this.state, createInitialPhoneState());
      return;
    }

    const normalized = `+${digits}`;
    const result = processPhoneInput(normalized);

    if (
      this.allowedCountriesSet &&
      result.country &&
      !this.allowedCountriesSet.has(result.country)
    ) {
      result.isValid = false;
    }

    Object.assign(this.state, result);
  }

  public setValue(value: string): void {
    this.update(value);
  }

  public setCountry(country: CountryCode): void {
    if (this.allowedCountriesSet && !this.allowedCountriesSet.has(country)) {
      return;
    }

    const callingCode = getCountryCallingCode(country, metadata);
    this.update(`+${callingCode}`);

    if (!this.state.callingCode) {
      Object.assign(this.state, {
        country,
        callingCode,
      });
    }
  }

  public setOptions(options: IntlPhoneOptions, reprocess = true): void {
    this.options = { ...this.options, ...options };

    if (this.options.allowedCountries?.length) {
      this.allowedCountriesSet = new Set(this.options.allowedCountries);
    } else {
      this.allowedCountriesSet = undefined;
    }

    if (reprocess) {
      this.update(this.state.rawInput);
    }
  }

  public reset(): void {
    Object.assign(this.state, createInitialPhoneState());
  }

  public getOptions(): IntlPhoneOptions {
    return {
      ...this.options,
      allowedCountries: this.options.allowedCountries
        ? [...this.options.allowedCountries]
        : undefined,
    };
  }

  public getState(): PhoneState {
    return this.state;
  }

  public getValue(): string {
    return this.state.value;
  }

  public getRawInput(): string {
    return this.state.rawInput;
  }

  public getCallingCode(): string | null {
    return this.state.callingCode;
  }

  public getCountry(): CountryCode | null {
    return this.state.country;
  }

  public isValid(): boolean {
    return this.state.isValid;
  }

  public isPossible(): boolean {
    return this.state.isPossible;
  }

  public getE164(): string | null {
    return this.state.e164;
  }

  public getValidationReason(): ValidationReason {
    if (!this.state.rawInput) {
      return ValidationReason.EMPTY;
    }

    if (this.allowedCountriesSet && this.state.country) {
      if (!this.allowedCountriesSet.has(this.state.country)) {
        return ValidationReason.INVALID_COUNTRY;
      }
    }

    if (!this.state.isPossible) {
      return ValidationReason.NOT_POSSIBLE;
    }

    if (!this.state.isValid) {
      const nationalLength = this.state.nationalNumber?.length ?? 0;

      if (nationalLength < 4) {
        return ValidationReason.TOO_SHORT;
      }

      if (nationalLength > 15) {
        return ValidationReason.TOO_LONG;
      }

      return ValidationReason.NOT_POSSIBLE;
    }

    return ValidationReason.VALID;
  }
}
