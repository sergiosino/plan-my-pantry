import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Recipe (props) {
  const { recipe = {}, onPress, onLongPress, isSelected } = props

  const { name, ingredients = [] } = recipe
  const containerStyle = isSelected
    ? styles.containerSelected
    : styles.container
  const ingredientsString = ingredients.join(', ')

  const handleRecipeItemPress = () => {
    onPress && onPress(recipe)
  }

  const handleRecipeItemLongPress = () => {
    onLongPress && onLongPress(recipe)
  }

  return (
    <View style={containerStyle}>
      <RectButton onPress={handleRecipeItemPress} onLongPress={handleRecipeItemLongPress}>
        <View style={styles.innerContainer}>
          <View style={styles.recipeInfoContainer}>
            <Text style={styles.textTitle}>
              {name}
            </Text>
            <Text style={styles.textIngredients}>
              {ingredientsString}
            </Text>
          </View>
          {isSelected === undefined && (
            <Ionicons name='chevron-forward' size={20} />
          )}
        </View>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  containerSelected: {
    backgroundColor: 'lightgray'
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  recipeInfoContainer: {
    flex: 1,
    marginRight: 10
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  textIngredients: {
    fontSize: 13
  }
})
