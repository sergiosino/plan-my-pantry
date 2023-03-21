import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'

export const GroceryListContext = createContext({})

export function GroceryListContextProvider ({ children }) {
  const [groceryListItems, setGroceryItems] = useState([])

  const updateGroceryList = (newGroceryList) => {
    const jsonValue = JSON.stringify(newGroceryList)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.GROCERY_LIST, jsonValue)
    setGroceryItems(newGroceryList)
  }

  useEffect(() => {
    const getStorageGroceryList = async () => {
      let storageGroceryList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.GROCERY_LIST)
      storageGroceryList = storageGroceryList != null ? JSON.parse(storageGroceryList) : null
      if (storageGroceryList) { setGroceryItems(storageGroceryList) }
    }
    getStorageGroceryList()
  }, [])

  return (
    <GroceryListContext.Provider value={{
      groceryListItems,
      setGroceryItems: updateGroceryList
    }}
    >
      {children}
    </GroceryListContext.Provider>
  )
}
