import { createContext, useEffect, useState } from 'react'
import * as Localization from 'expo-localization'

import * as ucService from '../services/UserConfigService'

import { i18n } from '../utils'

import { USER_CONFIG_PARAMS } from '../constants/constants'

const { DEFAULT_LANGUAGE } = USER_CONFIG_PARAMS

export const UserConfigContext = createContext({})

/**
 * Saves the user config data saved in the async storage in a new state. It will be available throw all the app.
 * At the moment of loading the user config data, it will update the app language with the selected by the user.
 */
export function UserConfigContextProvider ({ children }) {
  const [userConfig, setUserConfig] = useState({})

  const updateUserInfo = (newUserConfig) => {
    ucService.updateUserConfig(newUserConfig)
    setUserConfig(newUserConfig)
  }

  /**
   * Updates the locale.
   * If the user has selected any language it will be used.
   * If not, will use the default device language.
   * @param {object} storageUserConfig
   */
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
