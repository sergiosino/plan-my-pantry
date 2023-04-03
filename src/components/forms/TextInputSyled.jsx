import { useTheme } from '@react-navigation/native'
import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

export default function TextInputSyled (props) {
  const { value, onChangeText, multiline, style, innerRef, onFocus, onEndEditing, ...other } = props

  const { colors } = useTheme()
  const [isFocused, setIsFocused] = useState(false)

  const textInputStyle = [
    styles.textInput,
    isFocused ? { borderColor: colors.primary } : { borderColor: 'gray' },
    style && style,
    multiline ? styles.textInputMultiline : styles.textInputOneLine
  ]

  const handleFocus = () => {
    setIsFocused(true)
    onFocus && onFocus()
  }

  const handleEndEditing = () => {
    setIsFocused(false)
    onEndEditing && onEndEditing()
  }

  return (
    <TextInput
      style={textInputStyle}
      value={value}
      onChangeText={onChangeText}
      ref={innerRef}
      multiline={multiline}
      onFocus={handleFocus}
      onEndEditing={handleEndEditing}
      {...other}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'white'
  },
  textInputOneLine: {
    height: 34
  },
  textInputMultiline: {
    paddingVertical: 5,
    textAlignVertical: 'top',
    maxHeight: 182 // Height of 10 lines
  }
})
