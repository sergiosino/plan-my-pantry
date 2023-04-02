import { RecipesContextProvider } from './RecipesContext'
import { WeekMenuContextProvider } from './WeekMenuContext'
import { GroceryListContextProvider } from './GroceryListContext'

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
