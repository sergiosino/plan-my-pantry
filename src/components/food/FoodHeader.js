import { useNavigation, useNavigationState } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { headerStyles } from '../../styles/headerStyles'
import { ROUTE_NAME_RECIPES, ROUTE_NAME_INGREDIENTS } from '../../constants/routes'

function HeaderItem (props) {
  const { routeName } = props

  const navigation = useNavigation()
  const actualRouteName = useNavigationState((state) => state.routes[state.index].name)

  const getPressableStyles = (pressed, screenName) => {
    if (actualRouteName === screenName) { return styles.textButtonSelected }
    if (pressed) { return styles.textButtonPress }
    return styles.textButtonDefault
  }

  const getTextStyles = (pressed, screenName) => {
    if (actualRouteName === screenName || pressed) { return styles.textPressOrSelected }
    return styles.textDefault
  }

  return (
    <View style={headerStyles.headerItem}>
      <Pressable
        style={({ pressed }) => [
          getPressableStyles(pressed, routeName),
          styles.textButton
        ]}
        onPress={() => navigation.navigate(routeName)}
      >
        {({ pressed }) => (
          <Text style={getTextStyles(pressed, routeName)}>
            {routeName}
          </Text>
        )}
      </Pressable>
    </View>
  )
}

export function FoodHeader (props) {
  return (
    <View style={[headerStyles.headerContainer, styles.localHeader]}>
      <HeaderItem routeName={ROUTE_NAME_RECIPES} />
      <HeaderItem routeName={ROUTE_NAME_INGREDIENTS} />
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
    padding: 6,
    borderRadius: 4
  },
  textDefault: {
    color: 'black'
  },
  textPressOrSelected: {
    color: 'white'
  },
  localHeader: {
    justifyContent: 'center'
  }
})
