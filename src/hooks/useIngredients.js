import { useContext, useEffect, useState } from 'react'
import uuid from 'react-native-uuid'
import { IngredientsContext } from '../contexts/IngredientsContext'

export function useIngredients (props) {
  const { itemIdToFocus } = props

  const { ingredients, setIngredients, sortIngredientsAlphabetically } = useContext(IngredientsContext)
  const [selectedList, setSelectedList] = useState([])

  const handleAddIngredient = () => {
    const newIngredient = { id: uuid.v4(), text: '' }
    const newIngredients = [newIngredient, ...ingredients]
    itemIdToFocus.current = newIngredient.id
    setIngredients(newIngredients)
  }

  const handleSelectIngredient = (id) => {
    const newSelectedList = [...selectedList]
    newSelectedList.push(id)
    setSelectedList(newSelectedList)
  }

  const handleUnselectIngredient = (id) => {
    const ingredientIndex = selectedList.findIndex(ingredientId => ingredientId === id)

    if (ingredientIndex >= 0) {
      const newSelectedList = [...selectedList]
      newSelectedList.splice(ingredientIndex, 1)
      setSelectedList(newSelectedList)
    }
  }

  const handleUnselectAllIngredients = () => {
    setSelectedList([])
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
    const newIngredients = ingredients.filter(ingredient => !selectedList.includes(ingredient.id))
    setIngredients(newIngredients)
    setSelectedList([])
  }

  // Sort the ingredients list alphabetically before component closes
  useEffect(() => {
    return () => sortIngredientsAlphabetically()
  }, [])

  return {
    ingredients,
    selectedList,
    handleAddIngredient,
    handleSelectIngredient,
    handleUnselectIngredient,
    handleUnselectAllIngredients,
    handleIngredientChange,
    handleDeleteIngredient,
    handleDeleteSelectedIngredients
  }
}
