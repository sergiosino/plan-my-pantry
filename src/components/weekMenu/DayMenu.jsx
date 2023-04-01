import { StyleSheet, Text, View } from 'react-native'

import DayMeal from './DayMeal'

export default function DayMenu (props) {
  const { dayName = null, lunch, dinner, onPressLunch, onPressDinner, isLunchSelected, isDinnerSelected } = props

  return (
    <View style={styles.dayMenuContainer}>
      {dayName && (
        <View style={styles.dayNameTextContainer}>
          <Text style={styles.dayNameText}>{dayName}</Text>
        </View>
      )}
      <View style={styles.dayMealsContainer}>
        <DayMeal meal='Lunch' recipe={lunch} onPress={onPressLunch} isSelected={isLunchSelected} />
        <DayMeal meal='Dinner' recipe={dinner} onPress={onPressDinner} isSelected={isDinnerSelected} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dayMenuContainer: {
    backgroundColor: 'transparent',
    marginVertical: 15
  },
  dayMealsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  dayNameTextContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  dayNameText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
