import { createContext, useEffect, useState } from 'react'
import * as Localization from 'expo-localization'

import * as ucService from '../services/UserConfigService'

import { i18n } from '../utils'

import { USER_CONFIG_PARAMS } from '../constants/constants'

const { DEFAULT_LANGUAGE } = USER_CONFIG_PARAMS

export const UserConfigContext = createContext({})

export function UserConfigContextProvider ({ children }) {
  const [userConfig, setUserConfig] = useState({})

  const updateUserInfo = (newUserConfig) => {
    ucService.updateUserConfig(newUserConfig)
    setUserConfig(newUserConfig)
  }

  const initiateLanguage = (storageUserConfig) => {
    const storageDefaultLanguage = storageUserConfig[DEFAULT_LANGUAGE]
    const deviceLanguage = Localization.locale
    i18n.locale = storageDefaultLanguage ?? deviceLanguage
  }

  useEffect(() => {
    const getStorageUserConfig = async () => {
      const storageUserConfig = await ucService.getUserConfig()
      initiateLanguage(storageUserConfig)
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
