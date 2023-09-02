/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button as ButtonNativeBase,
  Center,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useState } from 'react'
import * as yup from 'yup'
import * as FileSystem from 'expo-file-system'
import { yupResolver } from '@hookform/resolvers/yup'
import { SimpleLineIcons } from '@expo/vector-icons'
import LogoSvg from '@assets/logo_small.svg'
import AvatarDefault from '@assets/avatar.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { PasswordInput } from '@components/PasswordInput'
import { Controller, useForm } from 'react-hook-form'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import { TouchableOpacity } from 'react-native'

const signUpSchema = yup.object({
  name: yup.string().required('Please, inform your name.'),
  email: yup
    .string()
    .required('Please, inform your e-mail.')
    .email('Invalid e-mail.'),
  phoneNumber: yup
    .string()
    .required('Please, inform your phone number.')
    .min(9, 'Phone number must have at least 9 digits.'),
  password: yup
    .string()
    .required('Please, inform your password.')
    .min(6, 'Password must have at least 6 digits.'),
  passwordConfirm: yup
    .string()
    .required('Please, confirm your password.')
    .oneOf([yup.ref('password'), ''], 'Passwords do not match'),
})

type FormDataProps = {
  name: string
  email: string
  phoneNumber: string
  password: string
  passwordConfirm: string
}

type userImageSelectedProps = {
  selected: boolean
  photo: {
    uri: string
    name: string
    type: string
  }
}

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const [userImageSelected, setUserImageSelected] = useState({
    selected: false,
  } as userImageSelectedProps)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })

  const toast = useToast()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  const userForm = new FormData()

  function handleSignIn() {
    navigation.navigate('signIn')
  }

  async function handleSignUp({
    name,
    email,
    password,
    phoneNumber,
  }: FormDataProps) {
    try {
      setIsLoading(true)

      if (!userImageSelected.selected) {
        setIsLoading(false)
        return toast.show({
          title: 'Please, choose a photo for your account.',
          placement: 'top',
          bgColor: 'red.300',
          duration: 3000,
        })
      }

      const userImage = {
        ...userImageSelected.photo,
        name: `${name}.${userImageSelected.photo.name}`.toLowerCase(),
      }

      userForm.append('avatar', userImage as any)
      userForm.append('name', name.toLowerCase())
      userForm.append('email', email.toLowerCase())
      userForm.append('tel', phoneNumber)
      userForm.append('password', password)

      setIsLoading(true)

      await api.post('/users', userForm)

      navigation.navigate('signIn')

      toast.show({
        title: 'Account successfully created!',
        placement: 'top',
        bgColor: 'blue.500',
      })
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

  async function handleUserSelectedPhoto() {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        selectionLimit: 1,
      })

      if (selectedPhoto.canceled) {
        return
      }

      if (selectedPhoto?.assets[0]?.uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          selectedPhoto.assets[0].uri,
        )

        if (photoInfo.exists && photoInfo.size) {
          const fileSizeInMB = photoInfo.size / (1024 * 1024)

          if (fileSizeInMB > 5) {
            return toast.show({
              title: 'This image is too big. Please, choose a photo up to 5MB.',
              placement: 'top',
              bgColor: 'red.300',
            })
          }

          const fileExtension = selectedPhoto.assets[0].uri.split('.').pop()

          const photoFile = {
            name: `${fileExtension}`.toLowerCase(),
            uri: selectedPhoto.assets[0].uri,
            type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
          }

          setUserImageSelected({
            selected: true,
            photo: { ...photoFile },
          })

          toast.show({
            title: 'Photo successfuly updated!',
            placement: 'top',
            bgColor: 'blue.500',
          })
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
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
              <TouchableOpacity onPress={handleUserSelectedPhoto}>
                {userImageSelected.selected ? (
                  <Image
                    w={20}
                    h={20}
                    borderRadius="full"
                    borderWidth="2"
                    borderColor="blue.500"
                    source={{
                      uri: userImageSelected.photo.uri,
                    }}
                    alt="User Image"
                  />
                ) : (
                  <AvatarDefault />
                )}
              </TouchableOpacity>
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
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    placeholder="Name"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <Input
                    w="full"
                    placeholder="Phone Number"
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.phoneNumber?.message}
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
              <PasswordInput
                placeholder="Confirm Password"
                isPasswordVisible={isConfirmPasswordVisible}
                toggleVisibility={toggleConfirmPasswordVisibility}
                control={control}
                name="passwordConfirm"
                errorMessage={errors.passwordConfirm?.message}
              />
            </VStack>
          </Center>
          <Button
            w="full"
            title="Create"
            variant="tertiary"
            mt={3}
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
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
