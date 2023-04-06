import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'

import GroceryListView from '../views/GroceryListView'
import WeekMenuView from '../views/weekMenuView/WeekMenuView'
import RecipesView from '../views/recipesView/RecipesView'
import SettingsView from '../views/SettingsView'

import {
  ROUTE_RECIPES_VIEW,
  ROUTE_GROCERY_LIST,
  ROUTE_SETTINGS,
  ROUTE_WEEK_MENU
} from '../constants/routes'
import { GROCERY_LIST, RECIPES, SETTINGS, WEEK_MENU } from '../constants/texts/texts'

const Tab = createBottomTabNavigator()

const TAB_ROUTES = [
  {
    routeName: ROUTE_RECIPES_VIEW,
    component: RecipesView,
    iconName: 'pizza-outline',
    focusedIconName: 'pizza',
    options: { title: RECIPES }
  },
  {
    routeName: ROUTE_WEEK_MENU,
    component: WeekMenuView,
    iconName: 'restaurant-outline',
    focusedIconName: 'restaurant',
    options: { title: WEEK_MENU }
  },
  {
    routeName: ROUTE_GROCERY_LIST,
    component: GroceryListView,
    iconName: 'cart-outline',
    focusedIconName: 'cart',
    options: { title: GROCERY_LIST }
  },
  {
    routeName: ROUTE_SETTINGS,
    component: SettingsView,
    iconName: 'settings-outline',
    focusedIconName: 'settings',
    options: { title: SETTINGS }
  }
]

export default function BottomTabsRoutes () {
  const { colors } = useTheme()

  const getTabIcon = ({ focused, color, size, route }) => {
    const { iconName, focusedIconName } = TAB_ROUTES.find(tabRoute => tabRoute.routeName === route.name)
    const icon = focused
      ? focusedIconName
      : iconName
    return <Ionicons name={icon} size={size} color={color} />
  }

  return (
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
