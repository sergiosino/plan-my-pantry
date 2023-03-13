import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import { View } from 'react-native'

import BottomAppBar from './src/components/Routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App () {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
        <NavigationContainer>
          <StatusBar />
          <BottomAppBar />
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  )
}
