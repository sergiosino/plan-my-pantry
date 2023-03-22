import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useRef, useState } from 'react'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'
import { DEFAULT_DATA_INGREDIENTS } from '../constants/defaultData'

export const IngredientsContext = createContext({})

// TODO: Create some default data if empty storage
export function IngredientsContextProvider ({ children }) {
  const [ingredients, setIngredients] = useState([])
  const [selectedIngredientsList, setSelectedIngredientsList] = useState([])
  const hasToBeSorted = useRef(false)

  const updateIngredients = (newIngredients) => {
    // Sort only after adding new data
    if (hasToBeSorted.current) {
      newIngredients.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()))
      hasToBeSorted.current = false
    }
    if (newIngredients.length > ingredients.length) { hasToBeSorted.current = true }

    const jsonValue = JSON.stringify(newIngredients)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST, jsonValue)
    setIngredients(newIngredients)
  }

  useEffect(() => {
    const getStorageIngredients = async () => {
      let storageIngredients = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST)
      storageIngredients = storageIngredients ? JSON.parse(storageIngredients) : DEFAULT_DATA_INGREDIENTS
      setIngredients(storageIngredients)
    }
    getStorageIngredients()
  }, [])

  return (
    <IngredientsContext.Provider value={{
      ingredients,
      setIngredients: updateIngredients,
      selectedIngredientsList,
      setSelectedIngredientsList
    }}
    >
      {children}
    </IngredientsContext.Provider>
  )
}
