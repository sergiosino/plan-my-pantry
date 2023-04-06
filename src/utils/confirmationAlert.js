import { Alert } from 'react-native'
import { CANCEL, OK } from '../constants/texts/texts'

export const confirmationAlert = (title, message, onOK) => {
  Alert.alert(title, message, [
    { text: CANCEL },
    { text: OK, onPress: onOK }
  ])
}
