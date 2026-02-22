// src/ui/IntlPhone.ts
import { normalizeDigits } from "../core/normalize";
import { AsYouType, CountryCode } from "libphonenumber-js";
import { processPhoneInput } from "../core/phoneEngine";

export class IntlPhone {
  private input: HTMLInputElement;

  private wrapper!: HTMLDivElement;
  private flagButton!: HTMLButtonElement;

  private lastFormattedValue = "";

  constructor(input: HTMLInputElement) {
    this.input = input;
    this.setupBaseUI();
    this.bindInputEvents();
    this.input.intlPhoneInstance = this;
  }

  private setupBaseUI() {
    this.wrapper = document.createElement("div");
    this.wrapper.style.position = "relative";
    this.wrapper.style.display = "flex";
    this.wrapper.style.alignItems = "center";

    this.input.parentNode?.insertBefore(this.wrapper, this.input);
    this.wrapper.appendChild(this.input);

    this.input.style.paddingLeft = "42px";

    this.flagButton = document.createElement("button");
    this.flagButton.type = "button";
    this.flagButton.style.position = "absolute";
    this.flagButton.style.left = "6px";
    this.flagButton.style.border = "none";
    this.flagButton.style.background = "transparent";
    this.flagButton.style.cursor = "pointer";

    this.wrapper.appendChild(this.flagButton);
  }

  private bindInputEvents() {
    this.input.addEventListener("input", () => {
      const target = this.input;
      const rawValue = target.value;

      console.log("rawValue:", rawValue);

      const digits = normalizeDigits(rawValue);
      console.log("digits:", digits);

      // reset total
      if (!digits) {
        console.log("RESET");
        this.reset();
        this.lastFormattedValue = "";
        return;
      }

      /**
       * Processa normalmente
       */
      const result = processPhoneInput(`+${digits}`);

      console.log("formatted:", result.formatted);
      console.log("lastFormatted:", this.lastFormattedValue);

      /**
       * Conta caracteres de formatação
       */
      const formattingCount = (value: string) =>
        value.replace(/\d/g, "").length;

      const prevFormatting = formattingCount(this.lastFormattedValue);
      const currFormatting = formattingCount(result.formatted);

      console.log("formatting chars:", currFormatting, "prev:", prevFormatting);

      /**
       * 🚨 BLOQUEIO REAL
       * Se perdeu formatação, estourou a máscara
       */
      if (this.lastFormattedValue && currFormatting < prevFormatting) {
        console.log("OVERFLOW → remove último dígito");

        const trimmedDigits = digits.slice(0, -1);
        const retry = processPhoneInput(`+${trimmedDigits}`);

        target.value = retry.formatted;
        this.lastFormattedValue = retry.formatted;
        return;
      }

      /**
       * Aplica valor normalmente
       */
      target.value = result.formatted;
      this.lastFormattedValue = result.formatted;

      if (result.country) {
        console.log("country:", result.country);
        this.updateFlag(result.country.toLowerCase());
      }
    });
  }

  private countNationalDigits(formatted: string, callingCode?: string): number {
    if (!callingCode) return 0;

    const withoutPlus = formatted.replace(/^\+/, "");

    if (!withoutPlus.startsWith(callingCode)) return 0;

    const nationalPart = withoutPlus.slice(callingCode.length);

    return nationalPart.replace(/\D/g, "").length;
  }

  public setCountryManually(country: CountryCode) {
    this.input.value = "";
    this.input.focus();
  }

  private updateFlag(iso: string) {
    this.flagButton.innerHTML = `
      <span class="fi fi-${iso}" style="font-size: 1.4em;"></span>
    `;
  }

  public reset() {
    this.input.value = "";
    this.flagButton.innerHTML = "";
  }

  public getWrapper() {
    return this.wrapper;
  }

  public getFlagButton() {
    return this.flagButton;
  }
}
