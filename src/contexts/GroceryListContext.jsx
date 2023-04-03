import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'

export const GroceryListContext = createContext({})

export function GroceryListContextProvider ({ children }) {
  const [groceryList, setGroceryList] = useState([])

  const updateGroceryList = (newGroceryList) => {
    const jsonValue = JSON.stringify(newGroceryList)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.GROCERY_LIST, jsonValue)
    setGroceryList(newGroceryList)
  }

  useEffect(() => {
    const getStorageGroceryList = async () => {
      let storageGroceryList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.GROCERY_LIST)
      storageGroceryList = storageGroceryList != null
        ? JSON.parse(storageGroceryList)
        : null
      if (storageGroceryList) { setGroceryList(storageGroceryList) }
    }
    getStorageGroceryList()
  }, [])

  return (
    <GroceryListContext.Provider value={{
      groceryList,
      setGroceryList: updateGroceryList
    }}
    >
      {children}
    </GroceryListContext.Provider>
  )
}
