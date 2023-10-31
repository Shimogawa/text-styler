export type FontType = 'serif' | 'script' | 'fraktur' | 'double-struck' | 'sans-serif' | 'monospace';
export type Style = 'normal' | 'bold' | 'italic' | 'bolditalic';

export const fontTypeNameMap: Record<FontType, string> = {
  'serif': 'Serif',
  'script': 'Mathematical Script',
  'fraktur': 'Mathematical Fraktur',
  'double-struck': 'Mathematical Double-Struck',
  'sans-serif': 'Sans-Serif',
  'monospace': 'Monospace',
};

export const alphabetStyleMap: Record<FontType, Style[]> = {
  'serif': ['bold', 'italic', 'bolditalic'],
  'script': ['normal', 'bold'],
  'fraktur': ['normal', 'bold'],
  'double-struck': ['normal'],
  'sans-serif': ['normal', 'bold', 'italic', 'bolditalic'],
  'monospace': ['normal'],
};

const serifBoldStart = 0x1d400;
const serifItalicStart = 0x1d434;
const boldItalicStart = 0x1d468;

const scriptStart = 0x1d49c;
const boldScriptStart = 0x1d4d0;

const frakturStart = 0x1d504;
const boldFrakturStart = 0x1d56c;

const doubleStruckStart = 0x1d538;

const sansSerifStart = 0x1d5a0;
const sansSerifBoldStart = 0x1d5d4;
const sansSerifItalicStart = 0x1d608;
const sansSerifBoldItalicStart = 0x1d63c;

const monospaceStart = 0x1d670;

const serifBoldDigitsStart = 0x1d7ce;
const doubleStruckDigitsStart = 0x1d7d8;
const sansSerifDigitsStart = 0x1d7e2;
const sansSerifBoldDigitsStart = 0x1d7ec;
const monospaceDigitsStart = 0x1d7f6;


const reservedMap: Map<number, number> = new Map([
  [0x1d455, 0x210e], // italic h
  [0x1d49d, 0x212c], // script B
  [0x1d4a0, 0x2130], // script E
  [0x1d4a1, 0x2131], // script F
  [0x1d4a3, 0x210b], // script H
  [0x1d4a4, 0x2110], // script I
  [0x1d4a7, 0x2112], // script L
  [0x1d4a8, 0x2133], // script M
  [0x1d4ad, 0x211b], // script R
  [0x1d4ba, 0x212f], // script e
  [0x1d4bc, 0x210a], // script g
  [0x1d4c4, 0x2134], // script o
  [0x1d506, 0x2120], // fraktur C
  [0x1d50b, 0x210c], // fraktur H
  [0x1d50c, 0x2111], // fraktur I
  [0x1d515, 0x211c], // fraktur R
  [0x1d51d, 0x2128], // fraktur Z
  [0x1d53a, 0x2102], // double-struck C
  [0x1d53f, 0x210d], // double-struck H
  [0x1d545, 0x2115], // double-struck N
  [0x1d547, 0x2119], // double-struck P
  [0x1d548, 0x211a], // double-struck Q
  [0x1d549, 0x211d], // double-struck R
  [0x1d551, 0x2124], // double-struck Z
]);

function getAlphaStart(fontType: FontType, style: Style): number {
  switch (fontType) {
    case 'serif':
      switch (style) {
        case 'normal':
          return serifBoldStart;
        case 'bold':
          return serifBoldStart;
        case 'italic':
          return serifItalicStart;
        case 'bolditalic':
          return boldItalicStart;
      }
      // fallthrough
    case 'script':
      switch (style) {
        case 'normal':
          return scriptStart;
        case 'bold':
          return boldScriptStart;
      }
      break;
    case 'fraktur':
      switch (style) {
        case 'normal':
          return frakturStart;
        case 'bold':
          return boldFrakturStart;
      }
      break;
    case 'double-struck':
      switch (style) {
        case 'normal':
          return doubleStruckStart;
      }
      break;
    case 'sans-serif':
      switch (style) {
        case 'normal':
          return sansSerifStart;
        case 'bold':
          return sansSerifBoldStart;
        case 'italic':
          return sansSerifItalicStart;
        case 'bolditalic':
          return sansSerifBoldItalicStart;
      }
      // fallthrough
    case 'monospace':
      switch (style) {
        case 'normal':
          return monospaceStart;
      }
      break;
  }
  throw new Error(`Unknown style ${style}`);
}

function getDigitStart(fontType: FontType, style: Style): number | null {
  switch (fontType) {
    case 'serif':
      switch (style) {
        case 'bold':
          return serifBoldDigitsStart;
      }
      break;
    case 'double-struck':
      switch (style) {
        case 'normal':
          return doubleStruckDigitsStart;
      }
      break;
    case 'sans-serif':
      switch (style) {
        case 'normal':
          return sansSerifDigitsStart;
        case 'bold':
          return sansSerifBoldDigitsStart;
      }
      break;
    case 'monospace':
      switch (style) {
        case 'normal':
          return monospaceDigitsStart;
      }
      break;
  }
  return null;
}

export function styleString(str: string, fontType: FontType, style: Style): string {
  const start = getAlphaStart(fontType, style);
  const chars = [...str];
  const length = chars.length;
  const charCodes = chars.map((c) => c.codePointAt(0)!);
  const digitStart = getDigitStart(fontType, style);
  const resultCodes = [];
  for (let i = 0; i < length; i++) {
    const code = charCodes[i];
    if (code >= 0x30 && code <= 0x39) {
      const digit = code - 0x30;
      if (digitStart !== null) {
        resultCodes.push(digitStart + digit);
      } else {
        resultCodes.push(charCodes[i]);
      }
    } else {
      if (code >= 0x41 && code <= 0x5a) {
        resultCodes.push(start + code - 0x41);
      } else if (code >= 0x61 && code <= 0x7a) {
        resultCodes.push(start + code - 0x61 + 26);
      } else {
        resultCodes.push(charCodes[i]);
      }
    }
  }
  return String.fromCodePoint(...resultCodes.map((c) => reservedMap.get(c) ?? c));
}
