import { useState } from 'react'
import { useIngredients } from './useIngredients'

export function useIngredient (props) {
  const {
    id,
    defaultText,
    selectOnPress
  } = props

  const {
    selectedIngredientsList,
    handleUnselectIngredient,
    handleSelectIngredient,
    handleDeleteIngredient,
    handleIngredientChange
  } = useIngredients()
  const [text, setText] = useState(defaultText)
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)

  const isSelected = !!selectedIngredientsList.find(x => x === id)

  const handleOnPress = () => {
    if (isSelected) {
      handleUnselectIngredient(id)
    } else if (selectOnPress) {
      handleSelectIngredient(id)
    }
  }

  const handleOnLongPress = () => {
    if (!isSelected) {
      handleSelectIngredient(id)
    }
  }

  const handleTextFocus = () => {
    setShowDeleteIcon(true)
  }

  const handleTextFocusEnd = () => {
    setShowDeleteIcon(false)
    handleIngredientChange(id, text)
  }

  const handleDeletePress = () => {
    handleDeleteIngredient(id)
  }

  return {
    text,
    setText,
    showDeleteIcon,
    handleOnPress,
    handleOnLongPress,
    handleTextFocus,
    handleTextFocusEnd,
    handleDeletePress,
    isSelected
  }
}
