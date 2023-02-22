import { useState } from 'react'

export function useGroceryItem (props) {
  const {
    id,
    defaultText,
    defaultChecked,
    onItemChange,
    onDeleteItem
  } = props

  const [text, setText] = useState(defaultText)
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)

  const handleTextFocus = () => {
    setShowDeleteIcon(true)
  }

  const handleTextFocusEnd = () => {
    setShowDeleteIcon(false)
    onItemChange(id, defaultChecked, text)
  }

  const handleCheckboxChange = (checked) => {
    onItemChange(id, checked, text)
  }

  const handleDelete = () => {
    onDeleteItem(id)
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
