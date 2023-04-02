import { StyleSheet, View } from 'react-native'
import IconButton from './IconButton'
import { useTheme } from '@react-navigation/native'

const BUTTON_SIZE = 60

export default function AddButton (props) {
  const { onAddItem } = props

  const { colors } = useTheme()
  const style = [styles.icon, { backgroundColor: colors.primary }]

  return (
    <View style={styles.iconContainer}>
      <IconButton
        onPress={onAddItem}
        iconName='add'
        size={BUTTON_SIZE / 2}
        style={style}
        rippleRadius={(BUTTON_SIZE / 2)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 999
  },
  icon: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (BUTTON_SIZE / 2)
  }
})
