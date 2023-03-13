import { useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'

import SwipeableSmallAction from './SwipeableSmallAction'

export default function SwipeableRow (props) {
  const {
    children,
    onLeftActionPress,
    onRightActionPress
  } = props

  const swipeableRef = useRef()

  const closeActio = () => {
    swipeableRef.current.close()
  }

  const handleLefActionClick = () => {
    closeActio()
    onLeftActionPress()
  }

  const handleRightActionClick = () => {
    closeActio()
    onRightActionPress()
  }

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      leftThreshold={40}
      rightThreshold={40}
      renderLeftActions={() => <SwipeableSmallAction onPress={handleLefActionClick} text='Delete' style={styles.leftAction} />}
      renderRightActions={() => <SwipeableSmallAction onPress={handleRightActionClick} text='Edit' style={styles.rightAction} />}
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
  rightAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#388e3c'
  }
})
