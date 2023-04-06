import { useState } from 'react'

import { getRecipesFiltered, deleteRecipe, getRecipes } from '../services/RecipesService'
import debounce from 'just-debounce-it'
import { deleteWeekMenuRecipe } from '../services/WeekMenusService'

export function useRecipes () {
  const [recipes, setRecipes] = useState([])

  const handleGetRecipes = async () => {
    const newRecipes = await getRecipes()
    setRecipes(newRecipes)
  }

  const handleDeleteRecipe = async (recipeId) => {
    deleteWeekMenuRecipe(recipeId)
    const newRecipes = await deleteRecipe(recipeId)
    setRecipes(newRecipes)
  }

  const handleSearchRecipes = debounce(async (search) => {
    const newRecipes = await getRecipesFiltered(search)
    setRecipes(newRecipes)
  }, 300)

  return {
    recipes,
    handleGetRecipes,
    handleSearchRecipes,
    handleDeleteRecipe
  }
}
