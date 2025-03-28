import countries from "./countries/contries";
//import 'flag-icons/css/flag-icons.min.css';
import './styles.css'; // Importando o arquivo CSS

class IntlPhoneJs {
  input: HTMLInputElement;
  wrapper!: HTMLElement; // Marcado como definido posteriormente com "!"
  select!: HTMLSelectElement; // Marcado como definido posteriormente com "!"

  constructor(el: HTMLInputElement, options?: IntlPhoneJsOptions) {
    this.input = el;
    console.log(`elemento: ${el}`);
    console.log(`options: ${options}`);

    this.appendWrapper();
    this.appendSelectFlag();
  }

  private appendWrapper() {
    // Criar uma nova div
    const wrapperDiv = document.createElement('div');
    this.wrapper = wrapperDiv;

    this.wrapper.classList.add('intl-phone-wrapper');

    // Adicionar a div ao DOM ao redor do input
    const parent = this.input.parentNode;
    if (parent) {
      parent.insertBefore(this.wrapper, this.input); // Adicionar wrapper antes do input
    }
    this.wrapper.appendChild(this.input); // Mover input para dentro do wrapper
  }

  private appendSelectFlag() {
    // Criar o elemento select
    const selectElement = document.createElement('select');
    selectElement.classList.add('intl-phone-flags');

    // Adicionar as opções com bandeiras
    countries.forEach((country) => {
      const option = document.createElement('option');
      option.value = country.code; // Define o código do país como valor
      option.innerHTML = `
        <span class="fi fi-${country.iso.toLowerCase()}"></span> 
        ${country.name} (${country.code})
      `;
      selectElement.appendChild(option);
    });

    // Adicionar o select ao wrapper
    this.wrapper.insertAdjacentElement('afterbegin', selectElement);

    // Salvar a referência ao select
    this.select = selectElement;
  }
}

// Adicionar o método ao protótipo do HTMLInputElement
HTMLInputElement.prototype.applyIntlPhoneJs = function (options?: IntlPhoneJsOptions) {
  new IntlPhoneJs(this, options);
  return this;
};

(() => {
  const input: HTMLInputElement | null = document.querySelector("#intl-phone-js");
  if (input) {
    input.applyIntlPhoneJs();
  } else {
    console.error("Elemento #intl-phone-js não encontrado.");
  }
})();