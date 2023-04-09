import { useContext } from 'react'

import { UserConfigContext } from '../contexts/UserConfigContext'

import { i18n } from '../utils'

import { USER_CONFIG_PARAMS } from '../constants/constants'

const {
  SHOW_HEADER_HELP_ICON,
  SHOW_WELCOME_PAGE,
  DEFAULT_LANGUAGE
} = USER_CONFIG_PARAMS

/**
 * Hook for updating the user config state from the context
 */
export function useUserConfig () {
  const { userConfig, setUserConfig } = useContext(UserConfigContext)

  const {
    [SHOW_WELCOME_PAGE]: showWelcomePage,
    [SHOW_HEADER_HELP_ICON]: showHeaderHelpIcon,
    [DEFAULT_LANGUAGE]: defaultLanguage
  } = userConfig
  // Check if the user config is already loaded (showWelcomePage will ever have a value)
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

  /**
   * If the new language is different from the actual, will update the context app to refresh all app components.
   * The i18n is modified with the new language
   * @param {string} language
   */
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
