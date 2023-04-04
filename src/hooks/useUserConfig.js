import { useContext } from 'react'
import { UserConfigContext } from '../contexts/UserConfigContext'
import { USER_CONFIG_PARAMS } from '../constants/constants'

export function useUserConfig () {
  const { userConfig, setUserConfig } = useContext(UserConfigContext)

  const {
    SHOW_HEADER_HELP_ICON,
    SHOW_WELCOME_PAGE
  } = USER_CONFIG_PARAMS
  const {
    [SHOW_WELCOME_PAGE]: showWelcomePage,
    [SHOW_HEADER_HELP_ICON]: showHeaderHelpIcon
  } = userConfig
  const isLoading = showWelcomePage === undefined

  const updateUserConfig = (configPropName, newValue) => {
    if (configPropName === SHOW_WELCOME_PAGE) {
      updateShowWelcomePage(newValue)
    } else if (configPropName === SHOW_HEADER_HELP_ICON) {
      updateShowHeaderHelpIcon(newValue)
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

  return {
    isLoading,
    showWelcomePage,
    showHeaderHelpIcon,
    updateUserConfig
  }
}
