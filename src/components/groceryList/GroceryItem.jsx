import { StyleSheet, Text, TextInput, View } from 'react-native'

import Checkbox from '../forms/Checkbox'
import IconButton from '../buttons/IconButton'

import { useGroceryList } from '../../hooks/useGroceryList'
import { useState } from 'react'

export default function GroceryItem (props) {
  const {
    id,
    number,
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
    const groceryItem = { id, defaultChecked, text, number }
    handleUpdateGroceryItem(groceryItem)
  }

  const handleCheckboxChange = (checked) => {
    const groceryItem = { id, checked, text, number }
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
          <Text style={[styles.flex1, styles.colorGray, styles.lineThrough]} numberOfLines={1}>
            {text}
          </Text>
          )
        : (
          <TextInput
            autoFocus={isItemToFocus}
            style={styles.flex1}
            value={text}
            maxLength={40}
            onChangeText={setText}
            onFocus={handleTextFocus}
            onEndEditing={handleTextFocusEnd}
          />
          )}
      {showDeleteIcon
        ? <IconButton onPress={handleDelete} iconName='close' />
        : number && number > 1 && <Text style={[styles.colorGray, defaultChecked && styles.lineThrough]}>x{number}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45
  },
  checkbox: {
    marginRight: 15
  },
  colorGray: {
    color: 'gray'
  },
  lineThrough: {
    textDecorationLine: 'line-through'
  },
  flex1: {
    flex: 1
  }
})
