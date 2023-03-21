import { IngredientsContextProvider } from '../contexts/IngredientsContext'
import { RecipesContextProvider } from '../contexts/RecipesContext'
import { WeekMenuContextProvider } from '../contexts/WeekMenuContext'
import { GroceryListContextProvider } from '../contexts/GroceryListContext'

export default function AppContexts ({ children }) {
  return (
    <GroceryListContextProvider>
      <IngredientsContextProvider>
        <RecipesContextProvider>
          <WeekMenuContextProvider>
            {children}
          </WeekMenuContextProvider>
        </RecipesContextProvider>
      </IngredientsContextProvider>
    </GroceryListContextProvider>
  )
}
