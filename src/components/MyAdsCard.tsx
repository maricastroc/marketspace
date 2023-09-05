import { HStack, Heading, Text, VStack, useTheme } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Tag, ArrowRight } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { SecondaryAppNavigatorRoutesProps } from '@routes/secondaryAppRoutes'

type Props = TouchableOpacityProps & {
  numberOfAds: number
}

export function MyAdsCard({ numberOfAds }: Props) {
  const { colors, sizes } = useTheme()

  const navigation = useNavigation<SecondaryAppNavigatorRoutesProps>()

  function handleMyAds() {
    navigation.navigate('app', { screen: 'myads' })
  }

  return (
    <TouchableOpacity onPress={handleMyAds}>
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        px={5}
        py={3}
        bgColor="rgba(54, 77, 157, 0.1)"
        borderRadius={8}
      >
        <HStack alignItems="center">
          <Tag color={colors.blue[700]} size={sizes[6]} />
          <VStack ml={4}>
            <Heading fontSize="xl" fontFamily="heading" color="gray.600">
              {numberOfAds}
            </Heading>
            <Text fontSize="sm" fontFamily="body" color="gray.600">
              active ad(s)
            </Text>
          </VStack>
        </HStack>
        <HStack alignItems="center">
          <Text fontSize="sm" fontFamily="heading" color="blue.700" mr={2}>
            My ads
          </Text>
          <ArrowRight color={colors.blue[700]} size={sizes[4]} />
        </HStack>
      </HStack>
    </TouchableOpacity>
  )
}
