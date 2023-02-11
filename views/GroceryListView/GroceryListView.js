import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AddButton from '../../components/AddButton'
import GroceryItem from './GroceryItem'
import { ASYNC_STORAGE_KEYS, GROCERY_ITEM_HEIGHT } from '../../constants/constants'

export default function GroceryListView () {
  const [groceryItems, setGroceryItems] = useState([])

  const itemIndexToFocus = useRef(null)
  const refFlatList = useRef(null)

  const updateGroceryList = async (newGroceryList) => {
    const jsonValue = JSON.stringify(newGroceryList)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.GROCERY_LIST, jsonValue)
    setGroceryItems(newGroceryList)
  }

  const handleAddItem = () => {
    const newGroceryItem = { id: uuid.v4(), checked: false, text: '' }
    const groceryItemsCopy = [...groceryItems]
    groceryItemsCopy.push(newGroceryItem)
    itemIndexToFocus.current = groceryItemsCopy.length - 1
    updateGroceryList(groceryItemsCopy)
  }

  const handleDeleteItem = (id) => {
    const groceryItemsCopy = groceryItems.filter(groceryItem => groceryItem.id !== id)
    updateGroceryList(groceryItemsCopy)
  }

  const onItemChange = (id, checked, text) => {
    const itemIndex = groceryItems.findIndex(groceryItem => groceryItem.id === id)
    const item = groceryItems[itemIndex]

    if (item.checked !== checked || item.text !== text) {
      const groceryItemsCopy = [...groceryItems]
      groceryItemsCopy[itemIndex] = { id, checked, text }
      updateGroceryList(groceryItemsCopy)
    }
  }

  const getStorageGroceryList = async () => {
    let storageGroceryList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.GROCERY_LIST)
    storageGroceryList = storageGroceryList != null ? JSON.parse(storageGroceryList) : null
    if (storageGroceryList) { setGroceryItems(storageGroceryList) }
  }

  useEffect(() => {
    getStorageGroceryList()
  }, [])

  // When a new item is added it scrolls to its location
  useEffect(() => {
    const isLastItemAdded = itemIndexToFocus.current === groceryItems.length - 1
    if (isLastItemAdded) {
      console.log('isLastItemAdded!')
      refFlatList.current.scrollToIndex({
        index: groceryItems.length - 1,
        animated: true
      })
    }
  }, [groceryItems])

  return (
    <View style={styles.container}>
      <FlatList
        ref={refFlatList}
        contentContainerStyle={styles.scrollViewContent}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps='handled'
        getItemLayout={(_, index) => ({ length: GROCERY_ITEM_HEIGHT, offset: GROCERY_ITEM_HEIGHT * index, index })}
        data={groceryItems}
        renderItem={({ item, index }) => {
          const { id, checked, text } = item
          const isItemToFocus = itemIndexToFocus.current === index
          return (
            <GroceryItem
              defaultChecked={checked}
              defaultText={text}
              isItemToFocus={isItemToFocus}
              handleDeleteItem={() => handleDeleteItem(id)}
              onItemChange={(checked, text) => onItemChange(id, checked, text)}
            />
          )
        }}
      />
      <AddButton handleAddItem={handleAddItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollViewContent: {
    padding: 20
  }
})
