import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import { ROUTE_NAME_FOODS_VIEW, ROUTE_NAME_GROCERY_LIST, ROUTE_NAME_WEEK_MENU } from '../constants/routes'
import GroceryListView from '../views/GroceryListView'
import WeekMenuView from '../views/weekMenuView/WeekMenuView'
import FoodView from '../views/foodView/FoodView'

const Tab = createBottomTabNavigator()

const TAB_ROUTES = [
  {
    name: ROUTE_NAME_FOODS_VIEW,
    component: FoodView,
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

export default function BottomTabsRoutes () {
  const getTabIcon = ({ focused, color, size, route }) => {
    const { iconName, focusedIconName } = TAB_ROUTES.find(tabRoute => tabRoute.name === route.name)
    const icon = focused ? focusedIconName : iconName
    return <Ionicons name={icon} size={size} color={color} />
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => getTabIcon({ ...props, route })
      })}
    >
      {TAB_ROUTES.map(tabRoute => {
        const { name, component } = tabRoute
        return <Tab.Screen key={name} name={name} component={component} />
      })}
    </Tab.Navigator>
  )
}
