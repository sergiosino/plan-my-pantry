import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '@react-navigation/native'

import BottomTabsRoutes from './BottomTabsRoutes'

import RecipeEditView from '../views/recipesView/RecipeEditView'
import DayMenuEditView from '../views/weekMenuView/DayMenuEditView'
import RecipesHelpView from '../views/recipesView/RecipesHelpView'
import DayMenuEditHelpView from '../views/weekMenuView/DayMenuEditHelpView'
import WelcomeView from '../views/WelcomeView'

import { useUserConfig } from '../hooks/useUserConfig'

import { i18n } from '../utils'

import {
  ROUTE_DAY_MENU_EDIT,
  ROUTE_DAY_MENU_EDIT_HELP,
  ROUTE_WELCOME_PAGE,
  ROUTE_RECIPES_EDIT,
  ROUTE_RECIPES_HELP_VIEW,
  ROUTE_TABS
} from '../constants/routes'

const Stack = createNativeStackNavigator()

const WELCOME_PAGE_ROUTE = {
  routeName: ROUTE_WELCOME_PAGE,
  component: WelcomeView,
  options: { headerShown: false }
}

/**
 * All the app routes, included the views and the bottom app tab routes
 */
export default function Routes () {
  const { colors } = useTheme()
  const { isLoading, showWelcomePage } = useUserConfig()

  const STACK_ROUTES = [
    {
      routeName: ROUTE_TABS,
      component: BottomTabsRoutes,
      options: { headerShown: false }
    },
    {
      routeName: ROUTE_RECIPES_EDIT,
      component: RecipeEditView,
      options: { title: i18n.t('RECIPES.RECIPE_EDIT') }
    },
    {
      routeName: ROUTE_DAY_MENU_EDIT,
      component: DayMenuEditView,
      options: { title: '' }
    },
    {
      routeName: ROUTE_RECIPES_HELP_VIEW,
      component: RecipesHelpView,
      options: { title: i18n.t('COMMON.HELP') }
    },
    {
      routeName: ROUTE_DAY_MENU_EDIT_HELP,
      component: DayMenuEditHelpView,
      options: { title: i18n.t('COMMON.HELP') }
    }
  ]

  // If the show welcome page user config is disabled, it will not be added to the app routes
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
