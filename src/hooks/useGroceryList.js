import { useContext } from 'react'
import uuid from 'react-native-uuid'

import { GroceryListContext } from '../contexts/GroceryListContext'

export function useGroceryItems () {
  const { groceryListItems, setGroceryItems } = useContext(GroceryListContext)

  const handleAddItems = (newItems) => {
    const actualItems = groceryListItems.map(groceryItem => groceryItem.text)
    const uniqueNewItems = newItems.filter(newItem => !actualItems.includes(newItem))
    const newGroceryItems = uniqueNewItems.map(newItem => ({ id: uuid.v4(), checked: false, text: newItem }))
    const newGroceryList = [...groceryListItems, ...newGroceryItems]
    setGroceryItems(newGroceryList)
  }

  const handleAddItem = () => {
    const newGroceryItemId = uuid.v4()
    const newGroceryItem = { id: newGroceryItemId, checked: false, text: '' }
    const groceryItemsCopy = [newGroceryItem, ...groceryListItems]
    setGroceryItems(groceryItemsCopy)

    return newGroceryItemId
  }

  const handleDeleteChecked = () => {
    const groceryItemsCopy = groceryListItems.filter(groceryItem => !groceryItem.checked)
    setGroceryItems(groceryItemsCopy)
  }

  const handleUnCheckAll = () => {
    const groceryItemsUnChecked = groceryListItems.map(groceryItem => { return { ...groceryItem, checked: false } })
    setGroceryItems(groceryItemsUnChecked)
  }

  const handleCheckAll = () => {
    const groceryItemsChecked = groceryListItems.map(groceryItem => { return { ...groceryItem, checked: true } })
    setGroceryItems(groceryItemsChecked)
  }

  const handleDeleteItem = (id) => {
    const groceryItemsCopy = groceryListItems.filter(groceryItem => groceryItem.id !== id)
    setGroceryItems(groceryItemsCopy)
  }

  const handleItemChange = (id, checked, text) => {
    const itemIndex = groceryListItems.findIndex(groceryItem => groceryItem.id === id)
    const item = groceryListItems[itemIndex]

    if (item.checked !== checked || item.text !== text) {
      const groceryItemsCopy = [...groceryListItems]
      groceryItemsCopy[itemIndex] = { id, checked, text }
      setGroceryItems(groceryItemsCopy)
    }
  }

  return {
    groceryListItems,
    handleAddItem,
    handleAddItems,
    handleDeleteItem,
    handleDeleteChecked,
    handleCheckAll,
    handleUnCheckAll,
    handleItemChange
  }
}
