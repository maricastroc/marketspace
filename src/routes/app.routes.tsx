import { useTheme } from 'native-base'
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'

import { Home } from '@screens/Home'
import { MyAds } from '@screens/MyAds'

import HomeSvg from '@assets/house-regular.svg'
import AdsSvg from '@assets/tag-regular.svg'
import SignOutSvg from '@assets/sign-out-regular.svg'

import { SignIn } from '@screens/SignIn'

type SecondaryAppRoutes = {
  home: undefined
  myads: undefined
  signout: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<SecondaryAppRoutes>()

export type SecondaryAppNavigatorRoutesProps =
  BottomTabNavigationProp<SecondaryAppRoutes>

export const AppRoutes = () => {
  const { sizes, colors } = useTheme()

  const iconSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[700],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[100],
          borderTopWidth: 0,
          paddingBottom: sizes[8],
          paddingTop: sizes[8],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg
              fill={color}
              stroke={color}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="myads"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => (
            <AdsSvg
              fill={color}
              stroke={color}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="signout"
        component={SignIn}
        options={{
          tabBarIcon: ({ color }) => (
            <SignOutSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
    </Navigator>
  )
}
