import { HStack, Icon, Text, View } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  selected?: boolean
  value: string
}

export function Checkbox({ selected = false, value, ...rest }: Props) {
  const checkboxStyles = {
    selected: {
      bgColor: 'blue.500',
      iconColor: 'gray.100',
      borderColor: 'transparent',
      textColor: 'gray.600',
    },
    unselected: {
      bgColor: 'transparent',
      iconColor: 'transparent',
      borderColor: 'gray.400',
      textColor: 'gray.700',
    },
  }

  const checkboxStyle = selected
    ? checkboxStyles.selected
    : checkboxStyles.unselected

  return (
    <TouchableOpacity {...rest}>
      <HStack alignItems="center" mt={1}>
        <View
          bgColor={checkboxStyle.bgColor}
          w={5}
          h={5}
          alignItems="center"
          justifyContent="center"
          borderColor={checkboxStyle.borderColor}
          borderWidth={2}
        >
          {selected && (
            <Icon
              as={MaterialIcons}
              name="check"
              color={checkboxStyle.iconColor}
              size={4}
            />
          )}
        </View>
        <Text fontSize="md" color={checkboxStyle.textColor} ml={2}>
          {value}
        </Text>
      </HStack>
    </TouchableOpacity>
  )
}
