/* eslint-disable react-hooks/exhaustive-deps */
import { AdCard } from '@components/AdCard'
import { AdHeader } from '@components/AdHeader'
import { Loading } from '@components/Loading'
import { ProductDTO } from '@dtos/ProductDTO'
import { useAuth } from '@hooks/useAuth'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  Center,
  FlatList,
  HStack,
  Icon,
  ScrollView,
  Select,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { useCallback, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'

export function MyAds() {
  const { signOut } = useAuth()

  const toast = useToast()

  const [products, setProducts] = useState<ProductDTO[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const [adType, setAdType] = useState('all')

  const filter = adType === 'active'

  const filteredProducts = products.filter((product) => {
    if (adType === 'all') {
      return true
    }

    return product.is_active === filter
  })

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          setIsLoading(true)

          const productsData = await api.get(`/users/products`)

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
            })

            signOut()
          }
        } finally {
          setIsLoading(false)
        }
      }

      loadData()
    }, [toast]),
  )

  return (
    <VStack bgColor="gray.200" flex={1}>
      <AdHeader title="My Ads" orientation="right" />
      <VStack px={8}>
        <HStack
          mt={10}
          mb={5}
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="sm" color="gray.600">
            {products.length} ad(s)
          </Text>
          <Select
            selectedValue={adType}
            placeholder="Choose a type"
            minWidth="110"
            dropdownCloseIcon={
              <Icon
                as={AntDesign}
                name="down"
                color="gray.700"
                size={4}
                mr={2}
              />
            }
            dropdownOpenIcon={
              <Icon
                as={AntDesign}
                name="down"
                color="gray.700"
                size={4}
                mr={2}
              />
            }
            color="gray.500"
            onValueChange={(itemValue) => setAdType(itemValue)}
            _selectedItem={{
              borderColor: 'blue.500',
              borderWidth: 2,
              borderRadius: 8,
            }}
          >
            <Select.Item label="All" value="all" />
            <Select.Item label="Active" value="active" />
            <Select.Item label="Inactive" value="inactive" />
          </Select>
        </HStack>
        <ScrollView pb={64} showsVerticalScrollIndicator={false}>
          <VStack pb={64}>
            {isLoading ? (
              <Center flex={1} justifyContent="center">
                <Loading />
              </Center>
            ) : (
              <FlatList
                flex={1}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <AdCard
                    title={item.name}
                    image={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
                    isActive={item.is_active}
                    isNew={item.is_new}
                    price={item.price.toString()}
                    id={item.id}
                    showProfile={false}
                    isFromLoggedUser={true}
                    profileImage={`${api.defaults.baseURL}/images/${item.user?.avatar}`}
                  />
                )}
                ListEmptyComponent={() => (
                  <Center flex={1}>
                    {adType === 'all' && (
                      <Text color="gray.300" textAlign="center">
                        You haven&apos;t created any ads yet. {'\n'}
                        Click + to create your first one!
                      </Text>
                    )}
                    {adType === 'active' && (
                      <Text color="gray.300" textAlign="center">
                        You have no active product!
                      </Text>
                    )}
                    {adType === 'inactive' && (
                      <Text color="gray.300" textAlign="center">
                        You have no inactive product!
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
  )
}
