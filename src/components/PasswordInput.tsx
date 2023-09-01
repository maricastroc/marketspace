/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, Icon } from 'native-base'
import { Input } from './Input'
import { Ionicons } from '@expo/vector-icons'
import { Controller } from 'react-hook-form'

type Props = {
  placeholder: string
  isPasswordVisible: boolean
  toggleVisibility: () => void
  control: any
  name: string
  errorMessage: string | undefined
}

export function PasswordInput({
  placeholder,
  isPasswordVisible,
  toggleVisibility,
  control,
  name,
  errorMessage,
}: Props) {
  return (
    <HStack position="relative">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={placeholder}
            secureTextEntry={!isPasswordVisible}
            value={value}
            onChangeText={onChange}
            errorMessage={errorMessage}
          />
        )}
      />
      <Icon
        as={Ionicons}
        name="eye-outline"
        color="gray.500"
        size={6}
        position="absolute"
        top={3}
        right={4}
        onPress={toggleVisibility}
      />
    </HStack>
  )
}
