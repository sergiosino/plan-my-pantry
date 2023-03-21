import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'

export const RecipesContext = createContext({})

// TODO: Create some default data if empty storage
export function RecipesContextProvider ({ children }) {
  const [recipes, setRecipes] = useState([])

  const updateRecipes = (newRecipes) => {
    const jsonValue = JSON.stringify(newRecipes)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.RECIPES_LIST, jsonValue)
    setRecipes(newRecipes)
  }

  useEffect(() => {
    const getStorageRecipes = async () => {
      let storageRecipes = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.RECIPES_LIST)
      storageRecipes = storageRecipes != null ? JSON.parse(storageRecipes) : null
      if (storageRecipes) { setRecipes(storageRecipes) }
    }
    getStorageRecipes()
  }, [])

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes: updateRecipes }}>
      {children}
    </RecipesContext.Provider>
  )
}
