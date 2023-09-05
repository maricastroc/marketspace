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
import { EditAd } from '@screens/EditAd'
import { MyEditAdPreview } from '@screens/MyEditAdPreview'

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
  myeditadpreview: {
    id: string
    title: string
    description: string
    images: ImageDTO[]
    paymentMethods: string[]
    price: string
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
  editad: {
    title: string
    description: string
    paymentMethods: string[]
    price: string
    images: ImageDTO[]
    isNew: boolean
    acceptTrade: boolean
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
      <Screen name="editad" component={EditAd} />
      <Screen name="myeditadpreview" component={MyEditAdPreview} />
      <Screen name="app" component={AppRoutes} />
    </Navigator>
  )
}
