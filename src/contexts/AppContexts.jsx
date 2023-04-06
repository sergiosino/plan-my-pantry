import { GroceryListContextProvider } from './GroceryListContext'
import { UserConfigContextProvider } from './UserConfigContext'

export default function AppContexts ({ children }) {
  return (
    <UserConfigContextProvider>
      <GroceryListContextProvider>
        {children}
      </GroceryListContextProvider>
    </UserConfigContextProvider>
  )
}
