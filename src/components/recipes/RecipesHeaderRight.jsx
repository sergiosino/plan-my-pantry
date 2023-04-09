import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import IconButton from '../buttons/IconButton'

import { useUserConfig } from '../../hooks/useUserConfig'

import { ROUTE_RECIPES_HELP_VIEW } from '../../constants/routes'

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
      {isSearchOpen
        ? <IconButton onPress={handleSearchClose} iconName='close' />
        : <IconButton style={showHeaderHelpIcon && styles.marginRight} onPress={handleSarchOpen} iconName='search' />}
      {!isSearchOpen && showHeaderHelpIcon && (
        <IconButton onPress={handlePressHelp} iconName='help' />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15
  },
  marginRight: {
    marginRight: 20
  }
})
