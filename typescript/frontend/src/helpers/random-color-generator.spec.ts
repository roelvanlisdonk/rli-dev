import { ArrayRandomiser } from './array-randomiser';
import { RandomColorGenerator } from './random-color-generator';

describe('RandomColorGenerator', () => {
  it('generateRandomHexColor, should return a hex color', () => {
    const someColorParts = ['a', 'a', '1', '2', '3', '4'];
    spyOn(ArrayRandomiser, 'randomize').and.returnValue(someColorParts);
    expect(RandomColorGenerator.generateRandomHexColor()).toBe(`#${someColorParts.join('')}`);
  });

  it('generateRandomHexColorFromText, should return a specific pseudo random hex color', () => {
    const someColorParts = ['f', '3', '7', 'e', 'a', '0'];
    spyOn(ArrayRandomiser, 'pseudoRandomize').and.returnValue(someColorParts);
    expect(RandomColorGenerator.generateRandomHexColorFromText('RL')).toBe(`#${someColorParts.join('')}`);
  });

  it('generateRandomHexColorFromText, should return a specific pseudo random hex color', () => {
    const someColorParts = ['f', '3', '7', 'e', 'a', '0'];
    spyOn(ArrayRandomiser, 'pseudoRandomize').and.returnValue(someColorParts);
    expect(RandomColorGenerator.generateRandomHexColorFromText('RL')).toBe(`#${someColorParts.join('')}`);
  });
});
