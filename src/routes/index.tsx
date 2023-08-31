import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { Box, useTheme } from 'native-base'
import { AppRoutes } from './app.routes'

export function Routes() {
  const { colors } = useTheme()

  const theme = DefaultTheme

  theme.colors.background = colors.gray[100]

  return (
    <Box flex={1} bg="gray.100">
      <NavigationContainer theme={DefaultTheme}>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  )
}
