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
import Product_01 from '@assets/skateboard_01.jpg'
import User_01 from '@assets/user_jack.jpg'

type Props = IStackProps & {
  item: number
}

export function AdCard({ item, ...rest }: Props) {
  return (
    <VStack {...rest} width="48%">
      <Box position="relative">
        <Image
          source={User_01}
          w={8}
          h={8}
          alt=""
          rounded="full"
          borderWidth={1}
          borderColor="gray.300"
          position="absolute"
          zIndex={100}
          left={1}
          top={1}
        />
        <View
          px={2}
          py={0.5}
          position="absolute"
          zIndex={100}
          top={1}
          right={2}
          bgColor="blue.700"
          borderRadius={12}
        >
          <Text
            fontSize="xxs"
            fontFamily="heading"
            color="gray.100"
            borderRadius={8}
          >
            USED
          </Text>
        </View>
        <Image
          source={Product_01}
          h={26}
          alt=""
          resizeMode="cover"
          borderRadius={10}
        />
      </Box>
      <VStack mt={1}>
        <Text fontSize="sm" color="gray.600">
          Red Shoes
        </Text>
        <HStack alignItems="center">
          <Text fontSize="xs" color="gray.600" fontFamily="heading" mr={1}>
            $
          </Text>
          <Heading fontSize="md" color="gray.600" fontFamily="heading" mt={-1}>
            59.90
          </Heading>
        </HStack>
      </VStack>
    </VStack>
  )
}
