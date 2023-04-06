import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'

import Divider from '../../components/Divider'
import DayMenu from '../../components/weekMenu/DayMenu'
import { ROUTE_NAME_DAY_MENU_EDIT } from '../../constants/routes'
import { useWeekMenu } from '../../hooks/useWeekMenu'

export default function WeekMenuView () {
  const navigation = useNavigation()
  const { weekMenu, getWeekMenus } = useWeekMenu()

  const handleDayMenuPress = (dayId) => {
    navigation.navigate(ROUTE_NAME_DAY_MENU_EDIT, { dayId })
  }

  useFocusEffect(
    useCallback(() => {
      getWeekMenus()
    }, [])
  )

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      {weekMenu.map((dayMenu) => {
        const { dayId, dayName, lunch, dinner } = dayMenu
        return (
          <View key={dayId}>
            <RectButton onPress={() => handleDayMenuPress(dayId)}>
              <DayMenu dayName={dayName} lunch={lunch?.name} dinner={dinner?.name} />
            </RectButton>
            <Divider style={{ marginHorizontal: 20 }} />
          </View>
        )
      })}
    </ScrollView>
  )
}
