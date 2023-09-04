/* eslint-disable react-hooks/exhaustive-deps */
import {
  Center,
  FlatList,
  HStack,
  Heading,
  Icon,
  Modal,
  ScrollView,
  Text,
  VStack,
  View,
  useTheme,
  useToast,
} from 'native-base'
import { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { SecondaryAppNavigatorRoutesProps } from '@routes/secondaryAppRoutes'
import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { AppError } from '@utils/AppError'
import { ProductDTO } from '@dtos/ProductDTO'

import UserPhotoDefault from '@assets/userPhotoDefault.png'
import { Plus } from 'phosphor-react-native'
import { AntDesign } from '@expo/vector-icons'

import { Loading } from '@components/Loading'
import { Checkbox } from '@components/Checkbox'
import { MyAdsCard } from '@components/MyAdsCard'
import { AdCard } from '@components/AdCard'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { SearchInput } from '@components/SearchInput'

import { useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type FormDataProps = {
  search?: string | undefined
}

const searchSchema = yup.object({
  search: yup.string().optional(),
})

export function Home() {
  const { user, signOut } = useAuth()

  const { colors, sizes } = useTheme()

  const navigation = useNavigation<SecondaryAppNavigatorRoutesProps>()

  const [products, setProducts] = useState<ProductDTO[]>([])

  const [numberOfAds, setNumberOfAds] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  const [isLoadingSecondary, setIsLoadingSecondary] = useState(false)

  const [showFiltersModal, setShowFiltersModal] = useState(false)

  const [filters, setFilters] = useState({
    showFiltersModal: false,
    showNewProducts: true,
    showAcceptTradeProducts: true,
    paymentMethods: ['pix', 'bank slip', 'cash', 'deposit', 'card'],
  })

  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      search: '',
    },
    resolver: yupResolver(searchSchema),
  })

  function handleSetShowFiltersModal() {
    setShowFiltersModal(!showFiltersModal)
  }

  function handleResetFilters() {
    setFilters({
      ...filters,
      showNewProducts: true,
      showAcceptTradeProducts: true,
      paymentMethods: ['pix', 'bank slip', 'cash', 'deposit', 'card'],
    })
  }

  function handlePaymentMethodSelection(method: string) {
    setFilters((prevFilters) => {
      const updatedPaymentMethods = prevFilters.paymentMethods.includes(method)
        ? prevFilters.paymentMethods.filter((item) => item !== method)
        : [...prevFilters.paymentMethods, method]

      return {
        ...prevFilters,
        paymentMethods: updatedPaymentMethods,
      }
    })
  }

  function handleCreateAd() {
    navigation.navigate('createad')
  }

  async function handleApplyFilters({ search }: FormDataProps) {
    setShowFiltersModal(false)

    try {
      let queryParams = ''

      if (!filters.showAcceptTradeProducts) {
        queryParams += '&accept_trade=false'
      }

      if (!filters.showNewProducts) {
        queryParams += '&is_new=false'
      }

      filters.paymentMethods.forEach((item) => {
        const encodedItem = encodeURIComponent(item)
        queryParams += `&payment_methods=${encodedItem}`
      })

      if (search && search.length > 0) {
        queryParams += `&query=${search}`
      }

      setIsLoadingSecondary(true)

      const productsData = await api.get(`/products/?${queryParams}`)

      setProducts(productsData.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Unable to load products. Please, try again later.'

      if (isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.300',
          duration: 2000,
        })
      }
    } finally {
      setIsLoadingSecondary(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const productsData = await api.get(`/users/products`)
          const generalProductsData = await api.get('/products')

          setProducts(generalProductsData.data)
          setNumberOfAds(productsData.data.length)
        } catch (error) {
          const isAppError = error instanceof AppError
          const title = isAppError
            ? error.message
            : 'Unable to load products. Please, try again later.'

          if (isAppError) {
            toast.show({
              title,
              placement: 'top',
              bgColor: 'red.300',
            })

            signOut()
          }
        } finally {
          setIsLoading(false)
        }
      }

      handleResetFilters()

      loadData()
    }, [toast]),
  )

  return (
    <>
      <VStack bgColor="gray.200" flex={1} pt={16} px={6}>
        <VStack>
          <HStack justifyContent="space-between">
            <HStack>
              <Avatar
                size={12}
                source={
                  user?.avatar
                    ? {
                        uri: `${api.defaults.baseURL}/images/${user?.avatar}`,
                      }
                    : UserPhotoDefault
                }
                mr={3}
              />
              <VStack>
                <Text color="gray.700" fontFamily="body" fontSize="md">
                  Welcome,
                </Text>
                <Heading color="gray.700" fontFamily="heading" fontSize="md">
                  {capitalizeFirstLetter(user?.name)}!
                </Heading>
              </VStack>
            </HStack>
            <Button
              variant="tertiary"
              w={32}
              title="Create ad"
              icon={<Plus color={colors.gray[100]} size={sizes[4]} />}
              onPress={handleCreateAd}
            />
          </HStack>
          <VStack mt={8}>
            <Text color="gray.500" fontFamily="body" fontSize="sm" mb={3}>
              Your products advertised for sale
            </Text>
            <MyAdsCard numberOfAds={numberOfAds} />
          </VStack>
          <VStack mt={8}>
            <Text color="gray.500" fontFamily="body" fontSize="sm" mb={3}>
              Shop for a variety of products.
            </Text>
            <SearchInput
              control={control}
              errorMessage={errors.search?.message}
              showFiltersModal={handleSetShowFiltersModal}
            />
          </VStack>
          <ScrollView pb={64} showsVerticalScrollIndicator={false}>
            <VStack pb={64}>
              {isLoadingSecondary ? (
                <Center flex={1} justifyContent="center">
                  <Loading />
                </Center>
              ) : (
                <FlatList
                  flex={1}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                  numColumns={2}
                  data={products}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <AdCard
                      width="40"
                      title={item.name}
                      image={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
                      isActive={item.is_active}
                      isNew={item.is_new}
                      price={item.price.toString()}
                      id={item.id}
                      showProfile
                      profileImage={`${api.defaults.baseURL}/images/${item.user?.avatar}`}
                    />
                  )}
                  ListEmptyComponent={() => (
                    <Center>
                      {filters.showNewProducts &&
                      filters.showAcceptTradeProducts &&
                      filters.paymentMethods.length === 5 ? (
                        <Text color="gray.600" textAlign="center">
                          It looks like no products have been announced yet!
                        </Text>
                      ) : (
                        <Text color="gray.600" textAlign="center">
                          It looks like no products with these filters have been
                          announced yet!
                        </Text>
                      )}
                    </Center>
                  )}
                />
              )}
            </VStack>
          </ScrollView>
        </VStack>
      </VStack>
      <Modal
        isOpen={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        size="xl"
      >
        <Modal.Content marginBottom="5" marginTop="auto">
          <Modal.CloseButton />
          <Modal.Header>
            <Heading color="gray.700" fontSize="xl" fontFamily="heading">
              Filter ads
            </Heading>
          </Modal.Header>

          <Modal.Body alignItems="flex-start" mb="5">
            <Heading color="gray.700" fontSize="md" my={2} fontFamily="heading">
              Condition
            </Heading>

            <HStack>
              {filters.showNewProducts && (
                <View
                  bgColor="blue.500"
                  borderRadius={8}
                  px={2}
                  py={1}
                  mr={3}
                  w={16}
                  alignItems="center"
                  justifyContent="center"
                >
                  <HStack alignItems="center">
                    <Text
                      fontSize="xs"
                      fontFamily="heading"
                      color="gray.100"
                      mr={2}
                    >
                      NEW
                    </Text>
                    <Icon
                      as={AntDesign}
                      name="closecircle"
                      color="gray.100"
                      size={3}
                      top={0}
                      onPress={() =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          showNewProducts: false,
                        }))
                      }
                    />
                  </HStack>
                </View>
              )}
              <View
                bgColor="gray.300"
                borderRadius={8}
                px={2}
                py={1}
                w={16}
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="xs" fontFamily="heading" color="gray.500">
                  USED
                </Text>
              </View>
            </HStack>

            <Heading
              color="gray.700"
              fontSize="md"
              mt={5}
              fontFamily="heading"
              my={2}
            >
              Accept Trade?
            </Heading>

            <HStack>
              {filters.showAcceptTradeProducts && (
                <View
                  bgColor="blue.500"
                  borderRadius={8}
                  px={2}
                  py={1}
                  mr={3}
                  w={16}
                  alignItems="center"
                  justifyContent="center"
                >
                  <HStack alignItems="center">
                    <Text
                      fontSize="xs"
                      fontFamily="heading"
                      color="gray.100"
                      mr={2}
                    >
                      YES
                    </Text>
                    <Icon
                      as={AntDesign}
                      name="closecircle"
                      color="gray.100"
                      size={3}
                      top={0}
                      onPress={() =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          showAcceptTradeProducts: false,
                        }))
                      }
                    />
                  </HStack>
                </View>
              )}
              <View
                bgColor="gray.300"
                borderRadius={8}
                px={2}
                py={1}
                w={16}
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="xs" fontFamily="heading" color="gray.500">
                  NO
                </Text>
              </View>
            </HStack>

            <VStack mt={5}>
              <Heading fontSize="md" fontFamily="heading" mb={1}>
                Accepted payment methods
              </Heading>

              <VStack>
                <Checkbox
                  value="Bank Slip"
                  selected={filters.paymentMethods.includes('bank slip')}
                  onPress={() => handlePaymentMethodSelection('bank slip')}
                />
                <Checkbox
                  value="Pix"
                  selected={filters.paymentMethods.includes('pix')}
                  onPress={() => handlePaymentMethodSelection('pix')}
                />
                <Checkbox
                  value="Cash"
                  selected={filters.paymentMethods.includes('cash')}
                  onPress={() => handlePaymentMethodSelection('cash')}
                />
                <Checkbox
                  value="Credit Card"
                  selected={filters.paymentMethods.includes('card')}
                  onPress={() => handlePaymentMethodSelection('card')}
                />
                <Checkbox
                  value="Deposit"
                  selected={filters.paymentMethods.includes('deposit')}
                  onPress={() => handlePaymentMethodSelection('deposit')}
                />
              </VStack>
            </VStack>
          </Modal.Body>

          <Modal.Footer>
            <HStack
              w="full"
              py={2}
              px={5}
              bg="white"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                variant="secondary"
                title="Reset Filters"
                w="47%"
                onPress={handleResetFilters}
                isLoading={isLoading}
              />
              <Button
                title="Apply Filters"
                w="47%"
                onPress={handleSubmit(handleApplyFilters)}
                isLoading={isLoading}
              />
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
