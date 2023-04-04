import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '@react-navigation/native'

import { ROUTE_NAME_DAY_MENU_EDIT, ROUTE_NAME_DAY_MENU_EDIT_HELP, ROUTE_NAME_INITAL_HELP, ROUTE_NAME_RECIPES_EDIT, ROUTE_NAME_RECIPES_HELP_VIEW, ROUTE_NAME_TABS } from '../constants/routes'
import BottomTabsRoutes from './BottomTabsRoutes'
import RecipeEditView from '../views/recipesView/RecipeEditView'
import DayMenuEditView from '../views/weekMenuView/DayMenuEditView'
import RecipesHelpView from '../views/recipesView/RecipesHelpView'
import DayMenuEditHelpView from '../views/weekMenuView/DayMenuEditHelpView'
import InitialHelpView from '../views/InitialHelpView'
import { useUserConfig } from '../hooks/useUserConfig'

const Stack = createNativeStackNavigator()

const INITIAL_HELP_ROUTE = {
  name: ROUTE_NAME_INITAL_HELP,
  component: InitialHelpView,
  options: { headerShown: false }
}

const STACK_ROUTES = [
  {
    name: ROUTE_NAME_TABS,
    component: BottomTabsRoutes,
    options: { headerShown: false }
  },
  {
    name: ROUTE_NAME_RECIPES_EDIT,
    component: RecipeEditView
  },
  {
    name: ROUTE_NAME_DAY_MENU_EDIT,
    component: DayMenuEditView
  },
  {
    name: ROUTE_NAME_RECIPES_HELP_VIEW,
    component: RecipesHelpView
  },
  {
    name: ROUTE_NAME_DAY_MENU_EDIT_HELP,
    component: DayMenuEditHelpView
  }
]

export default function Routes () {
  const { colors } = useTheme()
  const { isLoading, showInitialPage } = useUserConfig()

  const routes = !isLoading && showInitialPage
    ? [INITIAL_HELP_ROUTE, ...STACK_ROUTES]
    : STACK_ROUTES

  return !isLoading && (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false
      }}
    >
      {routes.map(stackRoute => {
        const { name, component, options } = stackRoute
        return <Stack.Screen key={name} name={name} component={component} options={options} />
      })}
    </Stack.Navigator>
  )
}
