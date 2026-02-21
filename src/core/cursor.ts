/**
 * Counts how many numeric digits exist before the cursor position.
 */
export function countDigitsBeforeCursor(
  value: string,
  cursorPos: number,
): number {
  return value.slice(0, cursorPos).replace(/\D/g, "").length;
}

/**
 * Finds the cursor position based on a digit index
 * (ignores formatting characters like spaces, dashes, parentheses).
 */
export function findCursorPositionByDigitIndex(
  value: string,
  digitIndex: number,
): number {
  let digitsSeen = 0;

  for (let i = 0; i < value.length; i++) {
    if (/\d/.test(value[i])) {
      digitsSeen++;
      if (digitsSeen === digitIndex) {
        return i + 1;
      }
    }
  }

  return value.length;
}
