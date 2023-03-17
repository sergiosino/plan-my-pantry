import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'

export const IngredientsContext = createContext({})

export function IngredientsContextProvider ({ children }) {
  const [ingredients, setIngredients] = useState([])

  const updateIngredientsList = async (newIngredientsList) => {
    const jsonValue = JSON.stringify(newIngredientsList)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST, jsonValue)
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
    <IngredientsContext.Provider value={{ ingredients, setIngredients: updateIngredientsList }}>
      {children}
    </IngredientsContext.Provider>
  )
}
