import countries from "./countries/contries";
import IntlPhoneMask from "./intl-phone-mask";

class IntlPhoneJs {
  input: HTMLInputElement;
  wrapper!: HTMLElement; // Div ao redor do input principal
  flagContainer!: HTMLElement; // Contêiner para a bandeira dentro do input
  dropdownContainer!: HTMLElement; // Container da busca e lista de bandeiras
  searchInput!: HTMLInputElement; // Campo de busca
  countryList!: HTMLUListElement; // Lista de países
  currentFlag!: string; // ISO da bandeira atual

  constructor(el: HTMLInputElement, options?: IntlPhoneJsOptions) {
    this.input = el;

    // Definir a bandeira padrão (Brasil)
    this.currentFlag = "br";

    // Criar estrutura necessária
    this.appendWrapper();
    this.appendFlagInsideInput();
    this.appendDropdownContainer();

    // Adicionar evento para mudar bandeira ao digitar no input
    this.addInputEventListener();
  }

  private setMask() {
    new IntlPhoneMask(this.input, '+7 7## ### ## ##');
  }

  private appendWrapper() {
    const wrapperDiv = document.createElement('div');
    this.wrapper = wrapperDiv;

    // Estilos e atributos
    this.wrapper.style.display = 'flex';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.position = 'relative';

    // Adicionar o wrapper ao DOM
    const parent = this.input.parentNode;
    if (parent) {
      parent.insertBefore(this.wrapper, this.input);
    }
    this.wrapper.appendChild(this.input); // Adicionar o input dentro do wrapper
    this.input.style.paddingLeft = '50px'; // Espaço para a bandeira à esquerda
  }

  private appendFlagInsideInput() {
    const flagContainerDiv = document.createElement('button');
    this.flagContainer = flagContainerDiv;

    // Estilos para o contêiner da bandeira dentro do input
    this.flagContainer.style.width = '40px';
    this.flagContainer.style.height = '100%';
    this.flagContainer.style.position = 'absolute';
    this.flagContainer.style.left = '0';
    this.flagContainer.style.top = '0';
    this.flagContainer.style.display = 'flex';
    this.flagContainer.style.justifyContent = 'center';
    this.flagContainer.style.alignItems = 'center';
    this.flagContainer.style.cursor = 'pointer';
    this.flagContainer.style.border = 'none';
    this.flagContainer.style.background = 'transparent';

    // Adicionar o ícone de bandeira inicial (Brasil)
    this.setFlagIcon(this.currentFlag);

    // Tornar o contêiner clicável
    this.flagContainer.addEventListener('click', () => {
      const isExpanded = this.dropdownContainer.style.display === 'block';
      if (isExpanded) {
        this.hideDropdownContainer();
      } else {
        this.showDropdownContainer();
      }
    });

    // Adicionar o contêiner da bandeira ao wrapper
    this.wrapper.appendChild(this.flagContainer);
  }

  private setFlagIcon(iso: string) {
    // Atualiza o ícone da bandeira com base no ISO fornecido
    this.flagContainer.innerHTML = `
      <span class="fi fi-${iso}" style="font-size: 1.5em;"></span>
    `;
  }

  private appendDropdownContainer() {
    const dropdownDiv = document.createElement('div');
    this.dropdownContainer = dropdownDiv;

    // Estilos para o container da dropdown
    this.dropdownContainer.style.width = `${this.input.offsetWidth}px`; // Ajustar largura ao input
    this.dropdownContainer.style.position = 'absolute';
    this.dropdownContainer.style.top = '50px'; // Abaixo do input
    this.dropdownContainer.style.left = '0';
    this.dropdownContainer.style.backgroundColor = '#fff';
    this.dropdownContainer.style.border = '1px solid #ccc';
    this.dropdownContainer.style.boxSizing = 'border-box';
    this.dropdownContainer.style.display = 'none'; // Inicialmente escondida
    this.dropdownContainer.style.zIndex = '10';

    this.appendSearchField();
    this.appendCountryList();

    this.wrapper.appendChild(this.dropdownContainer);
  }

  private appendSearchField() {
    const searchInput = document.createElement('input');
    this.searchInput = searchInput;

    // Estilos mínimos
    this.searchInput.type = 'text';
    this.searchInput.placeholder = 'Buscar país...';
    this.searchInput.setAttribute('aria-label', 'Buscar país por código, nome ou ISO');
    this.searchInput.style.width = '100%';
    this.searchInput.style.boxSizing = 'border-box';
    this.searchInput.style.padding = '5px';
    this.searchInput.style.borderBottom = '1px solid #ccc';

    // Eventos
    this.searchInput.addEventListener('input', () => this.filterCountries());

    this.dropdownContainer.appendChild(this.searchInput);
  }

  private appendCountryList() {
    const countryList = document.createElement('ul');
    this.countryList = countryList;

    // Estilos mínimos
    this.countryList.style.listStyle = 'none';
    this.countryList.style.padding = '0';
    this.countryList.style.margin = '0';
    this.countryList.style.maxHeight = '200px';
    this.countryList.style.overflowY = 'scroll';

    // Gerar opções
    countries.forEach((country) => {
      const listItem = document.createElement('li');
      listItem.style.display = 'flex';
      listItem.style.alignItems = 'center';
      listItem.style.padding = '8px';
      listItem.style.cursor = 'pointer';

      const flagIcon = document.createElement('span');
      flagIcon.className = `fi fi-${country.iso.toLowerCase()}`;
      flagIcon.style.marginRight = '8px'; // Espaço entre ícone e texto

      listItem.appendChild(flagIcon);
      listItem.append(`${country.name} (${country.iso})`);

      listItem.setAttribute('data-code', country.code);
      listItem.setAttribute('data-iso', country.iso);
      listItem.setAttribute('role', 'option');

      // Evento para selecionar o país
      listItem.addEventListener('click', () => this.selectCountry(country.iso.toLowerCase()));

      this.countryList.appendChild(listItem);
    });

    this.dropdownContainer.appendChild(this.countryList);
  }

  private filterCountries() {
    const query = this.searchInput.value.toLowerCase();
    const items = this.countryList.querySelectorAll('li');

    items.forEach((item) => {
      const name = item.textContent?.toLowerCase() || '';
      const code = item.getAttribute('data-code')?.toLowerCase() || '';
      const iso = item.getAttribute('data-iso')?.toLowerCase() || '';
      item.style.display =
        name.includes(query) || code.includes(query) || iso.includes(query) ? 'flex' : 'none';
    });
  }

  private selectCountry(iso: string) {
    this.currentFlag = iso; // Atualizar a bandeira atual
    this.setFlagIcon(iso); // Alterar bandeira conforme país selecionado
    this.hideDropdownContainer(); // Esconder lista após seleção
  }

  private showDropdownContainer() {
    this.dropdownContainer.style.display = 'block'; // Mostrar a dropdown
  }

  private hideDropdownContainer() {
    this.dropdownContainer.style.display = 'none'; // Esconder a dropdown
  }

  private addInputEventListener() {
    this.input.addEventListener('input', () => {
      const value = this.input.value.trim();

      // Encontrar o primeiro país correspondente ao código digitado
      const matchingCountry = countries.find((country) =>
        value.startsWith(country.code)
      );
        
      if (matchingCountry) {
        this.setFlagIcon(matchingCountry.iso.toLowerCase());
      }
    });
  }
}

// Adicionar o método ao protótipo do HTMLInputElement
HTMLInputElement.prototype.applyIntlPhoneJs = function (options?: IntlPhoneJsOptions) {
  new IntlPhoneJs(this, options);
  return this;
};

// Inicializar
(() => {
  const input: HTMLInputElement | null = document.querySelector("#intl-phone-js");
  if (input) {
    input.applyIntlPhoneJs();
  } else {
    console.error("Elemento #intl-phone-js não encontrado.");
  }
})();