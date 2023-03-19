import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import DayMeal from './DayMeal'

function DayMenuInfo (props) {
  const { dayName, lunch, dinner, onPressLunch, onPressDinner, isLunchSelected, isDinnerSelected } = props

  return (
    <View style={styles.dayMenuContainer}>
      <View style={styles.dayNameTextContainer}>
        <Text style={styles.dayNameText}>{dayName}</Text>
      </View>
      <View style={styles.dayMealsContainer}>
        <DayMeal meal='Lunch' recipe={lunch} onPress={onPressLunch} isSelected={isLunchSelected} />
        <DayMeal meal='Dinner' recipe={dinner} onPress={onPressDinner} isSelected={isDinnerSelected} />
      </View>
    </View>
  )
}

export default function DayMenu (props) {
  const { onPressDayMenu, onPressLunch, onPressDinner, dayMenu, isLunchSelected, isDinnerSelected } = props
  const { dayId, dayName, lunch, dinner } = dayMenu
  const isPressable = !!onPressDayMenu

  const handleOnPress = () => {
    onPressDayMenu(dayId)
  }

  return isPressable
    ? (
      <RectButton onPress={handleOnPress}>
        <DayMenuInfo dayName={dayName} lunch={lunch?.name} dinner={dinner?.name} onPressLunch={onPressLunch} onPressDinner={onPressDinner} isLunchSelected={isLunchSelected} isDinnerSelected={isDinnerSelected} />
      </RectButton>
      )
    : <DayMenuInfo dayName={dayName} lunch={lunch?.name} dinner={dinner?.name} onPressLunch={onPressLunch} onPressDinner={onPressDinner} isLunchSelected={isLunchSelected} isDinnerSelected={isDinnerSelected} />
}

const styles = StyleSheet.create({
  dayMenuContainer: {
    backgroundColor: 'transparent',
    marginVertical: 15
  },
  dayMealsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  dayNameTextContainer: {
    alignItems: 'center'
  },
  dayNameText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
