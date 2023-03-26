import { useEffect, useState } from 'react'
import { Keyboard, View } from 'react-native'

import { confirmationAlert } from '../../utils/confirmationAlert'
import { FOOD_HEADER_RECIPES } from '../../constants/constants'
import { useIngredients } from '../../hooks/useIngredients'
import FoodNormalHeader from './FoodNormalHeader'
import FoodEditingHeader from './FoodEditingHeader'
import FoodSelectedHeader from './FoodSelectedHeader'
import { useRecipes } from '../../hooks/useRecipes'
import { CONFIRMATION_ALERT_DELETE_INGREDIENTS_MESSAGE, CONFIRMATION_ALERT_DELETE_RECIPES_MESSAGE, CONFIRMATION_ALERT_DELETE_TITLE } from '../../constants/texts'

export default function FoodHeader (props) {
  const {
    actualView,
    setActualView
  } = props

  const { selectedIngredientsList, handleDeleteSelectedIngredients, handleUnselectAllIngredients } = useIngredients()
  const { selectedRecipes, handleDeleteSelectedRecipes, handleUnselectAllRecipes } = useRecipes()
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  const isRecipesView = actualView === FOOD_HEADER_RECIPES
  const isSelectedListEmpty = isRecipesView
    ? selectedRecipes.length === 0
    : selectedIngredientsList.length === 0

  const onDeleteSelected = () => {
    isRecipesView
      ? handleDeleteSelectedRecipes()
      : handleDeleteSelectedIngredients()
  }

  const onUnselectAll = () => {
    isRecipesView
      ? handleUnselectAllRecipes()
      : handleUnselectAllIngredients()
  }

  const alertDeleteChecked = () => {
    isRecipesView
      ? confirmationAlert(
        CONFIRMATION_ALERT_DELETE_TITLE,
        CONFIRMATION_ALERT_DELETE_RECIPES_MESSAGE,
        onDeleteSelected
      )
      : confirmationAlert(
        CONFIRMATION_ALERT_DELETE_TITLE,
        CONFIRMATION_ALERT_DELETE_INGREDIENTS_MESSAGE,
        onDeleteSelected
      )
  }

  useEffect(() => {
    const keyboardDidShow = () => setIsKeyboardVisible(true)
    const keyboardDidHide = () => setIsKeyboardVisible(false)

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return (
    <View>
      {isSelectedListEmpty && !isKeyboardVisible &&
        <FoodNormalHeader actualView={actualView} setActualView={setActualView} />}
      {isSelectedListEmpty && isKeyboardVisible &&
        <FoodEditingHeader />}
      {!isSelectedListEmpty &&
        <FoodSelectedHeader onUnselectAll={onUnselectAll} alertDeleteChecked={alertDeleteChecked} />}
    </View>
  )
}
