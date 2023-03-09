import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export default function Button (props) {
  const {
    children,
    style,
    onPress
  } = props

  return (
    <RectButton
      style={[styles.textButton, style]}
      onPress={onPress}
    >
      {children}
    </RectButton>
  )
}

const styles = StyleSheet.create({
  textButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4
  }
})
