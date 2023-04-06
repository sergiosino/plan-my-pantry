import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '@react-navigation/native'

import BottomTabsRoutes from './BottomTabsRoutes'

import RecipeEditView from '../views/recipesView/RecipeEditView'
import DayMenuEditView from '../views/weekMenuView/DayMenuEditView'
import RecipesHelpView from '../views/recipesView/RecipesHelpView'
import DayMenuEditHelpView from '../views/weekMenuView/DayMenuEditHelpView'
import WelcomeView from '../views/WelcomeView'

import { useUserConfig } from '../hooks/useUserConfig'

import {
  ROUTE_DAY_MENU_EDIT,
  ROUTE_DAY_MENU_EDIT_HELP,
  ROUTE_WELCOME_PAGE,
  ROUTE_RECIPES_EDIT,
  ROUTE_RECIPES_HELP_VIEW,
  ROUTE_TABS
} from '../constants/routes'
import { HELP, RECIPE_EDIT } from '../constants/texts/texts'

const Stack = createNativeStackNavigator()

const WELCOME_PAGE_ROUTE = {
  routeName: ROUTE_WELCOME_PAGE,
  component: WelcomeView,
  options: { headerShown: false }
}

const STACK_ROUTES = [
  {
    routeName: ROUTE_TABS,
    component: BottomTabsRoutes,
    options: { headerShown: false }
  },
  {
    routeName: ROUTE_RECIPES_EDIT,
    component: RecipeEditView,
    options: { title: RECIPE_EDIT }
  },
  {
    routeName: ROUTE_DAY_MENU_EDIT,
    component: DayMenuEditView,
    options: { title: '' }
  },
  {
    routeName: ROUTE_RECIPES_HELP_VIEW,
    component: RecipesHelpView,
    options: { title: HELP }
  },
  {
    routeName: ROUTE_DAY_MENU_EDIT_HELP,
    component: DayMenuEditHelpView,
    options: { title: HELP }
  }
]

export default function Routes () {
  const { colors } = useTheme()
  const { isLoading, showWelcomePage } = useUserConfig()

  const routes = !isLoading && showWelcomePage
    ? [WELCOME_PAGE_ROUTE, ...STACK_ROUTES]
    : STACK_ROUTES

  return !isLoading && (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false
      }}
    >
      {routes.map(stackRoute => {
        const { routeName, component, options } = stackRoute
        return <Stack.Screen key={routeName} name={routeName} component={component} options={options} />
      })}
    </Stack.Navigator>
  )
}
