import { StyleSheet, View } from 'react-native'

import { confirmationAlert } from '../../utils/confirmationAlert'
import { headerStyles } from '../../styles/headerStyles'
import IconButton from '../IconButton'

export default function GroceryListHeader (props) {
  const {
    onDeleteChecked,
    onCheckAll,
    onUnCheckAll
  } = props

  const handleDeleteChecked = () => {
    confirmationAlert('Delete', 'Delete all checked items?', onDeleteChecked)
  }

  const handleCheckAll = () => {
    confirmationAlert('Check', 'Check all items?', onCheckAll)
  }

  const handleUncheckAll = () => {
    confirmationAlert('Uncheck', 'Uncheck all items?', onUnCheckAll)
  }

  return (
    <View style={[headerStyles.headerContainer, styles.localHeaderContainer]}>
      <View style={headerStyles.headerItem}>
        <IconButton onPress={handleCheckAll} iconName='checkbox' />
      </View>
      <View style={headerStyles.headerItem}>
        <IconButton onPress={handleUncheckAll} iconName='checkbox-outline' />
      </View>
      <View style={headerStyles.headerItem}>
        <IconButton onPress={handleDeleteChecked} iconName='md-trash-outline' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    justifyContent: 'flex-end'
  }
})
