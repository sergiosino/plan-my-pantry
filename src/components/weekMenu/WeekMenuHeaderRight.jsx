import { StyleSheet, View } from 'react-native'

import IconButton from '../buttons/IconButton'

import { confirmationAlert } from '../../utils'

import { CONFIRMATION_ALERT_CLEAR_MEALS, CONFIRMATION_ALERT_CLEAR_MEALS_MESSAGE } from '../../constants/texts'

const GAP = 25

export default function WeekMenuHeaderRight (props) {
  const { clearAllMeals } = props

  const handlePressClearAllMeals = () => {
    confirmationAlert(
      CONFIRMATION_ALERT_CLEAR_MEALS,
      CONFIRMATION_ALERT_CLEAR_MEALS_MESSAGE,
      clearAllMeals
    )
  }

  return (
    <View style={styles.localHeaderContainer}>
      <View style={styles.headerItem}>
        <IconButton onPress={handlePressClearAllMeals} iconName='reload' />
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
