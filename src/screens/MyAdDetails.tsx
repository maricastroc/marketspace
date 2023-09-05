import {
  Center,
  HStack,
  Heading,
  Image,
  Modal,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useToast,
} from 'native-base'
import { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'

import {
  PencilSimpleLine,
  Power,
  TrashSimple,
  ArrowLeft,
} from 'phosphor-react-native'

import { ProductDTO } from '@dtos/ProductDTO'
import { AppError } from '@utils/AppError'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { api } from '@services/api'

import { AdData } from '@components/AdData'
import { Avatar } from '@components/Avatar'
import { Loading } from '@components/Loading'
import { Button } from '@components/Button'
import { SecondaryAppNavigatorRoutesProps } from '@routes/secondaryAppRoutes'

interface Props extends ProductDTO {
  id: string
  user: {
    name: string
    avatar: string
    tel: number
  }
}

type RouteParams = {
  id: string
}

export function MyAdDetails() {
  const route = useRoute()

  const width = Dimensions.get('window').width

  const { id } = route.params as RouteParams

  const [product, setProduct] = useState<Props | null>(null)

  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<SecondaryAppNavigatorRoutesProps>()

  const [showRemoveModal, setShowRemoveModal] = useState(false)

  const [isDeletingLoading, setIsDeletingLoading] = useState(false)

  const { colors, sizes } = useTheme()

  function handleGoBack() {
    navigation.goBack()
  }

  console.log(product?.product_images)

  function handleEditAd() {
    product &&
      navigation.navigate('editad', {
        title: product.name,
        description: product.description,
        price: product.price.toString(),
        images: product.product_images,
        paymentMethods: product.payment_methods.map((item) => item.key),
        isNew: product.is_new,
        acceptTrade: product.accept_trade,
        id: product.id,
      })
  }

  const handleDeleteAd = async () => {
    try {
      setIsDeletingLoading(true)
      await api.delete(`products/${id}`)

      navigation.navigate('app', { screen: 'myads' })

      toast.show({
        title: 'Ad successfully deleted!',
        placement: 'top',
        bgColor: 'red.300',
        duration: 2000,
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Unable to delete ad. Please, try again later.'

      if (isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.300',
          duration: 2000,
        })
      }
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
          <HStack
            alignItems="center"
            justifyContent="space-between"
            pt={16}
            pb={4}
            px={8}
            bgColor="gray.200"
          >
            <TouchableOpacity onPress={handleGoBack}>
              <ArrowLeft size={sizes[6]} color={colors.gray[700]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEditAd}>
              <PencilSimpleLine size={sizes[6]} color={colors.gray[700]} />
            </TouchableOpacity>
          </HStack>
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
            <VStack px={8} pt={2} pb={6} bgColor="gray.200">
              {product.is_active ? (
                <Button
                  variant="tertiary"
                  w="full"
                  title="Deactivate ad"
                  icon={<Power color={colors.gray[100]} size={sizes[4]} />}
                  isLoading={isLoading}
                />
              ) : (
                <Button
                  variant="primary"
                  w="full"
                  title="Activate ad"
                  icon={<Power color={colors.gray[100]} size={sizes[4]} />}
                  isLoading={isLoading}
                />
              )}
              <Button
                variant="secondary"
                mt={3}
                w="full"
                title="Delete Ad"
                icon={<TrashSimple color={colors.gray[600]} size={sizes[4]} />}
                onPress={() => setShowRemoveModal(true)}
                isLoading={isDeletingLoading || isLoading}
              />
            </VStack>
          </ScrollView>
          <Modal
            isOpen={showRemoveModal}
            onClose={() => setShowRemoveModal(false)}
            size="md"
          >
            <Modal.Content px={5} py={6}>
              <Center>
                <Heading fontSize="lg" fontFamily="heading">
                  Delete Ad
                </Heading>
                <Text fontSize="md" mt={2} lineHeight="sm">
                  Are you sure you want to delete this ad? This action cannot be
                  undone!
                </Text>
                <VStack w="full" mt={6}>
                  <Button title="Yes, delete it!" onPress={handleDeleteAd} />
                  <Button
                    title="No, take me back!"
                    mt={3}
                    variant="secondary"
                    onPress={() => setShowRemoveModal(false)}
                  />
                </VStack>
              </Center>
            </Modal.Content>
          </Modal>
        </>
      ) : (
        <Center flex={1} justifyContent="center">
          <Loading />
        </Center>
      )}
    </VStack>
  )
}
