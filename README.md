# intl-phone-js

Headless international phone input engine with smart masking, validation
and country auto-detection powered by **libphonenumber-js**.

Lightweight, framework-agnostic and ready to integrate with vanilla JS,
React, Vue or any UI layer.

---

## ✨ Features

- 🌍 International phone support
- 🧠 Automatic country detection
- 🎭 Smart formatting (AsYouType)
- 🔒 Overflow protection (prevents invalid growth)
- 📡 Change / validity / country events
- 🧩 Headless architecture (bring your own UI)
- 🧪 Fully tested with coverage

---

## 📦 Installation

```bash
npm install intl-phone-js
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

As the user types:

    5511999999999

It automatically becomes:

    +55 11 99999-9999

---

## 📡 Available Events

Event Description

---

`change` Fires on every valid update
`countryChange` Fires when detected country changes
`validityChange` Fires when number becomes valid/invalid

---

## 🔧 Public API

### getState()

Returns the full phone state:

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

### getCountry()

```ts
phone.getCountry();
```

### isValid()

```ts
phone.isValid();
```

### getE164()

```ts
phone.getE164();
```

### setCountry(countryCode)

Programmatically set country (ISO code):

```ts
phone.setCountry("BR");
```

This automatically inserts the correct calling code.

### destroy()

Removes event listeners.

```ts
phone.destroy();
```

---

## 🛡 Overflow Protection

The library prevents invalid structural growth.

Example:

    +549112345678912345

Will automatically block extra digits once the number becomes
impossible.

---

## 🧩 Headless Architecture

This library does not provide:

- UI components
- Dropdowns
- Flags

It is intentionally headless so you can:

- Build your own dropdown
- Integrate with React/Vue/Svelte
- Use it in design systems

---

## 🧪 Testing & Reliability

- Built with TypeScript
- Fully unit tested
- Branch coverage validated
- Powered by official libphonenumber metadata

---

## 🔮 Roadmap

- React adapter
- Country dropdown module
- Flag icon support
- Metadata customization (lite build)

---

## 📜 License

MIT
