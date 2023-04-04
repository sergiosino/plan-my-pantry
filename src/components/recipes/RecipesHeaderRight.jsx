import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import IconButton from '../buttons/IconButton'
import { ROUTE_NAME_RECIPES_HELP_VIEW } from '../../constants/routes'
import { useUserConfig } from '../../hooks/useUserConfig'

const GAP = 25

export default function RecipesHeaderRight (props) {
  const { isSearchActive, setIsSearchActive } = props

  const navigation = useNavigation()
  const { showHeaderHelpIcon } = useUserConfig()

  const iconName = isSearchActive
    ? 'close'
    : 'search'

  const handlePress = () => {
    setIsSearchActive(!isSearchActive)
  }

  const handlePressHelp = () => {
    navigation.navigate(ROUTE_NAME_RECIPES_HELP_VIEW)
  }

  return (
    <View style={styles.localHeaderContainer}>
      <View style={styles.headerItem}>
        <IconButton onPress={handlePress} iconName={iconName} />
      </View>
      {!isSearchActive && showHeaderHelpIcon && (
        <View style={styles.headerItem}>
          <IconButton onPress={handlePressHelp} iconName='help-outline' />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: GAP,
    margin: -(GAP / 2),
    justifyContent: 'flex-end'
  },
  headerItem: {
    margin: (GAP / 2)
  }
})
