import { StyleSheet, View } from 'react-native'

import IconButton from '../buttons/IconButton'

import { confirmationAlert, i18n } from '../../utils'

export default function WeekMenuHeaderRight (props) {
  const { clearAllMeals } = props

  const handlePressClearAllMeals = () => {
    confirmationAlert(
      i18n.t('MENU.RESET_MEALS'),
      i18n.t('MENU.RESET_MEALS_MESSAGE'),
      clearAllMeals
    )
  }

  return (
    <View style={styles.localHeaderContainer}>
      <IconButton onPress={handlePressClearAllMeals} iconName='reload' />
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
  }
})
