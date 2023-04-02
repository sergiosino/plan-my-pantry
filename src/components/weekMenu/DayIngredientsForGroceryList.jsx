import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import Button from '../buttons/Button'
import DeselectableItem from './DeselectableItem'
import { useGroceryList } from '../../hooks/useGroceryList'

export default function DayIngredientsForGroceryList (props) {
  const { dayMenuIngredients, setDayMenuIngredients } = props

  const navigation = useNavigation()
  const { handleAddItems } = useGroceryList()

  const handleAddGroceryList = () => {
    const ingredientsText = dayMenuIngredients.map(dayMenuIngredient => dayMenuIngredient)
    handleAddItems(ingredientsText)
    navigation.goBack()
  }

  const handleRemoveIngredient = (ingredient) => {
    const dayMenuIngredientsCopy = [...dayMenuIngredients]
    const dayMenuIngredientsUpdated = dayMenuIngredientsCopy.filter(dayMenuIngredient => dayMenuIngredient !== ingredient)
    setDayMenuIngredients(dayMenuIngredientsUpdated)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Long press on recipe to add the ingredients</Text>
      <ScrollView>
        <View style={styles.ingredientsContainer}>
          {dayMenuIngredients.map((dayMenuIngredient, index) => (
            <DeselectableItem key={`${dayMenuIngredient}${index}`} text={dayMenuIngredient} onPress={handleRemoveIngredient} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button onPress={handleAddGroceryList}>
          <Text style={styles.buttonText}>Add to grocery list</Text>
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
  titleText: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  ingredientsContainer: {
    marginBottom: 5,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  buttonContainer: {
    marginTop: 5,
    flexDirection: 'row'
  },
  buttonText: {
    color: 'white'
  }
})
