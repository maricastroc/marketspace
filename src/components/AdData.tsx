import { Heading, HStack, IStackProps, Text, VStack, View } from 'native-base'
import { PaymentMethod } from './PaymentMethod'
import { formatPrice } from '@utils/formatPrice'
import { PaymentMethodDTO } from '@dtos/PaymentMethodDTO'

type Props = IStackProps & {
  title: string
  description: string
  price: string
  acceptTrade: boolean
  isNew: boolean
  paymentMethods: PaymentMethodDTO[]
}

export function AdData({
  title,
  description,
  price,
  acceptTrade,
  isNew,
  paymentMethods,
}: Props) {
  return (
    <VStack mt={6}>
      <View
        bgColor={isNew ? 'blue.500' : 'gray.300'}
        w={10}
        py={0.5}
        alignItems="center"
        justifyContent="center"
        borderRadius={8}
      >
        <Text fontSize="xxs" color={isNew ? 'gray.100' : 'gray.600'}>
          {isNew ? 'NEW' : 'USED'}
        </Text>
      </View>
      <VStack>
        <HStack justifyContent="space-between" mt={2}>
          <Heading
            maxWidth="70%"
            fontSize="xl"
            fontFamily="heading"
            color="gray.700"
          >
            {title}
          </Heading>
          <HStack alignItems="center">
            <Text color="blue.500" fontSize="sm" mr={1}>
              $
            </Text>
            <Heading color="blue.500" fontSize="xl" fontFamily="heading">
              {formatPrice(parseFloat(price))}
            </Heading>
          </HStack>
        </HStack>
        <Text fontSize="sm" color="gray.600" lineHeight="sm" mt={2}>
          {description}
        </Text>

        <HStack alignItems="center" mt={3}>
          <Heading color="gray.700" fontSize="sm" fontFamily="heading" mr={1}>
            Accepts trade?
          </Heading>
          <Text fontSize="sm" color="gray.600">
            {acceptTrade ? 'Yes' : 'No'}
          </Text>
        </HStack>

        <VStack mt={3}>
          <Heading color="gray.700" fontSize="sm" fontFamily="heading" mr={1}>
            Payment Methods:
          </Heading>
          <VStack mt={2}>
            {paymentMethods.map((method) => {
              return <PaymentMethod key={method.key} name={method.name} />
            })}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
