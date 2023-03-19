import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import { View } from 'react-native'

import TabsRoutes from './src/routes/BottomTabsRoutes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { IngredientsContextProvider } from './src/contexts/IngredientsContext'
import { RecipesContextProvider } from './src/contexts/RecipesContext'
import { WeekMenuContextProvider } from './src/contexts/WeekMenuContext'

export default function App () {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <IngredientsContextProvider>
        <RecipesContextProvider>
          <WeekMenuContextProvider>
            <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
              <NavigationContainer>
                <StatusBar />
                <TabsRoutes />
              </NavigationContainer>
            </View>
          </WeekMenuContextProvider>
        </RecipesContextProvider>
      </IngredientsContextProvider>
    </GestureHandlerRootView>
  )
}
