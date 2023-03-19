import { useContext } from 'react'

import { WeekMenuContext } from '../contexts/WeekMenuContext'

export function useWeekMenu () {
  const { weekMenu } = useContext(WeekMenuContext)

  return {
    weekMenu
  }
}
