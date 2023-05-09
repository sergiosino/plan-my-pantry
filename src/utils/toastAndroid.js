import { ToastAndroid } from 'react-native'

export const toastAndroid = (text) => {
  ToastAndroid.show(text, ToastAndroid.SHORT)
}
