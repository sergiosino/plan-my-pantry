import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export default function Recipe (props) {
  const { id, name, ingredients, onPress, onLongPress, isSelected } = props

  const [ingredientsText, setIngredientsText] = useState([])

  const containerStyle = isSelected ? styles.containerSelected : styles.container

  const handleRecipeItemPress = () => {
    onPress && onPress({ id, name, ingredients })
  }

  const handleRecipeItemLongPress = () => {
    onLongPress && onLongPress({ id, name, ingredients })
  }

  useEffect(() => {
    const newIngredientsText = ingredients.map(ingredient => ingredient.text)
    setIngredientsText(newIngredientsText)
  }, [ingredients, setIngredientsText])

  return (
    <View style={containerStyle}>
      <RectButton onPress={handleRecipeItemPress} onLongPress={handleRecipeItemLongPress}>
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
              {ingredientsText?.join(',  ')}
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
