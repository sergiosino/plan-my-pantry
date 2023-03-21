import { FlatList, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AddButton from '../AddButton'
import RecipeItem from './RecipeItem'
import SwipeableRow from '../swipeableRow/SwippeableRow'
import Divider from '../Divider'
import { ROUTE_NAME_RECIPES_EDIT } from '../../constants/routes'
import { useRecipes } from '../../hooks/useRecipes'

export default function Recipes () {
  const { recipes } = useRecipes()
  const navigation = useNavigation()
  const {
    handleDeleteItem
  } = useRecipes()

  const handlePressRecipe = (recipe) => {
    navigation.navigate(ROUTE_NAME_RECIPES_EDIT, { recipe })
  }

  const handleAddPress = () => {
    navigation.navigate(ROUTE_NAME_RECIPES_EDIT)
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        initialNumToRender={15}
        data={recipes}
        ItemSeparatorComponent={<Divider />}
        renderItem={({ item: recipe }) => {
          const { id, name, ingredients } = recipe
          return (
            <SwipeableRow onLeftActionPress={() => handleDeleteItem(id)}>
              <RecipeItem
                id={id}
                name={name}
                ingredients={ingredients}
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
