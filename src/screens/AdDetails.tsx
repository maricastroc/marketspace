import { AdData } from '@components/AdData'
import { AdHeader } from '@components/AdHeader'
import { Avatar } from '@components/Avatar'
import { Loading } from '@components/Loading'
import { ProductDTO } from '@dtos/ProductDTO'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { SecondaryAppNavigatorRoutesProps } from '@routes/secondaryAppRoutes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import {
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

interface Props extends ProductDTO {
  user: {
    name: string
    avatar: string
  }
}

type RouteParams = {
  id: string
}

export function AdDetails() {
  const navigation = useNavigation<SecondaryAppNavigatorRoutesProps>()

  const route = useRoute()

  const width = Dimensions.get('window').width

  const { id } = route.params as RouteParams

  const [product, setProduct] = useState<Props | null>(null)

  console.log(product?.payment_methods)

  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

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
        </>
      ) : (
        <Center flex={1} justifyContent="center">
          <Loading />
        </Center>
      )}
    </VStack>
  )
}
