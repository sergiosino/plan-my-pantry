import React from 'react'
import { Text, View } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'

import Divider from '../../components/Divider'
import { WEEK_DAYS } from '../../constants/constants'

function DayMeal ({ meal, recipe }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold' }}>{meal}</Text>
      <Text style={{ marginTop: 5 }}>{recipe}</Text>
    </View>
  )
}

function DayMeals ({ day }) {
  const handleOnPress = () => {
    console.log(day)
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

export default function WeekMenuView () {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      {WEEK_DAYS.map(({ id, name }) => (
        <View key={id}>
          <DayMeals day={name} />
          <Divider style={{ marginHorizontal: 20 }} />
        </View>
      ))}
    </ScrollView>
  )
}
