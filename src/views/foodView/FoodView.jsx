import { StyleSheet, View } from 'react-native'
import { useState } from 'react'

import Recipes from '../../components/recipes/Recipes'
import Ingredients from '../../components/ingredients/Ingredients'
import FoodHeader from '../../components/food/FoodHeader'
import { FOOD_HEADER_RECIPES } from '../../constants/constants'

export default function FoodView () {
  const [actualView, setActualView] = useState(FOOD_HEADER_RECIPES)

  return (
    <View style={styles.container}>
      <FoodHeader
        actualView={actualView}
        setActualView={setActualView}
      />
      {actualView === FOOD_HEADER_RECIPES
        ? <Recipes />
        : <Ingredients />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
