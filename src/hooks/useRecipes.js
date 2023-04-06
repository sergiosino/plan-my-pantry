import { useState } from 'react'
import debounce from 'just-debounce-it'

import * as rService from '../services/RecipesService'
import * as wmService from '../services/WeekMenusService'

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
