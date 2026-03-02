import { processPhoneInput } from "@/core";
import { createInitialPhoneState } from "@/core";
import { PhoneState } from "@/core";
import { EventEmitter } from "@/core";
import { CountryCode } from "libphonenumber-js";
import { getCountryCallingCode } from "libphonenumber-js/core";
import metadata from "libphonenumber-js/metadata.min.json";

interface IntlPhoneEvents {
  change: PhoneState;
  countryChange: CountryCode | null;
  validityChange: boolean;
}

interface IntlPhoneOptions {
  allowedCountries?: CountryCode[];
}

export class IntlPhone {
  private input: HTMLInputElement;
  private state: PhoneState;
  private events = new EventEmitter<IntlPhoneEvents>();
  private allowedCountriesSet?: Set<CountryCode>;

  constructor(input: HTMLInputElement, options?: IntlPhoneOptions) {
    this.input = input;
    this.state = createInitialPhoneState();

    if (options?.allowedCountries?.length) {
      this.allowedCountriesSet = new Set(options.allowedCountries);
    }

    this.bindInput();
  }

  private bindInput() {
    this.input.addEventListener("input", () => {
      this.update(this.input.value);
    });
  }

  private update(rawValue: string) {
    const digits = rawValue.replace(/\D/g, "");

    if (!digits) {
      this.state = createInitialPhoneState();
      this.input.value = "";
      return;
    }

    const normalized = `+${digits}`;
    const result = processPhoneInput(normalized);
    const prevState = this.state;

    const formattingCount = (value: string) => value.replace(/\d/g, "").length;

    const prevFormatting = formattingCount(prevState.formatted);
    const currFormatting = formattingCount(result.formatted);

    const prevDigitsCount = prevState.rawInput
      ? prevState.rawInput.replace(/\D/g, "").length
      : 0;

    const newDigitsCount = digits.length;

    const numberGrew = newDigitsCount > prevDigitsCount;

    if (
      this.allowedCountriesSet &&
      result.country &&
      !this.allowedCountriesSet.has(result.country)
    ) {
      result.isValid = false;
    }

    // 🔒 1️⃣ Bloqueio por perda de formatação
    if (numberGrew && prevState.formatted && currFormatting < prevFormatting) {
      this.input.value = prevState.formatted;
      return;
    }

    // 🔒 2️⃣ Bloqueio apenas se:
    // - número cresceu
    // - país já estava detectado antes
    // - antes era possível
    // - agora ficou impossível
    if (
      numberGrew &&
      prevState.country !== null &&
      prevState.isPossible === true &&
      result.isPossible === false
    ) {
      this.input.value = prevState.formatted;
      return;
    }

    // ✅ Atualiza normalmente
    this.state = result;
    this.input.value = result.formatted;

    this.events.emit("change", this.state);

    if (prevState.country !== result.country) {
      this.events.emit("countryChange", result.country);
    }

    if (prevState.isValid !== result.isValid) {
      this.events.emit("validityChange", result.isValid);
    }
  }

  /* ========= PUBLIC API ========= */

  public on = this.events.on.bind(this.events);
  public off = this.events.off.bind(this.events);

  public getState(): PhoneState {
    return this.state;
  }

  public getCountry() {
    return this.state.country;
  }

  public isValid() {
    return this.state.isValid;
  }

  public getE164() {
    return this.state.e164;
  }

  public setCountry(country: CountryCode) {
    const callingCode = getCountryCallingCode(country, metadata);
    this.update(`+${callingCode}`);
  }

  public destroy() {
    this.input.removeEventListener("input", () => {});
  }
}
