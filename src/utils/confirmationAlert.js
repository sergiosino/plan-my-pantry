import { Alert } from 'react-native'

import i18n from './i18n'

export const confirmationAlert = (title, message, onOK) => {
  Alert.alert(title, message, [
    { text: i18n.t('COMMON.CANCEL') },
    { text: i18n.t('COMMON.OK'), onPress: onOK }
  ])
}
