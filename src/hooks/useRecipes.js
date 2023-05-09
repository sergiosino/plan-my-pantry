import { useState } from 'react'
import debounce from 'just-debounce-it'
import { encode, decode } from 'js-base64'

import * as rService from '../services/RecipesService'
import * as wmService from '../services/WeekMenusService'

import { i18n } from '../utils'

/**
 * Hook for updating recipes state
 */
export function useRecipes () {
  const [recipes, setRecipes] = useState([])

  const handleGetRecipes = async () => {
    const newRecipes = await rService.getRecipes()
    setRecipes(newRecipes)
  }

  const handleDeleteRecipe = async (recipeId) => {
    wmService.deleteWeekMenuRecipe(recipeId)
    const newRecipes = await rService.deleteRecipe(recipeId)
    setRecipes(newRecipes)
  }

  /**
   * Imports the base64 backup of the recipes
   * @param {string} recipesBase64
   * @returns Text of the result
   */
  const importBase64 = (recipesBase64) => {
    if (!recipesBase64) { return }

    try {
      const recipesString = decode(recipesBase64)
      const recipesObj = JSON.parse(recipesString)

      if (
        Array.isArray(recipesObj) &&
        recipesObj.length > 0 &&
        recipesObj[0].id !== undefined &&
        recipesObj[0].name !== undefined &&
        recipesObj[0].notes !== undefined
      ) {
        rService.loadRecipesBackup(recipesObj)
        return i18n.t('IMPORT_EXPORT_RECIPES_MODAL.RECIPES_IMPORTED')
      } else return i18n.t('IMPORT_EXPORT_RECIPES_MODAL.NOT_VALID_RECIPES_BACKUP')
    } catch {
      return i18n.t('IMPORT_EXPORT_RECIPES_MODAL.UNCONTROLLED_ERROR_RECIPES_BACKUP')
    }
  }

  /**
   * Generates the base64 recipes backup
   * @returns Base64 recipes backup
   */
  const exportBase64 = () => {
    const recipesString = JSON.stringify(recipes)
    const recipesBase64 = encode(recipesString)
    return recipesBase64
  }

  /**
   * Debounce in the search recipe functionality to avoid updating the recipes list
   * every time the search text changes.
   * It will wait until 300ms pass with no modifications.
   */
  const handleSearchRecipes = debounce(async (search) => {
    const newRecipes = await rService.getRecipesFiltered(search)
    setRecipes(newRecipes)
  }, 300)

  return {
    recipes,
    handleGetRecipes,
    handleSearchRecipes,
    handleDeleteRecipe,
    importBase64,
    exportBase64
  }
}
