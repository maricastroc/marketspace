/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, HStack, Icon, View } from 'native-base'
import { Input } from './Input'

import { Feather, Ionicons } from '@expo/vector-icons'
import { Controller } from 'react-hook-form'

type Props = {
  control: any
  errorMessage: string | undefined
  showFiltersModal: () => void
  onSearch: () => void
}

export function SearchInput({
  control,
  errorMessage,
  showFiltersModal,
  onSearch,
}: Props) {
  return (
    <HStack position="relative">
      <Controller
        control={control}
        name="search"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Search ad"
            value={value}
            onChangeText={onChange}
            errorMessage={errorMessage}
          />
        )}
      />
      <HStack
        position="absolute"
        top={3}
        right={4}
        alignItems="center"
        zIndex={100}
      >
        <Button bgColor="transparent" padding={0} onPress={onSearch}>
          <Icon
            as={Feather}
            name="search"
            color="gray.600"
            size={6}
            zIndex={100}
          />
        </Button>
        <View w="0.4" h={6} bgColor="gray.500" mx={3} />
        <Button bgColor="transparent" padding={0} onPress={showFiltersModal}>
          <Icon as={Ionicons} name="options" color="gray.600" size={6} />
        </Button>
      </HStack>
    </HStack>
  )
}
