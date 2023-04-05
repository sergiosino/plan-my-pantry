import { createContext, useState } from 'react'

export const RecipesContext = createContext({})

export function RecipesContextProvider ({ children }) {
  const [recipes, setRecipes] = useState([])

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipesContext.Provider>
  )
}
