import React, { useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import AddButton from '../components/AddButton'
import GroceryListHeader from '../components/groceryList/GroceryListHeader'
import GroceryItem from '../components/groceryList/GroceryItem'
import { GROCERY_ITEM_HEIGHT } from '../constants/constants'
import { useGroceryItems } from '../hooks/useGroceryList'

export default function GroceryListView () {
  const itemIdToFocus = useRef(null)
  const refFlatList = useRef(null)
  const {
    groceryList,
    handleAddItem,
    handleDeleteItem,
    handleDeleteChecked,
    handleCheckAll,
    handleUnCheckAll,
    handleItemChange
  } = useGroceryItems()

  const handleAdd = () => {
    const newGroceryItemId = handleAddItem()
    itemIdToFocus.current = newGroceryItemId
  }

  const handleUnCheckAllItems = () => {
    handleUnCheckAll()
    itemIdToFocus.current = null
  }

  return (
    <View style={styles.container}>
      <GroceryListHeader
        onDeleteChecked={handleDeleteChecked}
        onCheckAll={handleCheckAll}
        onUnCheckAll={handleUnCheckAllItems}
      />
      <FlatList
        ref={refFlatList}
        contentContainerStyle={styles.flatListContent}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps='handled'
        getItemLayout={(_, index) => ({ length: GROCERY_ITEM_HEIGHT, offset: GROCERY_ITEM_HEIGHT * index, index })}
        initialNumToRender={20}
        data={groceryList}
        renderItem={({ item }) => {
          const { id, checked, text } = item
          const isItemToFocus = itemIdToFocus.current === id
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
      <AddButton onAddItem={handleAdd} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContent: {
    marginHorizontal: 20,
    paddingBottom: 70
  }
})
