import { Icon, View } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

export function EmptyImageCard({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...rest}>
      <View
        justifyContent="center"
        alignItems="center"
        w={24}
        h={24}
        mr={2}
        bgColor="gray.300"
        borderRadius={12}
      >
        <Icon as={AntDesign} name="plus" color="gray.400" size={8} />
      </View>
    </TouchableOpacity>
  )
}
