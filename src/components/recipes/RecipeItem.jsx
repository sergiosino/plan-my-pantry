import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export default function RecipeItem (props) {
  const { id, title, ingredients, onPress } = props

  const handleRecipeItemPress = () => {
    onPress(id)
  }

  return (
    <View style={styles.container}>
      <RectButton onPress={handleRecipeItemPress} underlayColor='red'>
        <View style={styles.innerContainer}>
          <View style={styles.firstColumn}>
            <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>
                {title}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.textIngredients}>
              {ingredients}
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
