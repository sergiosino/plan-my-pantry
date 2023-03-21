import { useContext, useEffect, useState } from 'react'
import uuid from 'react-native-uuid'
import { IngredientsContext } from '../contexts/IngredientsContext'

import { RecipesContext } from '../contexts/RecipesContext'

export function useRecipes () {
  const { recipes, setRecipes } = useContext(RecipesContext)
  const { ingredients } = useContext(IngredientsContext)
  const [recipesWithIngredientsName, setRecipesWithIngredientsName] = useState([])

  const getRecipesWithIngredientsName = () => {
    if (recipes.length === 0 && ingredients.length === 0) { return }

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

    // TODO: Check if the recipe has any change in handleEditRecipe
    const newRecipes = [...recipes]
    newRecipes[recipeIndex] = recipeEdited
    const newRecipesSorted = sortRecipes(newRecipes)
    setRecipes(newRecipesSorted)
  }

  const handleDeleteRecipe = (id) => {
    console.log(id, recipes)
    const newRecipes = recipes.filter(recipe => recipe.id !== id)
    console.log(newRecipes)
    setRecipes(newRecipes)
  }

  useEffect(() => {
    getRecipesWithIngredientsName()
  }, [recipes, ingredients])

  return {
    recipes: recipesWithIngredientsName,
    handleSaveRecipe,
    handleDeleteRecipe
  }
}
