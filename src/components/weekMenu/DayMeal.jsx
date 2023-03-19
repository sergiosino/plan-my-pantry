import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

function MealRecipeText ({ meal, recipe, isSelected }) {
  const mealTextStyle = [styles.mealText, isSelected && styles.textSelected]
  const recipeTextStyle = [styles.recipeText, isSelected && styles.textSelected]

  return (
    <>
      <Text style={mealTextStyle}>
        {meal}
      </Text>
      <Text style={recipeTextStyle}>
        {recipe}
      </Text>
    </>
  )
}

export default function DayMeal (props) {
  const { meal, recipe, onPress, isSelected } = props

  const isPressable = !!onPress
  const containerStyle = [styles.container, isSelected && styles.containerSelected]

  return isPressable
    ? (
      <RectButton style={containerStyle} onPress={onPress}>
        <MealRecipeText meal={meal} recipe={recipe} isSelected={isSelected} />
      </RectButton>
      )
    : (
      <View style={containerStyle}>
        <MealRecipeText meal={meal} recipe={recipe} isSelected={isSelected} />
      </View>
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    borderRadius: 4
  },
  containerSelected: {
    backgroundColor: 'gray',
    borderRadius: 4
  },
  mealText: {
    fontWeight: 'bold'
  },
  recipeText: {
    marginTop: 5,
    alignItems: 'center'
  },
  textSelected: {
    color: 'white'
  }
})
