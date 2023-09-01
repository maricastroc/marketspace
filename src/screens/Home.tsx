import { Avatar } from '@components/Avatar'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { HStack, Text, VStack } from 'native-base'

export function Home() {
  const { user } = useAuth()
  return (
    <VStack>
      <HStack>
        <Text>Home</Text>
        <Avatar
          size={12}
          source={{
            uri: `${api.defaults.baseURL}/images/${user.avatar}`,
          }}
        />
      </HStack>
    </VStack>
  )
}
