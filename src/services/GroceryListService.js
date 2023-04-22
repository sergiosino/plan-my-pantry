import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { STORAGE_KEYS } from '../constants/constants'

const { GROCERY_LIST } = STORAGE_KEYS

/**
 * Updates the grocery list saved in async storage
 * @param {object[]} newGroceryList
 */
function updateGroceryList (newGroceryList) {
  const jsonValue = JSON.stringify(newGroceryList)
  AsyncStorage.setItem(STORAGE_KEYS.GROCERY_LIST, jsonValue)
}

/**
 * Returns the grocery list saved in the async storage.
 * If there is no info in the async storage, will return an empty array.
 * @returns {object[]}
 */
export async function getGroceryList () {
  const storageGroceryList = await AsyncStorage.getItem(GROCERY_LIST)
  return storageGroceryList
    ? JSON.parse(storageGroceryList)
    : []
}

/**
 * Add a new grocery item to the grocery list.
 * Returns the grocery list with the new item.
 * @param {object} newItem
 * @returns {object[]}
 */
export async function pushGroceryItem (newItem) {
  const groceryList = await getGroceryList()
  newItem.id = uuid.v4()
  const newGroceryList = [newItem, ...groceryList]
  updateGroceryList(newGroceryList)
  return newGroceryList
}

/**
 * Push an array of items to the grocery list.
 * If any of the ingredients already exists and it is unchecked, it will not be added.
 * Returns the grocery list with the new items added.
 * @param {object[]} newItems
 * @returns {object[]}
 */
export async function pushGroceryItems (newItems) {
  const groceryList = await getGroceryList()
  const actualUncheckedItems = groceryList.filter(groceryItem => !groceryItem.checked).map(groceryItem => groceryItem.text)
  const uniqueNewItems = newItems.filter(newItem => !actualUncheckedItems.includes(newItem))
  const newGroceryItems = uniqueNewItems.map(newItem => ({ id: uuid.v4(), checked: false, text: newItem }))
  const newGroceryList = [...newGroceryItems, ...groceryList]
  updateGroceryList(newGroceryList)
  return newGroceryList
}

/**
 * Updates a item of the grocery list.
 * If the existing object and the received one are equal, will do anything.
 * Returns the new array or the last one depending on if it has been updated.
 * @param {number} id
 * @param {object} groceryItem
 * @returns {object[]}
 */
export async function putGroceryItem (id, groceryItem) {
  const groceryList = await getGroceryList()
  const { checked, text } = groceryItem
  const itemIndex = groceryList.findIndex(item => item.id === id)
  const item = groceryList[itemIndex]
  if (item.checked !== checked || item.text !== text) {
    const newGroceryList = [...groceryList]
    newGroceryList[itemIndex] = groceryItem
    updateGroceryList(newGroceryList)
    return newGroceryList
  }
  return groceryList
}

/**
 * Deletes an item from the grocery list and returns the new grocery list
 * @param {number} itemId
 * @returns {object[]}
 */
export async function deleteGroceryItem (itemId) {
  const groceryList = await getGroceryList()
  const newGroceryList = groceryList.filter(groceryItem => groceryItem.id !== itemId)
  updateGroceryList(newGroceryList)
  return newGroceryList
}

/**
 * Deletes all the checked items from the grocery list and returns the new list
 * @returns {object[]}
 */
export async function deleteCheckedGroceryItems () {
  const groceryList = await getGroceryList()
  const newGroceryList = groceryList.filter(groceryItem => !groceryItem.checked)
  updateGroceryList(newGroceryList)
  return newGroceryList
}

/**
 * Checks all grocery list items and return the updated list
 * @returns {object[]}
 */
export async function checkAllGroceryItems () {
  const groceryList = await getGroceryList()
  const newGroceryList = groceryList.map(groceryItem => { return { ...groceryItem, checked: true } })
  updateGroceryList(newGroceryList)
  return newGroceryList
}

/**
 * Unchecks all grocery list items and return the updated list
 * @returns {object[]}
 */
export async function uncheckAllGroceryItems () {
  const groceryList = await getGroceryList()
  const newGroceryList = groceryList.map(groceryItem => { return { ...groceryItem, checked: false } })
  updateGroceryList(newGroceryList)
  return newGroceryList
}
