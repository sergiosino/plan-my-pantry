import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'

const { GROCERY_LIST } = ASYNC_STORAGE_KEYS

function updateGroceryList (newGroceryList) {
  const jsonValue = JSON.stringify(newGroceryList)
  AsyncStorage.setItem(ASYNC_STORAGE_KEYS.GROCERY_LIST, jsonValue)
}

export async function getGroceryList () {
  const storageGroceryList = await AsyncStorage.getItem(GROCERY_LIST)
  return storageGroceryList
    ? JSON.parse(storageGroceryList)
    : []
}

export async function pushGroceryItem (newItem) {
  const groceryList = await getGroceryList()
  newItem.id = uuid.v4()
  const newGroceryList = [newItem, ...groceryList]
  updateGroceryList(newGroceryList)
  return newGroceryList
}

export async function pushGroceryItems (newItems) {
  const groceryList = await getGroceryList()
  const actualItems = groceryList.map(groceryItem => groceryItem.text)
  const uniqueNewItems = newItems.filter(newItem => !actualItems.includes(newItem))
  const newGroceryItems = uniqueNewItems.map(newItem => ({ id: uuid.v4(), checked: false, text: newItem }))
  const newGroceryList = [...newGroceryItems, ...groceryList]
  updateGroceryList(newGroceryList)
  return newGroceryList
}

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

export async function deleteGroceryItem (itemId) {
  const groceryList = await getGroceryList()
  const newGroceryList = groceryList.filter(groceryItem => groceryItem.id !== itemId)
  updateGroceryList(newGroceryList)
  return newGroceryList
}

export async function deleteCheckedGroceryItems () {
  const groceryList = await getGroceryList()
  const newGroceryList = groceryList.filter(groceryItem => !groceryItem.checked)
  updateGroceryList(newGroceryList)
  return newGroceryList
}

export async function checkAllGroceryItems () {
  const groceryList = await getGroceryList()
  const newGroceryList = groceryList.map(groceryItem => { return { ...groceryItem, checked: true } })
  updateGroceryList(newGroceryList)
  return newGroceryList
}

export async function uncheckAllGroceryItems () {
  const groceryList = await getGroceryList()
  const newGroceryList = groceryList.map(groceryItem => { return { ...groceryItem, checked: false } })
  updateGroceryList(newGroceryList)
  return newGroceryList
}
