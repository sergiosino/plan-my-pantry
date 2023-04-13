import { StyleSheet, View } from 'react-native'

import IconButton from '../buttons/IconButton'

import { useGroceryList } from '../../hooks/useGroceryList'

import { confirmationAlert, i18n } from '../../utils'

export default function GroceryListHeaderRight () {
  const {
    handleDeleteChecked,
    handleCheckAll,
    handleUnCheckAll
  } = useGroceryList()

  const handlePressDeleteChecked = () => {
    confirmationAlert(
      i18n.t('COMMON.DELETE'),
      i18n.t('GROCERY_LIST.DELETE_MESSAGE'),
      handleDeleteChecked
    )
  }

  const handlePressCheckAll = () => {
    confirmationAlert(
      i18n.t('GROCERY_LIST.CHECK'),
      i18n.t('GROCERY_LIST.CHECK_MESSAGE'),
      handleCheckAll
    )
  }

  const handlePressUncheckAll = () => {
    confirmationAlert(
      i18n.t('GROCERY_LIST.UNCHECK'),
      i18n.t('GROCERY_LIST.UNCHECK_MESSAGE'),
      handleUnCheckAll)
  }

  return (
    <View style={styles.localHeaderContainer}>
      <IconButton style={styles.marginRight} onPress={handlePressCheckAll} iconName='checkbox' />
      <IconButton style={styles.marginRight} onPress={handlePressUncheckAll} iconName='square-outline' />
      <IconButton onPress={handlePressDeleteChecked} iconName='trash' />
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
    marginRight: 10
  },
  marginRight: {
    marginRight: 20
  }
})
