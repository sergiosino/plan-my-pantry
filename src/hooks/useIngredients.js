import { useContext, useEffect, useState } from 'react'
import { IngredientsContext } from '../contexts/IngredientsContext'

export function useIngredients (props) {
  const { ingredients, setIngredients, sortIngredientsAlphabetically } = useContext(IngredientsContext)
  const [selectedIngredientsList, setSelectedIngredientsList] = useState([])

  const handleAddIngredient = (newIngredient) => {
    const newIngredients = [newIngredient, ...ingredients]
    setIngredients(newIngredients)
  }

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

  // Sort the ingredients list alphabetically before component closes
  useEffect(() => {
    return () => sortIngredientsAlphabetically()
  }, [])

  return {
    ingredients,
    selectedIngredientsList,
    handleAddIngredient,
    handleSelectIngredient,
    handleUnselectIngredient,
    handleUnselectAllIngredients,
    handleIngredientChange,
    handleDeleteIngredient,
    handleDeleteSelectedIngredients
  }
}
