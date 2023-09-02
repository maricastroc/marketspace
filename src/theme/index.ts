import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    blue: {
      700: '#364D9D',
      500: '#647AC7',
      300: '#7E9AFF',
    },
    gray: {
      700: '#1A181B',
      600: '#3E3A40',
      500: '#5F5B62',
      400: '#9F9BA1',
      300: '#D9D8DA',
      200: '#EDECEE',
      100: '#F7F7F8',
    },
    red: {
      300: '#EE7979',
    },
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
    light: 'Karla_300Light',
  },
  fontSizes: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    26: 110,
    33: 148,
  },
})
