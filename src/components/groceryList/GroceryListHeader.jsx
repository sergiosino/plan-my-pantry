import { StyleSheet, View } from 'react-native'

import { confirmationAlert } from '../../utils/confirmationAlert'
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

const GAP = 25

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
    <View style={styles.localHeaderContainer}>
      <View style={styles.headerItem}>
        <IconButton onPress={handlePressCheckAll} iconName='checkbox' />
      </View>
      <View style={styles.headerItem}>
        <IconButton onPress={handlePressUncheckAll} iconName='square-outline' />
      </View>
      <View style={styles.headerItem}>
        <IconButton onPress={handlePressDeleteChecked} iconName='md-trash-outline' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: GAP,
    margin: -(GAP / 2),
    justifyContent: 'flex-end'
  },
  headerItem: {
    margin: (GAP / 2)
  }
})
