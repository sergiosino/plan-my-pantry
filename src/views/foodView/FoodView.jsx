import { StyleSheet, View } from 'react-native'

import { useState } from 'react'
import Recipes from '../../components/recipes/Recipes'
import Ingredients from '../../components/ingredients/Ingredients'
import { useIngredients } from '../../hooks/useIngredients'
import IngredientsHeader from '../../components/ingredients/IngredientsHeader'

export default function FoodView () {
  const [actualView, setActualView] = useState('Recipes')
  const ingredientsFunctionality = useIngredients()
  const { handleUnselectAllIngredients, handleDeleteSelectedIngredients, selectedIngredientsList } = ingredientsFunctionality

  const isSelectedListEmpty = selectedIngredientsList.length === 0

  return (
    <View style={styles.container}>
      <IngredientsHeader
        onDeleteSelected={handleDeleteSelectedIngredients}
        enableDeleteAll={!isSelectedListEmpty}
        onUnselectAll={handleUnselectAllIngredients}
        actualView={actualView}
        setActualView={setActualView}
      />
      {actualView === 'Recipes'
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
