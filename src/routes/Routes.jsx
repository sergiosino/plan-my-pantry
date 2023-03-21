import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ROUTE_NAME_DAY_MENU_EDIT, ROUTE_NAME_RECIPES_EDIT, ROUTE_NAME_TABS } from '../constants/routes'
import BottomTabsRoutes from './BottomTabsRoutes'
import RecipeFormView from '../views/foodView/RecipeFormView'
import DayMenuEditView from '../views/weekMenuView/DayMenuEditView'

const Stack = createNativeStackNavigator()

export default function Routes () {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTE_NAME_TABS} component={BottomTabsRoutes} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTE_NAME_RECIPES_EDIT} component={RecipeFormView} />
      <Stack.Screen name={ROUTE_NAME_DAY_MENU_EDIT} component={DayMenuEditView} />
    </Stack.Navigator>
  )
}
