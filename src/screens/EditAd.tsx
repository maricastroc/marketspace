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
import { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { AdHeader } from '@components/AdHeader'
import { Button } from '@components/Button'
import { ImageCard } from '@components/ImageCard'
import { Input } from '@components/Input'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SecondaryAppNavigatorRoutesProps } from '@routes/secondaryAppRoutes'
import { Checkbox } from '@components/Checkbox'
import { api } from '@services/api'

const editAdSchema = yup.object({
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

type RouteParams = {
  title: string
  description: string
  price: string
  images: any[]
  paymentMethods: string[]
  isNew: boolean
  acceptTrade: boolean
  id: string
}

export function EditAd() {
  const route = useRoute()

  const {
    title,
    description,
    price,
    images: preImages,
    paymentMethods: prePaymentMethods,
    isNew: preIsNew,
    acceptTrade: preAcceptTrade,
    id,
  } = route.params as RouteParams

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      title,
      description,
      price,
    },
    resolver: yupResolver(editAdSchema),
  })

  const [isNew, setIsNew] = useState(preIsNew)

  const [acceptTrade, setAcceptTrade] = useState(preAcceptTrade)

  const [paymentMethods, setPaymentMethods] =
    useState<string[]>(prePaymentMethods)

  const navigation = useNavigation<SecondaryAppNavigatorRoutesProps>()

  const toast = useToast()

  const handleGoBack = () => {
    navigation.navigate('myaddetails', { id })
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
    if (paymentMethods.length === 0) {
      return toast.show({
        title: 'Please, select at least one payment method.',
        placement: 'top',
        bgColor: 'red.300',
        duration: 2000,
      })
    }

    navigation.navigate('myeditadpreview', {
      id,
      title,
      description,
      price,
      paymentMethods,
      isNew,
      acceptTrade,
      images: preImages,
    })
  }

  return (
    <VStack bgColor="gray.200" flex={1}>
      <AdHeader title="Edit Ad" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack px={8} bgColor="gray.200">
          <VStack mt={8}>
            <Heading fontSize="md" fontFamily="heading">
              Images
            </Heading>
            <Text fontSize="sm" color="gray.500">
              These are your product images.
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <HStack mt={4}>
                {preImages.length > 0 &&
                  preImages.map((imageData) => (
                    <ImageCard
                      source={{
                        uri: `${api.defaults.baseURL}/images/${imageData.path}`,
                      }}
                      key={imageData.path}
                      uri={imageData.uri ?? imageData.path}
                      showDeleteOption={false}
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
              Selling (R$)
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
                  keyboardType="numeric"
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
            onPress={handleGoBack}
          />
          <Button
            variant="tertiary"
            title="Next"
            width="47%"
            onPress={handleSubmit(handleGoPreview)}
          />
        </HStack>
      </ScrollView>
    </VStack>
  )
}
