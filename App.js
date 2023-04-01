import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Routes from './src/routes/Routes'
import AppContexts from './src/components/AppContexts'

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(227, 165, 48)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)'
  }
}

export default function App () {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContexts>
        <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
          <NavigationContainer theme={MyTheme}>
            <StatusBar />
            <Routes />
          </NavigationContainer>
        </View>
      </AppContexts>
    </GestureHandlerRootView>
  )
}
