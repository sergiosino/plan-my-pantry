import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Routes from './src/routes/Routes'
import AppContexts from './src/components/AppContexts'

export default function App () {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContexts>
        <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
          <NavigationContainer>
            <StatusBar />
            <Routes />
          </NavigationContainer>
        </View>
      </AppContexts>
    </GestureHandlerRootView>
  )
}
