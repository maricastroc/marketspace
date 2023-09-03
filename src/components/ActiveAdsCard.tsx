import { HStack, Heading, Text, VStack, useTheme } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Tag, ArrowRight } from 'phosphor-react-native'

export function ActiveAdsCard() {
  const { colors, sizes } = useTheme()

  return (
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
            4
          </Heading>
          <Text fontSize="sm" fontFamily="body" color="gray.600">
            active ads
          </Text>
        </VStack>
      </HStack>
      <TouchableOpacity>
        <HStack alignItems="center">
          <Text fontSize="sm" fontFamily="heading" color="blue.700" mr={2}>
            My ads
          </Text>
          <ArrowRight color={colors.blue[700]} size={sizes[4]} />
        </HStack>
      </TouchableOpacity>
    </HStack>
  )
}
