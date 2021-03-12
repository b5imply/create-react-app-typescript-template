import theme from '../styles/theme';

declare module 'styled-components/macro' {
  type CustomTheme = typeof theme;
  // This is done in order to get autocompletion for MUI theme attributes inside styled components
  export type DefaultTheme = CustomTheme;
}
