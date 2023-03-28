import React, { useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import AddButton from '../components/AddButton'
import GroceryListHeader from '../components/groceryList/GroceryListHeader'
import GroceryItem from '../components/groceryList/GroceryItem'
import { GROCERY_ITEM_HEIGHT } from '../constants/constants'
import { useGroceryItems } from '../hooks/useGroceryList'

export default function GroceryListView () {
  const itemIdToFocus = useRef(null)
  const {
    groceryListItems,
    handleAddItem
  } = useGroceryItems()

  const handleAdd = () => {
    const newGroceryItemId = handleAddItem()
    itemIdToFocus.current = newGroceryItemId
  }

  const getItemLayout = (_, index) => ({ length: GROCERY_ITEM_HEIGHT, offset: GROCERY_ITEM_HEIGHT * index, index })

  const renderItem = (item, idToFocus) => {
    const { id, checked, text } = item
    const isItemToFocus = idToFocus === id
    return (
      <GroceryItem
        id={id}
        defaultChecked={checked}
        defaultText={text}
        isItemToFocus={isItemToFocus}
      />
    )
  }

  return (
    <View style={styles.container}>
      <GroceryListHeader itemIdToFocus={itemIdToFocus} />
      <FlatList
        contentContainerStyle={styles.flatListContent}
        removeClippedSubviews={false}
        getItemLayout={getItemLayout}
        initialNumToRender={20}
        maxToRenderPerBatch={40}
        data={groceryListItems}
        renderItem={({ item }) => renderItem(item, itemIdToFocus.current)}
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
