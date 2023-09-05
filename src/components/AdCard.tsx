import {
  Box,
  HStack,
  Heading,
  IStackProps,
  Image,
  Text,
  VStack,
  View,
} from 'native-base'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { formatPrice } from '@utils/formatPrice'
import { useNavigation } from '@react-navigation/native'
import { SecondaryAppNavigatorRoutesProps } from '@routes/secondaryAppRoutes'
import { TouchableOpacity } from 'react-native'

type Props = IStackProps & {
  id: string
  title: string
  image: string
  price: string
  isActive: boolean
  isNew: boolean
  showProfile: boolean
  profileImage: string
  isFromLoggedUser?: boolean
}

export function AdCard({
  id,
  title,
  image,
  price,
  isActive = true,
  isNew,
  showProfile = false,
  profileImage,
  isFromLoggedUser = false,
  ...rest
}: Props) {
  const navigation = useNavigation<SecondaryAppNavigatorRoutesProps>()

  console.log(image)

  function handleAdDetails() {
    navigation.navigate('addetails', {
      id,
    })
  }

  function handleMyAdDetails() {
    navigation.navigate('myaddetails', {
      id,
    })
  }

  return (
    <VStack {...rest} width="48%">
      <TouchableOpacity
        onPress={isFromLoggedUser ? handleMyAdDetails : handleAdDetails}
      >
        <Box position="relative">
          {showProfile && isActive && (
            <Image
              h={8}
              w={8}
              source={{ uri: profileImage }}
              alt={title}
              borderRadius="full"
              position="absolute"
              zIndex={100}
              left={1}
              top={1}
              borderWidth={1}
              borderColor="gray.300"
            />
          )}
          <View
            px={2}
            py={0.5}
            position="absolute"
            zIndex={100}
            top={1}
            right={2}
            bgColor={isNew ? 'blue.500' : 'gray.300'}
            borderRadius={12}
          >
            <Text
              fontSize="xxs"
              fontFamily="heading"
              color={isNew ? 'gray.100' : 'gray.600'}
              borderRadius={8}
            >
              {isNew ? 'NEW' : 'USED'}
            </Text>
          </View>
          <Image
            source={{ uri: image }}
            h={26}
            alt=""
            resizeMode="cover"
            borderRadius={10}
          />
          {!isActive && (
            <View
              bg="rgba(0, 0, 0, 0.6)"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              borderRadius={10}
            />
          )}
          {!isActive && (
            <Text
              position="absolute"
              top="80%"
              left={2}
              color="gray.100"
              fontFamily="heading"
              fontSize="xxs"
            >
              INACTIVE AD
            </Text>
          )}
        </Box>
      </TouchableOpacity>
      <VStack mt={1}>
        <Text
          fontSize="sm"
          color={isActive ? 'gray.600' : 'gray.400'}
          lineHeight="xs"
          my={1}
        >
          {capitalizeFirstLetter(title)}
        </Text>
        <HStack alignItems="center">
          <Text
            fontSize="xs"
            color={isActive ? 'gray.600' : 'gray.400'}
            fontFamily="heading"
            mr={1}
          >
            $
          </Text>
          <Heading
            fontSize="md"
            color={isActive ? 'gray.600' : 'gray.400'}
            fontFamily="heading"
          >
            {formatPrice(price)}
          </Heading>
        </HStack>
      </VStack>
    </VStack>
  )
}
