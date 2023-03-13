import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export default function SwipeableSmallAction (props) {
  const { onPress, text, style } = props

  return (
    <View style={{ width: 80 }}>
      <RectButton style={style} onPress={onPress}>
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  actionText: {
    padding: 10,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent'
  }
})
