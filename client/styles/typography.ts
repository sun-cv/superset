import { TextStyle } from 'react-native';

const BASE_FONT_SIZE = 16;
const SCALE_RATIO = 1.2;

function getFontSize(level: number) {
  // level can be positive (larger) or negative (smaller)
  return BASE_FONT_SIZE * Math.pow(SCALE_RATIO, level);
}

function createTextStyle(level: number, weight: TextStyle['fontWeight'] = '400'): TextStyle {
  const fontSize = getFontSize(level);
  return {
    fontSize,
    fontWeight: weight,
    lineHeight: Math.round(fontSize * 1.4),
  };
}

const typography = {
  h1: createTextStyle(4, '600'),  // biggest
  h2: createTextStyle(3, '600'),
  h3: createTextStyle(2),
  h4: createTextStyle(1),
  h5: createTextStyle(0),
  h6: createTextStyle(-1),
  h7: createTextStyle(-2),
  h8: createTextStyle(-3),
  h9: createTextStyle(-4),
  body: createTextStyle(0),
  small: createTextStyle(-5),
  label: { ...createTextStyle(0, '600'), lineHeight: 20 },
};

export default typography;
