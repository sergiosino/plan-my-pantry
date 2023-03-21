import { useContext } from 'react'
import uuid from 'react-native-uuid'
import { IngredientsContext } from '../contexts/IngredientsContext'

import { RecipesContext } from '../contexts/RecipesContext'

export function useRecipes () {
  const { recipes, setRecipes } = useContext(RecipesContext)
  const { ingredients: allIngredients } = useContext(IngredientsContext)

  const getIngredientsName = (recipeWithoutIngredientsName) => {
    const { ingredients: recipeIngredients } = recipeWithoutIngredientsName

    const recipeIngredientsId = recipeIngredients.map(recipeIngredient => recipeIngredient.id ?? recipeIngredient)
    const ingredientsWithName = allIngredients
      .filter(ingredient => recipeIngredientsId?.includes(ingredient.id))
      ?.map(ingredient => ({ id: ingredient.id, text: ingredient.text }))

    return {
      ...recipeWithoutIngredientsName,
      ingredients: ingredientsWithName
    }
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
    recipe = getIngredientsName(recipe)

    const newRecipes = [...recipes, recipe]
    const newRecipesSorted = sortRecipes(newRecipes)
    setRecipes(newRecipesSorted)
  }

  const handleEditRecipe = (recipeEdited) => {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeEdited.id)

    // TODO: Check if the recipe has any change in handleEditRecipe
    const newRecipes = [...recipes]
    recipeEdited = getIngredientsName(recipeEdited)
    newRecipes[recipeIndex] = recipeEdited
    const newRecipesSorted = sortRecipes(newRecipes)
    setRecipes(newRecipesSorted)
  }

  const handleDeleteRecipe = (id) => {
    const newRecipes = recipes.filter(recipe => recipe.id !== id)
    setRecipes(newRecipes)
  }

  return {
    recipes,
    handleSaveRecipe,
    handleDeleteRecipe
  }
}
