import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'

export const WeekMenuContext = createContext({})

const WEEK_MENU_MOCKUP = [
  {
    dayId: 1,
    dayName: 'Monday',
    lunch: 'Salmón con verdura',
    dinner: ''
  },
  {
    dayId: 2,
    dayName: 'Tuesday',
    lunch: '',
    dinner: ''
  },
  {
    dayId: 3,
    dayName: 'Wednesday',
    lunch: '',
    dinner: 'Sandwitch de jamón y queso'
  },
  {
    dayId: 4,
    dayName: 'Thursday',
    lunch: 'Salmón con verdura',
    dinner: 'Sandwitch de jamón y queso'
  },
  {
    dayId: 5,
    dayName: 'Friday',
    lunch: 'Salmón con verdura',
    dinner: 'Sandwitch de jamón y queso'
  },
  {
    dayId: 6,
    dayName: 'Saturday',
    lunch: 'Salmón con verdura',
    dinner: ''
  },
  {
    dayId: 7,
    dayName: 'Sunday',
    lunch: '',
    dinner: 'Sandwitch de jamón y queso'
  }
]

export function WeekMenuContextProvider ({ children }) {
  const [weekMenu, setWeekMenu] = useState(WEEK_MENU_MOCKUP)

  const updateWeekMenu = (newWeekMenu) => {
    const jsonValue = JSON.stringify(newWeekMenu)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.WEEK_MENU, jsonValue)
    setWeekMenu(newWeekMenu)
  }

  //   useEffect(() => {
  //     const getStorageWeekMenu = async () => {
  //       let storageWeekMenu = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.WEEK_MENU)
  //       storageWeekMenu = storageWeekMenu != null ? JSON.parse(storageWeekMenu) : null
  //       if (storageWeekMenu) { setWeekMenu(storageWeekMenu) }
  //     }
  //     getStorageWeekMenu()
  //   }, [])

  return (
    <WeekMenuContext.Provider value={{ weekMenu, setWeekMenu: updateWeekMenu }}>
      {children}
    </WeekMenuContext.Provider>
  )
}
