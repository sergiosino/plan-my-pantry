import { useState } from 'react'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'

import Modal from '../Modal'
import { LANGUAGES, USER_CONFIG_PARAMS } from '../../constants/constants'
import Divider from '../Divider'

import { useUserConfig } from '../../hooks'

import { i18n } from '../../utils'

const { DEFAULT_LANGUAGE } = USER_CONFIG_PARAMS

export default function LanguageSelectorModal (props) {
  const { isModalOpen, setIsModalOpen } = props

  const { defaultLanguage, updateUserConfig } = useUserConfig()

  const [languageSelected, setLanguageSelected] = useState(defaultLanguage)

  const handleSelectLanguage = (language) => {
    setLanguageSelected(language)
  }

  const handleSave = () => {
    setIsModalOpen(false)
    updateUserConfig(DEFAULT_LANGUAGE, languageSelected)
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={i18n.t('SETTINGS.SELECT_LANGUAGE')}
      onSave={handleSave}
    >
      <ScrollView style={styles.scrollView} scr>
        {LANGUAGES.map((option, index) => {
          const { id, name, flag } = option
          const isSelected = languageSelected === id
          return (
            <View style={[styles.languageContainer, isSelected && styles.languageContainerSelected]} key={index}>
              <RectButton onPress={() => handleSelectLanguage(id)}>
                <View style={styles.language}>
                  <Text>{flag}{name}</Text>
                </View>
              </RectButton>
              <Divider style={styles.divider} />
            </View>
          )
        })}
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    height: 220
  },
  language: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10
  },
  languageContainer: {
    marginHorizontal: 50
  },
  languageContainerSelected: {
    backgroundColor: 'lightgray'
  },
  divider: {
    marginHorizontal: 25
  }
})
