import AsyncStorage from '@react-native-async-storage/async-storage'

import { STORAGE_KEYS } from '../constants/constants'
import { USER_CONFIG_MOCKUP } from '../constants/mockups'

const { USER_CONFIG } = STORAGE_KEYS

/**
 * Returns the user config saved in the async storage.
 * If there are nothing in the async storage, it returns a MOCK with the default values
 * @returns {object}
 */
export async function getUserConfig () {
  const storageUserConfig = await AsyncStorage.getItem(USER_CONFIG)
  return storageUserConfig
    ? JSON.parse(storageUserConfig)
    : USER_CONFIG_MOCKUP
}

/**
 * Updates the user config in the async storage
 * @param {object} newUserConfig
 */
export async function updateUserConfig (newUserConfig) {
  const jsonValue = JSON.stringify(newUserConfig)
  await AsyncStorage.setItem(USER_CONFIG, jsonValue)
}
