import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

export default function Button (props) {
  const {
    children,
    style,
    onPress
  } = props

  const { colors } = useTheme()
  const buttonStyle = [styles.textButton, { backgroundColor: colors.primary }]

  return (
    <RectButton
      style={[buttonStyle, style]}
      onPress={onPress}
    >
      {children}
    </RectButton>
  )
}

const styles = StyleSheet.create({
  textButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    paddingHorizontal: 15,
    borderRadius: 4
  }
})
