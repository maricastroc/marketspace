import {
  Button as ButtonNativeBase,
  Center,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import LogoSvg from '@assets/logo_small.svg'
import AvatarDefault from '@assets/avatar.svg'
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons'
import { Input } from '@components/Input'
import { useState } from 'react'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  function handleSignIn() {
    navigation.navigate('signIn')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      flex={1}
      bgColor="gray.200"
      px={12}
    >
      <VStack py={16}>
        <Center>
          <LogoSvg />
          <Heading fontFamily="heading" fontSize="xl" mt={3}>
            Welcome!
          </Heading>
          <Text mt={2} color="gray.600" textAlign="center" lineHeight="sm">
            Create your account and use the space to buy various items and sell
            your products.
          </Text>
          <Center pt={8}>
            <VStack>
              <AvatarDefault />
              <ButtonNativeBase
                h={10}
                w={10}
                bgColor="blue.500"
                rounded="full"
                position="absolute"
                bottom={-2}
                right={-16}
              >
                <Icon
                  as={SimpleLineIcons}
                  name="pencil"
                  color="gray.100"
                  size={4}
                />
              </ButtonNativeBase>
            </VStack>
            <VStack pt={6}>
              <Input w="full" placeholder="Name" />
              <Input
                w="full"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                w="full"
                placeholder="Phone Number"
                autoCapitalize="none"
                keyboardType="phone-pad"
              />
              <HStack>
                <Input
                  placeholder="Password"
                  secureTextEntry={!isPasswordVisible}
                  position="relative"
                />
                <Icon
                  as={Ionicons}
                  name="eye-outline"
                  color="gray.500"
                  size={6}
                  position="absolute"
                  top="20%"
                  left="87%"
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              </HStack>
              <HStack>
                <Input
                  placeholder="Confirm Password"
                  secureTextEntry={!isConfirmPasswordVisible}
                  position="relative"
                />
                <Icon
                  as={Ionicons}
                  name="eye-outline"
                  color="gray.500"
                  size={6}
                  position="absolute"
                  top="20%"
                  left="87%"
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              </HStack>
            </VStack>
          </Center>
          <Button w="full" title="Create" variant="tertiary" mt={3} />
        </Center>
        <Center pt={10}>
          <Text color="gray.600" fontSize="sm" fontFamily="body" mb={4}>
            Already have an account?
          </Text>
          <Button title="Sign In" variant="secondary" onPress={handleSignIn} />
        </Center>
      </VStack>
    </ScrollView>
  )
}
