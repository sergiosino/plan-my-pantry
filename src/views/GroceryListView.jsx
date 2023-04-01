import { useEffect, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import AddButton from '../components/AddButton'
import GroceryListHeader from '../components/groceryList/GroceryListHeader'
import GroceryItem from '../components/groceryList/GroceryItem'
import { useGroceryList } from '../hooks/useGroceryList'

export default function GroceryListView () {
  const navigation = useNavigation()
  const {
    groceryList,
    handleAddItem
  } = useGroceryList()
  const _itemIdToFocus = useRef(null)

  const handleAdd = () => {
    const newGroceryItemId = handleAddItem()
    _itemIdToFocus.current = newGroceryItemId
  }

  const renderItem = (item) => {
    const { id, checked, text } = item
    const isItemToFocus = _itemIdToFocus.current === id
    return (
      <GroceryItem
        key={id}
        id={id}
        defaultChecked={checked}
        defaultText={text}
        isItemToFocus={isItemToFocus}
      />
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <GroceryListHeader itemIdToFocus={_itemIdToFocus} />
      )
    })
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.flatListContent}>
        {groceryList.map(renderItem)}
      </ScrollView>
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
