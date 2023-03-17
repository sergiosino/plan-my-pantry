import { FlatList, StyleSheet, View } from 'react-native'

import FoodHeader from '../../components/food/FoodHeader'
import AddButton from '../../components/AddButton'
import RecipeItem from '../../components/recipes/RecipeItem'
import SwipeableRow from '../../components/swipeableRow/SwippeableRow'
import Divider from '../../components/Divider'
import { useNavigation } from '@react-navigation/native'
import { ROUTE_NAME_RECIPES_MODAL } from '../../constants/routes'

const RECIPES_MOCK = [
  { id: 1, title: 'Receta 1', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 2, title: 'Receta 2', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 3, title: 'Receta 3', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 4, title: 'Receta 4', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 5, title: 'Receta 5', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 6, title: 'Receta 6', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 7, title: 'Receta 7', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 8, title: 'Receta 8', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' }
]

export default function RecipesView () {
  const navigation = useNavigation()

  const handleEditRecipe = (id) => {
    console.log('right click', id)
  }

  const handleDeleteItem = (id) => {
    console.log('left click', id)
  }

  const handleAddRecipe = () => {
    navigation.navigate(ROUTE_NAME_RECIPES_MODAL)
  }

  return (
    <View style={styles.container}>
      <FoodHeader />
      <FlatList
        contentContainerStyle={styles.flatListContent}
        initialNumToRender={15}
        data={RECIPES_MOCK}
        ItemSeparatorComponent={<Divider />}
        renderItem={({ item: recipe }) => {
          const { id, title, ingredients } = recipe
          return (
            <SwipeableRow onLeftActionPress={() => handleDeleteItem(id)}>
              <RecipeItem
                id={id}
                title={title}
                ingredients={ingredients}
                onPress={handleEditRecipe}
              />
            </SwipeableRow>
          )
        }}
      />
      <AddButton onAddItem={handleAddRecipe} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContent: {
    paddingBottom: 70
  }
})
