import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'

import Divider from '../../components/Divider'
import DayMenu from '../../components/weekMenu/DayMenu'
import WeekMenuHeaderRight from '../../components/weekMenu/WeekMenuHeaderRight'

import { useWeekMenu } from '../../hooks'

import { i18n } from '../../utils'

import { ROUTE_DAY_MENU_EDIT } from '../../constants/routes'

export default function WeekMenuView () {
  const navigation = useNavigation()
  const { weekMenu, clearAllMeals } = useWeekMenu()

  const WEEK_DAYS = {
    1: i18n.t('MENU.MONDAY'),
    2: i18n.t('MENU.TUESTDAY'),
    3: i18n.t('MENU.WEDNESDAY'),
    4: i18n.t('MENU.THURSDAY'),
    5: i18n.t('MENU.FRIDAY'),
    6: i18n.t('MENU.SATURDAY'),
    7: i18n.t('MENU.SUNDAY')
  }

  const handleDayMenuPress = (dayId) => {
    const dayName = WEEK_DAYS[dayId]
    const dayMenu = weekMenu.find(dayMenu => dayMenu.dayId === dayId)
    navigation.navigate(ROUTE_DAY_MENU_EDIT, { dayName, dayMenu })
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
