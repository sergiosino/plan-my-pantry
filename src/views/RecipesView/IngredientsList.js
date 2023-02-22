import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import uuid from 'react-native-uuid'

import AddButton from '../../components/AddButton'
import { ASYNC_STORAGE_KEYS, INGREDIENT_HEIGHT } from '../../constants/constants'
import IngredientItem from './IngredientItem'
import IngredientsHeader from './IngredientsHeader'
import { confirmationAlert } from '../../utils/confirmationAlert'

export default function IngredientsList () {
  const [selectedList, setSelectedList] = useState([])
  const [ingredientsList, setIngredientsList] = useState([])

  const itemIndexToFocus = useRef(null)
  const refFlatList = useRef(null)

  const updateIngredientsList = async (newIngredientsList) => {
    const jsonValue = JSON.stringify(newIngredientsList)
    AsyncStorage.setItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST, jsonValue)
    setIngredientsList(newIngredientsList)
  }

  const handleAddIngredient = () => {
    const newIngredient = { id: uuid.v4(), text: '' }
    const newIngredientsList = [...ingredientsList]
    newIngredientsList.push(newIngredient)
    itemIndexToFocus.current = newIngredientsList.length - 1
    updateIngredientsList(newIngredientsList)
  }

  const handleSelectIngredient = (id) => {
    const newSelectedList = [...selectedList]
    newSelectedList.push(id)
    setSelectedList(newSelectedList)
  }

  const handleUnselectIngredient = (id) => {
    const ingredientIndex = selectedList.findIndex(ingredientId => ingredientId === id)

    if (ingredientIndex >= 0) {
      const newSelectedList = [...selectedList]
      newSelectedList.splice(ingredientIndex, 1)
      setSelectedList(newSelectedList)
    }
  }

  const handleUnselectAllIngredients = () => {
    setSelectedList([])
  }

  const handleIngredientChange = (id, text) => {
    const ingredientIndex = ingredientsList.findIndex(ingredient => ingredient.id === id)
    const ingredient = ingredientsList[ingredientIndex]

    if (ingredient.text !== text) {
      const newIngredientsList = [...ingredientsList]
      newIngredientsList[ingredientIndex] = { id, text }
      updateIngredientsList(newIngredientsList)
    }
  }

  const handleDeleteIngredient = (id) => {
    const newIngredientsList = ingredientsList.filter(ingredient => ingredient.id !== id)
    updateIngredientsList(newIngredientsList)
    handleUnselectIngredient(id)
  }

  const confirmationDeleteItem = (id) => {
    confirmationAlert(
      'Delete',
      'Delete ingredient?',
      () => handleDeleteIngredient(id))
  }

  const handleDeleteSelectedIngredients = () => {
    const newIngredientsList = ingredientsList.filter(ingredient => !selectedList.includes(ingredient.id))
    updateIngredientsList(newIngredientsList)
    setSelectedList([])
  }

  const getStorageIngredientsList = async () => {
    let storageIngredientsList = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.INGREDIENTS_LIST)
    storageIngredientsList = storageIngredientsList != null ? JSON.parse(storageIngredientsList) : null
    if (storageIngredientsList) { setIngredientsList(storageIngredientsList) }
  }

  // When a new item is added it scrolls to its location
  useEffect(() => {
    const isLastItemAdded = itemIndexToFocus.current === ingredientsList.length - 1
    if (isLastItemAdded) {
      refFlatList.current.scrollToIndex({
        index: ingredientsList.length - 1,
        animated: true
      })
    }
  }, [ingredientsList])

  useEffect(() => {
    getStorageIngredientsList()
  }, [])

  const isSelectedListEmpty = selectedList.length === 0

  return (
    <View style={{ flex: 1 }}>
      <IngredientsHeader
        handleDeleteChecked={handleDeleteSelectedIngredients}
        enableDeleteAll={!isSelectedListEmpty}
        handleUnselectAll={handleUnselectAllIngredients}
      />
      <FlatList
        ref={refFlatList}
        contentContainerStyle={{ marginLeft: 10, marginRight: 10 }}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps='handled'
        getItemLayout={(_, index) => ({ length: INGREDIENT_HEIGHT, offset: INGREDIENT_HEIGHT * index, index })}
        data={ingredientsList}
        renderItem={({ item: ingredient, index }) => {
          const { id, text } = ingredient
          const isSelected = !!selectedList.find(x => x === id)
          const isItemToFocus = itemIndexToFocus.current === index
          return (
            <IngredientItem
              id={id}
              handleSelect={handleSelectIngredient}
              handleUnselect={handleUnselectIngredient}
              isItemToFocus={isItemToFocus}
              isSelected={isSelected}
              selectOnPress={!isSelectedListEmpty}
              defaultText={text}
              handleChange={handleIngredientChange}
              handleDelete={confirmationDeleteItem}
            />
          )
        }}
      />
      <AddButton
        handleAddItem={handleAddIngredient}
      />
    </View>
  )
}
