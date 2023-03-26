import { FlatList, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AddButton from '../AddButton'
import Recipe from './Recipe'
import SwipeableRow from '../swipeableRow/SwippeableRow'
import Divider from '../Divider'
import { ROUTE_NAME_RECIPES_EDIT } from '../../constants/routes'
import { useRecipes } from '../../hooks/useRecipes'

export default function Recipes () {
  const {
    recipesWithIngredientsName,
    selectedRecipes,
    handleDeleteRecipe,
    handleSelectRecipe,
    handleUnselectRecipe
  } = useRecipes()
  const navigation = useNavigation()

  const isSelectedListEmpty = selectedRecipes.length === 0

  const handlePressRecipe = (recipe, isSelected) => {
    if (isSelectedListEmpty) { return navigation.navigate(ROUTE_NAME_RECIPES_EDIT, { recipe }) }
    isSelected
      ? handleUnselectRecipe(recipe.id)
      : handleSelectRecipe(recipe.id)
  }

  const handleLongPressRecipe = (recipe, isSelected) => {
    if (!isSelected) { handleSelectRecipe(recipe.id) }
  }

  const handleAddPress = () => {
    navigation.navigate(ROUTE_NAME_RECIPES_EDIT)
  }

  const renderItem = (recipe) => {
    const { id, name, ingredients } = recipe
    const isSelected = !!selectedRecipes.find(x => x === recipe.id)
    return (
      <SwipeableRow onLeftActionPress={() => handleDeleteRecipe(id, isSelected)}>
        <Recipe
          id={id}
          name={name}
          ingredients={ingredients}
          onPress={(recipe) => handlePressRecipe(recipe, isSelected)}
          onLongPress={(recipe) => handleLongPressRecipe(recipe, isSelected)}
          isSelected={isSelected}
        />
      </SwipeableRow>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        initialNumToRender={15}
        maxToRenderPerBatch={40}
        ItemSeparatorComponent={<Divider />}
        data={recipesWithIngredientsName}
        extraData={selectedRecipes}
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
