import { useEffect, useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import AddButton from '../../components/AddButton'
import IngredientItem from '../../components/ingredients/IngredientItem'
import IngredientsHeader from '../../components/ingredients/IngredientsHeader'
import { INGREDIENT_HEIGHT } from '../../constants/constants'
import { useIngredientsList } from '../../hooks/useIngredientsList'

export default function IngredientsView () {
  const itemIndexToFocus = useRef(null)
  const refFlatList = useRef(null)
  const {
    ingredientsList,
    selectedList,
    handleAddIngredient,
    handleSelectIngredient,
    handleUnselectIngredient,
    handleUnselectAllIngredients,
    handleIngredientChange,
    handleDeleteIngredient,
    handleDeleteSelectedIngredients
  } = useIngredientsList({ itemIndexToFocus })

  // When a new item is added it scrolls to its location
  useEffect(() => {
    const isLastItemAdded = itemIndexToFocus.current === ingredientsList.length - 1
    if (isLastItemAdded) {
      refFlatList.current.scrollToIndex({
        index: ingredientsList.length - 1,
        animated: true
      })
    }
  }, [ingredientsList])

  const isSelectedListEmpty = selectedList.length === 0

  return (
    <View style={styles.container}>
      <IngredientsHeader
        onDeleteSelected={handleDeleteSelectedIngredients}
        enableDeleteAll={!isSelectedListEmpty}
        onUnselectAll={handleUnselectAllIngredients}
      />
      <FlatList
        ref={refFlatList}
        contentContainerStyle={styles.flatListContent}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps='handled'
        getItemLayout={(_, index) => ({ length: INGREDIENT_HEIGHT, offset: INGREDIENT_HEIGHT * index, index })}
        initialNumToRender={25}
        data={ingredientsList}
        renderItem={({ item: ingredient, index }) => {
          const { id, text } = ingredient
          const isSelected = !!selectedList.find(x => x === id)
          const isItemToFocus = itemIndexToFocus.current === index
          return (
            <IngredientItem
              id={id}
              onSelect={handleSelectIngredient}
              onUnselect={handleUnselectIngredient}
              isItemToFocus={isItemToFocus}
              isSelected={isSelected}
              selectOnPress={!isSelectedListEmpty}
              defaultText={text}
              onChange={handleIngredientChange}
              onDelete={handleDeleteIngredient}
            />
          )
        }}
      />
      <AddButton onAddItem={handleAddIngredient} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContent: {
    marginHorizontal: 10
  }
})
