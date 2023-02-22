import { useState } from 'react'

export function useIngredientItem (props) {
  const {
    id,
    defaultText,
    isSelected,
    onUnselect,
    selectOnPress,
    onSelect,
    onChange,
    onDelete
  } = props

  const [text, setText] = useState(defaultText)
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)

  const handleOnPress = () => {
    if (isSelected) {
      onUnselect(id)
    } else if (selectOnPress) {
      onSelect(id)
    }
  }

  const handleOnLongPress = () => {
    if (!isSelected) {
      onSelect(id)
    }
  }

  const handleTextFocus = () => {
    setShowDeleteIcon(true)
  }

  const handleTextFocusEnd = () => {
    setShowDeleteIcon(false)
    onChange(id, text)
  }

  const handleDeletePress = () => {
    onDelete(id)
  }

  return {
    text,
    setText,
    showDeleteIcon,
    handleOnPress,
    handleOnLongPress,
    handleTextFocus,
    handleTextFocusEnd,
    handleDeletePress
  }
}
