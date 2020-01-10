/**
 * Sums the ascii character codes of the given string.
 * When text is null, an error will be thrown: 'TypeError: object null is not iterable (cannot read property Symbol(Symbol.iterator))'.
 * When text is undefined, an error will be thrown: 'TypeError: object undefined is not iterable (cannot read property Symbol(Symbol.it
 */
function convert(text: string): number {
  return [...text].reduce((subTotal, current) => current.charCodeAt(0) + subTotal, 0);
}

export const StringToAsciiSumConverter = {
  convert,
};
