import { StyleSheet, Text, TextInput, View } from 'react-native'

import Checkbox from '../forms/Checkbox'
import IconButton from '../buttons/IconButton'

import { useGroceryList } from '../../hooks/useGroceryList'
import { useState } from 'react'

export default function GroceryItem (props) {
  const {
    id,
    defaultChecked,
    defaultText,
    isItemToFocus
  } = props

  const {
    handleUpdateGroceryItem,
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
    handleUpdateGroceryItem(groceryItem)
  }

  const handleCheckboxChange = (checked) => {
    const groceryItem = { id, checked, text }
    handleUpdateGroceryItem(groceryItem)
  }

  const handleDelete = () => {
    handleDeleteItem(id)
  }

  return (
    <View style={styles.container}>
      <Checkbox
        checked={defaultChecked}
        onChange={handleCheckboxChange}
        style={styles.checkbox}
      />
      {defaultChecked
        ? (
          <Text style={styles.text}>
            {text}
          </Text>
          )
        : (
          <TextInput
            autoFocus={isItemToFocus}
            style={styles.textInput}
            value={text}
            maxLength={40}
            onChangeText={setText}
            onFocus={handleTextFocus}
            onEndEditing={handleTextFocusEnd}
          />
          )}
      {showDeleteIcon && !defaultChecked && <IconButton onPress={handleDelete} iconName='close' />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  checkbox: {
    marginRight: 15
  },
  text: {
    flex: 1,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginVertical: 4.1
  },
  textInput: {
    flex: 1
  }
})
