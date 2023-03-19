import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ASYNC_STORAGE_KEYS, WEEK_MENU_MOCKUP } from '../constants/constants'

export const WeekMenuContext = createContext({})

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
      storageWeekMenu = storageWeekMenu != null ? JSON.parse(storageWeekMenu) : null
      storageWeekMenu
        ? setWeekMenu(storageWeekMenu)
        : setWeekMenu(WEEK_MENU_MOCKUP)
    }
    getStorageWeekMenu()
  }, [])

  return (
    <WeekMenuContext.Provider value={{ weekMenu, setWeekMenu: updateWeekMenu }}>
      {children}
    </WeekMenuContext.Provider>
  )
}
