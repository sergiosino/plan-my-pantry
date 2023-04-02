import { StyleSheet, View } from 'react-native'

import IconButton from '../buttons/IconButton'

const GAP = 25

export default function RecipesHeaderRight (props) {
  const { isSearchActive, setIsSearchActive } = props

  const iconName = isSearchActive
    ? 'close'
    : 'search'

  const handlePress = () => {
    setIsSearchActive(!isSearchActive)
  }

  return (
    <View style={styles.localHeaderContainer}>
      <View style={styles.headerItem}>
        <IconButton onPress={handlePress} iconName={iconName} />
      </View>
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
