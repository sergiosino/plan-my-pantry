import { WeekMenuContextProvider } from './WeekMenuContext'
import { GroceryListContextProvider } from './GroceryListContext'
import { UserConfigContextProvider } from './UserConfigContext'

export default function AppContexts ({ children }) {
  return (
    <UserConfigContextProvider>
      <GroceryListContextProvider>
        <WeekMenuContextProvider>
          {children}
        </WeekMenuContextProvider>
      </GroceryListContextProvider>
    </UserConfigContextProvider>
  )
}
