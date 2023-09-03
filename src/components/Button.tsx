import {
  Button as ButtonNativeBase,
  HStack,
  IButtonProps,
  Text,
} from 'native-base'

import { ReactNode } from 'react'

type Props = IButtonProps & {
  title: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  icon?: ReactNode
  width?: string | number
}

export function Button({
  title,
  variant = 'primary',
  icon,
  width = 'full',
  ...rest
}: Props) {
  let bgColor
  let bgHover
  let color

  switch (variant) {
    case 'primary':
      bgColor = 'blue.500'
      bgHover = 'blue.300'
      color = 'gray.100'
      break
    case 'secondary':
      bgColor = 'gray.300'
      bgHover = 'gray.200'
      color = 'gray.900'
      break
    case 'tertiary':
      bgColor = 'gray.900'
      bgHover = 'gray.800'
      color = 'gray.100'
      break
    default:
      bgColor = 'blue.500'
      bgHover = 'blue.300'
      color = 'gray.100'
  }

  return (
    <ButtonNativeBase
      w={width}
      h={12}
      borderWidth={0}
      borderColor="transparent"
      rounded="sm"
      bg={bgColor}
      _pressed={{ bg: bgHover }}
      {...rest}
    >
      <HStack alignItems="center">
        {icon}
        <Text
          fontFamily="heading"
          fontSize="sm"
          color={color}
          ml={icon ? 2 : 0}
        >
          {title}
        </Text>
      </HStack>
    </ButtonNativeBase>
  )
}
