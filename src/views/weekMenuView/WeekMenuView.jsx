import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'

import Divider from '../../components/Divider'
import DayMenu from '../../components/weekMenu/DayMenu'
import WeekMenuHeaderRight from '../../components/weekMenu/WeekMenuHeaderRight'

import { useWeekMenu } from '../../hooks'

import { ROUTE_DAY_MENU_EDIT } from '../../constants/routes'
import { WEEK_DAYS } from '../../constants/constants'

export default function WeekMenuView () {
  const navigation = useNavigation()
  const { weekMenu, clearAllMeals } = useWeekMenu()

  const handleDayMenuPress = (dayId) => {
    const dayMenu = weekMenu.find(dayMenu => dayMenu.dayId === dayId)
    navigation.navigate(ROUTE_DAY_MENU_EDIT, { dayMenu })
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (<WeekMenuHeaderRight clearAllMeals={clearAllMeals} />)
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      {weekMenu.map((dayMenu) => {
        const { dayId, lunch, dinner } = dayMenu
        const dayName = WEEK_DAYS[dayId]
        return (
          <View key={dayId}>
            <RectButton style={styles.dayContainer} onPress={() => handleDayMenuPress(dayId)}>
              <DayMenu dayName={dayName} lunch={lunch?.name} dinner={dinner?.name} />
            </RectButton>
            <Divider />
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  dayContainer: {
    padding: 15
  }
})
