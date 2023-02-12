import { useState } from 'react'

export function useGroceryItem ({ defaultText, defaultChecked, onItemChange }) {
  const [text, setText] = useState(defaultText)
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)

  const handleTextFocus = () => {
    setShowDeleteIcon(true)
  }

  const handleTextFocusEnd = () => {
    setShowDeleteIcon(false)
    onItemChange(defaultChecked, text)
  }

  const handleCheckboxChange = (checked) => {
    onItemChange(checked, text)
  }

  return {
    text,
    setText,
    showDeleteIcon,
    handleTextFocus,
    handleTextFocusEnd,
    handleCheckboxChange
  }
}
