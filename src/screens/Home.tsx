import {
  FlatList,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'

import { ActiveAdsCard } from '@components/ActiveAdsCard'
import { AdCard } from '@components/AdCard'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { SearchInput } from '@components/SearchInput'

export function Home() {
  const { user } = useAuth()

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

  return (
    <VStack bgColor="gray.200" flex={1} pt={16} px={6}>
      <VStack>
        <HStack justifyContent="space-between">
          <HStack>
            <Avatar
              size={12}
              source={{
                uri: `${api.defaults.baseURL}/images/${user?.avatar}`,
              }}
              mr={3}
            />
            <VStack>
              <Text color="gray.700" fontFamily="body" fontSize="md">
                Welcome,
              </Text>
              <Heading color="gray.500" fontFamily="heading" fontSize="md">
                {capitalizeFirstLetter(user?.name)}!
              </Heading>
            </VStack>
          </HStack>
          <Button variant="tertiary" w={32} title="Create ad" iconName="plus" />
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
        <ScrollView mb={64} showsVerticalScrollIndicator={false}>
          <VStack pb={10}>
            <FlatList
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              numColumns={2}
              mt={4}
              pb={10}
              data={testList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <AdCard item={item.id} />}
              ItemSeparatorComponent={() => <HStack h={6} />}
            />
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  )
}
