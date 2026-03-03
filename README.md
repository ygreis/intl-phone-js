# intl-phone-js

Headless international phone input engine with smart masking,
validation\
and automatic country detection powered by **libphonenumber-js**.

Lightweight, framework-agnostic and built for modern web applications.

---

## ✨ Features

- 🌍 International phone support (`+DDI` first approach)
- 🧠 Automatic country detection while typing
- 🎭 Smart formatting via `AsYouType`
- 🔒 Structural overflow protection
- 📡 Rich event system (`change`, `countryChange`, `validityChange`,
  `blur`)
- ⚙️ Runtime configuration (`setOptions`)
- 🎯 Programmatic control (`setValue`, `setCountry`)
- 🧩 Headless architecture (bring your own UI)
- 🧪 Fully unit tested with high coverage
- 🪶 Zero UI dependencies

---

## 📦 Installation

```bash
npm install @intl-phone-js/core
```

---

## 🚀 Basic Usage

```ts
import { IntlPhone } from "intl-phone-js";

const input = document.querySelector("#phone");

const phone = new IntlPhone(input);

phone.on("change", (state) => {
  console.log("Formatted:", state.formatted);
  console.log("E164:", state.e164);
  console.log("Country:", state.country);
  console.log("Valid:", state.isValid);
});
```

---

## 📄 Example HTML

```html
<input id="phone" type="text" />
```

Typing:

    5511999999999

Automatically becomes:

    +55 11 99999-9999

The engine always normalizes internally to international format.

---

# ⚙️ Configuration

```ts
const phone = new IntlPhone(input, {
  allowedCountries: ["BR", "US"],
  value: "+5511999999999",
});
```

Or dynamically:

```ts
phone.setOptions({
  allowedCountries: ["US"],
});
```

Retrieve current options:

```ts
phone.getOptions();
```

---

# 📡 Available Events

Event Description

---

`change` Fires on every valid structural update
`countryChange` Fires when detected country changes
`validityChange` Fires when number becomes valid/invalid
`blur` Fires when input loses focus

---

# 🧠 Validation

```ts
phone.isValid();
phone.getValidationReason();
```

### ValidationReason

    EMPTY
    INVALID_COUNTRY
    TOO_SHORT
    TOO_LONG
    NOT_POSSIBLE
    VALID

No opinionated error messages are included ---\
the UI layer decides how to present validation.

---

# 🔧 Public API

### getState()

```ts
{
  rawInput: string;
  formatted: string;
  country: string | null;
  callingCode: string | null;
  nationalNumber: string | null;
  e164: string | null;
  isValid: boolean;
  isPossible: boolean;
}
```

### setValue(value)

```ts
phone.setValue("+14155552671");
```

### setCountry(countryCode)

```ts
phone.setCountry("BR");
```

### setOptions(options)

```ts
phone.setOptions({
  allowedCountries: ["BR", "CA"],
});
```

### destroy()

```ts
phone.destroy();
```

---

# 🔒 Overflow Protection

The engine prevents invalid structural growth once the number becomes
impossible.

---

# 🧩 Headless Philosophy

This library intentionally does **not** provide:

- UI components
- Dropdowns
- Flag icons
- Styling

You are free to integrate it into any UI layer.

---

# 🧪 Testing & Reliability

- Written in TypeScript
- High test coverage
- Powered by official libphonenumber metadata
- Compatible with modern browsers (2018+)

---

# 📜 License

MIT
