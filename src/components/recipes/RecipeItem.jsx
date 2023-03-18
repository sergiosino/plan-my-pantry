import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export default function RecipeItem (props) {
  const { id, name, ingredients, ingredientsName, onPress } = props

  const handleRecipeItemPress = () => {
    onPress({ id, name, ingredients })
  }

  return (
    <View style={styles.container}>
      <RectButton onPress={handleRecipeItemPress}>
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
              {ingredientsName?.join(',  ')}
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
  textIngredients: {
    fontSize: 13
  }
})
