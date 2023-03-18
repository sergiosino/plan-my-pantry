import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import WeekMenuView from '../views/weekMenuView/WeekMenuView'
import GroceryListView from '../views/GroceryListView'
import { ROUTE_NAME_FOODS, ROUTE_NAME_WEEK_MENU, ROUTE_NAME_GROCERY_LIST } from '../constants/routes'
import FoodRoutes from './food/FoodRoutes'

const Tab = createBottomTabNavigator()

const TAB_ROUTES = [
  {
    name: ROUTE_NAME_FOODS,
    component: FoodRoutes,
    iconName: 'pizza-outline',
    focusedIconName: 'pizza'
  },
  {
    name: ROUTE_NAME_WEEK_MENU,
    component: WeekMenuView,
    iconName: 'restaurant-outline',
    focusedIconName: 'restaurant'
  },
  {
    name: ROUTE_NAME_GROCERY_LIST,
    component: GroceryListView,
    iconName: 'cart-outline',
    focusedIconName: 'cart'
  }
]

export default function AppTabs () {
  const getTabIcon = ({ focused, color, size, route }) => {
    const { iconName, focusedIconName } = TAB_ROUTES.find(tabRoute => tabRoute.name === route.name)
    const icon = focused ? focusedIconName : iconName
    return <Ionicons name={icon} size={size} color={color} />
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => getTabIcon({ ...props, route }),
        headerShown: false
      })}
    >
      {TAB_ROUTES.map(tabRoute => {
        const { name, component } = tabRoute
        return <Tab.Screen key={name} name={name} component={component} />
      })}
    </Tab.Navigator>
  )
}
