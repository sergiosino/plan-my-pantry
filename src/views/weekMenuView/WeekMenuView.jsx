import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'

import Divider from '../../components/Divider'
import DayMenu from '../../components/weekMenu/DayMenu'

import { useWeekMenu } from '../../hooks'

import { ROUTE_NAME_DAY_MENU_EDIT } from '../../constants/routes'
import { useEffect } from 'react'
import WeekMenuHeaderRight from '../../components/weekMenu/WeekMenuHeaderRight'

export default function WeekMenuView () {
  const navigation = useNavigation()
  const { weekMenu, clearAllMeals } = useWeekMenu()

  const handleDayMenuPress = (dayId) => {
    const dayMenu = weekMenu.find(dayMenu => dayMenu.dayId === dayId)
    navigation.navigate(ROUTE_NAME_DAY_MENU_EDIT, { dayMenu })
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (<WeekMenuHeaderRight clearAllMeals={clearAllMeals} />)
    })
  }, [])

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
