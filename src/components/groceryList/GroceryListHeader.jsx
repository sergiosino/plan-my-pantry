import { StyleSheet, View } from 'react-native'

import { confirmationAlert } from '../../utils/confirmationAlert'
import { headerStyles } from '../../styles/headerStyles'
import IconButton from '../IconButton'
import { useGroceryList } from '../../hooks/useGroceryList'
import {
  CONFIRMATION_ALERT_CHECK_ALL_ITEMS_MESSAGE,
  CONFIRMATION_ALERT_CHECK_TITLE,
  CONFIRMATION_ALERT_DELETE_ALL_CHECKED_ITEMS_MESSAGE,
  CONFIRMATION_ALERT_DELETE_TITLE,
  CONFIRMATION_ALERT_UNCHECK_ALL_ITEMS_MESSAGE,
  CONFIRMATION_ALERT_UNCHECK_TITLE
} from '../../constants/texts'

export default function GroceryListHeader (props) {
  const { itemIdToFocus } = props

  const {
    handleDeleteChecked,
    handleCheckAll,
    handleUnCheckAll
  } = useGroceryList()

  const handlePressDeleteChecked = () => {
    confirmationAlert(
      CONFIRMATION_ALERT_DELETE_TITLE,
      CONFIRMATION_ALERT_DELETE_ALL_CHECKED_ITEMS_MESSAGE,
      handleDeleteChecked
    )
  }

  const handlePressCheckAll = () => {
    confirmationAlert(
      CONFIRMATION_ALERT_CHECK_TITLE,
      CONFIRMATION_ALERT_CHECK_ALL_ITEMS_MESSAGE,
      handleCheckAll
    )
  }

  const handlePressUncheckAll = () => {
    confirmationAlert(
      CONFIRMATION_ALERT_UNCHECK_TITLE,
      CONFIRMATION_ALERT_UNCHECK_ALL_ITEMS_MESSAGE,
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
