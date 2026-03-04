# @intl-phone-js/core

Headless international phone input engine with smart masking, validation and automatic country detection powered by `libphonenumber-js`.

Package: https://www.npmjs.com/package/@intl-phone-js/core

## Summary

- Headless engine for international phone input formatting and validation.
- Works with plain JS, TypeScript, bundlers, and direct browser usage.
- Main install: `npm install @intl-phone-js/core`.
- Also supports direct minified usage via `dist/index.global.min.js`.
- Public helpers for country list and country names.

## Index

- [Features](#features)
- [Installation](#installation)
- [Examples](#examples)
- [Basic Usage](#basic-usage)
- [Configuration](#configuration)
- [Events](#events)
- [Country Helpers](#country-helpers)
- [Validation](#validation)
- [Public API](#public-api)
- [Headless Philosophy](#headless-philosophy)
- [License](#license)

## Features

- International phone support (`+` first normalization)
- Automatic country detection while typing
- Smart formatting via `AsYouType`
- Overflow/structural protection while typing
- Typed events: `change`, `countryChange`, `validityChange`, `blur`
- Runtime configuration (`setOptions`)
- Programmatic control (`setValue`, `setCountry`)
- Country helpers (`getAllCountries`, `getCountryName`, `getAllCountriesWithNames`)
- Headless architecture (bring your own UI)

## Installation

<details open>
<summary>npm (recommended)</summary>

```bash
npm install @intl-phone-js/core
```

</details>

<details>
<summary>CDN: direct minified global file (no bundler)</summary>

```html
<script src="https://unpkg.com/@intl-phone-js/core/dist/index.global.min.js"></script>
<script>
  const input = document.getElementById("phone");
  const phone = new IntlPhoneJS.IntlPhone(input);
</script>
```

</details>

<details>
<summary>npm + local minified file (from node_modules)</summary>

```html
<script src="./node_modules/@intl-phone-js/core/dist/index.global.min.js"></script>
<script>
  const input = document.getElementById("phone");
  const phone = new IntlPhoneJS.IntlPhone(input);
</script>
```

</details>

<details>
<summary>CDN: ESM module file</summary>

```html
<script type="module">
  import { IntlPhone } from "https://unpkg.com/@intl-phone-js/core/dist/index.js";

  const input = document.getElementById("phone");
  const phone = new IntlPhone(input);
</script>
```

</details>

## Examples

Browse the live examples home at [docs/examples/index.html](https://ygreis.github.io/intl-phone-js/example/).

Current demos:

- Debug Playground
- Country Flag
- Country Picker

## Basic Usage

```html
<input id="phone" type="text" />
```

```ts
import { IntlPhone } from "@intl-phone-js/core";

const input = document.querySelector("#phone") as HTMLInputElement;
const phone = new IntlPhone(input);

phone.on("change", (state) => {
  console.log("formatted:", state.formatted);
  console.log("e164:", state.e164);
  console.log("country:", state.country);
  console.log("isValid:", state.isValid);
});
```

Typing `5511999999999` becomes `+55 11 99999-9999`.

## Configuration

```ts
const phone = new IntlPhone(input, {
  allowedCountries: ["BR", "US"],
  value: "+5511999999999",
});

phone.setOptions({
  allowedCountries: ["US"],
});

const options = phone.getOptions();
```

## Events

All events return the full `PhoneState` payload:

- `change`: fires on every structural update
- `countryChange`: fires when detected country changes
- `validityChange`: fires when validity changes
- `blur`: fires when the input loses focus

```ts
phone.on("countryChange", (state) => {
  console.log(state.country);
});
```

## Country Helpers

```ts
import {
  getAllCountries,
  getCountryName,
  getAllCountriesWithNames,
} from "@intl-phone-js/core";

const countries = getAllCountries();
const name = getCountryName("BR"); // "Brazil"
const countriesWithNames = getAllCountriesWithNames();
```

## Validation

```ts
phone.isValid();
phone.getValidationReason();
```

`ValidationReason` values:

- `EMPTY`
- `INVALID_COUNTRY`
- `TOO_SHORT`
- `TOO_LONG`
- `NOT_POSSIBLE`
- `VALID`

## Public API

### Types

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

### IntlPhone methods

- `on(event, listener)`
- `off(event, listener)`
- `getInput()`
- `getState()`
- `getValue()`
- `getRawInput()`
- `getCountry()`
- `getCallingCode()`
- `getE164()`
- `isValid()`
- `getValidationReason()`
- `setValue(value)`
- `setCountry(countryCode)`
- `setOptions(options, reprocess?)`
- `getOptions()`
- `destroy()`

## Headless Philosophy

This library intentionally does not provide:

- UI components
- Dropdowns
- Flag icons
- Styling

Use it with any UI layer.

## License

MIT
