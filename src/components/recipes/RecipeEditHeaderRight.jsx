import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import IconButton from '../buttons/IconButton'

import * as rService from '../../services/RecipesService'

export default function RecipeEditHeaderRight (props) {
  const { recipeParam, handleSubmit } = props

  const navigation = useNavigation()

  const handleSave = async (fields) => {
    const { id, name, notes, ingredients: fieldIngredients } = fields
    const ingredients = fieldIngredients.map(field => field.ingredient)
    const updatedRecipe = {
      id,
      name,
      ingredients,
      notes
    }
    recipeParam
      ? await rService.putRecipe(updatedRecipe.id, updatedRecipe)
      : await rService.pushRecipe(updatedRecipe)
    navigation.goBack()
  }

  return (
    <View style={styles.localHeaderContainer}>
      <IconButton onPress={handleSubmit(handleSave)} iconName='checkmark' size={25} />
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: -5
  }
})
