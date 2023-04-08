import { useState } from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'

import TextInputStyled from '../forms/TextInputStyled'
import IconButton from '../buttons/IconButton'

import { i18n } from '../../utils'

export default function DayMenuRecipesSearch (props) {
  const { handleSearchRecipes } = props

  const [search, setSearch] = useState('')

  const handleSearch = (value) => {
    setSearch(value)
    handleSearchRecipes(value)
  }

  const handleSearchClose = () => {
    setSearch('')
    handleSearchRecipes('')
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <TextInputStyled
        style={styles.textInput}
        value={search}
        onChangeText={handleSearch}
        placeholder={i18n.t('COMMON.SEARCH_RECIPES')}
      />
      {search && <IconButton onPress={handleSearchClose} iconName='close' />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13
  },
  textInput: {
    flex: 1,
    marginRight: 10
  }
})
