import { useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import uuid from 'react-native-uuid'

import AddButton from '../AddButton'
import Ingredient from './Ingredient'
import { INGREDIENT_HEIGHT } from '../../constants/constants'

export default function Ingredients (props) {
  const { ingredientsFunctionality, isSelectedListEmpty } = props
  const {
    ingredients,
    selectedIngredientsList,
    handleAddIngredient,
    handleSelectIngredient,
    handleUnselectIngredient,
    handleIngredientChange,
    handleDeleteIngredient
  } = ingredientsFunctionality
  const itemIdToFocus = useRef(null)

  const handleAddItem = () => {
    const newIngredient = { id: uuid.v4(), text: '' }
    handleAddIngredient(newIngredient)
    itemIdToFocus.current = newIngredient.id
  }

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
          const isSelected = !!selectedIngredientsList.find(x => x === id)
          const isItemToFocus = itemIdToFocus.current === id
          return (
            <Ingredient
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
