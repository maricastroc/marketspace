import {
  Center,
  FlatList,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useToast,
} from 'native-base'
import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { Plus } from 'phosphor-react-native'

import { ActiveAdsCard } from '@components/ActiveAdsCard'
import { AdCard } from '@components/AdCard'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { SearchInput } from '@components/SearchInput'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { SecondaryAppNavigatorRoutesProps } from '@routes/secondaryAppRoutes'
import UserPhotoDefault from '@assets/userPhotoDefault.png'
import { useCallback, useState } from 'react'
import { ProductDTO } from '@dtos/ProductDTO'
import { AppError } from '@utils/AppError'
import { Loading } from '@components/Loading'

export function Home() {
  const { user } = useAuth()

  const { colors, sizes } = useTheme()

  const navigation = useNavigation<SecondaryAppNavigatorRoutesProps>()

  const [products, setProducts] = useState<ProductDTO[]>([])

  const [numberOfAds, setNumberOfAds] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  const [isLoadingSecondary, setIsLoadingSecondary] = useState(false)

  const toast = useToast()

  console.log(products)

  const testList = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
  ]

  function handleCreateAd() {
    navigation.navigate('createad')
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
          }
        } finally {
          setIsLoading(false)
        }
      }

      loadData()
    }, [toast]),
  )

  return (
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
          <ActiveAdsCard />
        </VStack>
        <VStack mt={8}>
          <Text color="gray.500" fontFamily="body" fontSize="sm" mb={3}>
            Shop for a variety of products.
          </Text>
          <SearchInput />
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
                    isNew={!item.is_new}
                    price={item.price.toString()}
                    id={item.id}
                    showProfile
                    profileImage={`${api.defaults.baseURL}/images/${item.user?.avatar}`}
                  />
                )}
              />
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  )
}
