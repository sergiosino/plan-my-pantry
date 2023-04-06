import AsyncStorage from '@react-native-async-storage/async-storage'

import * as rService from './RecipesService'

import { STORAGE_KEYS } from '../constants/constants'
import { WEEK_MENU_MOCKUP } from '../constants/mockups'

const { WEEK_MENU } = STORAGE_KEYS

function updateWeekMenus (newWeekMenus) {
  const jsonValue = JSON.stringify(newWeekMenus)
  AsyncStorage.setItem(WEEK_MENU, jsonValue)
}

export async function getWeekMenus () {
  const storageWeekMenus = await AsyncStorage.getItem(WEEK_MENU)
  const recipes = await rService.getRecipes()
  const weekMenus = storageWeekMenus
    ? JSON.parse(storageWeekMenus)
    : WEEK_MENU_MOCKUP
  const weekMenuWithRecipesName = weekMenus.map(dayMenu => {
    const lunch = recipes.find(recipe => recipe.id === dayMenu.lunch?.id)
    const dinner = recipes.find(recipe => recipe.id === dayMenu.dinner?.id)
    return {
      ...dayMenu,
      lunch,
      dinner
    }
  })
  return weekMenuWithRecipesName
}

export async function putDayMenu (dayId, mealName, recipe) {
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

export async function clearAllMeals () {
  const weekMenus = await getWeekMenus()
  const newWeekMenus = weekMenus.map(dayMenu => {
    return {
      ...dayMenu,
      lunch: null,
      dinner: null
    }
  })
  updateWeekMenus(newWeekMenus)
  return newWeekMenus
}
