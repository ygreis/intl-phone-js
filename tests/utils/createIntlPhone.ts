import { IntlPhone, IntlPhoneOptions } from "@/index";
import { createInput } from "./dom";

export function createIntlPhone(options: IntlPhoneOptions = {}) {
  const input = createInput();
  const phone = new IntlPhone(input, options);

  return { phone, input };
}
