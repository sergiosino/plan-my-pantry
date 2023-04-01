import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ROUTE_NAME_DAY_MENU_EDIT, ROUTE_NAME_RECIPES_EDIT, ROUTE_NAME_TABS } from '../constants/routes'
import BottomTabsRoutes from './BottomTabsRoutes'
import RecipeEditView from '../views/recipesView/RecipeEditView'
import DayMenuEditView from '../views/weekMenuView/DayMenuEditView'
import { useTheme } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

export default function Routes () {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background
        },
        headerShadowVisible: false
      }}
    >
      <Stack.Screen name={ROUTE_NAME_TABS} component={BottomTabsRoutes} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTE_NAME_RECIPES_EDIT} component={RecipeEditView} />
      <Stack.Screen name={ROUTE_NAME_DAY_MENU_EDIT} component={DayMenuEditView} />
    </Stack.Navigator>
  )
}
