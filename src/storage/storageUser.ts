import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserDTO } from '@dtos/UserDTO'
import { USER_STORAGE } from '@storage/storageConfig'

export async function saveStorageUser(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function getStorageUser() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)

  const user: UserDTO = storage ? JSON.parse(storage) : {}

  return user
}

export async function removeStorageUser() {
  await AsyncStorage.removeItem(USER_STORAGE)
}
