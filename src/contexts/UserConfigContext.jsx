import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { STORAGE_KEYS } from '../constants/constants'
import { USER_CONFIG_MOCKUP } from '../constants/mockups'

const { USER_CONFIG } = STORAGE_KEYS

export const UserConfigContext = createContext({})

export function UserConfigContextProvider ({ children }) {
  const [userConfig, setUserConfig] = useState({})

  const updateUserInfo = (newUserConfig) => {
    const jsonValue = JSON.stringify(newUserConfig)
    AsyncStorage.setItem(USER_CONFIG, jsonValue)
    setUserConfig(newUserConfig)
  }

  useEffect(() => {
    const getStorageUserConfig = async () => {
      let storageUserConfig = await AsyncStorage.getItem(USER_CONFIG)
      storageUserConfig = storageUserConfig
        ? JSON.parse(storageUserConfig)
        : USER_CONFIG_MOCKUP
      setUserConfig(storageUserConfig)
    }
    getStorageUserConfig()
  }, [])

  return (
    <UserConfigContext.Provider value={{
      userConfig,
      setUserConfig: updateUserInfo
    }}
    >
      {children}
    </UserConfigContext.Provider>
  )
}
