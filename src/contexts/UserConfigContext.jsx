import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'
import { ASYNC_STORAGE_KEYS, USER_CONFIG_MOCKUP } from '../constants/constants'

export const UserConfigContext = createContext({})

export function UserConfigContextProvider ({ children }) {
  const [userConfig, setUserConfig] = useState({})

  const updateUserInfo = (newUserConfig) => {
    const jsonValue = JSON.stringify(newUserConfig)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.USER_CONFIG, jsonValue)
    setUserConfig(newUserConfig)
  }

  useEffect(() => {
    const getStorageUserConfig = async () => {
      let storageUserConfig = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.USER_CONFIG)
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
