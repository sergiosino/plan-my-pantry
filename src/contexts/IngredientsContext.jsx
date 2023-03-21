import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useRef, useState } from 'react'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'

export const IngredientsContext = createContext({})

// TODO: Create some default data if empty storage
export function IngredientsContextProvider ({ children }) {
  const [ingredients, setIngredients] = useState([])
  const [selectedIngredientsList, setSelectedIngredientsList] = useState([])
  const hasIngredientsChanged = useRef(true)

  const updateIngredients = async (newIngredients) => {
    const jsonValue = JSON.stringify(newIngredients)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST, jsonValue)
    setIngredients(newIngredients)
    hasIngredientsChanged.current = true
  }

  const sortIngredientsAlphabetically = async () => {
    if (hasIngredientsChanged.current) {
      const storageIngredients = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST)
      const newIngredients = [...JSON.parse(storageIngredients)]
      newIngredients.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()))
      await updateIngredients(newIngredients)
      hasIngredientsChanged.current = false
    }
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
    <IngredientsContext.Provider value={{
      ingredients,
      setIngredients: updateIngredients,
      sortIngredientsAlphabetically,
      selectedIngredientsList,
      setSelectedIngredientsList
    }}
    >
      {children}
    </IngredientsContext.Provider>
  )
}
