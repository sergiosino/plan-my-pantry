import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import Button from '../Button'
import DeselectableItem from '../groceryList/DeselectableItem'
import { useGroceryItems } from '../../hooks/useGroceryList'

export default function DayIngredientsForGroceryList (props) {
  const { dayMenuIngredients, setDayMenuIngredients } = props

  const navigation = useNavigation()
  const { handleAddItems } = useGroceryItems()

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
      <View>
        <Text style={styles.titleText}>Long press on recipe to add the ingredients</Text>
      </View>
      <ScrollView>
        <View style={styles.ingredientsContainer}>
          {dayMenuIngredients.map((dayMenuIngredient, index) => (
            <DeselectableItem key={`${dayMenuIngredient}${index}`} text={dayMenuIngredient} onPress={handleRemoveIngredient} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={handleAddGroceryList}>
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
    fontWeight: 'bold'
  },
  ingredientsContainer: {
    flex: 1,
    marginTop: 5,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: 'gray'
  },
  buttonText: {
    color: 'white'
  }
})
