import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import IconButton from '../buttons/IconButton'

import { useUserConfig } from '../../hooks/useUserConfig'

import { ROUTE_RECIPES_HELP_VIEW } from '../../constants/routes'

const GAP = 30

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
    navigation.navigate(ROUTE_RECIPES_HELP_VIEW)
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
    margin: -(GAP),
    justifyContent: 'flex-end'
  },
  headerItem: {
    margin: (GAP / 2)
  }
})
