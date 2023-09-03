import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { CreateAd } from '@screens/CreateAd'
import { AppRoutes } from './app.routes'
import { MyAdPreview } from '@screens/MyAdPreview'
import { ImageDTO } from '@dtos/ImageDTO'
import { AdDetails } from '@screens/AdDetails'

type SecondaryAppRoutes = {
  app: {
    screen: 'myads' | 'home' | 'getout'
  }
  createad: undefined
  myadpreview: {
    title: string
    description: string
    paymentMethods: string[]
    price: string
    images: ImageDTO[]
    isNew: boolean
    acceptTrade: boolean
  }
  addetails: {
    id: string
  }
}

export type SecondaryAppNavigatorRoutesProps =
  NativeStackNavigationProp<SecondaryAppRoutes>

const { Navigator, Screen } = createNativeStackNavigator<SecondaryAppRoutes>()

export function SecondaryAppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="app">
      <Screen name="createad" component={CreateAd} />
      <Screen name="myadpreview" component={MyAdPreview} />
      <Screen name="addetails" component={AdDetails} />
      <Screen name="app" component={AppRoutes} />
    </Navigator>
  )
}
