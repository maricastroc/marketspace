import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { Box, useTheme } from 'native-base'
import { useAuth } from '@hooks/useAuth'
import { Loading } from '@components/Loading'
import { SecondaryAppRoutes } from './secondaryAppRoutes'

export function Routes() {
  const { colors } = useTheme()
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme

  theme.colors.background = colors.gray[100]

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="gray.100">
      <NavigationContainer theme={theme}>
        {user.id ? <SecondaryAppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
