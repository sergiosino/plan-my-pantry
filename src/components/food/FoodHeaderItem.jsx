import { useNavigation, useNavigationState } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { headerStyles } from '../../styles/headerStyles'

export default function FoodHeaderItem (props) {
  const { routeName, iconName } = props

  const navigation = useNavigation()
  const actualRouteName = useNavigationState((state) => state.routes[state.index].name)

  const getPressableStyles = (pressed) => {
    if (actualRouteName === routeName) { return styles.textButtonSelected }
    if (pressed) { return styles.textButtonPress }
    return styles.textButtonDefault
  }

  const getTextStyles = (pressed) => {
    if (actualRouteName === routeName || pressed) { return styles.textPressOrSelected }
    return styles.textDefault
  }

  const getIcon = () => {
    if (actualRouteName === routeName) { return <Ionicons name={iconName} size={20} style={styles.icon} /> }
  }

  return (
    <View style={headerStyles.headerItem}>
      <Pressable
        style={({ pressed }) => [
          getPressableStyles(pressed),
          styles.textButton
        ]}
        onPress={() => navigation.navigate(routeName)}
      >
        {({ pressed }) => (
          <View style={styles.content}>
            {getIcon()}
            <Text style={getTextStyles(pressed)}>
              {routeName}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
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
    borderRadius: 4
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
