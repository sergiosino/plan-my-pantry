import { Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const CHECKBOX_ICONS_STYLES = { size: 25.5, color: 'gray' }

export default function Checkbox (props) {
  const { onChange, checked, style } = props

  const handleChange = () => {
    onChange && onChange(!checked)
  }

  return (
    <Pressable
      onPress={handleChange}
      style={style}
    >
      {!checked && <Ionicons name='square-outline' {...CHECKBOX_ICONS_STYLES} />}
      {checked && <Ionicons name='checkbox' {...CHECKBOX_ICONS_STYLES} />}
    </Pressable>
  )
}
