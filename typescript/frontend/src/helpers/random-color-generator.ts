import { ArrayRandomiser } from './array-randomiser';
import { StringToAsciiSumConverter } from './string-to-ascii-sum-converter';

const hexParts = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function convertToHexColorString(parts: any[]): string {
  return `#${parts.slice(0, 6).join('')}`;
}

/**
 * Generate a random hex color (e.g. #aa1234).
 */
function generateRandomHexColor(): string {
  const parts = ArrayRandomiser.randomize(hexParts);
  return convertToHexColorString(parts);
}

/**
 * Generate a pseudo radom hex color base on the given text.
 * When text is null, an error will be thrown: 'TypeError: object null is not iterable (cannot read property Symbol(Symbol.iterator))'.
 * When text is undefined, an error will be thrown: 'TypeError: object undefined is not iterable (cannot read property Symbol(Symbol.it
 */
function generateRandomHexColorFromText(text: string): string {
  const asciiCode = StringToAsciiSumConverter.convert(text);
  const parts = ArrayRandomiser.pseudoRandomize(hexParts, asciiCode);
  return convertToHexColorString(parts);
}

export const RandomColorGenerator = {
  generateRandomHexColor,
  generateRandomHexColorFromText,
};
