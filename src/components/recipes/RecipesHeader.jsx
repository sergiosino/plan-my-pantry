import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import RecipesHeaderRight from './RecipesHeaderRight'
import RecipesHeaderLeft from './RecipesHeaderLeft'

import { RECIPES } from '../../constants/texts/texts'

export default function RecipesHeader (props) {
  const { handleSearchRecipes } = props

  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    const newOptions = {}
    newOptions.headerRight = () => (
      <RecipesHeaderRight
        handleSearchRecipes={handleSearchRecipes}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
    )
    if (isSearchOpen) {
      newOptions.headerLeft = () => (
        <RecipesHeaderLeft handleSearchRecipes={handleSearchRecipes} />
      )
      newOptions.headerTitle = ''
    }
    if (!isSearchOpen) {
      newOptions.headerLeft = null
      newOptions.headerTitle = RECIPES
    }
    navigation.setOptions({ ...newOptions })
  }, [isSearchOpen])

  useFocusEffect(
    useCallback(() => {
      isSearchOpen && setIsSearchOpen(false)
    }, [])
  )

  return <></>
}
