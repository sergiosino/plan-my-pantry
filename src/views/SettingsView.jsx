import { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'

import { RecipesContext } from '../contexts/RecipesContext'
import TextInputStyled from '../components/forms/TextInputSyled'
import Divider from '../components/Divider'

export default function SettingsView () {
  const { recipes } = useContext(RecipesContext)

  const [textJson, setTextJson] = useState('')

  useEffect(() => {
    setTextJson(JSON.stringify(recipes))
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/chick-settings.png')} style={{ height: 80, width: 80 }} />
      </View>
      <Divider style={styles.divider} />
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

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center'
  },
  divider: {
    marginVertical: 20
  }
})
