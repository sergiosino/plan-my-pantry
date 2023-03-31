import { useContext } from 'react'
import uuid from 'react-native-uuid'

import { NEW_ELEMENT_ID } from '../constants/constants'
import { RecipesContext } from '../contexts/RecipesContext'
import { areObjectsEqual } from '../utils/areObjectsEqual'
import { useWeekMenu } from './useWeekMenu'

export function useRecipes () {
  const { recipes, setRecipes, selectedRecipes, setSelectedRecipes } = useContext(RecipesContext)

  const { weekMenu, removeRecipesFromWeekMenu } = useWeekMenu()

  const sortRecipes = (newRecipes) => {
    newRecipes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    return newRecipes
  }

  const handleSaveRecipe = (recipe) => {
    recipe.id === NEW_ELEMENT_ID
      ? handleAddRecipe(recipe)
      : handleEditRecipe(recipe)
  }

  const handleAddRecipe = (recipe) => {
    recipe.id = uuid.v4()
    const newRecipes = [...recipes, recipe]
    const newRecipesSorted = sortRecipes(newRecipes)
    setRecipes(newRecipesSorted)
  }

  const handleEditRecipe = (recipeEdited) => {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeEdited.id)
    const areRecipesEqual = areObjectsEqual(recipeEdited, recipes[recipeIndex])
    if (!areRecipesEqual) {
      const newRecipes = [...recipes]
      newRecipes[recipeIndex] = recipeEdited
      const newRecipesSorted = sortRecipes(newRecipes)
      setRecipes(newRecipesSorted)
    }
  }

  const handleSelectRecipe = (id) => {
    const newSelectedList = [...selectedRecipes]
    newSelectedList.push(id)
    setSelectedRecipes(newSelectedList)
  }

  const handleUnselectRecipe = (id) => {
    const recipeIndex = selectedRecipes.findIndex(recipeId => recipeId === id)

    if (recipeIndex >= 0) {
      const newSelectedList = [...selectedRecipes]
      newSelectedList.splice(recipeIndex, 1)
      setSelectedRecipes(newSelectedList)
    }
  }

  const deleteRecipe = (id) => {
    const newRecipes = recipes.filter(recipe => recipe.id !== id)
    setRecipes(newRecipes)
    handleUnselectRecipe(id)
  }

  const handleDeleteRecipe = (id) => {
    const weekMenuUsingRecipe = weekMenu.filter(dayMenu => dayMenu.lunch?.id === id || dayMenu.dinner?.id === id)

    if (weekMenuUsingRecipe.length > 0) {
      deleteRecipe(id)
      removeRecipesFromWeekMenu([id])
    } else { deleteRecipe(id) }
  }

  const deleteSelectedRecipes = () => {
    const newReciepes = recipes.filter(recipe => !selectedRecipes.includes(recipe.id))
    setRecipes(newReciepes)
    setSelectedRecipes([])
  }

  const handleDeleteSelectedRecipes = () => {
    const weekMenuUsingRecipe = weekMenu.filter(dayMenu => selectedRecipes.includes(dayMenu.lunch?.id) || selectedRecipes.includes(dayMenu.dinner?.id))

    if (weekMenuUsingRecipe.length > 0) {
      deleteSelectedRecipes()
      removeRecipesFromWeekMenu(selectedRecipes)
    } else { deleteSelectedRecipes() }
  }

  const handleUnselectAllRecipes = () => {
    setSelectedRecipes([])
  }

  return {
    recipes,
    selectedRecipes,
    handleSaveRecipe,
    handleDeleteRecipe,
    handleSelectRecipe,
    handleUnselectRecipe,
    handleDeleteSelectedRecipes,
    handleUnselectAllRecipes
  }
}
