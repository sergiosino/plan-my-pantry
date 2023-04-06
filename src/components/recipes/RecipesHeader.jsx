import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import RecipesHeaderRight from './RecipesHeaderRight'
import RecipesHeaderLeft from './RecipesHeaderLeft'

import { ROUTE_NAME_RECIPES_VIEW } from '../../constants/routes'

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
      newOptions.headerTitle = ROUTE_NAME_RECIPES_VIEW
    }
    navigation.setOptions({ ...newOptions })
  }, [isSearchOpen])

  return <></>
}
