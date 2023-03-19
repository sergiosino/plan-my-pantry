import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import DayMeal from './DayMeal'

function DayMenuInfo (props) {
  const { dayName, lunch, dinner, onPressLunch, onPressDinner, isLunchSelected, isDinnerSelected } = props

  return (
    <View style={{ backgroundColor: 'transparent', marginVertical: 15 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{dayName}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
        <DayMeal meal='Lunch' recipe={lunch} onPress={onPressLunch} isSelected={isLunchSelected} />
        <DayMeal meal='Dinner' recipe={dinner} onPress={onPressDinner} isSelected={isDinnerSelected} />
      </View>
    </View>
  )
}

export default function DayMenu (props) {
  const { onPressDayMenu, onPressLunch, onPressDinner, dayMenu, isLunchSelected, isDinnerSelected } = props
  const { dayName, lunch, dinner } = dayMenu
  const isPressable = !!onPressDayMenu

  const handleOnPress = () => {
    onPressDayMenu(dayMenu)
  }

  return isPressable
    ? (
      <RectButton onPress={handleOnPress}>
        <DayMenuInfo dayName={dayName} lunch={lunch} dinner={dinner} onPressLunch={onPressLunch} onPressDinner={onPressDinner} isLunchSelected={isLunchSelected} isDinnerSelected={isDinnerSelected} />
      </RectButton>
      )
    : <DayMenuInfo dayName={dayName} lunch={lunch} dinner={dinner} onPressLunch={onPressLunch} onPressDinner={onPressDinner} isLunchSelected={isLunchSelected} isDinnerSelected={isDinnerSelected} />
}
