import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import AddButton from '../../components/AddButton'
import GroceryItem from './GroceryItem'
import { GROCERY_ITEM_HEIGHT } from '../../constants/constants'
import { useGroceryItems } from '../../hooks/useGroceryItems'

export default function GroceryListView () {
  const itemIndexToFocus = useRef(null)
  const refFlatList = useRef(null)
  const {
    groceryList,
    handleAddItem,
    handleDeleteItem,
    onItemChange
  } = useGroceryItems({ itemIndexToFocus })

  // When a new item is added it scrolls to its location
  useEffect(() => {
    const isLastItemAdded = itemIndexToFocus.current === groceryList.length - 1
    if (isLastItemAdded) {
      refFlatList.current.scrollToIndex({
        index: groceryList.length - 1,
        animated: true
      })
    }
  }, [groceryList])

  return (
    <View style={styles.container}>
      <FlatList
        ref={refFlatList}
        contentContainerStyle={styles.scrollViewContent}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps='handled'
        getItemLayout={(_, index) => ({ length: GROCERY_ITEM_HEIGHT, offset: GROCERY_ITEM_HEIGHT * index, index })}
        data={groceryList}
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
