import { useCallback } from 'react'
import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { useFocusEffect } from '@react-navigation/native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'

import { TextInputStyled, Checkbox } from '../components/forms'
import Divider from '../components/Divider'

import { useRecipes, useUserConfig } from '../hooks'

import { i18n } from '../utils'

import { PRIVACY_POLICY_URL, TERMS_CONDITIONS_URL, USER_CONFIG_PARAMS } from '../constants/constants'

const { SHOW_WELCOME_PAGE, SHOW_HEADER_HELP_ICON, DEFAULT_LANGUAGE } = USER_CONFIG_PARAMS

export default function SettingsView () {
  const { recipes, handleGetRecipes } = useRecipes()
  const { showWelcomePage, showHeaderHelpIcon, updateUserConfig } = useUserConfig()

  const handleWelcomPageCheckChange = () => updateUserConfig(SHOW_WELCOME_PAGE, !showWelcomePage)

  const handleHeaderHelpIconCheckChange = () => updateUserConfig(SHOW_HEADER_HELP_ICON, !showHeaderHelpIcon)

  const handleDefaultLanguageChange = (language) => updateUserConfig(DEFAULT_LANGUAGE, language)

  const handleOpenUrl = (url) => Linking.openURL(url)

  useFocusEffect(
    useCallback(() => {
      handleGetRecipes()
    }, [])
  )

  return (
    <View style={styles.conatiner}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/chick-settings.png')} style={styles.chickImg} />
      </View>
      <Divider />
      <ScrollView>
        <View style={{ padding: 15, backgroundColor: 'white' }}>
          <Text style={{ marginBottom: 5 }}>{i18n.t('SETTINGS.RECIPES_JSON')}</Text>
          <TextInputStyled
            value={JSON.stringify(recipes)}
            multiline
            numberOfLines={10}
          />
        </View>
        <Divider />
        <RectButton style={styles.backgroundWhite} onPress={handleWelcomPageCheckChange}>
          <View style={styles.settingContainer}>
            <Text>{i18n.t('SETTINGS.SHOW_WELCOME')}</Text>
            <Checkbox checked={showWelcomePage} />
          </View>
        </RectButton>
        <Divider />
        <RectButton style={styles.backgroundWhite} onPress={handleHeaderHelpIconCheckChange}>
          <View style={styles.settingContainer}>
            <Text>
              {i18n.t('SETTINGS.SHOW_HELP_ICON_1')}
              <Ionicons name='help-outline' size={20} />
              {i18n.t('SETTINGS.SHOW_HELP_ICON_2')}
            </Text>
            <Checkbox checked={showHeaderHelpIcon} />
          </View>
        </RectButton>
        <Divider />
        <RectButton style={styles.backgroundWhite} onPress={() => handleDefaultLanguageChange('en')}>
          <View style={styles.settingContainer}>
            <Text>INGLES</Text>
          </View>
        </RectButton>
        <Divider />
        <RectButton style={styles.backgroundWhite} onPress={() => handleDefaultLanguageChange('es')}>
          <View style={styles.settingContainer}>
            <Text>ESPAÑOL</Text>
          </View>
        </RectButton>
        <Divider />
        <RectButton style={styles.backgroundWhite} onPress={() => handleOpenUrl(TERMS_CONDITIONS_URL)}>
          <View style={styles.settingContainer}>
            <Text>{i18n.t('SETTINGS.TERMS_CONDITIONS')}</Text>
            <Ionicons name='chevron-forward' size={20} />
          </View>
        </RectButton>
        <Divider />
        <RectButton style={styles.backgroundWhite} onPress={() => handleOpenUrl(PRIVACY_POLICY_URL)}>
          <View style={styles.settingContainer}>
            <Text>{i18n.t('SETTINGS.PRIVACY_POLICY')}</Text>
            <Ionicons name='chevron-forward' size={20} />
          </View>
        </RectButton>
        <Divider />
        <View style={[styles.settingContainer, styles.backgroundWhite]}>
          <Text>{i18n.t('SETTINGS.APP_VERSION')}</Text>
          <Text>{Constants.manifest.version}</Text>
        </View>
        <Divider style={styles.marginBottom50} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  chickImg: {
    height: 80,
    width: 80
  },
  backgroundWhite: {
    backgroundColor: 'white'
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 55
  },
  marginBottom50: {
    marginBottom: 50
  }
})
