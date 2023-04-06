import { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import TextInputStyled from '../forms/TextInputStyled'

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
    height: '100%',
    marginLeft: 15,
    width: (windowDimensions.width - 95),
    justifyContent: 'center',
    backgroundColor: 'blue'
  }
})
