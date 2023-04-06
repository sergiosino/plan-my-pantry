import { useCallback, useEffect, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import AddButton from '../components/buttons/AddButton'
import { GroceryItem, GroceryListHeaderRight } from '../components/groceryList'

import { useGroceryList } from '../hooks'

export default function GroceryListView () {
  const navigation = useNavigation()
  const {
    groceryList,
    getGroceryList,
    handleAddEmptyItem
  } = useGroceryList()
  const _itemIdToFocus = useRef(null)

  const handleAdd = () => {
    const newGroceryItemId = handleAddEmptyItem()
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
        <GroceryListHeaderRight itemIdToFocus={_itemIdToFocus} />
      )
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
      getGroceryList()
    }, [])
  )

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.view}>
          {groceryList.map(renderItem)}
        </View>
      </ScrollView>
      <AddButton onAddItem={handleAdd} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    paddingHorizontal: 15
  },
  view: {
    marginBottom: 70
  }
})
