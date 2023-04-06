import { StyleSheet, View } from 'react-native'

import IconButton from '../buttons/IconButton'

import { useGroceryList } from '../../hooks/useGroceryList'

import { confirmationAlert } from '../../utils/confirmationAlert'

import {
  CHECK_MESSAGE,
  CHECK,
  DELETE_MESSAGE,
  DELETE,
  UNCHECK_MESSAGE,
  UNCHECK
} from '../../constants/texts/texts'

const GAP = 25

export default function GroceryListHeaderRight (props) {
  const { itemIdToFocus } = props

  const {
    handleDeleteChecked,
    handleCheckAll,
    handleUnCheckAll
  } = useGroceryList()

  const handlePressDeleteChecked = () => {
    confirmationAlert(
      DELETE,
      DELETE_MESSAGE,
      handleDeleteChecked
    )
  }

  const handlePressCheckAll = () => {
    confirmationAlert(
      CHECK,
      CHECK_MESSAGE,
      handleCheckAll
    )
  }

  const handlePressUncheckAll = () => {
    confirmationAlert(
      UNCHECK,
      UNCHECK_MESSAGE,
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
