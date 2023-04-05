import { FlatList, StyleSheet, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import AddButton from '../../components/buttons/AddButton'
import { Recipe } from '../../components/recipes'
import SwipeableRow from '../../components/swipeableRow/SwippeableRow'
import Divider from '../../components/Divider'
import { ROUTE_NAME_RECIPES_EDIT } from '../../constants/routes'
import { useRecipes } from '../../hooks'
import RecipesHeader from '../../components/recipes/RecipesHeader'
import { useCallback } from 'react'

export default function RecipesView () {
  const {
    recipes,
    handleGetRecipes,
    handleDeleteRecipe
  } = useRecipes()
  console.log('hey')
  const navigation = useNavigation()

  const handlePressRecipe = (recipe) => {
    navigation.navigate(ROUTE_NAME_RECIPES_EDIT, { recipe })
  }

  const handleAddPress = () => {
    navigation.navigate(ROUTE_NAME_RECIPES_EDIT)
  }

  const renderItem = (recipe) => {
    const { id } = recipe
    return (
      <SwipeableRow onLeftActionPress={() => handleDeleteRecipe(id)}>
        <Recipe
          recipe={recipe}
          onPress={handlePressRecipe}
        />
      </SwipeableRow>
    )
  }

  useFocusEffect(
    useCallback(() => {
      handleGetRecipes()
    }, [])
  )

  return (
    <View style={styles.container}>
      <RecipesHeader />
      <FlatList
        contentContainerStyle={styles.flatListContent}
        initialNumToRender={15}
        maxToRenderPerBatch={40}
        ItemSeparatorComponent={<Divider />}
        data={recipes}
        renderItem={({ item }) => renderItem(item)}
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
