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
      <TextInputStyled
        value={textJson}
        multiline
        numberOfLines={10}
      />
      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <Text>Version: {Constants.manifest.version}</Text>
      </View>
    </View>
  )
}
