export function createInput(initialValue = ""): HTMLInputElement {
  const input = document.createElement("input");
  input.value = initialValue;
  document.body.appendChild(input);
  return input;
}

export function typeInto(input: HTMLInputElement, value: string) {
  input.value = value;
  input.dispatchEvent(new Event("input"));
}

export function blur(input: HTMLInputElement) {
  input.dispatchEvent(new Event("blur"));
}

export function cleanupInput(input: HTMLInputElement) {
  document.body.removeChild(input);
}
