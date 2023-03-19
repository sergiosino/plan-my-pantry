import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import Divider from '../../components/Divider'
import DayMenu from '../../components/weekMenu/DayMenu'
import { ROUTE_NAME_DAY_MENU_EDIT_MODAL } from '../../constants/routes'
import { useWeekMenu } from '../../hooks/useWeekMenu'

export default function WeekMenuView () {
  const navigation = useNavigation()
  const { weekMenu } = useWeekMenu()

  const handleDayMenuPress = (dayId) => {
    navigation.navigate(ROUTE_NAME_DAY_MENU_EDIT_MODAL, { dayId })
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      {weekMenu.map((dayMenu) => {
        const { dayId } = dayMenu
        return (
          <View key={dayId}>
            <DayMenu dayMenu={dayMenu} onPressDayMenu={handleDayMenuPress} />
            <Divider style={{ marginHorizontal: 20 }} />
          </View>
        )
      })}
    </ScrollView>
  )
}
