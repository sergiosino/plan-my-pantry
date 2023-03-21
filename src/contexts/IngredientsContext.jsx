import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'

export const IngredientsContext = createContext({})

// TODO: Create some default data if empty storage
export function IngredientsContextProvider ({ children }) {
  const [ingredients, setIngredients] = useState([])

  const updateIngredients = (newIngredients) => {
    const jsonValue = JSON.stringify(newIngredients)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST, jsonValue)
    setIngredients(newIngredients)
  }

  const sortIngredientsAlphabetically = async () => {
    const storageIngredients = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST)
    const newIngredients = [...JSON.parse(storageIngredients)]
    newIngredients.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()))
    updateIngredients(newIngredients)
  }

  useEffect(() => {
    const getStorageIngredients = async () => {
      let storageIngredients = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST)
      storageIngredients = storageIngredients != null ? JSON.parse(storageIngredients) : null
      if (storageIngredients) { setIngredients(storageIngredients) }
    }
    getStorageIngredients()
  }, [])

  return (
    <IngredientsContext.Provider value={{ ingredients, setIngredients: updateIngredients, sortIngredientsAlphabetically }}>
      {children}
    </IngredientsContext.Provider>
  )
}
