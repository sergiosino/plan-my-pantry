import { useContext } from 'react'

import { getRecipesFiltered, pushRecipe, putRecipe, deleteRecipe, getRecipes } from '../services/RecipesService'
import { NEW_ELEMENT_ID } from '../constants/constants'
import debounce from 'just-debounce-it'
import { RecipesContext } from '../contexts/RecipesContext'
import { capitalizeString, isNullOrWhiteSpace } from '../utils'
import { deleteWeekMenuRecipe } from '../services/WeekMenusService'

export function useRecipes () {
  const { recipes, setRecipes } = useContext(RecipesContext)

  const handleGetRecipes = async () => {
    const newRecipes = await getRecipes()
    setRecipes(newRecipes)
  }

  const handleSaveRecipe = async (recipe) => {
    let ingredients = recipe.ingredients.filter(ingredient => !isNullOrWhiteSpace(ingredient))
    ingredients = ingredients.map(ingredient => capitalizeString(ingredient))
    recipe = {
      ...recipe,
      ingredients
    }
    recipe.id === NEW_ELEMENT_ID
      ? await handleAddRecipe(recipe)
      : await handleEditRecipe(recipe)
  }

  const handleAddRecipe = async (recipe) => {
    const newRecipes = await pushRecipe(recipe)
    setRecipes(newRecipes)
  }

  const handleEditRecipe = async (recipe) => {
    const newRecipes = await putRecipe(recipe.id, recipe)
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
    handleSaveRecipe,
    handleDeleteRecipe
  }
}
