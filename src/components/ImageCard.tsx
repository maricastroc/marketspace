/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStackProps, Icon, Image, View } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

type Props = IStackProps & {
  source: any
  uri: string
  onDelete?: (uri: string) => void
  showDeleteOption?: boolean
}

export function ImageCard({ source, uri, onDelete, showDeleteOption }: Props) {
  function handleDeleteImage() {
    if (onDelete) {
      onDelete(uri)
    }
  }

  return (
    <View w={24} h={24} position="relative" mr={2}>
      <Image
        w={24}
        h={24}
        source={source}
        alt=""
        resizeMode="cover"
        borderRadius={10}
      />
      {showDeleteOption && (
        <View
          justifyContent="center"
          alignItems="center"
          bgColor="gray.700"
          w={4}
          h={4}
          borderRadius="full"
          position="absolute"
          zIndex={100}
          bottom={20}
          left={20}
        >
          <Icon
            as={AntDesign}
            name="close"
            color="gray.100"
            size={3}
            onPress={() => handleDeleteImage()}
          />
        </View>
      )}
    </View>
  )
}
