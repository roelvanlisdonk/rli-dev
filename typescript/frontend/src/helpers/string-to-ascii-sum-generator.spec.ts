import { StringToAsciiSumConverter } from './string-to-ascii-sum-converter';

describe('StringToAsciiSumConverter', () => {
  it('convert, should sum the ascii codes of the characters in the given string', () => {
    expect(StringToAsciiSumConverter.convert('some text')).toBe(921);
  });
});
