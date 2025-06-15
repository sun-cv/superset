import { TextStyle } from 'react-native';

const typography: { [key: string]: TextStyle } = 
{
  h1:    { fontSize: 54, fontWeight: 700, lineHeight: 62 },
  h2:    { fontSize: 42, fontWeight: 600, lineHeight: 50 },
  h3:    { fontSize: 34, fontWeight: 600, lineHeight: 42 },
  h4:    { fontSize: 26, fontWeight: 500, lineHeight: 34 },
  h5:    { fontSize: 22, fontWeight: 500, lineHeight: 30 },
  h6:    { fontSize: 18, fontWeight: 500, lineHeight: 26 },

  body:  { fontSize: 16, fontWeight: 400, lineHeight: 24 },
  small: { fontSize: 14, fontWeight: 400, lineHeight: 22 },

  label: { fontSize: 18, fontWeight: 400, lineHeight: 30 },
};

export default typography;
