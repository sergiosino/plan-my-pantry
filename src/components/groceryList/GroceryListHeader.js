import { StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { confirmationAlert } from '../../utils/confirmationAlert'
import { headerStyles } from '../../styles/headerStyles'

export default function GroceryListHeader (props) {
  const {
    onDeleteChecked,
    onCheckAll,
    onUnCheckAll
  } = props

  const alertDeleteChecked = () => {
    confirmationAlert('Delete', 'Delete all checked items?', onDeleteChecked)
  }

  const alertCheckAll = () => {
    confirmationAlert('Check', 'Check all items?', onCheckAll)
  }

  const alertUncheckAll = () => {
    confirmationAlert('Uncheck', 'Uncheck all items?', onUnCheckAll)
  }

  return (
    <View style={[headerStyles.headerContainer, styles.localHeaderContainer]}>
      <View style={headerStyles.headerItem}>
        <TouchableNativeFeedback
          onPress={alertCheckAll}
          background={TouchableNativeFeedback.Ripple('gray', true, 20)}
        >
          <View>
            <Ionicons name='checkbox' size={20} />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={headerStyles.headerItem}>
        <TouchableNativeFeedback
          onPress={alertUncheckAll}
          background={TouchableNativeFeedback.Ripple('gray', true, 20)}
        >
          <View>
            <Ionicons name='checkbox-outline' size={20} />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={headerStyles.headerItem}>
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

const styles = StyleSheet.create({
  localHeaderContainer: {
    justifyContent: 'flex-end'
  }
})
