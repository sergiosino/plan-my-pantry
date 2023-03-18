import { useContext, useEffect, useState } from 'react'
import uuid from 'react-native-uuid'
import { IngredientsContext } from '../contexts/IngredientsContext'

export function useIngredientsList (props) {
  const { itemIdToFocus } = props

  const { ingredients, setIngredients, sortIngredientsAlphabetically } = useContext(IngredientsContext)
  const [selectedList, setSelectedList] = useState([])

  const handleAddIngredient = () => {
    const newIngredient = { id: uuid.v4(), text: '' }
    const newIngredientsList = [newIngredient, ...ingredients]
    itemIdToFocus.current = newIngredient.id
    setIngredients(newIngredientsList)
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
      const newIngredientsList = [...ingredients]
      newIngredientsList[ingredientIndex] = { id, text }
      setIngredients(newIngredientsList)
    }
  }

  const handleDeleteIngredient = (id) => {
    const newIngredientsList = ingredients.filter(ingredient => ingredient.id !== id)
    setIngredients(newIngredientsList)
    handleUnselectIngredient(id)
  }

  const handleDeleteSelectedIngredients = () => {
    const newIngredientsList = ingredients.filter(ingredient => !selectedList.includes(ingredient.id))
    setIngredients(newIngredientsList)
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
