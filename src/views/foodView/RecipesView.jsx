import { FlatList, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import FoodHeader from '../../components/food/FoodHeader'
import AddButton from '../../components/AddButton'
import RecipeItem from '../../components/recipes/RecipeItem'
import SwipeableRow from '../../components/swipeableRow/SwippeableRow'
import Divider from '../../components/Divider'
import { ROUTE_NAME_RECIPES_MODAL } from '../../constants/routes'
import { useRecipes } from '../../hooks/useRecipes'

export default function RecipesView () {
  const { recipes } = useRecipes()
  const navigation = useNavigation()
  const {
    handleDeleteItem
  } = useRecipes()

  const handlePressRecipe = (recipe) => {
    navigation.navigate(ROUTE_NAME_RECIPES_MODAL, { recipe })
  }

  const handleAddPress = () => {
    navigation.navigate(ROUTE_NAME_RECIPES_MODAL)
  }

  return (
    <View style={styles.container}>
      <FoodHeader />
      <FlatList
        contentContainerStyle={styles.flatListContent}
        initialNumToRender={15}
        data={recipes}
        ItemSeparatorComponent={<Divider />}
        renderItem={({ item: recipe }) => {
          const { id, name, ingredients, ingredientsName } = recipe
          return (
            <SwipeableRow onLeftActionPress={() => handleDeleteItem(id)}>
              <RecipeItem
                id={id}
                name={name}
                ingredients={ingredients}
                ingredientsName={ingredientsName}
                onPress={handlePressRecipe}
              />
            </SwipeableRow>
          )
        }}
      />
      <AddButton onAddItem={handleAddPress} />
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
