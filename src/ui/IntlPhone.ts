// src/ui/IntlPhone.ts
import { normalizeDigits } from "../core/normalize";
import {
  countDigitsBeforeCursor,
  findCursorPositionByDigitIndex,
} from "../core/cursor";
import { processPhoneInput } from "../core/phoneEngine";
import { AsYouType, CountryCode } from "libphonenumber-js";
import getPossibleLengthsForCountry from "libphonenumber-js/core";
import metadata from "libphonenumber-js/metadata.full.json";

export class IntlPhone {
  private input: HTMLInputElement;

  private wrapper!: HTMLDivElement;
  private flagButton!: HTMLButtonElement;

  private isCountryLocked = false;
  private lockedCountry?: CountryCode;
  private lastFormattedValue = "";
  private lastDigits = "";
  private maxNationalDigits: number | null = null;
  private currentCountry: CountryCode | null = null;

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

  private lastAcceptedDigits = "";
  private lastTemplate = "";

  private computeMaxDigitsForCountry(country: CountryCode) {
    const formatter = new AsYouType(country);
    formatter.input(""); // importante: estado limpo
    const template = formatter.getTemplate() ?? "";

    // conta quantos slots existem
    const slots = template.match(/_/g)?.length ?? 0;

    this.maxNationalDigits = slots;
    this.currentCountry = country;
  }

  private lastValidValue = "";
  private lastValidDigits = "";

  private lastValidDigitsCount = 0;

  private lastStructuredFormatted = "";

  private lastValidFormatted = "";

  private formatter = new AsYouType();
  private maxDigits: number | null = null;

  private bindInputEvents() {
    this.input.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      const rawValue = target.value;
      const cursorPos = target.selectionStart ?? rawValue.length;

      const digits = normalizeDigits(rawValue);

      // reset total
      if (!digits) {
        this.reset();
        this.lastValidValue = "";
        this.lastValidDigits = "";
        return;
      }

      /**
       * Processa normalmente
       */
      const result = processPhoneInput(`+${digits}`);

      /**
       * 🚨 REGRA DE BLOQUEIO REAL
       * Se o novo estado NÃO é possível
       * mas o anterior era,
       * então passou do limite da máscara.
       */
      const invalidOverflow =
        this.lastValidValue && result.number && !result.number.isPossible();

      if (invalidOverflow) {
        // 🔥 rollback imediato (padrão de libs maduras)
        target.value = this.lastValidValue;

        // restaura cursor no final
        requestAnimationFrame(() => {
          target.setSelectionRange(
            this.lastValidValue.length,
            this.lastValidValue.length,
          );
        });

        return;
      }

      /**
       * Aplica valor formatado válido
       */
      target.value = result.formatted;

      // salva estado válido
      if (result.number?.isPossible()) {
        this.lastValidValue = result.formatted;
        this.lastValidDigits = digits;
      }

      // bandeira automática
      if (result.country) {
        this.updateFlag(result.country.toLowerCase());
      }

      /**
       * Cursor estável (caso normal)
       */
      const digitsBeforeCursor = countDigitsBeforeCursor(rawValue, cursorPos);

      const newCursorPos = findCursorPositionByDigitIndex(
        target.value,
        digitsBeforeCursor,
      );

      requestAnimationFrame(() => {
        target.setSelectionRange(newCursorPos, newCursorPos);
      });
    });
  }

  public setCountryManually(country: CountryCode) {
    this.isCountryLocked = true;
    this.lockedCountry = country;

    this.input.value = "";
    this.input.focus();
  }

  private updateFlag(iso: string) {
    this.flagButton.innerHTML = `
      <span class="fi fi-${iso}" style="font-size: 1.4em;"></span>
    `;
  }

  public reset() {
    this.isCountryLocked = false;
    this.lockedCountry = undefined;
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
