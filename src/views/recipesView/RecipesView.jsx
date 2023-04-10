import { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native'

import AddButton from '../../components/buttons/AddButton'
import { Recipe, RecipesHeader } from '../../components/recipes'
import SwipeableRow from '../../components/swipeableRow/SwippeableRow'
import Divider from '../../components/Divider'

import { useRecipes } from '../../hooks'

import { ROUTE_RECIPES_EDIT } from '../../constants/routes'

/**
 * Principal view of the recipes, where user can see all of them
 */
export default function RecipesView () {
  const {
    recipes,
    handleGetRecipes,
    handleSearchRecipes,
    handleDeleteRecipe
  } = useRecipes()
  const { colors } = useTheme()

  const navigation = useNavigation()

  const handlePressRecipe = (recipe) => {
    navigation.navigate(ROUTE_RECIPES_EDIT, { recipe })
  }

  const handleAddPress = () => {
    navigation.navigate(ROUTE_RECIPES_EDIT)
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
      <RecipesHeader handleSearchRecipes={handleSearchRecipes} />
      <FlatList
        contentContainerStyle={styles.recipesList}
        initialNumToRender={15}
        maxToRenderPerBatch={40}
        ItemSeparatorComponent={<Divider />}
        ListFooterComponent={<View style={[styles.recipesFooter, { backgroundColor: colors.background }]} />}
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
  recipesList: {
    backgroundColor: 'white'
  },
  recipesFooter: {
    height: 70
  }
})
