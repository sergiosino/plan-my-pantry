import { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import AddButton from '../AddButton'
import Ingredient from './Ingredient'
import { INGREDIENT_HEIGHT } from '../../constants/constants'
import { useIngredients } from '../../hooks/useIngredients'

export default function Ingredients () {
  const {
    ingredients,
    selectedIngredientsList,
    handleAddIngredient
  } = useIngredients()
  const itemIdToFocus = useRef(null)

  const isSelectedListEmpty = selectedIngredientsList.length === 0

  const handleAddItem = () => {
    const newIngredientId = handleAddIngredient()
    itemIdToFocus.current = newIngredientId
  }

  const getItemLayout = (_, index) => ({ length: INGREDIENT_HEIGHT, offset: INGREDIENT_HEIGHT * index, index })

  const renderItem = useCallback((ingredient, itemIdToFocus, isSelectedListEmpty) => {
    const { id, text } = ingredient

    return (
      <Ingredient
        id={id}
        selectOnPress={!isSelectedListEmpty}
        defaultText={text}
        itemIdToFocus={itemIdToFocus}
      />
    )
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        removeClippedSubviews={false}
        getItemLayout={getItemLayout}
        initialNumToRender={20}
        maxToRenderPerBatch={40}
        data={ingredients}
        renderItem={({ item }) => renderItem(item, itemIdToFocus, isSelectedListEmpty)}
      />
      <AddButton onAddItem={handleAddItem} />
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
