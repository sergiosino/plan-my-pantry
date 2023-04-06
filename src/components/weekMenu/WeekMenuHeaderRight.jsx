import { StyleSheet, View } from 'react-native'

import IconButton from '../buttons/IconButton'

import { confirmationAlert } from '../../utils'

import { RESET_MEALS, RESET_MEALS_MESSAGE } from '../../constants/texts/texts'

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
    paddingRight: 15
  }
})
