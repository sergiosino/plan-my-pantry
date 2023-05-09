import { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'

import Modal from '../Modal'
import Button from '../buttons/Button'

import { useRecipes } from '../../hooks'

import { confirmationAlert, i18n, toastAndroid } from '../../utils'

export default function ImportExportRecipesModal (props) {
  const { isModalOpen, setIsModalOpen } = props

  const {
    handleGetRecipes,
    importBase64,
    exportBase64
  } = useRecipes()

  const handleExportRecipes = async () => {
    const recipesBase64 = exportBase64()
    const actualClipboard = await Clipboard.getStringAsync()

    if (actualClipboard !== recipesBase64) {
      await Clipboard.setStringAsync(recipesBase64)
      toastAndroid(i18n.t('IMPORT_EXPORT_RECIPES_MODAL.RECIPES_BACKUP_CLIPBOARD'))
    } else {
      toastAndroid(i18n.t('IMPORT_EXPORT_RECIPES_MODAL.RECIPES_BACKUP_BACKUP_CLIPBOARD'))
    }
  }

  const handleImportRecipes = async () => {
    const recipesCode = await Clipboard.getStringAsync()
    if (!recipesCode) {
      toastAndroid(i18n.t('IMPORT_EXPORT_RECIPES_MODAL.EMPTY_CLIPBOARD'))
      return
    }

    confirmationAlert(
      i18n.t('IMPORT_EXPORT_RECIPES_MODAL.WARNING'),
      i18n.t('IMPORT_EXPORT_RECIPES_MODAL.CONFIRMATION_IMPORT_RECIPES_BACKUP'),
      () => {
        const textResult = importBase64(recipesCode)
        toastAndroid(textResult)
      }
    )
  }

  useFocusEffect(
    useCallback(() => {
      handleGetRecipes()
    }, [])
  )

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={i18n.t('IMPORT_EXPORT_RECIPES_MODAL.IMPORT_EXPORT_RECIPES')}
    >
      <View>
        <Text style={styles.textCenter}>{i18n.t('IMPORT_EXPORT_RECIPES_MODAL.GET_RECIPES_BACKUP')}</Text>
        <Button style={styles.button} onPress={handleExportRecipes}>
          <Text>{i18n.t('IMPORT_EXPORT_RECIPES_MODAL.SAVE_CLIPBOARD')}</Text>
        </Button>
      </View>
      <View style={[styles.views, styles.importView]}>
        <Text style={styles.textCenter}>{i18n.t('IMPORT_EXPORT_RECIPES_MODAL.IMPORT_RECIPES_BACKUP')}</Text>
        <Button style={styles.button} onPress={handleImportRecipes}>
          <Text>{i18n.t('IMPORT_EXPORT_RECIPES_MODAL.IMPORT_FROM_CLIPBOARD')}</Text>
        </Button>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10
  },
  textCenter: {
    textAlign: 'center'
  },
  importView: {
    marginTop: 20
  }
})
