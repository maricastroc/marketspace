import { HStack, Icon, View } from 'native-base'
import { Input } from './Input'

import { Feather, Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export function SearchInput() {
  return (
    <HStack position="relative">
      <Input placeholder="Search ad" />
      <HStack position="absolute" top={3} right={4} alignItems="center">
        <TouchableOpacity>
          <Icon as={Feather} name="search" color="gray.600" size={6} />
        </TouchableOpacity>
        <View w="0.4" h={6} bgColor="gray.500" mx={3} />
        <TouchableOpacity>
          <Icon as={Ionicons} name="options" color="gray.600" size={6} />
        </TouchableOpacity>
      </HStack>
    </HStack>
  )
}
