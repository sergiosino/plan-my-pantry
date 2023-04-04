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
    const groceryListCopy = [newGroceryItem, ...groceryList]
    setGroceryList(groceryListCopy)

    return newGroceryItemId
  }

  const handleDeleteChecked = () => {
    const groceryListCopy = groceryList.filter(groceryItem => !groceryItem.checked)
    setGroceryList(groceryListCopy)
  }

  const handleUnCheckAll = () => {
    const groceryListUnChecked = groceryList.map(groceryItem => { return { ...groceryItem, checked: false } })
    setGroceryList(groceryListUnChecked)
  }

  const handleCheckAll = () => {
    const groceryListChecked = groceryList.map(groceryItem => { return { ...groceryItem, checked: true } })
    setGroceryList(groceryListChecked)
  }

  const handleDeleteItem = (id) => {
    const groceryListCopy = groceryList.filter(groceryItem => groceryItem.id !== id)
    setGroceryList(groceryListCopy)
  }

  const handleItemChange = (id, checked, text) => {
    const itemIndex = groceryList.findIndex(groceryItem => groceryItem.id === id)
    const item = groceryList[itemIndex]

    if (item.checked !== checked || item.text !== text) {
      const groceryListCopy = [...groceryList]
      groceryListCopy[itemIndex] = { id, checked, text }
      setGroceryList(groceryListCopy)
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
