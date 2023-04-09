import { GroceryListContextProvider } from './GroceryListContext'
import { UserConfigContextProvider } from './UserConfigContext'

/**
 * Component to add all contexts at once
 */
export default function AppContexts ({ children }) {
  return (
    <UserConfigContextProvider>
      <GroceryListContextProvider>
        {children}
      </GroceryListContextProvider>
    </UserConfigContextProvider>
  )
}
