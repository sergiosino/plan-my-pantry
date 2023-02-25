import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { ASYNC_STORAGE_KEYS } from '../constants/constants'
import uuid from 'react-native-uuid'

export function useIngredientsList (props) {
  const { itemIndexToFocus } = props

  const [selectedList, setSelectedList] = useState([])
  const [ingredientsList, setIngredientsList] = useState([])

  const updateIngredientsList = async (newIngredientsList) => {
    const jsonValue = JSON.stringify(newIngredientsList)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST, jsonValue)
    setIngredientsList(newIngredientsList)
  }

  const handleAddIngredient = () => {
    const newIngredient = { id: uuid.v4(), text: '' }
    const newIngredientsList = [...ingredientsList]
    newIngredientsList.push(newIngredient)
    itemIndexToFocus.current = newIngredientsList.length - 1
    updateIngredientsList(newIngredientsList)
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
    const ingredientIndex = ingredientsList.findIndex(ingredient => ingredient.id === id)
    const ingredient = ingredientsList[ingredientIndex]

    if (ingredient.text !== text) {
      const newIngredientsList = [...ingredientsList]
      newIngredientsList[ingredientIndex] = { id, text }
      updateIngredientsList(newIngredientsList)
    }
  }

  const handleDeleteIngredient = (id) => {
    const newIngredientsList = ingredientsList.filter(ingredient => ingredient.id !== id)
    updateIngredientsList(newIngredientsList)
    handleUnselectIngredient(id)
  }

  const handleDeleteSelectedIngredients = () => {
    const newIngredientsList = ingredientsList.filter(ingredient => !selectedList.includes(ingredient.id))
    updateIngredientsList(newIngredientsList)
    setSelectedList([])
  }

  useEffect(() => {
    const getStorageIngredientsList = async () => {
      let storageIngredientsList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST)
      storageIngredientsList = storageIngredientsList != null ? JSON.parse(storageIngredientsList) : null
      if (storageIngredientsList) { setIngredientsList(storageIngredientsList) }
    }
    getStorageIngredientsList()
  }, [])

  // Sort the ingredients list alphabetically before component closes
  useEffect(() => {
    const sortAlphabeticallyIngredientsList = async () => {
      const storageIngredientsList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST)
      const newIngredientsList = [...JSON.parse(storageIngredientsList)]
      newIngredientsList.sort((a, b) => a.text.localeCompare(b.text))
      updateIngredientsList(newIngredientsList)
    }
    return () => sortAlphabeticallyIngredientsList()
  }, [])

  return {
    ingredientsList,
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
