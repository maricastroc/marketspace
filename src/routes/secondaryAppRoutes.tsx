import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { CreateAd } from '@screens/CreateAd'
import { AppRoutes } from './app.routes'
import { MyAdPreview } from '@screens/MyAdPreview'
import { ImageDTO } from '@dtos/ImageDTO'
import { AdDetails } from '@screens/AdDetails'
import { MyAds } from '@screens/MyAds'
import { MyAdDetails } from '@screens/MyAdDetails'

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
  myads: undefined
  myaddetails: {
    id: string
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
      <Screen name="myads" component={MyAds} />
      <Screen name="myaddetails" component={MyAdDetails} />
      <Screen name="addetails" component={AdDetails} />
      <Screen name="app" component={AppRoutes} />
    </Navigator>
  )
}
