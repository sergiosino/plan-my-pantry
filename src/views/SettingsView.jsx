import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'

import TextInputStyled from '../components/forms/TextInputSyled'
import Divider from '../components/Divider'
import Checkbox from '../components/forms/Checkbox'
import { useUserConfig } from '../hooks/useUserConfig'
import { useRecipes } from '../hooks'

export default function SettingsView () {
  const [textJson, setTextJson] = useState('')

  const { recipes } = useRecipes()
  const { showInitialPage, updateShowInitialHelp } = useUserConfig()

  const handleCheckboxChange = (checked) => {
    updateShowInitialHelp(checked)
  }

  useEffect(() => {
    setTextJson(JSON.stringify(recipes))
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/chick-settings.png')} style={{ height: 80, width: 80 }} />
      </View>
      <Divider />
      <View style={{ padding: 10, backgroundColor: 'white' }}>
        <Text style={{ marginBottom: 5 }}>Recipes JSON</Text>
        <TextInputStyled
          value={textJson}
          multiline
          numberOfLines={10}
        />
      </View>
      <Divider />
      <View style={styles.settingContainer}>
        <Text>Show welcome page</Text>
        <Checkbox checked={showInitialPage} onChange={handleCheckboxChange} />
      </View>
      <Divider />
      <View style={styles.settingContainer}>
        <Text>App version</Text>
        <Text>{Constants.manifest.version}</Text>
      </View>
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  divider: {
    marginVertical: 20
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: 'white'
  }
})
