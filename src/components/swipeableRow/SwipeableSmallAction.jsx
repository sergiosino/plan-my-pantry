import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export default function SwipeableSmallAction (props) {
  const { onPress, text, style } = props

  return (
    <View style={styles.container}>
      <RectButton style={style} onPress={onPress}>
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 80
  },
  actionText: {
    padding: 10,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent'
  }
})
