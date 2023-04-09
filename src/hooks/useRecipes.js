import { useState } from 'react'
import debounce from 'just-debounce-it'

import * as rService from '../services/RecipesService'
import * as wmService from '../services/WeekMenusService'

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
    handleDeleteRecipe
  }
}
