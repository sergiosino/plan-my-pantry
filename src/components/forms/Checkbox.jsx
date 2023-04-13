import { Pressable, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native'

const CHECKBOX_ICONS_STYLES = { size: 25.5, color: 'gray' }

export default function Checkbox (props) {
  const { onChange, checked, style } = props

  const { colors } = useTheme()

  const handleChange = () => {
    onChange && onChange(!checked)
  }

  return (
    <Pressable
      onPress={handleChange}
      style={[styles.checkboxPressable, style]}
    >
      {!checked && <Ionicons name='square-outline' {...CHECKBOX_ICONS_STYLES} color={colors.primary} />}
      {checked && <Ionicons name='checkbox' {...CHECKBOX_ICONS_STYLES} color={colors.primary} />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  checkboxPressable: {
    padding: 5
  }
})
