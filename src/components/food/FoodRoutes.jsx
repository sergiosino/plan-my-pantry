import { useEffect } from 'react'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ROUTE_NAME_INGREDIENTS, ROUTE_NAME_RECIPES, ROUTE_NAME_RECIPES_MODAL } from '../../constants/routes'
import IngredientsView from '../../views/foodView/IngredientsView'
import RecipesView from '../../views/foodView/RecipesView'
import RecipesModal from '../recipes/RecipesModal'

const Stack = createNativeStackNavigator()

const FOOD_ROUTES = [
  {
    name: ROUTE_NAME_RECIPES,
    component: RecipesView,
    animation: 'none'
  },
  {
    name: ROUTE_NAME_INGREDIENTS,
    component: IngredientsView,
    animation: 'none'
  },
  {
    name: ROUTE_NAME_RECIPES_MODAL,
    component: RecipesModal,
    animation: 'slide_from_bottom'
  }
]

export default function FoodRoutes ({ route, navigation }) {
  useEffect(() => {
    const actualRoute = getFocusedRouteNameFromRoute(route)
    if (actualRoute?.includes('modal')) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } })
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } })
    }
  }, [route, navigation])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {FOOD_ROUTES.map((foodRoute) => {
        const { name, component, animation } = foodRoute
        return <Stack.Screen key={name} name={name} component={component} options={{ animation }} />
      })}
    </Stack.Navigator>
  )
}
