import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import IconButton from './IconButton'
import { useHeaderHeight } from '@react-navigation/elements'

const BUTTON_SIZE = 60

export default function AddButton (props) {
  const { onAddItem } = props

  const { colors } = useTheme()
  const headerHeight = useHeaderHeight()

  const style = [styles.icon, { backgroundColor: colors.primary }]

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight + 65}
      style={styles.iconContainer}
      behavior='padding'
    >
      <IconButton
        onPress={onAddItem}
        iconName='add'
        size={BUTTON_SIZE / 2}
        style={style}
        rippleRadius={(BUTTON_SIZE / 2)}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
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
