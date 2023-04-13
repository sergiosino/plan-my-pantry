import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Recipe (props) {
  const { recipe = {}, onPress, onLongPress, isSelected } = props

  const { name, ingredients = [] } = recipe
  const ingredientsString = ingredients.join(', ')

  const handleRecipeItemPress = () => {
    onPress && onPress(recipe)
  }

  const handleRecipeItemLongPress = () => {
    onLongPress && onLongPress(recipe)
  }

  return (
    <View style={[isSelected ? styles.containerSelected : styles.container]}>
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
    paddingHorizontal: 15,
    paddingVertical: 21 // Has to be odd, otherwise the divider disappears
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
    fontSize: 12,
    marginTop: 5
  }
})
