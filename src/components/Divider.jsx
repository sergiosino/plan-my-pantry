import { StyleSheet, View } from 'react-native'

export default function Divider (props) {
  const { style } = props
  return (
    <View style={[styles.divider, style]} />
  )
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: 'lightgray',
    height: StyleSheet.hairlineWidth
  }
})
