import { useContext } from 'react'
import { UserConfigContext } from '../contexts/UserConfigContext'
import { USER_CONFIG_SHOW_INITIAL_PAGE } from '../constants/constants'

export function useUserConfig () {
  const { userConfig, setUserConfig } = useContext(UserConfigContext)

  const {
    [USER_CONFIG_SHOW_INITIAL_PAGE]: showInitialPage
  } = userConfig
  const isLoading = showInitialPage === undefined

  const updateShowInitialHelp = (show) => {
    const newUserConfig = { ...userConfig }
    newUserConfig[USER_CONFIG_SHOW_INITIAL_PAGE] = show
    setUserConfig(newUserConfig)
  }

  return {
    isLoading,
    showInitialPage,
    updateShowInitialHelp
  }
}
