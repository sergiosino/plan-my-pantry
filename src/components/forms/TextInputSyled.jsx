import { StyleSheet, TextInput } from 'react-native'

export default function TextInputSyled (props) {
  const { value, onChangeText, multiline, style, innerRef, ...other } = props

  const textInputStyle = [
    styles.textInput,
    style && style,
    multiline ? styles.textInputMultiline : styles.textInputOneLine
  ]

  return (
    <TextInput
      style={textInputStyle}
      value={value}
      onChangeText={onChangeText}
      ref={innerRef}
      multiline={multiline}
      {...other}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: 'gray',
    backgroundColor: 'white'
  },
  textInputOneLine: {
    height: 34
  },
  textInputMultiline: {
    paddingVertical: 5,
    textAlignVertical: 'top'
  }
})
