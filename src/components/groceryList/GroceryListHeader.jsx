import { StyleSheet, View } from 'react-native'

import { confirmationAlert } from '../../utils/confirmationAlert'
import { headerStyles } from '../../styles/headerStyles'
import IconButton from '../IconButton'
import { useGroceryItems } from '../../hooks/useGroceryList'

export default function GroceryListHeader (props) {
  const { itemIdToFocus } = props

  const {
    handleDeleteChecked,
    handleCheckAll,
    handleUnCheckAll
  } = useGroceryItems()

  const handlePressDeleteChecked = () => {
    confirmationAlert(
      'Delete',
      'Delete all checked items?',
      handleDeleteChecked
    )
  }

  const handlePressCheckAll = () => {
    confirmationAlert(
      'Check',
      'Check all items?',
      handleCheckAll
    )
  }

  const handlePressUncheckAll = () => {
    confirmationAlert(
      'Uncheck',
      'Uncheck all items?',
      () => {
        handleUnCheckAll()
        itemIdToFocus.current = null
      })
  }

  return (
    <View style={[headerStyles.headerContainer, styles.localHeaderContainer]}>
      <View style={headerStyles.headerItem}>
        <IconButton onPress={handlePressCheckAll} iconName='checkbox' />
      </View>
      <View style={headerStyles.headerItem}>
        <IconButton onPress={handlePressUncheckAll} iconName='checkbox-outline' />
      </View>
      <View style={headerStyles.headerItem}>
        <IconButton onPress={handlePressDeleteChecked} iconName='md-trash-outline' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    justifyContent: 'flex-end'
  }
})
