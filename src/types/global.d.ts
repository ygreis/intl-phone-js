export {};

interface IntlPhoneJsOptions {

}

interface HTMLInputElement {
  applyIntlPhoneJs(options?: IntlPhoneJsOptions): HTMLInputElement;
  imaskInstance?: IMask.InputMask<MaskedDynamic<MaskedPattern<string>>>; // Define imaskInstance como uma instância do IMask
}

declare global {
  interface HTMLInputElement {
    intlPhoneInstance?: unknown;
  }
}