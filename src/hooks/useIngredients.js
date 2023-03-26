import { useContext } from 'react'
import uuid from 'react-native-uuid'

import { IngredientsContext } from '../contexts/IngredientsContext'
import { confirmationAlert } from '../utils/confirmationAlert'
import { useRecipes } from './useRecipes'
import {
  CONFIRMATION_ALERT_INGREDIENTS_IN_USE_MESSAGE,
  CONFIRMATION_ALERT_INGREDIENTS_IN_USE_TITLE,
  CONFIRMATION_ALERT_INGREDIENT_IN_USE_MESSAGE,
  CONFIRMATION_ALERT_INGREDIENT_IN_USE_TITLE
} from '../constants/texts'

export function useIngredients () {
  const {
    ingredients,
    setIngredients,
    selectedIngredientsList,
    setSelectedIngredientsList
  } = useContext(IngredientsContext)
  const { recipes, removeIngredientsFromAllRecipes } = useRecipes()

  const handleSelectIngredient = (id) => {
    const newSelectedList = [...selectedIngredientsList]
    newSelectedList.push(id)
    setSelectedIngredientsList(newSelectedList)
  }

  const handleUnselectIngredient = (id) => {
    const ingredientIndex = selectedIngredientsList.findIndex(ingredientId => ingredientId === id)

    if (ingredientIndex >= 0) {
      const newSelectedList = [...selectedIngredientsList]
      newSelectedList.splice(ingredientIndex, 1)
      setSelectedIngredientsList(newSelectedList)
    }
  }

  const handleAddIngredient = () => {
    const newIngredientId = uuid.v4()
    const newIngredient = { id: newIngredientId, text: '' }
    const newIngredients = [newIngredient, ...ingredients]
    setIngredients(newIngredients)

    return newIngredientId
  }

  const handleUnselectAllIngredients = () => {
    setSelectedIngredientsList([])
  }

  const handleIngredientChange = (id, text) => {
    const ingredientIndex = ingredients.findIndex(ingredient => ingredient.id === id)
    const ingredient = ingredients[ingredientIndex]

    if (ingredient.text !== text) {
      const newIngredients = [...ingredients]
      newIngredients[ingredientIndex] = { id, text }
      setIngredients(newIngredients)
    }
  }

  const deleteIngredient = (id) => {
    const newIngredients = ingredients.filter(ingredient => ingredient.id !== id)
    setIngredients(newIngredients)
    handleUnselectIngredient(id)
  }

  const handleDeleteIngredient = (id) => {
    const recipesUsingIngredient = recipes.filter(recipe => recipe.ingredients.includes(id))

    if (recipesUsingIngredient.length > 0) {
      const recipesNames = recipesUsingIngredient.map(recipe => recipe.name).join(', ')
      confirmationAlert(
        CONFIRMATION_ALERT_INGREDIENT_IN_USE_TITLE,
        CONFIRMATION_ALERT_INGREDIENT_IN_USE_MESSAGE.replace('#1', recipesNames),
        () => {
          deleteIngredient(id)
          removeIngredientsFromAllRecipes([id])
        })
    } else { deleteIngredient(id) }
  }

  const deleteSelectedIngredients = () => {
    const newIngredients = ingredients.filter(ingredient => !selectedIngredientsList.includes(ingredient.id))
    setIngredients(newIngredients)
    setSelectedIngredientsList([])
  }

  const handleDeleteSelectedIngredients = () => {
    const recipesUsingIngredient = recipes.filter(recipe => recipe.ingredients.some(ingredient => selectedIngredientsList.includes(ingredient)))
    if (recipesUsingIngredient.length > 0) {
      const recipesNames = recipesUsingIngredient.map(recipe => recipe.name).join(', ')
      confirmationAlert(
        CONFIRMATION_ALERT_INGREDIENTS_IN_USE_TITLE,
        CONFIRMATION_ALERT_INGREDIENTS_IN_USE_MESSAGE.replace('#1', recipesNames),
        () => {
          deleteSelectedIngredients()
          removeIngredientsFromAllRecipes(selectedIngredientsList)
        })
    } else { deleteSelectedIngredients() }
  }

  return {
    ingredients,
    selectedIngredientsList,
    handleAddIngredient,
    handleUnselectAllIngredients,
    handleIngredientChange,
    handleDeleteIngredient,
    handleDeleteSelectedIngredients,
    handleUnselectIngredient,
    handleSelectIngredient
  }
}
