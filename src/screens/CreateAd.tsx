/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HStack,
  Heading,
  Radio,
  ScrollView,
  Switch,
  Text,
  VStack,
  useToast,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { AdHeader } from '@components/AdHeader'
import { Button } from '@components/Button'
import { EmptyImageCard } from '@components/EmptyImageCard'
import { ImageCard } from '@components/ImageCard'
import { Input } from '@components/Input'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AppError } from '@utils/AppError'
import { ImageDTO } from '@dtos/ImageDTO'
import { SecondaryAppNavigatorRoutesProps } from '@routes/secondaryAppRoutes'
import { Checkbox } from '@components/Checkbox'

const createAdSchema = yup.object({
  title: yup
    .string()
    .required('Product title is required.')
    .min(6, 'Product title must have at least 6 characters.'),
  description: yup
    .string()
    .required('Product description is required.')
    .min(20, 'Product title must have at least 20 characters.'),
  price: yup.string().required('Product price is required.'),
})

type FormDataProps = {
  title: string
  description: string
  price: string
}

export function CreateAd() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      title: '',
      description: '',
      price: '',
    },
    resolver: yupResolver(createAdSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const [isNew, setIsNew] = useState(false)

  const [acceptTrade, setAcceptTrade] = useState(false)

  const [images, setImages] = useState<ImageDTO[]>([])

  const [paymentMethods, setPaymentMethods] = useState<string[]>([])

  const navigation = useNavigation<SecondaryAppNavigatorRoutesProps>()

  const toast = useToast()

  function handleGoBack() {
    navigation.goBack()
  }

  function handlePaymentMethodSelection(method: string) {
    const updatedPaymentMethods = [...paymentMethods]

    if (updatedPaymentMethods.includes(method)) {
      updatedPaymentMethods.splice(updatedPaymentMethods.indexOf(method), 1)
    } else {
      updatedPaymentMethods.push(method)
    }

    setPaymentMethods(updatedPaymentMethods)
  }

  const handleGoPreview = ({ title, description, price }: FormDataProps) => {
    if (images.length === 0) {
      return toast.show({
        title: 'Please, select at least one image of your product.',
        placement: 'top',
        bgColor: 'red.300',
        duration: 2000,
      })
    }

    if (paymentMethods.length === 0) {
      return toast.show({
        title: 'Please, select at least one payment method.',
        placement: 'top',
        bgColor: 'red.300',
        duration: 2000,
      })
    }

    navigation.navigate('myadpreview', {
      title,
      description,
      price,
      images,
      paymentMethods,
      isNew,
      acceptTrade,
    })
  }

  const handleAdSelectedPhoto = async () => {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [16, 9],
        allowsEditing: true,
      })

      if (selectedPhoto.canceled) {
        return
      }

      if (images.length > 2) {
        throw new AppError('You can select a maximum of only 3 photos.')
      }

      if (selectedPhoto.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          selectedPhoto.assets[0].uri,
        )

        if (photoInfo.exists && photoInfo.size) {
          const fileSizeInMB = photoInfo.size / (1024 * 1024)

          if (fileSizeInMB > 5) {
            return toast.show({
              title: 'This image is too big. Please, choose a photo up to 5MB.',
              placement: 'top',
              bgColor: 'red.300',
              duration: 2000,
            })
          }
        }

        const fileExtension = selectedPhoto.assets[0].uri.split('.').pop()

        const photoFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri: selectedPhoto.assets[0].uri,
          type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
        } as any

        setImages((images) => {
          return [...images, photoFile]
        })
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Unable to select image. Please, try again!'

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

  function handleRemoveImage(uri: string) {
    const imagesWithoutRemovedOne = images.filter((image) => {
      return image.uri !== uri
    })

    setImages(imagesWithoutRemovedOne)
  }

  return (
    <VStack bgColor="gray.200" flex={1}>
      <AdHeader title="Create Ad" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack px={8} bgColor="gray.200">
          <VStack mt={8}>
            <Heading fontSize="md" fontFamily="heading">
              Images
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Choose up to 3 images to show how awesome your product is!
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <HStack mt={4}>
                <EmptyImageCard onPress={handleAdSelectedPhoto} />
                {images.length > 0 &&
                  images.map((imageData) => (
                    <ImageCard
                      source={{
                        uri: imageData.uri,
                      }}
                      key={imageData.uri}
                      onDelete={handleRemoveImage}
                      uri={imageData.uri}
                    />
                  ))}
              </HStack>
            </ScrollView>
          </VStack>

          <VStack mt={8}>
            <Heading fontSize="md" fontFamily="heading" mb={4}>
              About the product
            </Heading>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Title"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.title?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <Input
                  bigSize={true}
                  placeholder="Description"
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical="top"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.description?.message}
                />
              )}
            />
          </VStack>

          <Radio.Group
            name="productCondition"
            value={isNew ? 'new' : 'used'}
            onChange={(nextValue) => {
              setIsNew(nextValue === 'new')
            }}
          >
            <HStack>
              <Radio value="new" size="sm">
                <Text color="gray.600" fontSize="md">
                  New Product
                </Text>
              </Radio>
              <Radio value="used" ml={6} size="sm">
                <Text color="gray.600" fontSize="md">
                  Used Product
                </Text>
              </Radio>
            </HStack>
          </Radio.Group>

          <VStack mt={8}>
            <Heading fontSize="md" fontFamily="heading" mb={4}>
              Selling ($)
            </Heading>
            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="10.00"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.price?.message}
                />
              )}
            />
          </VStack>

          <VStack mt={4}>
            <Heading fontSize="md" fontFamily="heading" mb={3}>
              Accept change?
            </Heading>
            <Switch
              onToggle={(value) => setAcceptTrade(value)}
              value={acceptTrade}
              size="md"
              m={0}
            />
          </VStack>

          <VStack mt={5}>
            <Heading fontSize="md" fontFamily="heading" mb={1}>
              Accepted payment methods
            </Heading>

            <VStack>
              <Checkbox
                value="Bank Slip"
                selected={paymentMethods.includes('bank slip')}
                onPress={() => handlePaymentMethodSelection('bank slip')}
              />
              <Checkbox
                value="Pix"
                selected={paymentMethods.includes('pix')}
                onPress={() => handlePaymentMethodSelection('pix')}
              />
              <Checkbox
                value="Cash"
                selected={paymentMethods.includes('cash')}
                onPress={() => handlePaymentMethodSelection('cash')}
              />
              <Checkbox
                value="Credit Card"
                selected={paymentMethods.includes('card')}
                onPress={() => handlePaymentMethodSelection('card')}
              />
              <Checkbox
                value="Deposit"
                selected={paymentMethods.includes('deposit')}
                onPress={() => handlePaymentMethodSelection('deposit')}
              />
            </VStack>
          </VStack>
        </VStack>

        <HStack bgColor="gray.100" px={8} py={5} mt={8}>
          <Button
            mr={4}
            variant="secondary"
            title="Cancel"
            width="50%"
            isLoading={isLoading}
            onPress={handleGoBack}
          />
          <Button
            variant="tertiary"
            title="Next"
            width="47%"
            isLoading={isLoading}
            onPress={handleSubmit(handleGoPreview)}
          />
        </HStack>
      </ScrollView>
    </VStack>
  )
}
