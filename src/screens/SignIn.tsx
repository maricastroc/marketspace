import { Center, HStack, Icon, ScrollView, Text, VStack } from 'native-base'
import LogoSvg from '@assets/logo.svg'
import MarketspaceSvg from '@assets/marketspace_text.svg'
import { Ionicons } from '@expo/vector-icons'
import { Input } from '@components/Input'
import { useState } from 'react'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView>
      <VStack bgColor="gray.200" borderRadius={12}>
        <Center pt={24} pb={12} px={12}>
          <LogoSvg />
          <Center pt={5}>
            <MarketspaceSvg />
            <Text color="gray.500" fontSize="sm" fontFamily="light">
              Your Marketplace Hub
            </Text>
          </Center>

          <Center width="full" pt={10}>
            <Text color="gray.600" fontSize="sm" fontFamily="body" mb={4}>
              Access your account
            </Text>
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
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
            <Button mt={8} title="Sign In" />
          </Center>
        </Center>
      </VStack>
      <Center pt={10} px={12}>
        <Text color="gray.600" fontSize="sm" fontFamily="body" mb={4}>
          Still don&apos;t have an account?
        </Text>
        <Button
          title="Sign Up"
          variant="secondary"
          onPress={handleNewAccount}
        />
      </Center>
    </ScrollView>
  )
}
