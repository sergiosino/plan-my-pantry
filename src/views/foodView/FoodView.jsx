import { createNativeStackNavigator } from '@react-navigation/native-stack'

import IngredientsView from './IngredientsView'
import RecipesView from './RecipesView'
import { ROUTE_NAME_RECIPES, ROUTE_NAME_INGREDIENTS, ROUTE_NAME_RECIPES_MODAL } from '../../constants/routes'
import RecipesModal from '../../components/recipes/RecipesModal'

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
        <Stack.Screen name={ROUTE_NAME_RECIPES_MODAL} component={RecipesModal} />
      </Stack.Navigator>
    </>
  )
}
