import { Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'

const CHECKBOX_ICONS_STYLES = { size: 25.5, color: 'gray' }

export default function Checkbox (props) {
  const { onChange, defaultChecked, style } = props

  const [checked, setChecked] = useState(defaultChecked ?? false)

  const handleChange = () => {
    const newCheckState = !checked
    setChecked(newCheckState)
    onChange && onChange(newCheckState)
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
