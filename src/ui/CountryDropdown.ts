// src/ui/CountryDropdown.ts
import { IntlPhone } from "./IntlPhone";
import { CountryCode } from "libphonenumber-js";

const COUNTRIES: { iso: CountryCode; name: string }[] = [
  { iso: "BR", name: "Brasil" },
  { iso: "US", name: "United States" },
  { iso: "CA", name: "Canada" },
  { iso: "GB", name: "United Kingdom" },
  { iso: "DE", name: "Germany" },
  // 🔧 extensível externamente depois
];

export interface CountryDropdownStyle {
  width?: string;
  maxHeight?: string;
}

export class CountryDropdown {
  private phone: IntlPhone;
  private style: CountryDropdownStyle;

  private container!: HTMLDivElement;
  private search!: HTMLInputElement;
  private list!: HTMLUListElement;

  constructor(phone: IntlPhone, style: CountryDropdownStyle = {}) {
    this.phone = phone;
    this.style = style;

    this.createDropdown();
    this.bindEvents();
  }

  private createDropdown() {
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.top = "100%";
    this.container.style.left = "0";
    this.container.style.zIndex = "1000";
    this.container.style.display = "none";
    this.container.style.width = this.style.width ?? "100%";
    this.container.style.background = "#fff";
    this.container.style.border = "1px solid #ccc";

    this.search = document.createElement("input");
    this.search.placeholder = "Buscar país";
    this.search.style.width = "100%";

    this.list = document.createElement("ul");
    this.list.style.listStyle = "none";
    this.list.style.margin = "0";
    this.list.style.padding = "0";
    this.list.style.maxHeight = this.style.maxHeight ?? "220px";
    this.list.style.overflowY = "auto";

    COUNTRIES.forEach((c) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.padding = "6px";
      li.style.cursor = "pointer";

      li.innerHTML = `
        <span class="fi fi-${c.iso.toLowerCase()}" style="margin-right: 8px;"></span>
        <span>${c.name}</span>
      `;

      li.addEventListener("click", () => {
        this.phone.setCountryManually(c.iso);
        this.hide();
      });

      this.list.appendChild(li);
    });

    this.container.appendChild(this.search);
    this.container.appendChild(this.list);
    this.phone.getWrapper().appendChild(this.container);
  }

  private bindEvents() {
    this.phone.getFlagButton().addEventListener("click", () => {
      this.toggle();
    });

    this.search.addEventListener("input", () => {
      const q = this.search.value.toLowerCase();
      Array.from(this.list.children).forEach((li) => {
        const text = li.textContent?.toLowerCase() ?? "";
        (li as HTMLElement).style.display = text.includes(q) ? "flex" : "none";
      });
    });

    document.addEventListener("click", (event) => {
      if (!this.phone.getWrapper().contains(event.target as Node)) {
        this.hide();
      }
    });
  }

  private toggle() {
    this.container.style.display =
      this.container.style.display === "block" ? "none" : "block";
  }

  private hide() {
    this.container.style.display = "none";
  }
}
