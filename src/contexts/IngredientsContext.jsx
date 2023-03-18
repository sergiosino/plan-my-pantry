import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'

export const IngredientsContext = createContext({})

export function IngredientsContextProvider ({ children }) {
  const [ingredients, setIngredients] = useState([])

  const updateIngredientsList = (newIngredientsList) => {
    const jsonValue = JSON.stringify(newIngredientsList)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST, jsonValue)
    setIngredients(newIngredientsList)
  }

  const sortIngredientsAlphabetically = async () => {
    const storageIngredientsList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST)
    const newIngredientsList = [...JSON.parse(storageIngredientsList)]
    newIngredientsList.sort((a, b) => a.text.localeCompare(b.text))
    setIngredients(newIngredientsList)
  }

  useEffect(() => {
    const getStorageIngredientsList = async () => {
      let storageIngredientsList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST)
      storageIngredientsList = storageIngredientsList != null ? JSON.parse(storageIngredientsList) : null
      if (storageIngredientsList) { setIngredients(storageIngredientsList) }
    }
    getStorageIngredientsList()
  }, [])

  return (
    <IngredientsContext.Provider value={{ ingredients, setIngredients: updateIngredientsList, sortIngredientsAlphabetically }}>
      {children}
    </IngredientsContext.Provider>
  )
}
