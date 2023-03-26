import { StyleSheet, TextInput } from 'react-native'

export default function TextInputSyled (props) {
  const { value, onChangeText, multiline, ...other } = props

  const style = multiline ? styles.textInput : [styles.textInput, styles.textInputHeight]

  return (
    <TextInput
      style={style}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline ?? false}
      {...other}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 4,
    borderColor: 'gray'
  },
  textInputHeight: {
    height: 40
  }
})
