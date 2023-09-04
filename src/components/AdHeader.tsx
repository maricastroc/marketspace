import { Center, HStack, Heading, IStackProps, Icon } from 'native-base'

import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SecondaryAppNavigatorRoutesProps } from '@routes/secondaryAppRoutes'

type Props = IStackProps & {
  title?: string
  showTitle?: boolean
  orientation?: string
}

export function AdHeader({
  title,
  showTitle = true,
  orientation = 'left',
  ...rest
}: Props) {
  const navigation = useNavigation<SecondaryAppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleCreateAd() {
    navigation.navigate('createad')
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
      {orientation === 'left' && (
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
      )}
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
      {orientation === 'right' && (
        <TouchableOpacity onPress={handleCreateAd}>
          <Icon
            as={AntDesign}
            name="plus"
            color="gray.700"
            size={6}
            alignSelf="flex-end"
            top={0}
          />
        </TouchableOpacity>
      )}
    </HStack>
  )
}
