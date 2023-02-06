import React, { useRef, useState } from 'react'
import { View, TextInput, TouchableNativeFeedback, ScrollView } from 'react-native'
import Checkbox from 'expo-checkbox'
import Ionicons from '@expo/vector-icons/Ionicons'
import uuid from 'react-native-uuid'

const GROCERY_ITEM = { checked: false, text: '' }

function NewGroceryItem (props) {
  const { handleAddItem } = props

  const handleAddPress = () => {
    handleAddItem()
  }

  return (
    <TouchableNativeFeedback
      onPress={handleAddPress}
      background={TouchableNativeFeedback.Ripple('gray', false, 30)}
    >
      <View style={{ borderRadius: 30, width: 60, height: 60, position: 'absolute', bottom: 10, right: 10, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name='add' size={30} />
      </View>
    </TouchableNativeFeedback>
  )
}

function GroceryItem (props) {
  const { id, defaultChecked, defaultText, handleDeleteItem, refLastItemId } = props

  const [isChecked, setIsChecked] = useState(defaultChecked)
  const [text, setText] = useState(defaultText)
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)

  const isLastItemAdded = refLastItemId.current === id

  const handleTextFocus = () => {
    setShowDeleteIcon(true)
  }

  const handleTextFocusEnd = () => {
    setShowDeleteIcon(false)
  }

  const handleDeletePress = () => {
    handleDeleteItem(id)
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
      <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? 'gray' : undefined}
        style={{ marginRight: 16 }}
      />
      <TextInput
        autoFocus={isLastItemAdded}
        style={{ flex: 1 }}
        value={text}
        onChangeText={setText}
        onFocus={handleTextFocus}
        onEndEditing={handleTextFocusEnd}
      />
      {showDeleteIcon && (
        <TouchableNativeFeedback
          onPress={handleDeletePress}
          background={TouchableNativeFeedback.Ripple('gray', true)}
        >
          <View style={{ height: 25, width: 25 }}>
            <Ionicons name='close' size={25} />
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  )
}

export default function GroceryListView () {
  const [groceryItems, setGroceryItems] = useState([{ id: 1, text: 'hola', checked: true }])

  const refLastItemId = useRef(null)

  const handleAddItem = () => {
    const groceryItemsCopy = [...groceryItems]
    const itemId = uuid.v4()
    const newGroceryItem = { id: itemId, ...GROCERY_ITEM }
    refLastItemId.current = itemId
    groceryItemsCopy.push(newGroceryItem)
    setGroceryItems(groceryItemsCopy)
  }

  const handleDeleteItem = (id) => {
    const groceryItemsCopy = groceryItems.filter(groceryItem => groceryItem.id !== id)
    setGroceryItems(groceryItemsCopy)
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ alignItems: 'flex-start', padding: 20 }}
        keyboardShouldPersistTaps='handled'
      >
        {groceryItems.map((groceryItem) => {
          const { id, checked, text } = groceryItem
          return <GroceryItem key={id} id={id} defaultChecked={checked} defaultText={text} handleDeleteItem={handleDeleteItem} refLastItemId={refLastItemId} />
        })}
      </ScrollView>
      <NewGroceryItem handleAddItem={handleAddItem} />
    </View>
  )
}
