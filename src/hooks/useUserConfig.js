import { useContext } from 'react'

import { UserConfigContext } from '../contexts/UserConfigContext'

import { i18n } from '../utils'

import { USER_CONFIG_PARAMS } from '../constants/constants'

const {
  SHOW_HEADER_HELP_ICON,
  SHOW_WELCOME_PAGE,
  DEFAULT_LANGUAGE
} = USER_CONFIG_PARAMS

export function useUserConfig () {
  const { userConfig, setUserConfig } = useContext(UserConfigContext)

  const {
    [SHOW_WELCOME_PAGE]: showWelcomePage,
    [SHOW_HEADER_HELP_ICON]: showHeaderHelpIcon,
    [DEFAULT_LANGUAGE]: defaultLanguage
  } = userConfig
  const isLoading = showWelcomePage === undefined

  const updateUserConfig = (configPropName, newValue) => {
    if (configPropName === SHOW_WELCOME_PAGE) {
      updateShowWelcomePage(newValue)
    } else if (configPropName === SHOW_HEADER_HELP_ICON) {
      updateShowHeaderHelpIcon(newValue)
    } else if (configPropName === DEFAULT_LANGUAGE) {
      updateDefaultLanguage(newValue)
    }
  }

  const updateShowWelcomePage = (show) => {
    const newUserConfig = { ...userConfig }
    newUserConfig[SHOW_WELCOME_PAGE] = show
    setUserConfig(newUserConfig)
  }

  const updateShowHeaderHelpIcon = (show) => {
    const newUserConfig = { ...userConfig }
    newUserConfig[SHOW_HEADER_HELP_ICON] = show
    setUserConfig(newUserConfig)
  }

  const updateDefaultLanguage = (language) => {
    if (userConfig[DEFAULT_LANGUAGE] === language) { return }
    i18n.locale = language
    const newUserConfig = { ...userConfig }
    newUserConfig[DEFAULT_LANGUAGE] = language
    setUserConfig(newUserConfig)
  }

  return {
    isLoading,
    showWelcomePage,
    showHeaderHelpIcon,
    defaultLanguage,
    updateUserConfig
  }
}
