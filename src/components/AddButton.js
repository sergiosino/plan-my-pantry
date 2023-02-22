import { StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function AddButton (props) {
  const { onAddItem } = props

  return (
    <View style={styles.iconContainer}>
      <TouchableNativeFeedback
        onPress={onAddItem}
        background={TouchableNativeFeedback.Ripple('gray', true, 30)}
      >
        <View style={styles.icon}>
          <Ionicons name='add' size={30} />
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  icon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 30
  }
})
