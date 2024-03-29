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

  const ACTUAL_DAY_WEEK = new Date().getDay()
  const ACTUAL_HOUR = new Date().getHours()
  const WEEK_DAYS = {
    0: i18n.t('MENU.SUNDAY'),
    1: i18n.t('MENU.MONDAY'),
    2: i18n.t('MENU.TUESTDAY'),
    3: i18n.t('MENU.WEDNESDAY'),
    4: i18n.t('MENU.THURSDAY'),
    5: i18n.t('MENU.FRIDAY'),
    6: i18n.t('MENU.SATURDAY')
  }

  const handleDayMenuPress = (dayId) => {
    const dayName = WEEK_DAYS[dayId]
    const dayMenu = weekMenu.find(dayMenu => dayMenu.dayId === dayId)
    navigation.navigate(ROUTE_DAY_MENU_EDIT, { dayName, dayMenu })
  }

  /**
   * Check if a specific day number and returns if is lunch or dinner hours
   * @param {number} dayId
   * @returns {Object}
   */
  const isActualMeal = (dayId) => {
    if (ACTUAL_DAY_WEEK === dayId) {
      if (ACTUAL_HOUR >= 12 && ACTUAL_HOUR < 16) { return { isLunchSelected: true, isDinnerSelected: false } }
      if (ACTUAL_HOUR >= 19 && ACTUAL_HOUR < 23) { return { isLunchSelected: false, isDinnerSelected: true } }
    }
    return { isLunchSelected: false, isDinnerSelected: false }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (<WeekMenuHeaderRight clearAllMeals={clearAllMeals} />)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Divider />
      <ScrollView>
        {weekMenu.map((dayMenu) => {
          const { dayId, lunch, dinner } = dayMenu
          const dayName = WEEK_DAYS[dayId]
          const { isLunchSelected, isDinnerSelected } = isActualMeal(dayId)
          return (
            <View key={dayId}>
              <RectButton style={styles.dayContainer} onPress={() => handleDayMenuPress(dayId)}>
                <DayMenu dayName={dayName} lunch={lunch?.name} dinner={dinner?.name} isLunchSelected={isLunchSelected} isDinnerSelected={isDinnerSelected} />
              </RectButton>
              <Divider />
            </View>
          )
        })}
      </ScrollView>
    </View>
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
