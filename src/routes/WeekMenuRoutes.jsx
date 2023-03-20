import { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ROUTE_NAME_WEEK_MENU, ROUTE_NAME_DAY_MENU_EDIT_MODAL } from '../constants/routes'
import DayMenuEditView from '../views/weekMenuView/DayMenuEditView'
import WeekMenuView from '../views/weekMenuView/WeekMenuView'
import { getTabBarStyle } from '../utils/getTabBarStyle'

const Stack = createNativeStackNavigator()

const WEEK_MENU_ROUTES = [
  {
    name: ROUTE_NAME_WEEK_MENU,
    component: WeekMenuView,
    animation: 'none'
  },
  {
    name: ROUTE_NAME_DAY_MENU_EDIT_MODAL,
    component: DayMenuEditView,
    animation: 'slide_from_right'
  }
]

export default function WeekMenuRoutes ({ route, navigation }) {
  useEffect(() => {
    getTabBarStyle(navigation, route)
  }, [route, navigation])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {WEEK_MENU_ROUTES.map((foodRoute) => {
        const { name, component, animation } = foodRoute
        return <Stack.Screen key={name} name={name} component={component} options={{ animation }} />
      })}
    </Stack.Navigator>
  )
}
