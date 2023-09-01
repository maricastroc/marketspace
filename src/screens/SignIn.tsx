import { Center, ScrollView, Text, VStack, useToast } from 'native-base'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import LogoSvg from '@assets/logo.svg'
import MarketspaceSvg from '@assets/marketspace_text.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { PasswordInput } from '@components/PasswordInput'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'

const signInSchema = yup.object({
  email: yup.string().required('Please, inform your e-mail.'),
  password: yup.string().required('Please, inform your password.'),
})

type FormDataProps = {
  email: string
  password: string
}

export function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()

  const toast = useToast()

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  })

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  function handleSignUpScreen() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Error creating account. Please, try again later'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.300',
      })

      setIsLoading(false)
    }
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
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <PasswordInput
              placeholder="Password"
              isPasswordVisible={isPasswordVisible}
              toggleVisibility={togglePasswordVisibility}
              control={control}
              name="password"
              errorMessage={errors.password?.message}
            />
            <Button
              mt={8}
              title="Sign In"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
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
          onPress={handleSignUpScreen}
        />
      </Center>
    </ScrollView>
  )
}
