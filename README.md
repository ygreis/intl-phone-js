# @intl-phone-js/core

`@intl-phone-js/core` is a headless phone number state engine focused on parsing, normalization, and validation for international numbers.

It is built on top of `libphonenumber-js`, a widely used JavaScript implementation inspired by Google's libphonenumber.

NPM: https://www.npmjs.com/package/@intl-phone-js/core

---

# Summary

- Headless phone state manager for international numbers
- Powered by `libphonenumber-js`
- No UI, no DOM, no event binding
- Framework-agnostic and runtime-agnostic

---

# Features

- International phone normalization
- Automatic country detection
- Phone validation
- Country helpers
- Runtime configuration
- Framework agnostic

---

# Installation

<details open>
<summary>npm (recommended)</summary>

```bash
npm install @intl-phone-js/core
```

</details>

<details>
<summary>CDN global</summary>

```html
<script src="https://unpkg.com/@intl-phone-js/core/dist/index.global.min.js"></script>
<script>
  const phone = new IntlPhoneJS.IntlPhoneCore();
  phone.setValue("+5511999999999");
  console.log(phone.getState());
</script>
```

</details>

<details>
<summary>CDN ESM</summary>

```html
<script type="module">
  import { IntlPhoneCore } from "https://unpkg.com/@intl-phone-js/core/dist/index.js";

  const phone = new IntlPhoneCore();
  phone.setValue("+5511999999999");
  console.log(phone.getState());
</script>
```

</details>

---

# Basic Usage

```ts
import { IntlPhoneCore } from "@intl-phone-js/core";

const phone = new IntlPhoneCore();

console.log("initial:", phone.getState());

phone.setValue("11999999999");
console.log("after local value:", phone.getState());

phone.setValue("+5511999999999");
const state = phone.getState();

console.log("after intl value:", state);
console.log("formatted:", state.formatted);
console.log("country:", state.country);
console.log("e164:", state.e164);
```

---

# Using Initial Value

```ts
import { IntlPhoneCore } from "@intl-phone-js/core";

const phone = new IntlPhoneCore({
  value: "+12025550123",
});

console.log(phone.getState());
```

---

# Programmatic Control

```ts
import { IntlPhoneCore } from "@intl-phone-js/core";

const phone = new IntlPhoneCore();

phone.setValue("+351912345678");
phone.setCountry("US");
phone.reset();
```

---

# Configuration

```ts
import { IntlPhoneCore } from "@intl-phone-js/core";

const phone = new IntlPhoneCore({
  allowedCountries: ["BR", "US"],
});

phone.setOptions({ allowedCountries: ["US"] });

const options = phone.getOptions();
console.log(options);
```

---

# Reading State

```ts
import { IntlPhoneCore } from "@intl-phone-js/core";

const phone = new IntlPhoneCore();
phone.setValue("+5511999999999");

console.log(phone.getState());
console.log(phone.getCountry());
console.log(phone.getCallingCode());
console.log(phone.getE164());
```

---

# Validation

```ts
import { IntlPhoneCore } from "@intl-phone-js/core";

const phone = new IntlPhoneCore();
phone.setValue("+5511999999999");

console.log(phone.isValid());
console.log(phone.isPossible());
console.log(phone.getValidationReason());
```

`ValidationReason`:

- `EMPTY`
- `INVALID_COUNTRY`
- `TOO_SHORT`
- `TOO_LONG`
- `NOT_POSSIBLE`
- `VALID`

---

# Country Helpers

```ts
import {
  getAllCountries,
  getCountryName,
  getAllCountriesWithNames,
} from "@intl-phone-js/core";

const countries = getAllCountries();
const brazilName = getCountryName("BR");
const countriesWithNames = getAllCountriesWithNames();

console.log(countries[0], brazilName, countriesWithNames[0]);
```

---

# Phone State

`getState()` returns:

```ts
type PhoneState = {
  rawInput: string;
  formatted: string;
  value: string;
  country: string | null;
  callingCode: string | null;
  nationalNumber: string | null;
  e164: string | null;
  isValid: boolean;
  isPossible: boolean;
};
```

---

# Public API

## State

- `getState()`
- `getValue()`
- `getRawInput()`
- `getCountry()`
- `getCallingCode()`
- `getE164()`

## Validation

- `isValid()`
- `isPossible()`
- `getValidationReason()`

## Mutations

- `setValue(value)`
- `setCountry(countryCode)`
- `reset()`

## Configuration

- `setOptions(options, reprocess?)`
- `getOptions()`

---

# Headless Philosophy

This core does not include:

- UI
- Dropdowns
- Flags
- Styling
- Event binding

Use `IntlPhoneCore` as the base layer for platform-specific adapters.

---

# License

MIT
