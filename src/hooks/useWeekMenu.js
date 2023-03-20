import { useContext } from 'react'

import { WeekMenuContext } from '../contexts/WeekMenuContext'

export function useWeekMenu () {
  const { weekMenu, setWeekMenu } = useContext(WeekMenuContext)

  const getDayMenu = (dayId) => {
    return weekMenu.find(dayMenu => dayMenu.dayId === dayId)
  }

  const updateRecipe = (mealName, dayId, recipe) => {
    const weekMenuUpdated = weekMenu.map(dayMenu => {
      const isDayMenuToEdit = dayMenu.dayId === dayId
      return isDayMenuToEdit
        ? { ...dayMenu, [mealName]: recipe }
        : dayMenu
    })
    setWeekMenu(weekMenuUpdated)
  }

  const updateRecipeLunch = (dayId, recipe) => {
    updateRecipe('lunch', dayId, recipe)
  }

  const updateRecipeDinner = (dayId, recipe) => {
    updateRecipe('dinner', dayId, recipe)
  }

  return {
    weekMenu,
    getDayMenu,
    updateRecipeLunch,
    updateRecipeDinner
  }
}
