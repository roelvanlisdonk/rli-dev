/**
 * It will return a randomized shallow clone of the given array in a correct way as stated in:
 * https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
 *
 * When items is falsy, an error will be thrown: 'TypeError: object null is not iterable (cannot read property Symbol(Symbol.iterator))'.
 * When items is undefined, an error will be thrown: 'TypeError: object undefined is not iterable (cannot read property Symbol(Symbol.iterator))'.
 */
function randomize(items: any[]): any[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * It will return a pseudo randomized shallow clone of the given array, based on the given seed.
 * The array will be 'randomized', but for the same seed it will return the same result.
 *
 * When items is null, an error will be thrown: 'TypeError: object null is not iterable (cannot read property Symbol(Symbol.iterator))'.
 * When items is undefined, an error will be thrown: 'TypeError: object undefined is not iterable (cannot read property Symbol(Symbol.iterator))'.
 */
function pseudoRandomize(items: any[], seed: number): any[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    let seedTemp = Math.sin(seed) * 10000;
    seedTemp = seedTemp - Math.floor(seedTemp);
    const j = Math.floor(seedTemp * i);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

export const ArrayRandomiser = {
  pseudoRandomize,
  randomize,
};
