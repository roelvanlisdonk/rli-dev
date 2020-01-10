import { ArrayRandomiser } from './array-randomiser';
import { StringToAsciiSumConverter } from './string-to-ascii-sum-converter';

describe('ArrayRandomiser', () => {
  it('randomize, should return a randomized array, when an array with more then 1 item is supplied', () => {
    const items = [1, 2, 3, 4, 5];
    const randomizedItems = ArrayRandomiser.randomize(items);
    expect(JSON.stringify(items)).not.toBe(JSON.stringify(randomizedItems));
  });

  it('pseudoRandomize, should return a randomized array, but the same result for the given seed (RL).', () => {
    const items = [1, 2, 3, 4, 5];
    const randomizedItems = ArrayRandomiser.pseudoRandomize(items, StringToAsciiSumConverter.convert('RL'));
    expect(JSON.stringify(randomizedItems)).toBe(JSON.stringify([2, 3, 4, 5, 1]));
  });

  it('pseudoRandomize, should return a randomized array, but the same result for the given seed (PM).', () => {
    const items = [1, 2, 3, 4, 5];
    const randomizedItems = ArrayRandomiser.pseudoRandomize(items, StringToAsciiSumConverter.convert('PM'));
    expect(JSON.stringify(randomizedItems)).toBe(JSON.stringify([5, 1, 4, 2, 3]));
  });
});
