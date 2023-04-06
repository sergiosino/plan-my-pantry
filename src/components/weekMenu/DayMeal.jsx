import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

function MealRecipeText ({ meal, recipe, isSelected }) {
  const mealTextStyle = [styles.mealText, isSelected && styles.textSelected]
  const recipeTextStyle = [styles.recipeText, isSelected && styles.textSelected]

  return (
    <>
      <Text style={mealTextStyle}>
        {meal}
      </Text>
      <View style={styles.recipeNameContainer}>
        <Text numberOfLines={2} style={recipeTextStyle}>
          {recipe}
        </Text>
      </View>
    </>
  )
}

export default function DayMeal (props) {
  const { meal, recipe, onPress, isSelected, style } = props

  const { colors } = useTheme()

  const isPressable = !!onPress
  const containerStyle = [styles.container, isSelected && { backgroundColor: colors.primary }, style]

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
  mealText: {
    fontWeight: 'bold'
  },
  recipeText: {
    textAlign: 'center'
  },
  textSelected: {
    color: 'white'
  },
  recipeNameContainer: {
    height: 41,
    justifyContent: 'center'
  }
})
