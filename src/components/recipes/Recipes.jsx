import { FlatList, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AddButton from '../AddButton'
import Recipe from './Recipe'
import SwipeableRow from '../swipeableRow/SwippeableRow'
import Divider from '../Divider'
import { ROUTE_NAME_RECIPES_EDIT } from '../../constants/routes'
import { useRecipes } from '../../hooks/useRecipes'

// TODO: Allow selecting multiple recipes and deleting them at once
export default function Recipes () {
  const { recipes, handleDeleteRecipe } = useRecipes()
  const navigation = useNavigation()

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
            <SwipeableRow onLeftActionPress={() => handleDeleteRecipe(id)}>
              <Recipe
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