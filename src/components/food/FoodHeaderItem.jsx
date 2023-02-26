import { useNavigation, useNavigationState } from '@react-navigation/native'
import { StyleSheet, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import Button from '../Button'

export default function FoodHeaderItem (props) {
  const { routeName, iconName } = props

  const navigation = useNavigation()
  const actualRouteName = useNavigationState((state) => state.routes[state.index].name)

  const handlePress = () => {
    navigation.navigate(routeName)
  }

  const pressableStyles = actualRouteName === routeName
    ? styles.textButtonSelected
    : styles.textButtonDefault

  const textStyles = actualRouteName === routeName
    ? styles.textPressOrSelected
    : styles.textDefault

  const icon = actualRouteName === routeName
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
  textButtonSelected: {
    backgroundColor: 'gray'
  },
  textDefault: {
    color: 'black'
  },
  textPressOrSelected: {
    color: 'white'
  },
  icon: {
    marginRight: 5,
    color: 'white'
  }
})
