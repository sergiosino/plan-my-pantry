import { useNavigation, useNavigationState } from '@react-navigation/native'
import { StyleSheet, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import Button from '../Button'
import { useRef } from 'react'

export default function FoodHeaderItem (props) {
  const { routeName, iconName } = props

  const navigation = useNavigation()
  const actualRouteName = useNavigationState((state) => state.routes[state.index].name)
  const isActualRoute = useRef(actualRouteName === routeName)

  const handlePress = () => {
    navigation.navigate(routeName)
  }

  const pressableStyles = isActualRoute.current
    ? styles.buttonSelected
    : styles.textButtonDefault

  const textStyles = isActualRoute.current
    ? styles.textSelected
    : styles.textDefault

  const icon = isActualRoute.current
    ? <Ionicons name={iconName} size={20} style={styles.icon} />
    : null

  return (
    <Button
      style={pressableStyles}
      onPress={handlePress}
    >
      {icon}
      <Text style={textStyles}>
        {routeName}
      </Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  textButtonDefault: {
    backgroundColor: 'transparent'
  },
  buttonSelected: {
    backgroundColor: 'gray'
  },
  textDefault: {
    color: 'black'
  },
  textSelected: {
    color: 'white'
  },
  icon: {
    marginRight: 5,
    color: 'white'
  }
})
