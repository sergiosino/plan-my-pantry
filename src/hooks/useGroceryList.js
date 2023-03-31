import { useContext } from 'react'
import uuid from 'react-native-uuid'

import { GroceryListContext } from '../contexts/GroceryListContext'

export function useGroceryList () {
  const { groceryList, setGroceryList } = useContext(GroceryListContext)

  const handleAddItems = (newItems) => {
    const actualItems = groceryList.map(groceryItem => groceryItem.text)
    const uniqueNewItems = newItems.filter(newItem => !actualItems.includes(newItem))
    const newGroceryItems = uniqueNewItems.map(newItem => ({ id: uuid.v4(), checked: false, text: newItem }))
    const newGroceryList = [...groceryList, ...newGroceryItems]
    setGroceryList(newGroceryList)
  }

  const handleAddItem = () => {
    const newGroceryItemId = uuid.v4()
    const newGroceryItem = { id: newGroceryItemId, checked: false, text: '' }
    const groceryItemsCopy = [newGroceryItem, ...groceryList]
    setGroceryList(groceryItemsCopy)

    return newGroceryItemId
  }

  const handleDeleteChecked = () => {
    const groceryItemsCopy = groceryList.filter(groceryItem => !groceryItem.checked)
    setGroceryList(groceryItemsCopy)
  }

  const handleUnCheckAll = () => {
    const groceryItemsUnChecked = groceryList.map(groceryItem => { return { ...groceryItem, checked: false } })
    setGroceryList(groceryItemsUnChecked)
  }

  const handleCheckAll = () => {
    const groceryItemsChecked = groceryList.map(groceryItem => { return { ...groceryItem, checked: true } })
    setGroceryList(groceryItemsChecked)
  }

  const handleDeleteItem = (id) => {
    const groceryItemsCopy = groceryList.filter(groceryItem => groceryItem.id !== id)
    setGroceryList(groceryItemsCopy)
  }

  const handleItemChange = (id, checked, text) => {
    const itemIndex = groceryList.findIndex(groceryItem => groceryItem.id === id)
    const item = groceryList[itemIndex]

    if (item.checked !== checked || item.text !== text) {
      const groceryItemsCopy = [...groceryList]
      groceryItemsCopy[itemIndex] = { id, checked, text }
      setGroceryList(groceryItemsCopy)
    }
  }

  return {
    groceryList,
    handleAddItem,
    handleAddItems,
    handleDeleteItem,
    handleDeleteChecked,
    handleCheckAll,
    handleUnCheckAll,
    handleItemChange
  }
}
