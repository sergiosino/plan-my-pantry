import { useContext } from 'react'

import { getRecipes, getRecipesFiltered, pushRecipe, putRecipe, deleteRecipe } from '../services/RecipesService'
import { NEW_ELEMENT_ID } from '../constants/constants'
import { useWeekMenu } from './useWeekMenu'
import debounce from 'just-debounce-it'
import { RecipesContext } from '../contexts/RecipesContext'
import { capitalizeString, isNullOrWhiteSpace } from '../utils'

export function useRecipes () {
  const { recipes, setRecipes } = useContext(RecipesContext)

  const { weekMenu, removeRecipesFromWeekMenu } = useWeekMenu()

  const handleGetRecipes = async () => {
    const newRecipes = await getRecipes()
    setRecipes(newRecipes)
  }

  const handleSaveRecipe = (recipe) => {
    let ingredients = recipe.ingredients.filter(ingredient => !isNullOrWhiteSpace(ingredient))
    ingredients = ingredients.map(ingredient => capitalizeString(ingredient))
    recipe = {
      ...recipe,
      ingredients
    }
    recipe.id === NEW_ELEMENT_ID
      ? handleAddRecipe(recipe)
      : handleEditRecipe(recipe)
  }

  const handleAddRecipe = async (recipe) => {
    const newRecipes = await pushRecipe(recipe)
    setRecipes(newRecipes)
  }

  const handleEditRecipe = async (recipe) => {
    const newRecipes = await putRecipe(recipe.id, recipe)
    setRecipes(newRecipes)
  }

  const handleDeleteRecipe = async (id) => {
    const weekMenuUsingRecipe = weekMenu.filter(dayMenu => dayMenu.lunch?.id === id || dayMenu.dinner?.id === id)
    if (weekMenuUsingRecipe.length > 0) { removeRecipesFromWeekMenu([id]) }
    const newRecipes = await deleteRecipe(id)
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
