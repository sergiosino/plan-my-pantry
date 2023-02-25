import { StyleSheet, Text, View } from 'react-native'
import Divider from '../Divider'
import IconButton from '../IconButton'

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
        <View style={styles.buttonsContainer}>
          <IconButton style={styles.leftIcon} iconName='create-outline' />
          <IconButton iconName='trash' />
        </View>
      </View>
      <Divider />
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
    flex: 1,
    backgroundColor: 'lightgray',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3
  },
  leftIcon: {
    marginRight: 15
  },
  textIngredients: {
    fontSize: 13
  }
})
