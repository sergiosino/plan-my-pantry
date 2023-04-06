import { useState } from 'react'

import { useGroceryList } from './useGroceryList'

export function useGroceryItem (props) {
  const {
    id,
    defaultText,
    defaultChecked
  } = props

  const {
    handleItemChange,
    handleDeleteItem
  } = useGroceryList()
  const [text, setText] = useState(defaultText)
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)

  const handleTextFocus = () => {
    setShowDeleteIcon(true)
  }

  const handleTextFocusEnd = () => {
    setShowDeleteIcon(false)
    const groceryItem = { id, defaultChecked, text }
    handleItemChange(groceryItem)
  }

  const handleCheckboxChange = (checked) => {
    const groceryItem = { id, checked, text }
    handleItemChange(groceryItem)
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
