import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Karla_300Light,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'
import { NativeBaseProvider } from 'native-base'
import { theme } from './src/theme'
import { Loading } from '@components/Loading'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'
import { Routes } from '@routes/index'
import { AuthContextProvider } from '@contexts/AuthContext'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_700Bold,
  })
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
