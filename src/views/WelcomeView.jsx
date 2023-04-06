import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { RectButton } from 'react-native-gesture-handler'

import Checkbox from '../components/forms/Checkbox'
import Button from '../components/buttons/Button'

import { useUserConfig } from '../hooks'

import { ROUTE_TABS } from '../constants/routes'
import { USER_CONFIG_PARAMS } from '../constants/constants'
import {
  CONTINUE,
  HAPPY_GROCERY,
  HELP_ICON_EXPLANATION_1,
  HELP_ICON_EXPLANATION_2,
  NOT_SHOW_AGAIN,
  WELCOME
} from '../constants/texts/texts'

export default function WelcomeView () {
  const [checked, setChecked] = useState(false)

  const { navigate } = useNavigation()
  const { showWelcomePage, updateUserConfig } = useUserConfig()

  const { SHOW_WELCOME_PAGE } = USER_CONFIG_PARAMS

  const handleContinue = () => {
    checked && updateUserConfig(SHOW_WELCOME_PAGE, false)
    navigate(ROUTE_TABS)
  }

  useEffect(() => {
    if (!showWelcomePage) { navigate(ROUTE_TABS) }
  }, [showWelcomePage])

  return showWelcomePage && (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.image} />
      </View>
      <Text style={styles.title}>{WELCOME}</Text>
      <Text style={[styles.text, styles.marginBottom10]}>
        {HELP_ICON_EXPLANATION_1}
        <Ionicons name='help-outline' size={20} />
        {HELP_ICON_EXPLANATION_2}
      </Text>
      <Text style={styles.text}>{HAPPY_GROCERY}</Text>
      <View style={styles.checkboxButtonContainer}>
        <RectButton onPress={() => setChecked(!checked)} rippleColor='transparent'>
          <View style={styles.checkboxContainer}>
            <Checkbox style={styles.marginRight5} checked={checked} />
            <Text>{NOT_SHOW_AGAIN}</Text>
          </View>
        </RectButton>
      </View>
      <Button onPress={handleContinue}>
        <Text>{CONTINUE}</Text>
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
  checkboxButtonContainer: {
    marginTop: 40,
    marginBottom: 20
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marginRight5: {
    marginRight: 5
  }
})
