import { useNavigation, useRoute } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { IngredientsContext } from '../../contexts/IngredientsContext'
import { useRecipes } from '../../hooks/useRecipes'
import Button from '../../components/Button'
import MultipleSelect from '../../components/MultipleSelect'
import TextInputSyled from '../../components/TextInputSyled'

export default function RecipeModal () {
  const route = useRoute()
  const navigation = useNavigation()
  const { handleSaveRecipe } = useRecipes()
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [name, setName] = useState('')
  const { ingredients } = useContext(IngredientsContext)

  const { recipe } = route.params ?? { recipe: null }

  const handleSave = () => {
    const updatedRecipe = { id: -1, name, ingredients: selectedIngredients }
    if (recipe) { updatedRecipe.id = recipe.id }
    handleSaveRecipe(updatedRecipe)
    navigation.goBack()
  }

  const handleClose = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if (recipe) {
      setName(recipe.name)
      setSelectedIngredients(recipe.ingredients)
    }
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.modalText}>Recipe name</Text>
          <TextInputSyled value={name} onChangeText={setName} />
          <Text style={styles.modalText}>Ingredients</Text>
          <MultipleSelect data={ingredients} selected={selectedIngredients} onSelect={setSelectedIngredients} />
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button style={styles.buttonClose} onPress={handleClose}>
          <Text style={styles.textStyle}>Cancel</Text>
        </Button>
        <Button style={styles.buttonClose} onPress={handleSave}>
          <Text style={styles.textStyle}>Save</Text>
        </Button>
      </View>
    </View>
  )
}

const gap = 20

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    marginBottom: 10,
    margin: -(gap / 2),
    flexDirection: 'row'
  },
  buttonClose: {
    margin: (gap / 2),
    backgroundColor: 'gray'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginTop: 15,
    marginBottom: 5
  }
})
