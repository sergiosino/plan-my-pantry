import { StyleSheet, Text, View } from 'react-native'

export default function RecipeItem (props) {
  const { title, ingredients } = props
  return (
    <View style={styles.container}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
