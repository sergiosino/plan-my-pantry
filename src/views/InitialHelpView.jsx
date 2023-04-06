import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'

import Checkbox from '../components/forms/Checkbox'
import Button from '../components/buttons/Button'

import { useUserConfig } from '../hooks'

import { ROUTE_NAME_TABS } from '../constants/routes'
import { USER_CONFIG_PARAMS } from '../constants/constants'

export default function InitialHelpView () {
  const [checked, setCheced] = useState(false)

  const { navigate } = useNavigation()
  const { showWelcomePage, updateUserConfig } = useUserConfig()

  const { SHOW_WELCOME_PAGE } = USER_CONFIG_PARAMS

  const handleContinue = () => {
    checked && updateUserConfig(SHOW_WELCOME_PAGE, false)
    navigate(ROUTE_NAME_TABS)
  }

  useEffect(() => {
    if (!showWelcomePage) { navigate(ROUTE_NAME_TABS) }
  }, [showWelcomePage])

  return showWelcomePage && (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.image} />
      </View>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={[styles.text, styles.marginBottom10]}>
        In some pages you will find a <Ionicons name='help-outline' size={20} /> icon in the right of the page header.
        There you will find some info about the functionality.
      </Text>
      <Text style={styles.text}>Happy grocery shopping!</Text>
      <View style={styles.checkboxContainer}>
        <Checkbox style={styles.marginRight5} checked={checked} onChange={setCheced} />
        <Text>Do not show this page again</Text>
      </View>
      <Button onPress={handleContinue}>
        <Text>Continue</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  imgContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  image: {
    height: 160,
    width: 250
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  marginBottom10: {
    marginBottom: 10
  },
  text: {
    fontSize: 17,
    textAlign: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  marginRight5: {
    marginRight: 5
  }
})
