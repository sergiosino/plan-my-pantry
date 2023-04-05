import { createContext, useState } from 'react'

export const GroceryListContext = createContext({})

export function GroceryListContextProvider ({ children }) {
  const [groceryList, setGroceryList] = useState([])

  return (
    <GroceryListContext.Provider value={{ groceryList, setGroceryList }}>
      {children}
    </GroceryListContext.Provider>
  )
}
