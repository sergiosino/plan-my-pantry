import { useEffect, useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import AddButton from '../AddButton'
import Ingredient from './Ingredient'
import { INGREDIENT_HEIGHT } from '../../constants/constants'
import { useIngredients } from '../../hooks/useIngredients'

export default function Ingredients () {
  const {
    ingredients,
    selectedIngredientsList,
    handleAddIngredient,
    sortIngredientsAlphabetically
  } = useIngredients()
  const itemIdToFocus = useRef(null)

  const isSelectedListEmpty = selectedIngredientsList.length === 0

  const handleAddItem = () => {
    const newIngredientId = handleAddIngredient()
    itemIdToFocus.current = newIngredientId
  }

  // Call to sort the ingredients list alphabetically before component closes
  useEffect(() => {
    return () => sortIngredientsAlphabetically()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps='handled'
        getItemLayout={(_, index) => ({ length: INGREDIENT_HEIGHT, offset: INGREDIENT_HEIGHT * index, index })}
        initialNumToRender={25}
        data={ingredients}
        renderItem={({ item: ingredient }) => {
          const { id, text } = ingredient
          const isItemToFocus = itemIdToFocus.current === id
          return (
            <Ingredient
              id={id}
              isItemToFocus={isItemToFocus}
              selectOnPress={!isSelectedListEmpty}
              defaultText={text}
            />
          )
        }}
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
