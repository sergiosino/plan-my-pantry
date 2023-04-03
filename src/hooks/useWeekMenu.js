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

  const removeRecipesFromWeekMenu = (recipesId) => {
    const newWeekMenu = weekMenu.map(dayMenu => {
      const newLunch = recipesId.includes(dayMenu.lunch?.id)
        ? null
        : dayMenu.lunch?.id
      const newDinner = recipesId.includes(dayMenu.dinner?.id)
        ? null
        : dayMenu.dinner?.id
      return {
        ...dayMenu,
        lunch: newLunch,
        dinner: newDinner
      }
    })
    setWeekMenu(newWeekMenu)
  }

  return {
    weekMenu,
    getDayMenu,
    updateRecipeLunch,
    updateRecipeDinner,
    removeRecipesFromWeekMenu
  }
}
