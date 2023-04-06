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
      <IconButton style={styles.marginRight} onPress={handlePressCheckAll} iconName='checkbox' />
      <IconButton style={styles.marginRight} onPress={handlePressUncheckAll} iconName='square-outline' />
      <IconButton onPress={handlePressDeleteChecked} iconName='md-trash-outline' />
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15
  },
  marginRight: {
    marginRight: 20
  }
})
