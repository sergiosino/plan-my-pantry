import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ASYNC_STORAGE_KEYS, WEEK_MENU_MOCKUP } from '../constants/constants'

export const WeekMenuContext = createContext({})

// TODO: Create some default data if empty storage
export function WeekMenuContextProvider ({ children }) {
  const [weekMenu, setWeekMenu] = useState([])

  const updateWeekMenu = (newWeekMenu) => {
    const jsonValue = JSON.stringify(newWeekMenu)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.WEEK_MENU, jsonValue)
    setWeekMenu(newWeekMenu)
  }

  useEffect(() => {
    const getStorageWeekMenu = async () => {
      let storageWeekMenu = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.WEEK_MENU)
      storageWeekMenu = storageWeekMenu
        ? JSON.parse(storageWeekMenu)
        : WEEK_MENU_MOCKUP
      setWeekMenu(storageWeekMenu)
    }
    getStorageWeekMenu()
  }, [])

  return (
    <WeekMenuContext.Provider value={{
      weekMenu,
      setWeekMenu: updateWeekMenu
    }}
    >
      {children}
    </WeekMenuContext.Provider>
  )
}
