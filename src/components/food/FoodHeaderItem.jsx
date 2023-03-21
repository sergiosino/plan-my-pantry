import { StyleSheet, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import Button from '../Button'

export default function FoodHeaderItem (props) {
  const { name, iconName, isActualView, setActualView } = props

  const handlePress = () => {
    setActualView(name)
  }

  const pressableStyles = isActualView
    ? styles.buttonSelected
    : styles.textButtonDefault

  const textStyles = isActualView
    ? styles.textSelected
    : styles.textDefault

  const icon = isActualView
    ? <Ionicons name={iconName} size={20} style={styles.icon} />
    : null

  return (
    <Button
      style={pressableStyles}
      onPress={handlePress}
    >
      {icon}
      <Text style={textStyles}>
        {name}
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
