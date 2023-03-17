import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'
import { ASYNC_STORAGE_KEYS } from '../constants/constants'

export const RecipesContext = createContext({})

export function RecipesContextProvider ({ children }) {
  const { recipes, setRecipes } = useState([])

  const updateRecipesList = async (newRecipesList) => {
    const jsonValue = JSON.stringify(newRecipesList)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.RECIPES_LIST, jsonValue)
    setRecipes(newRecipesList)
  }

  useEffect(() => {
    const getStorageRecipesList = async () => {
      let storageRecipesList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.RECIPES_LIST)
      storageRecipesList = storageRecipesList != null ? JSON.parse(storageRecipesList) : null
      if (storageRecipesList) { setRecipes(storageRecipesList) }
    }
    getStorageRecipesList()
  }, [])

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes: updateRecipesList }}>
      {children}
    </RecipesContext.Provider>
  )
}
