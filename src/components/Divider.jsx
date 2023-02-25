import { StyleSheet, View } from 'react-native'

export default function Divider (props) {
  const { style } = props
  return (
    <View style={[styles.divider, style]} />
  )
}

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 8
  }
})
