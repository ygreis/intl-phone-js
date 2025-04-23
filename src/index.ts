import countries, { CountryPhone } from "./countries/contries";
import IntlPhoneMask from "./intl-phone-mask";
import IMask from "../node_modules/imask/esm/imask";
import { MaskedDynamic, MaskedPattern } from "../node_modules/imask/esm/index";

class IntlPhoneJs {
  input: HTMLInputElement;
  wrapper!: HTMLElement; // Div ao redor do input principal
  flagContainer!: HTMLElement; // Contêiner para a bandeira dentro do input
  dropdownContainer!: HTMLElement; // Container da busca e lista de bandeiras
  searchInput!: HTMLInputElement; // Campo de busca
  countryList!: HTMLUListElement; // Lista de países
  country!: CountryPhone;
  currentFlag!: string; // ISO da bandeira atual

  constructor(el: HTMLInputElement, options?: IntlPhoneJsOptions) {
    this.input = el;

    // Definir a bandeira padrão (Brasil)
    this.setCurrentFlag("br")
    //this.currentFlag = "br";

    // Criar estrutura necessária
    this.appendWrapper();
    this.appendFlagInsideInput();
    this.appendDropdownContainer();

    // Adicionar evento para mudar bandeira ao digitar no input
    this.addInputEventListener();
  }

  // Setter para currentFlag
  setCurrentFlag(isoFlag: string) {
    console.log(`set currentFlag, ${isoFlag}`)
    if (this.currentFlag !== isoFlag) {
      this.currentFlag = isoFlag;
    }

    const country = countries.find(country => country.iso === isoFlag.toUpperCase());
    console.log(`setCurrentFlag country ${country}`)
    if (country) {
      this.setCountry(country)
    }
  }

  // Setter para country
  setCountry(country: CountryPhone) {
    if (this.country !== country) {
      this.country = country; // Atualiza a variável privada corretamente
      this.onFlagChange(country); // Chama a função automaticamente
    }
  }

  // Função disparada quando a bandeira muda
  private onFlagChange(country: CountryPhone): void {
    console.log(`A bandeira foi alterada para: ${country.name}`);
    // Aqui você pode adicionar mais lógica, como atualizar a máscara do input
  }

  private setMask() {
    /*const country = countries.find(c => this.input.value.startsWith(c.code));
    if (!country) return;*/

    this.setFlagIcon(this.country.iso.toLowerCase()); // Atualiza a bandeira
    this.setMaskInput()
  }

  private setMaskInput() {
    let input = this.input;
    const country = this.country
    console.log(`setMaskInput country`, country)
    const ddi = country.code; // DDI fixo
    let matrixBase = Array.isArray(country.mask) ? country.mask[0] : country.mask; // Usa o primeiro formato se for um array
    let onlyDDI = ddi.replace(/\D/g, ''); // DDI sem caracteres especiais

    if(!input.value.length){
      input.value = ddi

    }

    let value = input.value.replace(/\D/g, ''); // Remove tudo que não é número

    // Permite apagar completamente e deixa o campo livre para nova digitação
    if (value.length < onlyDDI.length) {
      input.value = ''; // Libera o campo se o usuário apagar tudo
      return;
    }

    // Se houver múltiplos formatos de máscara, escolhe o mais adequado
    if (Array.isArray(country.mask)) {
      matrixBase = country.mask.find(m => m.replace(/\D/g, '').length >= value.length) || country.mask[0];
    }

    let maskedValue = matrixBase.replace(/#/g, 'X'); // Máscara dinâmica com 'X'
    let i = 0;

    // Atualiza a máscara conforme o usuário digita
    input.value = `${ddi}${maskedValue}`.replace(/./g, char => {
      if (/[\(\)\-\+\s]/.test(char) && i >= value.length) {
        return ''; // Remove caracteres fixos quando não há números suficientes
      } else if (/[\(\)\-\+\s]/.test(char)) {
        return char; // Mantém caracteres fixos quando necessário
      } else if (/[X\d]/.test(char) && i < value.length) {
        return value.charAt(i++); // Substitui máscara pelos dígitos inseridos
      } else {
        return ''; // Remove os 'X' onde não há números preenchendo
      }
    });

    // Garante que a máscara reapareça corretamente ao digitar novamente
    if (!input.value) {
      input.value = ''; // Libera totalmente o campo se apagado
    }
  }

  /*private setMask() {
    const country = countries.find(c => this.input.value.startsWith(c.code));
    if (!country) return;

    this.setFlagIcon(country.iso.toLowerCase()); // Atualiza a bandeira

    // Configuração dinâmica de máscaras para IMask
    const maskConfig = {
      mask: Array.isArray(country.mask)
        ? country.mask.map(mask => ({
          mask: `${country.code} ${mask}`, // Configura o padrão para cada máscara
        }))
        : [{ mask: `${country.code} ${country.mask}` }], // Converte para array se necessário
      dispatch: function (
        appended: string, // Caractere digitado
        dynamicMasked: MaskedDynamic<MaskedPattern> // Máscara dinâmica baseada em padrão
      ) {
        const value = (dynamicMasked.value + appended).replace(/\D/g, "");
        return dynamicMasked.compiledMasks.find(m =>
          typeof m.mask === "string" && value.startsWith(m.mask.split(' ')[0]) // Encontra máscara correta com base no DDI
        );
      },
    };

    console.log("IMask", IMask);
    console.log("maskConfig", maskConfig);

    // Remove máscaras anteriores e aplica a nova
    if (this.input.imaskInstance) {
      this.input.imaskInstance.destroy(); // Remove máscara antiga para evitar conflitos
    }

    IMask(this.input, maskConfig); // Aplica a nova máscara e salva a instância
  }*/



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
    console.log(`selectCountry flag: ${iso}`)
    this.setCurrentFlag(iso)
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

      // Encontrar país correspondente ao código digitado
      const matchingCountry = countries.find((country) => value.startsWith(country.code));

      if (matchingCountry) {
        this.setFlagIcon(matchingCountry.iso.toLowerCase()); // Atualiza bandeira
        this.setMask(); // Atualiza máscara
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