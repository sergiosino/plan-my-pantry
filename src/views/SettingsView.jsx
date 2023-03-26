import { useContext, useState } from 'react'
import { Text, View } from 'react-native'
import Constants from 'expo-constants'

import { IngredientsContext } from '../contexts/IngredientsContext'
import { RecipesContext } from '../contexts/RecipesContext'
import TextInputStyled from '../components/TextInputSyled'
import Button from '../components/Button'

export default function SettingsView () {
  const { ingredients } = useContext(IngredientsContext)
  const { recipes } = useContext(RecipesContext)

  const [textJson, setTextJson] = useState('')

  const loadIngredients = () => {
    setTextJson(JSON.stringify(ingredients))
  }

  const loadRecipes = () => {
    setTextJson(JSON.stringify(recipes))
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={loadIngredients}>
          <Text>Ingredients</Text>
        </Button>
        <Button onPress={loadRecipes}>
          <Text>Recipes</Text>
        </Button>
      </View>
      <View style={{ maxHeight: 500 }}>
        <TextInputStyled
          multiline
          numberOfLines={15}
        >
          {textJson}
        </TextInputStyled>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Text>Version: {Constants.manifest.version}</Text>
      </View>
    </View>
  )
}
