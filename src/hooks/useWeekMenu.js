import { useCallback, useState } from 'react'

import * as wmService from '../services/WeekMenusService'
import { useFocusEffect } from '@react-navigation/native'

export function useWeekMenu () {
  const [weekMenu, setWeekMenu] = useState([])

  const getWeekMenus = async () => {
    const newWeekMenus = await wmService.getWeekMenus()
    setWeekMenu(newWeekMenus)
  }

  useFocusEffect(
    useCallback(() => {
      getWeekMenus()
    }, [])
  )

  return {
    weekMenu
  }
}
