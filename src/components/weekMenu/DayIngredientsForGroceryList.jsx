import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import Button from '../buttons/Button'
import DeselectableItem from './DeselectableItem'

import * as glService from '../../services/GroceryListService'

import { i18n } from '../../utils'

export default function DayIngredientsForGroceryList (props) {
  const { dayMenuIngredients, setDayMenuIngredients } = props

  const handleAddGroceryList = () => {
    const ingredientsText = dayMenuIngredients.map(dayMenuIngredient => dayMenuIngredient)
    glService.pushGroceryItems(ingredientsText)
    ToastAndroid.show(i18n.t('MENU.INGREDIENTS_ADDED'), ToastAndroid.SHORT)
  }

  const handleRemoveIngredient = (ingredient) => {
    const dayMenuIngredientsCopy = [...dayMenuIngredients]
    const dayMenuIngredientsUpdated = dayMenuIngredientsCopy.filter(dayMenuIngredient => dayMenuIngredient !== ingredient)
    setDayMenuIngredients(dayMenuIngredientsUpdated)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.ingredientsContainer}>
          {dayMenuIngredients.map((dayMenuIngredient, index) => (
            <DeselectableItem key={`${dayMenuIngredient}${index}`} text={dayMenuIngredient} onPress={handleRemoveIngredient} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button onPress={handleAddGroceryList}>
          <Text style={styles.buttonText}>{i18n.t('MENU.ADD_GROCERY_LIST')}</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10
  },
  ingredientsContainer: {
    marginBottom: 5,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  buttonContainer: {
    marginTop: 5
  },
  buttonText: {
    color: 'white'
  }
})
