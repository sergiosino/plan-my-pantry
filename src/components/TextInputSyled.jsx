import { StyleSheet, TextInput } from 'react-native'

export default function TextInputSyled (props) {
  const { value, onChangeText, ...other } = props

  return (
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
      {...other}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 4,
    borderColor: 'gray'
  }
})
