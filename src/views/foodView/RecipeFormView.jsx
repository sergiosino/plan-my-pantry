import { useNavigation, useRoute } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { IngredientsContext } from '../../contexts/IngredientsContext'
import { useRecipes } from '../../hooks/useRecipes'
import Button from '../../components/Button'
import MultiSelectStyled from '../../components/multiSelect/MultiSelectStyled'
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
          <MultiSelectStyled data={ingredients} selected={selectedIngredients} onSelect={setSelectedIngredients} />
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={handleSave}>
          <Text style={styles.textStyle}>Save</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  button: {
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
