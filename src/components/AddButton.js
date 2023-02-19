import { StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function AddButton (props) {
  const { handleAddItem } = props

  return (
    <View style={styles.iconContainer}>
      <TouchableNativeFeedback
        onPress={handleAddItem}
        background={TouchableNativeFeedback.Ripple('gray', true, 30)}
      >
        <View>
          <Ionicons name='add' size={30} />
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 30,
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
