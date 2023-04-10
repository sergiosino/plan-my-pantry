import { useCallback, useState } from 'react'
import { Image, Linking, Share, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { useFocusEffect } from '@react-navigation/native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'

import { TextInputStyled, Switch } from '../components/forms'
import Divider from '../components/Divider'
import LanguageSelectorModal from '../components/settings/LanguageSelectorModal'

import { useRecipes, useUserConfig } from '../hooks'

import { i18n } from '../utils'

import { PRIVACY_POLICY_URL, RATE_APP_URL, TERMS_CONDITIONS_URL, USER_CONFIG_PARAMS } from '../constants/constants'

const { SHOW_WELCOME_PAGE, SHOW_HEADER_HELP_ICON } = USER_CONFIG_PARAMS

/**
 * Settings view to modify the user experience using the app
 */
export default function SettingsView () {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const { recipes, handleGetRecipes } = useRecipes()
  const { showWelcomePage, showHeaderHelpIcon, updateUserConfig } = useUserConfig()

  const handleWelcomPageCheckChange = () => updateUserConfig(SHOW_WELCOME_PAGE, !showWelcomePage)

  const handleHeaderHelpIconCheckChange = () => updateUserConfig(SHOW_HEADER_HELP_ICON, !showHeaderHelpIcon)

  const handleOpenUrl = (url) => Linking.openURL(url)

  const handleShare = () => {
    Share.share({
      title: i18n.t('SETTINGS.SHARE_PMP'),
      message: i18n.t('SETTINGS.SHARE_MESSAGE')
    })
  }

  useFocusEffect(
    useCallback(() => {
      handleGetRecipes()
    }, [])
  )

  return (
    <View style={styles.container}>
      <LanguageSelectorModal isModalOpen={isLanguageOpen} setIsModalOpen={setIsLanguageOpen} />
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/chick-settings.png')} style={styles.chickImg} />
      </View>
      <Divider />
      <ScrollView>
        <View style={[styles.settingContainer, styles.backgroundWhite]}>
          <Text>{i18n.t('SETTINGS.SHOW_WELCOME')}</Text>
          <Switch value={showWelcomePage} onValueChange={handleWelcomPageCheckChange} />
        </View>
        <Divider />
        <View style={[styles.settingContainer, styles.backgroundWhite]}>
          <Text>
            {i18n.t('SETTINGS.SHOW_HELP_ICON_1')}
            <Ionicons name='help' size={20} />
            {i18n.t('SETTINGS.SHOW_HELP_ICON_2')}
          </Text>
          <Switch value={showHeaderHelpIcon} onValueChange={handleHeaderHelpIconCheckChange} />
        </View>
        <Divider />
        <RectButton style={styles.backgroundWhite} onPress={() => setIsLanguageOpen(true)}>
          <View style={styles.settingContainer}>
            <Text>{i18n.t('SETTINGS.CHANGE_LANGUAGE')}</Text>
            <Ionicons name='chevron-forward' size={20} />
          </View>
        </RectButton>
        <Divider />
        <RectButton style={styles.backgroundWhite} onPress={handleShare}>
          <View style={styles.settingContainer}>
            <Text>{i18n.t('SETTINGS.SHARE_PMP')}</Text>
            <Ionicons name='heart-outline' size={20} />
          </View>
        </RectButton>
        <Divider />
        <RectButton style={styles.backgroundWhite} onPress={() => handleOpenUrl(RATE_APP_URL)}>
          <View style={styles.settingContainer}>
            <Text>{i18n.t('SETTINGS.RATE_GOOGLE_PLAY')}</Text>
            <Ionicons name='star-outline' size={20} />
          </View>
        </RectButton>
        <Divider />
        <RectButton style={styles.backgroundWhite} onPress={() => handleOpenUrl(TERMS_CONDITIONS_URL)}>
          <View style={styles.settingContainer}>
            <Text>{i18n.t('SETTINGS.TERMS_CONDITIONS')}</Text>
            <Ionicons name='open-outline' size={20} />
          </View>
        </RectButton>
        <Divider />
        <RectButton style={styles.backgroundWhite} onPress={() => handleOpenUrl(PRIVACY_POLICY_URL)}>
          <View style={styles.settingContainer}>
            <Text>{i18n.t('SETTINGS.PRIVACY_POLICY')}</Text>
            <Ionicons name='open-outline' size={20} />
          </View>
        </RectButton>
        <Divider />
        <View style={[styles.settingContainer, styles.backgroundWhite]}>
          <Text>{i18n.t('SETTINGS.APP_VERSION')}</Text>
          <Text>{Constants.manifest.version}</Text>
        </View>
        <Divider />
        <View style={{ padding: 15, backgroundColor: 'white' }}>
          <Text style={{ marginBottom: 5 }}>{i18n.t('SETTINGS.RECIPES_JSON')}</Text>
          <TextInputStyled
            value={JSON.stringify(recipes)}
            multiline
            numberOfLines={10}
          />
        </View>
        <Divider style={styles.marginBottom50} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
