import { processPhoneInput } from "@/core";
import { createInitialPhoneState } from "@/core";
import { PhoneState, EventEmitter } from "@/core";
import { CountryCode } from "libphonenumber-js";
import { getCountryCallingCode } from "libphonenumber-js/core";
import metadata from "libphonenumber-js/metadata.min.json";
import { ValidationReason } from "./core/validation/ValidationReason";

const digitRegex = /\D/g;

export interface IntlPhoneEvents {
  change: PhoneState;
  countryChange: PhoneState;
  validityChange: PhoneState;
  blur: PhoneState;
}

export interface IntlPhoneOptions {
  allowedCountries?: CountryCode[];
  value?: string;
}

export class IntlPhone {
  private input: HTMLInputElement;
  private state: PhoneState;
  private events = new EventEmitter<IntlPhoneEvents>();

  private options: IntlPhoneOptions = {};
  private allowedCountriesSet?: Set<CountryCode>;

  private inputHandler = () => {
    this.update(this.input.value);
  };

  private blurHandler = () => {
    this.events.emit("blur", this.state);
  };

  constructor(input: HTMLInputElement, options: IntlPhoneOptions = {}) {
    this.input = input;
    this.state = createInitialPhoneState();

    this.bindInput();
    this.bindBlur();

    this.setOptions(options, false);

    if (this.options.value) {
      this.setValue(this.options.value);
    } else {
      this.update(this.input.value);
    }
  }

  /* ========= CONFIG MANAGEMENT ========= */

  public setOptions(options: IntlPhoneOptions, reprocess = true): void {
    this.options = { ...this.options, ...options };

    if (this.options.allowedCountries?.length) {
      this.allowedCountriesSet = new Set(this.options.allowedCountries);
    } else {
      this.allowedCountriesSet = undefined;
    }

    if (reprocess) {
      this.update(this.input.value);
    }
  }

  public getOptions(): IntlPhoneOptions {
    return { ...this.options };
  }

  /* ========= INPUT BINDING ========= */

  private bindInput(): void {
    this.input.addEventListener("input", this.inputHandler);
  }

  private bindBlur(): void {
    this.input.addEventListener("blur", this.blurHandler);
  }

  /* ========= CORE UPDATE ========= */

  private update(rawValue: string): void {
    const trimmed = rawValue.trim();
    const digits = trimmed.replace(digitRegex, "");

    const prevState = this.state;

    if (!digits) {
      this.state = createInitialPhoneState();
      this.input.value = "";

      this.events.emit("change", this.state);

      if (prevState.country !== null) {
        this.events.emit("countryChange", this.state);
      }

      if (prevState.isValid !== false) {
        this.events.emit("validityChange", this.state);
      }

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

    const formattingCount = (value: string) => value.replace(/\d/g, "").length;

    const prevFormatting = formattingCount(prevState.formatted);
    const currFormatting = formattingCount(result.formatted);

    const prevDigitsCount = prevState.rawInput
      ? prevState.rawInput.replace(/\D/g, "").length
      : 0;

    const newDigitsCount = digits.length;
    const numberGrew = newDigitsCount > prevDigitsCount;

    if (numberGrew && prevState.formatted && currFormatting < prevFormatting) {
      this.input.value = prevState.formatted;
      return;
    }

    if (
      numberGrew &&
      prevState.country !== null &&
      prevState.isPossible === true &&
      result.isPossible === false
    ) {
      this.input.value = prevState.formatted;
      return;
    }

    this.state = result;
    this.input.value = result.formatted;

    this.events.emit("change", this.state);

    if (prevState.country !== result.country) {
      this.events.emit("countryChange", this.state);
    }

    if (prevState.isValid !== result.isValid) {
      this.events.emit("validityChange", this.state);
    }
  }

  /* ========= EVENTS ========= */

  public on<K extends keyof IntlPhoneEvents>(
    event: K,
    listener: (payload: IntlPhoneEvents[K]) => void,
  ): void {
    this.events.on(event, listener);
  }

  public off<K extends keyof IntlPhoneEvents>(
    event: K,
    listener: (payload: IntlPhoneEvents[K]) => void,
  ): void {
    this.events.off(event, listener);
  }

  /* ========= PUBLIC API ========= */

  public getInput(): HTMLInputElement {
    return this.input;
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

  public getState(): PhoneState {
    return this.state;
  }

  public getCountry(): CountryCode | null {
    return this.state.country;
  }

  public isValid(): boolean {
    return this.state.isValid;
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

  public setCountry(country: CountryCode): void {
    if (this.allowedCountriesSet && !this.allowedCountriesSet.has(country)) {
      return;
    }

    const callingCode = getCountryCallingCode(country, metadata);
    this.update(`+${callingCode}`);
  }

  public setValue(value: string): void {
    const digits = value.replace(digitRegex, "");

    if (!digits) {
      this.update("");
      return;
    }

    const normalized = `+${digits}`;
    this.update(normalized);
  }

  public destroy(): void {
    this.input.removeEventListener("input", this.inputHandler);
    this.input.removeEventListener("blur", this.blurHandler);
  }
}
