import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import Divider from '../../components/Divider'
import DayMeals from '../../components/weekMenu/DayMeals'
import { WEEK_DAYS } from '../../constants/constants'

export default function WeekMenuView () {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      {WEEK_DAYS.map(({ id, name }) => (
        <View key={id}>
          <DayMeals id={id} day={name} />
          <Divider style={{ marginHorizontal: 20 }} />
        </View>
      ))}
    </ScrollView>
  )
}
