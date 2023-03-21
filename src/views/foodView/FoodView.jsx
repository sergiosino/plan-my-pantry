import { StyleSheet, View } from 'react-native'

import { useState } from 'react'
import Recipes from '../../components/recipes/Recipes'
import Ingredients from '../../components/ingredients/Ingredients'
import { useIngredients } from '../../hooks/useIngredients'
import FoodHeader from '../../components/food/FoodHeader'
import { FOOD_HEADER_RECIPES } from '../../constants/constants'

export default function FoodView () {
  const [actualView, setActualView] = useState(FOOD_HEADER_RECIPES)
  const ingredientsFunctionality = useIngredients()
  const { handleUnselectAllIngredients, handleDeleteSelectedIngredients, selectedIngredientsList } = ingredientsFunctionality

  const isSelectedListEmpty = actualView === FOOD_HEADER_RECIPES
    ? true
    : selectedIngredientsList.length === 0

  return (
    <View style={styles.container}>
      <FoodHeader
        actualView={actualView}
        setActualView={setActualView}
        enableDeleteAll={!isSelectedListEmpty}
        onDeleteSelectedIngredient={handleDeleteSelectedIngredients}
        onUnselectAllIngredients={handleUnselectAllIngredients}
      />
      {actualView === FOOD_HEADER_RECIPES
        ? <Recipes />
        : <Ingredients ingredientsFunctionality={ingredientsFunctionality} isSelectedListEmpty={isSelectedListEmpty} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
