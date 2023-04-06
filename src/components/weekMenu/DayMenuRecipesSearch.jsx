import { useState } from 'react'
import { Keyboard, View } from 'react-native'

import TextInputStyled from '../forms/TextInputStyled'
import IconButton from '../buttons/IconButton'

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
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInputStyled
        style={{ flex: 1 }}
        value={search}
        onChangeText={handleSearch}
        placeholder='Search recipes...'
      />
      {search && <IconButton style={{ marginHorizontal: 10 }} onPress={handleSearchClose} iconName='close' />}
    </View>
  )
}
