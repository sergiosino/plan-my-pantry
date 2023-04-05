import AsyncStorage from '@react-native-async-storage/async-storage'
import { ASYNC_STORAGE_KEYS, WEEK_MENU_MOCKUP } from '../constants/constants'

const { WEEK_MENU } = ASYNC_STORAGE_KEYS

function updateWeekMenus (newWeekMenus) {
  const jsonValue = JSON.stringify(newWeekMenus)
  AsyncStorage.setItem(WEEK_MENU, jsonValue)
}

export async function getWeekMenus () {
  const storageWeekMenu = await AsyncStorage.getItem(WEEK_MENU)
  return storageWeekMenu
    ? JSON.parse(storageWeekMenu)
    : WEEK_MENU_MOCKUP
}

export async function putDayMenu (mealName, dayId, recipe) {
  const weekMenus = await getWeekMenus()
  const newWeekMenus = weekMenus.map(dayMenu => {
    const isDayMenuToEdit = dayMenu.dayId === dayId
    return isDayMenuToEdit
      ? { ...dayMenu, [mealName]: recipe }
      : dayMenu
  })
  updateWeekMenus(newWeekMenus)
  return newWeekMenus
}

export async function deleteWeekMenuRecipe (recipeId) {
  const weekMenus = await getWeekMenus()
  const weekMenuUsingRecipe = weekMenus.filter(dayMenu => dayMenu.lunch?.id === recipeId || dayMenu.dinner?.id === recipeId)
  if (weekMenuUsingRecipe.length === 0) { return weekMenus }
  const newWeekMenus = weekMenus.map(dayMenu => {
    const newLunch = recipeId === dayMenu.lunch?.id
      ? null
      : dayMenu.lunch
    const newDinner = recipeId === dayMenu.dinner?.id
      ? null
      : dayMenu.dinner
    return {
      ...dayMenu,
      lunch: newLunch,
      dinner: newDinner
    }
  })
  updateWeekMenus(newWeekMenus)
  return newWeekMenus
}
