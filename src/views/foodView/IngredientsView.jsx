import { useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import AddButton from '../../components/AddButton'
import IngredientItem from '../../components/ingredients/IngredientItem'
import IngredientsHeader from '../../components/ingredients/IngredientsHeader'
import { INGREDIENT_HEIGHT } from '../../constants/constants'
import { useIngredientsList } from '../../hooks/useIngredientsList'

export default function IngredientsView () {
  const itemIdToFocus = useRef(null)
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
  } = useIngredientsList({ itemIdToFocus })

  const isSelectedListEmpty = selectedList.length === 0

  return (
    <View style={styles.container}>
      <IngredientsHeader
        onDeleteSelected={handleDeleteSelectedIngredients}
        enableDeleteAll={!isSelectedListEmpty}
        onUnselectAll={handleUnselectAllIngredients}
      />
      <FlatList
        contentContainerStyle={styles.flatListContent}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps='handled'
        getItemLayout={(_, index) => ({ length: INGREDIENT_HEIGHT, offset: INGREDIENT_HEIGHT * index, index })}
        initialNumToRender={25}
        data={ingredientsList}
        renderItem={({ item: ingredient }) => {
          const { id, text } = ingredient
          const isSelected = !!selectedList.find(x => x === id)
          const isItemToFocus = itemIdToFocus.current === id
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
