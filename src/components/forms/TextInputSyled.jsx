import { StyleSheet, TextInput } from 'react-native'

export default function TextInputSyled (props) {
  const { value, onChangeText, style, innerRef, ...other } = props

  const textInputStyle = style ? [styles.textInput, style] : styles.textInput

  return (
    <TextInput
      style={textInputStyle}
      value={value}
      onChangeText={onChangeText}
      ref={innerRef}
      {...other}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: 'gray',
    backgroundColor: 'white',
    maxHeight: 34,
    height: 34,
    minHeight: 34
  }
})
