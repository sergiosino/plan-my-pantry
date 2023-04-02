import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AddButton from '../../components/buttons/AddButton'
import { Recipe, RecipesHeaderRight, RecipesHeaderLeft } from '../../components/recipes'
import SwipeableRow from '../../components/swipeableRow/SwippeableRow'
import Divider from '../../components/Divider'
import { ROUTE_NAME_RECIPES_EDIT, ROUTE_NAME_RECIPES_VIEW } from '../../constants/routes'
import { useRecipes, useSearch } from '../../hooks'

export default function RecipesView () {
  const [isSearchActive, setIsSearchActive] = useState(false)
  const { search, setSearch } = useSearch()
  const {
    recipes,
    handleDeleteRecipe
  } = useRecipes({ search })
  const navigation = useNavigation()

  const handlePressRecipe = (recipe) => {
    navigation.navigate(ROUTE_NAME_RECIPES_EDIT, { recipe })
  }

  const handleAddPress = () => {
    navigation.navigate(ROUTE_NAME_RECIPES_EDIT)
  }

  const renderItem = (recipe) => {
    const { id, name, ingredients } = recipe
    return (
      <SwipeableRow onLeftActionPress={() => handleDeleteRecipe(id)}>
        <Recipe
          id={id}
          name={name}
          ingredients={ingredients}
          onPress={(recipe) => handlePressRecipe(recipe)}
        />
      </SwipeableRow>
    )
  }

  useEffect(() => {
    const newOptions = {}
    newOptions.headerRight = () => (<RecipesHeaderRight isSearchActive={isSearchActive} setIsSearchActive={setIsSearchActive} />)
    if (isSearchActive) {
      newOptions.headerLeft = () => (<RecipesHeaderLeft setSearch={setSearch} />)
      newOptions.headerTitle = ''
    }
    if (!isSearchActive) {
      newOptions.headerLeft = null
      newOptions.headerTitle = ROUTE_NAME_RECIPES_VIEW
      setSearch('')
    }
    navigation.setOptions({ ...newOptions })
  }, [isSearchActive, setIsSearchActive])

  return (
    <View style={styles.container}>
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
