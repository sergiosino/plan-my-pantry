import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import { View } from 'react-native'

import BottomAppBar from './src/components/BottomTabs'

export default function App () {
  return (
    <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <NavigationContainer>
        <StatusBar />
        <BottomAppBar />
      </NavigationContainer>
    </View>
  )
}
