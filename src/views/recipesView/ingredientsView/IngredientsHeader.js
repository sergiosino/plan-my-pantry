import { StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { confirmationAlert } from '../../../utils/confirmationAlert'

export default function IngredientsHeader (props) {
  const {
    onDeleteSelected,
    enableDeleteAll,
    onUnselectAll
  } = props

  const alertDeleteChecked = () => {
    if (enableDeleteAll) { confirmationAlert('Delete', 'Delete selected ingredients?', onDeleteSelected) }
  }

  return (
    <View style={styles.headerContainer}>
      {enableDeleteAll &&
        <>
          <View style={styles.headerItem}>
            <TouchableNativeFeedback
              onPress={onUnselectAll}
              background={TouchableNativeFeedback.Ripple('gray', true, 20)}
            >
              <View>
                <Ionicons name='close' size={20} />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.headerItem}>
            <TouchableNativeFeedback
              onPress={alertDeleteChecked}
              background={TouchableNativeFeedback.Ripple('gray', true, 20)}
            >
              <View>
                <Ionicons name='md-trash-outline' size={20} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </>}
    </View>
  )
}

const gap = 20

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: gap,
    margin: -(gap / 2),
    height: 82
  },
  headerItem: {
    margin: (gap / 2)
  }
})
