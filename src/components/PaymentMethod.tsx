import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { HStack, IStackProps, Text, useTheme } from 'native-base'
import { Bank, Money, Barcode, QrCode, CreditCard } from 'phosphor-react-native'

type Props = IStackProps & {
  name: string
}

export function PaymentMethod({ name }: Props) {
  const { colors, sizes } = useTheme()
  let iconToRender = null

  switch (name.toLowerCase()) {
    case 'cash':
      iconToRender = <Money size={sizes[5]} color={colors.gray[600]} />
      break
    case 'deposit':
      iconToRender = <Bank size={sizes[5]} color={colors.gray[600]} />
      break
    case 'bank_slip':
      iconToRender = <Barcode size={sizes[5]} color={colors.gray[600]} />
      break
    case 'pix':
      iconToRender = <QrCode size={sizes[5]} color={colors.gray[600]} />
      break
    case 'credit card':
      iconToRender = <CreditCard size={sizes[5]} color={colors.gray[600]} />
      break
    default:
      iconToRender = <Money size={sizes[5]} color={colors.gray[100]} />
      break
  }

  return (
    <HStack alignItems="center" mt={1}>
      {iconToRender}
      <Text ml={2}>{capitalizeFirstLetter(name)}</Text>
    </HStack>
  )
}
