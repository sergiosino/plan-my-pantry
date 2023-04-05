import { useContext } from 'react'

import { WeekMenuContext } from '../contexts/WeekMenuContext'
import * as wmService from '../services/WeekMenusService'

export function useWeekMenu () {
  const { weekMenu, setWeekMenu } = useContext(WeekMenuContext)

  const getWeekMenus = async () => {
    const newWeekMenus = await wmService.getWeekMenus()
    setWeekMenu(newWeekMenus)
  }

  const getDayMenu = (dayId) => {
    return weekMenu.find(dayMenu => dayMenu.dayId === dayId)
  }

  const updateRecipeLunch = async (dayId, recipe) => {
    const newWeekMenus = await wmService.putDayMenu('lunch', dayId, recipe)
    setWeekMenu(newWeekMenus)
  }

  const updateRecipeDinner = async (dayId, recipe) => {
    const newWeekMenus = await wmService.putDayMenu('dinner', dayId, recipe)
    setWeekMenu(newWeekMenus)
  }

  const removeRecipesFromWeekMenu = async (recipeId) => {
    const newWeekMenus = await wmService.deleteWeekMenuRecipe(recipeId)
    setWeekMenu(newWeekMenus)
  }

  return {
    weekMenu,
    getWeekMenus,
    getDayMenu,
    updateRecipeLunch,
    updateRecipeDinner,
    removeRecipesFromWeekMenu
  }
}
