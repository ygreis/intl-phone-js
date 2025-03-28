export default class IntlPhoneMask {
  input: HTMLInputElement;
  mask!: string | string[];
  matrix: string = '+###############';

  constructor(el: HTMLInputElement, maskList: string | string[]) {
    this.input = el;
    this.setMaskList(maskList)

    this.addListeners();
  }

  setMaskList(maskList: string | string[]) {
    this.mask = maskList;
    this.input.value = '+'
  }

  private addListeners() {
    if (!this.input.value) this.input.value = '+';
    this.input.addEventListener('input', this.setMask.bind(this));
    this.input.addEventListener('focus', this.setMask.bind(this));
    this.input.addEventListener('blur', this.setMask.bind(this));
  }

  private setMask() {
    // Processar se a máscara for uma string ou um array
    if (typeof this.mask === 'string') {
      this.formatMask(this.mask);
    } else {
      this.mask.forEach((item) => {
        this.formatMask(item);
      });
    }

    let i = 0;
    const val = this.input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    // Aplica a matriz formatada ao valor
    this.input.value = this.matrix.replace(/(?!\+)./g, function (a) {
      return /[#\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
  }

  private formatMask(mask: string) {
    // Remove parênteses `()` durante o processamento do código e do telefone
    const code = mask.replace(/[\s#()]/g, ''); // Removendo `()` além de `#` e espaços
    const phone = this.input.value.replace(/[\s#-)(]/g, ''); // Removendo parênteses no telefone também

    if (phone.includes(code)) {
      console.log(phone, code);
      this.matrix = mask; // Atualiza a matriz com a máscara correspondente
    }
  }
}