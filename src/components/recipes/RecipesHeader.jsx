import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import RecipesHeaderRight from './RecipesHeaderRight'
import RecipesHeaderLeft from './RecipesHeaderLeft'

import { i18n } from '../../utils'

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
      newOptions.headerTitle = i18n.t('RECIPES.RECIPES')
    }
    navigation.setOptions({ ...newOptions })
  }, [isSearchOpen])

  useFocusEffect(
    useCallback(() => {
      if (isSearchOpen) {
        setIsSearchOpen(false)
      } else {
        navigation.setOptions({ headerTitle: i18n.t('RECIPES.RECIPES') })
      }
    }, [])
  )

  return <></>
}
