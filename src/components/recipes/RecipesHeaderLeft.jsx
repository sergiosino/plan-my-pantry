import { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import TextInputStyled from '../forms/TextInputStyled'

const GAP = 25
const windowDimensions = Dimensions.get('window')

export default function RecipesHeaderLeft (props) {
  const { handleSearchRecipes } = props

  const [search, setSearch] = useState('')

  const handleSearch = (value) => {
    setSearch(value)
    handleSearchRecipes(value)
  }

  return (
    <View style={styles.localHeaderContainer}>
      <TextInputStyled value={search} onChangeText={handleSearch} autoFocus />
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    marginLeft: 16,
    width: (windowDimensions.width - 120),
    justifyContent: 'center'
  },
  headerItem: {
    margin: (GAP / 2)
  }
})
