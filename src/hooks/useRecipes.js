import { useContext, useEffect, useState } from 'react'
import uuid from 'react-native-uuid'

import { IngredientsContext } from '../contexts/IngredientsContext'
import { RecipesContext } from '../contexts/RecipesContext'
import { areObjectsEqual } from '../utils/areObjectsEqual'

export function useRecipes () {
  const { recipes, setRecipes, selectedRecipes, setSelectedRecipes } = useContext(RecipesContext)
  const { ingredients } = useContext(IngredientsContext)
  const [recipesWithIngredientsName, setRecipesWithIngredientsName] = useState([])

  const getRecipesWithIngredientsName = () => {
    const recipesWithIngredientsName = recipes.map(recipe => {
      const ingredientsWithName = recipe.ingredients.map(recipeIngredient => {
        const ingredientWithName = ingredients.find(ingredient => ingredient.id === recipeIngredient)
        return ingredientWithName ?? { id: recipeIngredient, text: 'Error' }
      })
      return {
        ...recipe,
        ingredients: ingredientsWithName
      }
    })
    setRecipesWithIngredientsName(recipesWithIngredientsName)
  }

  const sortRecipes = (newRecipes) => {
    newRecipes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    return newRecipes
  }

  const handleSaveRecipe = (recipe) => {
    recipe.id === -1
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

  const handleDeleteRecipe = (id) => {
    const newRecipes = recipes.filter(recipe => recipe.id !== id)
    setRecipes(newRecipes)
    handleUnselectRecipe(id)
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

  const handleDeleteSelectedRecipes = () => {
    const newReciepes = recipes.filter(recipe => !selectedRecipes.includes(recipe.id))
    setRecipes(newReciepes)
    setSelectedRecipes([])
  }

  const handleUnselectAllRecipes = () => {
    setSelectedRecipes([])
  }

  useEffect(() => {
    getRecipesWithIngredientsName()
  }, [recipes, ingredients])

  return {
    recipes: recipesWithIngredientsName,
    selectedRecipes,
    handleSaveRecipe,
    handleDeleteRecipe,
    handleSelectRecipe,
    handleUnselectRecipe,
    handleDeleteSelectedRecipes,
    handleUnselectAllRecipes
  }
}
