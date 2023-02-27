import { StyleSheet, Text, View } from 'react-native'

import { RectButton, Swipeable } from 'react-native-gesture-handler'

function RenderAction (props) {
  const { onPress, text } = props

  return (
    <View style={{ width: 80 }}>
      <RectButton style={styles.leftAction} onPress={onPress}>
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </View>
  )
}

export default function SwipeableRow (props) {
  const {
    children,
    onLeftActionPress,
    onRightActionPress
  } = props

  return (
    <Swipeable
      friction={3}
      leftThreshold={40}
      rightThreshold={40}
      renderLeftActions={() => <RenderAction onPress={onLeftActionPress} text='Delete' />}
      renderRightActions={() => <RenderAction onPress={onRightActionPress} text='Edit' />}
    >
      {children}
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dd2c00'
  },
  actionText: {
    padding: 10,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent'
  },
  rightAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#388e3c'
  }
})
