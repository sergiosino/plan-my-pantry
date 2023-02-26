import { useNavigation, useNavigationState } from '@react-navigation/native'
import { StyleSheet, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { RectButton } from 'react-native-gesture-handler'

export default function FoodHeaderItem (props) {
  const { routeName, iconName } = props

  const navigation = useNavigation()
  const actualRouteName = useNavigationState((state) => state.routes[state.index].name)

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
    <RectButton
      style={[styles.textButton, pressableStyles]}
      onPress={() => navigation.navigate(routeName)}
    >
      {icon}
      <Text style={textStyles}>
        {routeName}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  textButtonDefault: {
    backgroundColor: 'transparent'
  },
  textButtonPress: {
    backgroundColor: 'darkgray'
  },
  textButtonSelected: {
    backgroundColor: 'gray'
  },
  textButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    flexDirection: 'row'
  },
  textDefault: {
    color: 'black'
  },
  textPressOrSelected: {
    color: 'white'
  },
  content: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 5,
    color: 'white'
  }
})
