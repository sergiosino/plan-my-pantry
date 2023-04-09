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

  /**
   * Add a new empty item.
   * This new item obj has a focus prop setted to true, so the Recipe component
   * will know it has to focus the new item input.
   */
  const handleAddGroceryItem = async () => {
    const newGroceryItem = { id: NEW_ELEMENT_ID, checked: false, text: '', focus: true }
    const newGroceryList = await glService.pushGroceryItem(newGroceryItem)
    setGroceryList(newGroceryList)
  }

  /**
   * Updates the item.
   * Rebuild the item object, so if it hast the focus prop it is removed.
   * @param {object} groceryItem
   */
  const handleUpdateGroceryItem = async (groceryItem) => {
    const { id, checked, text } = groceryItem
    const itemToUpdate = { id, checked, text }
    const newGroceryList = await glService.putGroceryItem(itemToUpdate.id, itemToUpdate)
    setGroceryList(newGroceryList)
  }

  return {
    groceryList,
    getGroceryList,
    handleAddGroceryItem,
    handleUpdateGroceryItem,
    handleDeleteItem,
    handleDeleteChecked,
    handleCheckAll,
    handleUnCheckAll
  }
}
