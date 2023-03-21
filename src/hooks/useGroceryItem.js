import { useState } from 'react'
import { useGroceryItems } from './useGroceryList'

export function useGroceryItem (props) {
  const {
    id,
    defaultText,
    defaultChecked
  } = props

  const {
    handleItemChange,
    handleDeleteItem
  } = useGroceryItems()
  const [text, setText] = useState(defaultText)
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)

  const handleTextFocus = () => {
    setShowDeleteIcon(true)
  }

  const handleTextFocusEnd = () => {
    setShowDeleteIcon(false)
    handleItemChange(id, defaultChecked, text)
  }

  const handleCheckboxChange = (checked) => {
    handleItemChange(id, checked, text)
  }

  const handleDelete = () => {
    handleDeleteItem(id)
  }

  return {
    text,
    setText,
    showDeleteIcon,
    handleTextFocus,
    handleTextFocusEnd,
    handleCheckboxChange,
    handleDelete
  }
}
