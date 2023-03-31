import { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Constants from 'expo-constants'

import { RecipesContext } from '../contexts/RecipesContext'
import TextInputStyled from '../components/forms/TextInputSyled'

export default function SettingsView () {
  const { recipes } = useContext(RecipesContext)

  const [textJson, setTextJson] = useState('')

  useEffect(() => {
    setTextJson(JSON.stringify(recipes))
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, height: 500 }}>
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
