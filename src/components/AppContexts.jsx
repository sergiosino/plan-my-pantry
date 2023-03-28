import { RecipesContextProvider } from '../contexts/RecipesContext'
import { WeekMenuContextProvider } from '../contexts/WeekMenuContext'
import { GroceryListContextProvider } from '../contexts/GroceryListContext'

export default function AppContexts ({ children }) {
  return (
    <GroceryListContextProvider>
      <RecipesContextProvider>
        <WeekMenuContextProvider>
          {children}
        </WeekMenuContextProvider>
      </RecipesContextProvider>
    </GroceryListContextProvider>
  )
}
