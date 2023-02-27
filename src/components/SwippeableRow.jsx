import { StyleSheet, Text, View } from 'react-native'

import { RectButton, Swipeable } from 'react-native-gesture-handler'

export default function SwipeableRow (props) {
  const {
    children,
    onLeftActionPress,
    onRightActionPress
  } = props

  const renderLeftActions = () => {
    return (
      <View style={{ width: 80 }}>
        <RectButton style={styles.leftAction} onPress={onLeftActionPress}>
          <Text style={styles.actionText}>Delete</Text>
        </RectButton>
      </View>
    )
  }

  const renderRightAction = () => {
    return (
      <View style={{ width: 80 }}>
        <RectButton style={styles.rightAction} onPress={onRightActionPress}>
          <Text style={styles.actionText}>Edit</Text>
        </RectButton>
      </View>
    )
  }

  return (
    <Swipeable
      friction={3}
      leftThreshold={40}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightAction}
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
