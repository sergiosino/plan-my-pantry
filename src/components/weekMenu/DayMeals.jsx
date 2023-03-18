import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import DayMeal from './DayMeal'

export default function DayMeals ({ id, day }) {
  const handleOnPress = () => {
    console.log(id)
  }

  return (
    <RectButton onPress={handleOnPress}>
      <View style={{ backgroundColor: 'transparent', margin: 15 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{day}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <DayMeal meal='Lunch' recipe='Salmón con verdura' />
          <DayMeal meal='Dinner' recipe='Sandwitch de jamón y queso' />
        </View>
      </View>
    </RectButton>
  )
}
