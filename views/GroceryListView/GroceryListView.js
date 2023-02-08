import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AddButton from '../../components/AddButton'
import GroceryItem from './GroceryItem'

const GROCERY_ITEM = { checked: false, text: '' }
const GROCERY_ITEM_HEIGHT = 44
const GROCERY_LIST = [{ id: 1, text: 'hola', checked: true }]
const STORAGE_KEY_GROCERY_LIST = 'grocery-list'

export default function GroceryListView () {
  const [groceryItems, setGroceryItems] = useState(GROCERY_LIST)

  const itemIndexToFocus = useRef(null)
  const refFlatList = useRef(null)

  const updateGroceryList = async (newGroceryList) => {
    console.log('updateGroceryList', newGroceryList)
    const jsonValue = JSON.stringify(newGroceryList)
    AsyncStorage.setItem(STORAGE_KEY_GROCERY_LIST, jsonValue)
    setGroceryItems(newGroceryList)
  }

  const handleAddItem = () => {
    const newGroceryItem = { id: uuid.v4(), ...GROCERY_ITEM }
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
    const groceryItemsCopy = groceryItems.map(groceryItem =>
      groceryItem.id === id ? { id, checked, text } : groceryItem)
    const jsonValue = JSON.stringify(groceryItemsCopy)
    AsyncStorage.setItem(STORAGE_KEY_GROCERY_LIST, jsonValue)
  }

  const getStorageGroceryList = async () => {
    let storageGroceryList = await AsyncStorage.getItem(STORAGE_KEY_GROCERY_LIST)
    storageGroceryList = storageGroceryList != null ? JSON.parse(storageGroceryList) : null
    console.log(storageGroceryList)
    if (storageGroceryList) { setGroceryItems(storageGroceryList) }
  }

  useEffect(() => {
    getStorageGroceryList()
  }, [])

  useEffect(() => {
    const isLastItemAdded = itemIndexToFocus.current === groceryItems.length - 1
    if (isLastItemAdded) {
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
