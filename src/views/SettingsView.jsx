import { useCallback } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { useFocusEffect } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'

import { TextInputStyled, Checkbox } from '../components/forms'
import Divider from '../components/Divider'

import { useRecipes, useUserConfig } from '../hooks'

import { USER_CONFIG_PARAMS } from '../constants/constants'

const { SHOW_WELCOME_PAGE, SHOW_HEADER_HELP_ICON } = USER_CONFIG_PARAMS

export default function SettingsView () {
  const { recipes, handleGetRecipes } = useRecipes()
  const { showWelcomePage, showHeaderHelpIcon, updateUserConfig } = useUserConfig()

  const handleWelcomPageCheckChange = () => updateUserConfig(SHOW_WELCOME_PAGE, !showWelcomePage)

  const handleHeaderHelpIconCheckChange = () => updateUserConfig(SHOW_HEADER_HELP_ICON, !showHeaderHelpIcon)

  useFocusEffect(
    useCallback(() => {
      handleGetRecipes()
    }, [])
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/chick-settings.png')} style={{ height: 80, width: 80 }} />
      </View>
      <Divider />
      <View style={{ padding: 10, backgroundColor: 'white' }}>
        <Text style={{ marginBottom: 5 }}>Recipes JSON</Text>
        <TextInputStyled
          value={JSON.stringify(recipes)}
          multiline
          numberOfLines={10}
        />
      </View>
      <Divider />
      <RectButton onPress={handleWelcomPageCheckChange} style={styles.backgroundWhite}>
        <View style={styles.settingContainer}>
          <Text>Show welcome page</Text>
          <Checkbox checked={showWelcomePage} />
        </View>
      </RectButton>
      <Divider />
      <RectButton onPress={handleHeaderHelpIconCheckChange} style={styles.backgroundWhite}>
        <View style={styles.settingContainer}>
          <Text>Show <Ionicons name='help-outline' size={20} /> icon in header pages</Text>
          <Checkbox checked={showHeaderHelpIcon} />
        </View>
      </RectButton>
      <Divider />
      <View style={[styles.settingContainer, styles.backgroundWhite]}>
        <Text>App version</Text>
        <Text>{Constants.manifest.version}</Text>
      </View>
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  divider: {
    marginVertical: 20
  },
  backgroundWhite: {
    backgroundColor: 'white'
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 55
  }
})
