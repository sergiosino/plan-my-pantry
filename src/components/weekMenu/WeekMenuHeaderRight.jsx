import { StyleSheet, View } from 'react-native'

import IconButton from '../buttons/IconButton'

import { confirmationAlert } from '../../utils'

import { RESET_MEALS, RESET_MEALS_MESSAGE } from '../../constants/texts/texts'

const GAP = 30

export default function WeekMenuHeaderRight (props) {
  const { clearAllMeals } = props

  const handlePressClearAllMeals = () => {
    confirmationAlert(
      RESET_MEALS,
      RESET_MEALS_MESSAGE,
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
    margin: -(GAP),
    justifyContent: 'flex-end'
  },
  headerItem: {
    margin: (GAP / 2)
  }
})
