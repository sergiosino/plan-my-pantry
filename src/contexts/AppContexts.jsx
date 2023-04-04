import { RecipesContextProvider } from './RecipesContext'
import { WeekMenuContextProvider } from './WeekMenuContext'
import { GroceryListContextProvider } from './GroceryListContext'
import { UserConfigContextProvider } from './UserConfigContext'

export default function AppContexts ({ children }) {
  return (
    <UserConfigContextProvider>
      <GroceryListContextProvider>
        <RecipesContextProvider>
          <WeekMenuContextProvider>
            {children}
          </WeekMenuContextProvider>
        </RecipesContextProvider>
      </GroceryListContextProvider>
    </UserConfigContextProvider>
  )
}
