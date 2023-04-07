import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Routes from './src/routes/Routes'
import AppContexts from './src/contexts/AppContexts'

const MyTheme = {
  dark: false,
  colors: {
    primary: '#e3a530',
    background: '#f2f2f2',
    card: '#ffffff',
    text: '#1c1c1e',
    border: '#d8d8d8',
    notification: '#ff3b30'
  }
}

export default function App () {
  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <AppContexts>
        <StatusBar backgroundColor={MyTheme.colors.background} />
        <View style={styles.appContainer}>
          <NavigationContainer theme={MyTheme}>
            <Routes />
          </NavigationContainer>
        </View>
      </AppContexts>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1
  },
  appContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  }
})
