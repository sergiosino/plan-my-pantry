import { Alert } from 'react-native'

import i18n from './i18n'

/**
 * Shows and alert with the info of the params
 * @param {string} title
 * @param {string} message
 * @param {function} onOK
 */
export const confirmationAlert = (title, message, onOK) => {
  Alert.alert(title, message, [
    { text: i18n.t('COMMON.CANCEL') },
    { text: i18n.t('COMMON.OK'), onPress: onOK }
  ])
}
