import { IImageProps, Image } from 'native-base'

type Props = IImageProps & {
  size: number
}

export function Avatar({ size, ...rest }: Props) {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="blue.500"
      alt=""
      {...rest}
    />
  )
}
