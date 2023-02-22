import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import AddButton from '../../components/AddButton'
import GroceryItem from './GroceryItem'
import { GROCERY_ITEM_HEIGHT } from '../../constants/constants'
import { useGroceryItems } from '../../hooks/useGroceryList'
import GroceryListHeader from './GroceryListHeader'

export default function GroceryListView () {
  const itemIndexToFocus = useRef(null)
  const refFlatList = useRef(null)
  const {
    groceryList,
    handleAddItem,
    handleDeleteItem,
    handleDeleteChecked,
    handleCheckAll,
    handleUnCheckAll,
    handleItemChange
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
      <GroceryListHeader
        onDeleteChecked={handleDeleteChecked}
        onCheckAll={handleCheckAll}
        onUnCheckAll={handleUnCheckAll}
      />
      <FlatList
        ref={refFlatList}
        contentContainerStyle={styles.flatListContent}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps='handled'
        getItemLayout={(_, index) => ({ length: GROCERY_ITEM_HEIGHT, offset: GROCERY_ITEM_HEIGHT * index, index })}
        data={groceryList}
        renderItem={({ item, index }) => {
          const { id, checked, text } = item
          const isItemToFocus = itemIndexToFocus.current === index
          return (
            <GroceryItem
              id={id}
              defaultChecked={checked}
              defaultText={text}
              isItemToFocus={isItemToFocus}
              onDeleteItem={handleDeleteItem}
              onItemChange={handleItemChange}
            />
          )
        }}
      />
      <AddButton onAddItem={handleAddItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContent: {
    paddingHorizontal: 20
  }
})
