import { useState } from 'react'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'

import Modal from '../Modal'
import Divider from '../Divider'
import Button from '../buttons/Button'

import { useUserConfig } from '../../hooks'

import { i18n } from '../../utils'

import { LANGUAGES, USER_CONFIG_PARAMS } from '../../constants/constants'

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
    >
      <ScrollView style={styles.scrollView}>
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
      <Button onPress={handleSave}>
        <Text>{i18n.t('COMMON.SAVE_CLOSE')}</Text>
      </Button>
    </Modal>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    height: 220,
    marginBottom: 20
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
