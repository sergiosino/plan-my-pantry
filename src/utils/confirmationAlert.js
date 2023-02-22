import { Alert } from 'react-native'

export const confirmationAlert = (title, message, onOK) => {
  Alert.alert(title, message, [
    { text: 'Cancel' },
    { text: 'OK', onPress: onOK }
  ])
}
