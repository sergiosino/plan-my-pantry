import { useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import AddButton from '../components/buttons/AddButton'
import { GroceryItem, GroceryListHeaderRight } from '../components/groceryList'

import { useGroceryList } from '../hooks'

/**
 * Principal view when user enter can add, check, delete... ingredients for the grocery shopping
 */
export default function GroceryListView () {
  const navigation = useNavigation()
  const {
    groceryList,
    getGroceryList,
    handleAddGroceryItem
  } = useGroceryList()

  const renderItem = (item) => {
    const { id, checked, text, focus } = item
    const isItemToFocus = !!focus
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
        <GroceryListHeaderRight />
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
      <AddButton onAddItem={handleAddGroceryItem} />
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
