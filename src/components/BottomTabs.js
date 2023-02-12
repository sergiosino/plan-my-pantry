import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import RecipesView from '../views/RecipesView'
import WeekMenuView from '../views/WeekMenuView'
import GroceryListView from '../views/groceryListView/GroceryListView'

const Tab = createBottomTabNavigator()
const tabOptions = [
  {
    name: 'Recipes',
    component: RecipesView,
    iconName: 'pizza-outline',
    focusedIconName: 'pizza'
  },
  {
    name: 'Week menu',
    component: WeekMenuView,
    iconName: 'restaurant-outline',
    focusedIconName: 'restaurant'
  },
  {
    name: 'Grocery list',
    component: GroceryListView,
    iconName: 'cart-outline',
    focusedIconName: 'cart'
  }
]

export default function BottomTabs () {
  const getTabIcon = ({ focused, color, size, route }) => {
    const { iconName, focusedIconName } = tabOptions.find(tabOption => tabOption.name === route.name)
    const icon = focused ? focusedIconName : iconName
    return <Ionicons name={icon} size={size} color={color} />
  }

  return (
    <Tab.Navigator
      initialRouteName='Grocery list' screenOptions={({ route }) => ({
        tabBarIcon: (props) => getTabIcon({ ...props, route }),
        headerShown: false
      })}
    >
      {tabOptions.map(tabOption => (
        <Tab.Screen key={tabOption.name} name={tabOption.name} component={tabOption.component} />
      ))}
    </Tab.Navigator>
  )
}
