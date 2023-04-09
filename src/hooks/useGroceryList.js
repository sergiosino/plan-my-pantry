import { useContext } from 'react'

import { GroceryListContext } from '../contexts/GroceryListContext'

import * as glService from '../services/GroceryListService'

import { NEW_ELEMENT_ID } from '../constants/constants'

/**
 * Hook for updating the grocery list data in the context
 */
export function useGroceryList () {
  const { groceryList, setGroceryList } = useContext(GroceryListContext)

  const getGroceryList = async () => {
    const newGroceryList = await glService.getGroceryList()
    setGroceryList(newGroceryList)
  }

  /**
   * Add a new empty item without saving in the async store.
   * It will be saved after the user adds new info.
   */
  const handleAddEmptyItem = () => {
    const newGroceryItem = { id: NEW_ELEMENT_ID, checked: false, text: '' }
    const newGroceryList = [newGroceryItem, ...groceryList]
    setGroceryList(newGroceryList)
    return newGroceryItem.id
  }

  const handleDeleteChecked = async () => {
    const newGroceryList = await glService.deleteCheckedGroceryItems()
    setGroceryList(newGroceryList)
  }

  const handleUnCheckAll = async () => {
    const newGroceryList = await glService.uncheckAllGroceryItems()
    setGroceryList(newGroceryList)
  }

  const handleCheckAll = async () => {
    const newGroceryList = await glService.checkAllGroceryItems()
    setGroceryList(newGroceryList)
  }

  const handleDeleteItem = async (id) => {
    const newGroceryList = await glService.deleteGroceryItem(id)
    setGroceryList(newGroceryList)
  }

  const handleItemChange = (groceryItem) => {
    groceryItem.id === NEW_ELEMENT_ID
      ? handleAddGroceryItem(groceryItem)
      : handleUpdateGroceryItem(groceryItem)
  }

  const handleAddGroceryItem = async (groceryItem) => {
    const newGroceryList = await glService.pushGroceryItem(groceryItem)
    setGroceryList(newGroceryList)
  }

  const handleUpdateGroceryItem = async (groceryItem) => {
    const newGroceryList = await glService.putGroceryItem(groceryItem.id, groceryItem)
    setGroceryList(newGroceryList)
  }

  return {
    groceryList,
    getGroceryList,
    handleAddEmptyItem,
    handleDeleteItem,
    handleDeleteChecked,
    handleCheckAll,
    handleUnCheckAll,
    handleItemChange
  }
}
