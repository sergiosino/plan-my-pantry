import { StyleSheet, View } from 'react-native'
import IconButton from './IconButton'

const BUTTON_SIZE = 60

export default function AddButton (props) {
  const { onAddItem } = props

  return (
    <View style={styles.iconContainer}>
      <IconButton
        onPress={onAddItem}
        iconName='add'
        size={BUTTON_SIZE / 2}
        style={styles.icon}
      />
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
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgray',
    borderRadius: (BUTTON_SIZE / 2)
  }
})
