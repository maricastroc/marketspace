import { Center, HStack, Heading, IStackProps, Icon } from 'native-base'

import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

type Props = IStackProps & {
  title?: string
  showTitle?: boolean
}

export function AdHeader({ title, showTitle = true, ...rest }: Props) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <HStack
      {...rest}
      w="full"
      justifyContent={showTitle ? 'space-between' : 'flex-start'}
      alignItems="center"
      pt={16}
      px={8}
      bgColor="gray.200"
    >
      <TouchableOpacity onPress={handleGoBack}>
        <Icon
          as={AntDesign}
          name="arrowleft"
          color="gray.700"
          size={6}
          alignSelf="flex-end"
          top={0}
        />
      </TouchableOpacity>
      {showTitle && (
        <Center flex={1}>
          <Heading
            fontFamily="heading"
            fontSize="xl"
            position="relative"
            right={2}
          >
            {title}
          </Heading>
        </Center>
      )}
    </HStack>
  )
}
