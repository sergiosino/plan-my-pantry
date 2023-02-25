import { FlatList, StyleSheet, View } from 'react-native'

import FoodHeader from '../../components/food/FoodHeader'
import AddButton from '../../components/AddButton'
import RecipeItem from '../../components/recipes/RecipeItem'

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
  return (
    <View style={styles.container}>
      <FoodHeader />
      <FlatList
        contentContainerStyle={styles.flatListContent}
        initialNumToRender={15}
        data={RECIPES_MOCK}
        renderItem={({ item: recipe }) => {
          const { title, ingredients } = recipe
          return (
            <RecipeItem
              title={title}
              ingredients={ingredients}
            />
          )
        }}
      />
      <AddButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContent: {
    marginHorizontal: 10,
    paddingBottom: 70
  }
})
