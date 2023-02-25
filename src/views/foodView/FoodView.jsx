import { createNativeStackNavigator } from '@react-navigation/native-stack'

import IngredientsView from './IngredientsView'
import RecipesView from './RecipesView'
import { ROUTE_NAME_RECIPES, ROUTE_NAME_INGREDIENTS } from '../../constants/routes'

const Stack = createNativeStackNavigator()

export default function FoodView () {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none'
        }}
      >
        <Stack.Screen name={ROUTE_NAME_RECIPES} component={RecipesView} />
        <Stack.Screen name={ROUTE_NAME_INGREDIENTS} component={IngredientsView} />
      </Stack.Navigator>
    </>
  )
}
