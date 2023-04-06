import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import IconButton from '../buttons/IconButton'
import { ROUTE_NAME_RECIPES_HELP_VIEW } from '../../constants/routes'
import { useUserConfig } from '../../hooks/useUserConfig'

const GAP = 25

export default function RecipesHeaderRight (props) {
  const { handleSearchRecipes, isSearchOpen, setIsSearchOpen } = props

  const navigation = useNavigation()
  const { showHeaderHelpIcon } = useUserConfig()

  const handleSarchOpen = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleSearchClose = () => {
    setIsSearchOpen(!isSearchOpen)
    handleSearchRecipes('')
  }

  const handlePressHelp = () => {
    navigation.navigate(ROUTE_NAME_RECIPES_HELP_VIEW)
  }

  return (
    <View style={styles.localHeaderContainer}>
      <View style={styles.headerItem}>
        {isSearchOpen
          ? <IconButton onPress={handleSearchClose} iconName='close' />
          : <IconButton onPress={handleSarchOpen} iconName='search' />}
      </View>
      {!isSearchOpen && showHeaderHelpIcon && (
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
