export default class IntlPhoneMask {
  input: HTMLInputElement;
  mask!: string | string[];
  matrix: string = '';
  countryCode: string = '';

  constructor(el: HTMLInputElement, maskList: string | string[], countryCode: string) {
    this.input = el;
    this.countryCode = countryCode;
    this.setMaskList(maskList);
    this.addListeners();
  }

  setMaskList(maskList: string | string[]) {
    this.mask = maskList;
    this.input.value = this.countryCode; // Mantém o DDI fixo
  }

  private addListeners() {
    if (!this.input.value) this.input.value = this.countryCode;
    this.input.addEventListener('input', this.applyMask.bind(this));
  }

  private applyMask() {
    const cursorPos = this.input.selectionStart || 0;
    const val = this.input.value.replace(/\D/g, '').replace(this.countryCode.replace(/\D/g, ''), ''); // Remove caracteres não numéricos, mantendo DDI

    // **Seleciona a máscara correta**
    let selectedMask: string = Array.isArray(this.mask) ? this.mask[0] : this.mask;
    this.matrix = `${this.countryCode} ${selectedMask}`;

    let i = 0;
    let formattedValue = this.countryCode; // Mantém o DDI fixo

    for (const char of selectedMask) {
      if (char === '#') {
        formattedValue += i < val.length ? val.charAt(i++) : '_';
      } else {
        formattedValue += char; // Mantém caracteres especiais
      }
    }

    // **Atualiza o input sem sobrescrever números já digitados**
    if (this.input.value.length < formattedValue.length || cursorPos === this.input.value.length) {
      this.input.value = formattedValue;
      this.input.setSelectionRange(cursorPos, cursorPos);
    }
  }
}