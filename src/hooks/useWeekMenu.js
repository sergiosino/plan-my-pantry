import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import * as wmService from '../services/WeekMenusService'

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
