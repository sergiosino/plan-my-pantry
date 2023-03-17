import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import { View } from 'react-native'

import BottomAppBar from './src/components/Routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { IngredientsContextProvider } from './src/contexts/IngredientsContext'
import { RecipesContextProvider } from './src/contexts/RecipesContext'

export default function App () {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <IngredientsContextProvider>
        <RecipesContextProvider>
          <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
            <NavigationContainer>
              <StatusBar />
              <BottomAppBar />
            </NavigationContainer>
          </View>
        </RecipesContextProvider>
      </IngredientsContextProvider>
    </GestureHandlerRootView>
  )
}
