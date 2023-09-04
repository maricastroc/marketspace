import {
  Center,
  HStack,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useToast,
} from 'native-base'
import { useEffect, useState } from 'react'
import { Dimensions, Linking } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'
import { WhatsappLogo } from 'phosphor-react-native'

import { ProductDTO } from '@dtos/ProductDTO'
import { AppError } from '@utils/AppError'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { api } from '@services/api'
import { formatPrice } from '@utils/formatPrice'

import { AdData } from '@components/AdData'
import { AdHeader } from '@components/AdHeader'
import { Avatar } from '@components/Avatar'
import { Loading } from '@components/Loading'
import { Button } from '@components/Button'

interface Props extends ProductDTO {
  user: {
    name: string
    avatar: string
    tel: number
  }
}

type RouteParams = {
  id: string
}

export function AdDetails() {
  const route = useRoute()

  const width = Dimensions.get('window').width

  const { id } = route.params as RouteParams

  const [product, setProduct] = useState<Props | null>(null)

  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const { colors, sizes } = useTheme()

  const handleGetInTouch = () => {
    if (product && product.user && product?.user?.tel) {
      const phoneNumber = product.user.tel
      const whatsappLink = `whatsapp://send?phone=${phoneNumber}`

      Linking.canOpenURL(whatsappLink)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(whatsappLink)
          } else {
            toast.show({
              title: 'WhatsApp is not installed on your device.',
              placement: 'top',
              bgColor: 'red.300',
            })
          }
        })
        .catch((error) => {
          console.error('Error opening WhatsApp:', error)
          toast.show({
            title: 'An error occurred while opening WhatsApp.',
            placement: 'top',
            bgColor: 'red.300',
          })
        })
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await api.get(`products/${id}`)

        setProduct(productData.data)
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? error.message
          : 'Unable to load product details. Please, try again later.'

        if (isAppError) {
          toast.show({
            title,
            placement: 'top',
            bgColor: 'red.300',
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [toast, id])

  return (
    <VStack bgColor="gray.200" flex={1}>
      {product !== null ? (
        <>
          <AdHeader showTitle={false} mb={4} />
          <VStack position="relative">
            <Carousel
              loop
              width={width}
              height={280}
              autoPlay={product.product_images.length > 1}
              data={product?.product_images}
              scrollAnimationDuration={3000}
              renderItem={({ item }) => (
                <Image
                  w="full"
                  h={80}
                  source={{
                    uri: item.uri
                      ? item.uri
                      : `${api.defaults.baseURL}/images/${item.path}`,
                  }}
                  alt="Ad Image"
                  resizeMode="cover"
                  borderColor="gray.400"
                  borderWidth={1}
                />
              )}
            />
          </VStack>
          <ScrollView>
            <VStack px={8} mt={6} mb={8}>
              <HStack alignItems="center">
                <Avatar
                  size={12}
                  source={{
                    uri: `${api.defaults.baseURL}/images/${product.user?.avatar}`,
                  }}
                  mr={3}
                />
                <Text fontSize="sm" color="gray.700">
                  {capitalizeFirstLetter(product.user.name)}
                </Text>
              </HStack>
              <AdData
                title={product.name}
                description={product.description}
                price={product.price}
                isNew={product.is_new}
                acceptTrade={product.accept_trade}
                paymentMethods={product.payment_methods}
              />
            </VStack>
          </ScrollView>
          <HStack
            px={8}
            py={6}
            bgColor="gray.100"
            justifyContent="space-between"
          >
            <HStack alignItems="center">
              <Text fontSize="sm" color="blue.500" fontFamily="heading">
                $
              </Text>
              <Heading fontSize="xxl" color="blue.500" fontFamily="heading">
                {formatPrice(parseFloat(product.price))}
              </Heading>
            </HStack>
            <Button
              w={40}
              title="Get in touch"
              icon={<WhatsappLogo color={colors.gray[100]} size={sizes[4]} />}
              onPress={handleGetInTouch}
              isLoading={isLoading}
            />
          </HStack>
        </>
      ) : (
        <Center flex={1} justifyContent="center">
          <Loading />
        </Center>
      )}
    </VStack>
  )
}
