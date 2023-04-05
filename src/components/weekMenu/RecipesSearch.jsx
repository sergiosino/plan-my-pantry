import { Keyboard, View } from 'react-native'
import TextInputSyled from '../forms/TextInputSyled'
import IconButton from '../buttons/IconButton'
import { useState } from 'react'
import { useRecipes } from '../../hooks'

export default function RecipesSearch () {
  const [search, setSearch] = useState('')

  const { handleSearchRecipes } = useRecipes()

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
      <TextInputSyled
        style={{ flex: 1 }}
        value={search}
        onChangeText={handleSearch}
        placeholder='Search recipes...'
      />
      {search && <IconButton style={{ marginHorizontal: 10 }} onPress={handleSearchClose} iconName='close' />}
    </View>
  )
}
