import { HStack, Heading, Icon, Text, VStack } from 'native-base'

import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export function ActiveAdsCard() {
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
        <Icon as={Feather} name="tag" color="blue.700" size={6} mr={4} />
        <VStack>
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
          <Icon as={Feather} name="arrow-right" color="blue.700" size={4} />
        </HStack>
      </TouchableOpacity>
    </HStack>
  )
}
