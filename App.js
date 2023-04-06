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
