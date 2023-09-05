/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useState } from 'react'
import { Dimensions } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'

import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'

import { Button } from '@components/Button'
import { ImageDTO } from '@dtos/ImageDTO'

import { ArrowLeft, Tag } from 'phosphor-react-native'
import { SecondaryAppNavigatorRoutesProps } from '@routes/secondaryAppRoutes'
import { AdData } from '@components/AdData'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { Avatar } from '@components/Avatar'
import { PaymentMethodDTO } from '@dtos/PaymentMethodDTO'

type RouteParams = {
  id: string
  title: string
  description: string
  price: string
  images: ImageDTO[]
  paymentMethods: PaymentMethodDTO[]
  isNew: boolean
  acceptTrade: boolean
}

export function MyEditAdPreview() {
  const [isLoading, setIsLoading] = useState(false)

  const width = Dimensions.get('window').width

  const { user } = useAuth()

  const toast = useToast()

  const route = useRoute()

  const { colors, sizes } = useTheme()

  const navigation = useNavigation<SecondaryAppNavigatorRoutesProps>()

  const {
    title,
    description,
    price,
    id,
    images,
    paymentMethods,
    isNew,
    acceptTrade,
  } = route.params as RouteParams

  function handleGoBack() {
    navigation.goBack()
  }

  console.log(price)

  const handlePublish = async () => {
    setIsLoading(true)

    try {
      await api.put(`/products/${id}`, {
        name: title,
        description,
        price: parseFloat(price.replace(/[^0-9,.]/g, '')),
        payment_methods: paymentMethods,
        is_new: isNew,
        accept_trade: acceptTrade,
      })

      toast.show({
        title: 'Product successfully updated!',
        placement: 'top',
        bgColor: 'blue.500',
        duration: 2000,
      })

      navigation.navigate('app', { screen: 'home' })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Unable to update ad. Please, try again later.'

      if (isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.300',
          duration: 2000,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack bgColor="gray.200" flex={1}>
      <Center h={32} bgColor="blue.500">
        <Heading fontSize="md" color="gray.100" fontFamily="heading" pt={8}>
          Ad preview
        </Heading>
        <Text fontSize="sm" color="gray.100">
          This is how your product is going to look!
        </Text>
      </Center>
      <VStack position="relative">
        <Carousel
          loop
          width={width}
          height={280}
          autoPlay={images.length > 1}
          data={images}
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
        <VStack px={8} mt={6}>
          <HStack alignItems="center">
            <Avatar
              size={12}
              source={{
                uri: `${api.defaults.baseURL}/images/${user?.avatar}`,
              }}
              mr={3}
            />
            <Text fontSize="sm" color="gray.700">
              {capitalizeFirstLetter(user?.name)}
            </Text>
          </HStack>

          <AdData
            title={title}
            description={description}
            price={price}
            isNew={isNew}
            acceptTrade={acceptTrade}
            paymentMethods={paymentMethods}
          />
        </VStack>
      </ScrollView>

      <HStack bgColor="gray.100" px={8} py={5} mt={8}>
        <Button
          mr={4}
          variant="secondary"
          title="Return and edit"
          width="50%"
          onPress={handleGoBack}
          isLoading={isLoading}
          icon={<ArrowLeft color={colors.gray[700]} size={sizes[4]} />}
        />
        <Button
          title="Publish"
          width="47%"
          onPress={handlePublish}
          isLoading={isLoading}
          icon={<Tag color={colors.gray[100]} size={sizes[4]} />}
        />
      </HStack>
    </VStack>
  )
}
