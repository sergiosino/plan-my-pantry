import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import * as wmService from '../services/WeekMenusService'

/**
 * Hook for updating the week menu state
 */
export function useWeekMenu () {
  const [weekMenu, setWeekMenu] = useState([])

  const getWeekMenus = async () => {
    const newWeekMenus = await wmService.getWeekMenus()
    setWeekMenu(newWeekMenus)
  }

  const clearAllMeals = async () => {
    const newWeekMenus = await wmService.clearAllMeals()
    setWeekMenu(newWeekMenus)
  }

  useFocusEffect(
    useCallback(() => {
      getWeekMenus()
    }, [])
  )

  return {
    weekMenu,
    clearAllMeals
  }
}
