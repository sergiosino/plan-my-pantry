import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'

import GroceryListView from '../views/GroceryListView'
import WeekMenuView from '../views/weekMenuView/WeekMenuView'
import RecipesView from '../views/recipesView/RecipesView'
import SettingsView from '../views/SettingsView'

import { useUserConfig } from '../hooks'

import { i18n } from '../utils'

import {
  ROUTE_RECIPES_VIEW,
  ROUTE_GROCERY_LIST,
  ROUTE_SETTINGS,
  ROUTE_WEEK_MENU
} from '../constants/routes'

const Tab = createBottomTabNavigator()

/**
 * All the bottom tab routes with its views
 */
export default function BottomTabsRoutes () {
  const { colors } = useTheme()
  const { isLoading } = useUserConfig()

  const TAB_ROUTES = [
    {
      routeName: ROUTE_RECIPES_VIEW,
      component: RecipesView,
      iconName: 'pizza-outline',
      focusedIconName: 'pizza',
      options: { title: i18n.t('RECIPES.RECIPES') }
    },
    {
      routeName: ROUTE_WEEK_MENU,
      component: WeekMenuView,
      iconName: 'restaurant-outline',
      focusedIconName: 'restaurant',
      options: { title: i18n.t('MENU.WEEK_MENU') }
    },
    {
      routeName: ROUTE_GROCERY_LIST,
      component: GroceryListView,
      iconName: 'cart-outline',
      focusedIconName: 'cart',
      options: { title: i18n.t('GROCERY_LIST.GROCERY_LIST') }
    },
    {
      routeName: ROUTE_SETTINGS,
      component: SettingsView,
      iconName: 'settings-outline',
      focusedIconName: 'settings',
      options: { title: i18n.t('SETTINGS.SETTINGS') }
    }
  ]

  const getTabIcon = ({ focused, color, size, route }) => {
    const { iconName, focusedIconName } = TAB_ROUTES.find(tabRoute => tabRoute.routeName === route.name)
    const icon = focused
      ? focusedIconName
      : iconName
    return <Ionicons name={icon} size={size} color={color} />
  }

  return !isLoading && (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => getTabIcon({ ...props, route }),
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false
      })}
    >
      {TAB_ROUTES.map(tabRoute => {
        const { routeName, component, options } = tabRoute
        return <Tab.Screen key={routeName} name={routeName} options={options} component={component} />
      })}
    </Tab.Navigator>
  )
}
