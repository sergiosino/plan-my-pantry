import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export default function Recipe (props) {
  const { recipe = {}, onPress, onLongPress, isSelected } = props

  const { name, ingredients = [] } = recipe
  const containerStyle = isSelected ? styles.containerSelected : styles.container
  const ingredientsString = ingredients.join(', ')

  const handleRecipeItemPress = () => {
    onPress && onPress(recipe)
  }

  const handleRecipeItemLongPress = () => {
    onLongPress && onLongPress(recipe)
  }

  return (
    <View style={containerStyle}>
      <RectButton onPress={handleRecipeItemPress} onLongPress={handleRecipeItemLongPress} delayLongPress={100}>
        <View style={styles.innerContainer}>
          <View style={styles.firstColumn}>
            <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>
                {name}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.textIngredients}>
              {ingredientsString}
            </Text>
          </View>
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
    padding: 10
  },
  firstColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  textTitleSelected: {
    color: 'white'
  },
  textIngredients: {
    fontSize: 13
  },
  textIngredientsSelected: {
    color: 'white'
  }
})
