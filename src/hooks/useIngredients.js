import { useContext } from 'react'
import uuid from 'react-native-uuid'

import { IngredientsContext } from '../contexts/IngredientsContext'

export function useIngredients () {
  const {
    ingredients,
    setIngredients,
    sortIngredientsAlphabetically,
    selectedIngredientsList,
    setSelectedIngredientsList
  } = useContext(IngredientsContext)

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

  const handleDeleteIngredient = (id) => {
    const newIngredients = ingredients.filter(ingredient => ingredient.id !== id)
    setIngredients(newIngredients)
    handleUnselectIngredient(id)
  }

  const handleDeleteSelectedIngredients = () => {
    const newIngredients = ingredients.filter(ingredient => !selectedIngredientsList.includes(ingredient.id))
    setIngredients(newIngredients)
    setSelectedIngredientsList([])
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
    handleSelectIngredient,
    sortIngredientsAlphabetically
  }
}
