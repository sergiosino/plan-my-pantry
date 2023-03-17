import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext, useEffect, useState } from 'react'
import { ASYNC_STORAGE_KEYS } from '../constants/constants'
import uuid from 'react-native-uuid'
import { IngredientsContext } from '../contexts/IngredientsContext'

export function useIngredientsList (props) {
  const { itemIdToFocus } = props

  const { ingredients, setIngredients } = useContext(IngredientsContext)
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

  useEffect(() => {
    const getStorageIngredientsList = async () => {
      let storageIngredientsList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST)
      storageIngredientsList = storageIngredientsList != null ? JSON.parse(storageIngredientsList) : null
      if (storageIngredientsList) { setIngredients(storageIngredientsList) }
    }
    getStorageIngredientsList()
  }, [])

  // Sort the ingredients list alphabetically before component closes
  useEffect(() => {
    const sortAlphabeticallyIngredientsList = async () => {
      const storageIngredientsList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST)
      const newIngredientsList = [...JSON.parse(storageIngredientsList)]
      newIngredientsList.sort((a, b) => a.text.localeCompare(b.text))
      setIngredients(newIngredientsList)
    }
    return () => sortAlphabeticallyIngredientsList()
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
