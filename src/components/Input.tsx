import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null
  bigSize?: boolean
}

export function Input({
  errorMessage,
  isInvalid,
  bigSize = false,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.100"
        h={bigSize ? 40 : 12}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="gray.600"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.300',
        }}
        _focus={{
          bgColor: 'gray.100',
          borderWidth: 1,
          borderColor: 'blue.700',
        }}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: 'red.300' }} mt={1}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
