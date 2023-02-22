import { Alert, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function GroceryListHeader (props) {
  const { handleDeleteChecked, handleCheckAll, handleUnCheckAll } = props

  const confirmationAlert = (title, message, onOK) => {
    Alert.alert(title, message, [
      { text: 'Cancel' },
      { text: 'OK', onPress: onOK }
    ])
  }

  const alertDeleteChecked = () => {
    confirmationAlert('Delete', 'Delete all checked items?', handleDeleteChecked)
  }

  const alertCheckAll = () => {
    confirmationAlert('Check', 'Check all items?', handleCheckAll)
  }

  const alertUncheckAll = () => {
    confirmationAlert('Uncheck', 'Uncheck all items?', handleUnCheckAll)
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerItem}>
        <TouchableNativeFeedback
          onPress={alertCheckAll}
          background={TouchableNativeFeedback.Ripple('gray', true, 20)}
        >
          <View>
            <Ionicons name='checkbox' size={20} />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.headerItem}>
        <TouchableNativeFeedback
          onPress={alertUncheckAll}
          background={TouchableNativeFeedback.Ripple('gray', true, 20)}
        >
          <View>
            <Ionicons name='checkbox-outline' size={20} />
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
    </View>
  )
}

const gap = 20

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    padding: gap,
    margin: -(gap / 2)
  },
  headerItem: {
    margin: (gap / 2)
  }
})
