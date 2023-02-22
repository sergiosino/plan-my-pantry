import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRef, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'
import uuid from 'react-native-uuid'

import AddButton from '../../components/AddButton'
import { ASYNC_STORAGE_KEYS } from '../../constants/constants'
import IngredientItem from './IngredientItem'
import IngredientsHeader from './IngredientsHeader'

const INGREDIENTS_MOCK = [
  {
    id: uuid.v4(),
    text: 'Ingrediente 1Ingrediente 1Ingrediente 1 asdas asd'
  },
  {
    id: uuid.v4(),
    text: 'Ingrediente 2'
  }
]

export default function IngredientsList () {
  const [selectedList, setSelectedList] = useState([])
  const [ingredientsList, setIngredientsList] = useState(INGREDIENTS_MOCK)

  const itemIndexToFocus = useRef(null)
  const refFlatList = useRef(null)

  const confirmationAlert = (title, message, onOK) => {
    Alert.alert(title, message, [
      { text: 'Cancel' },
      { text: 'OK', onPress: onOK }
    ])
  }

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
    const ingredientIndex = ingredientsList.findIndex(ingredient => ingredient.id === id)

    if (ingredientIndex >= 0) {
      let newSelectedList = [...selectedList]
      newSelectedList = newSelectedList.splice(ingredientIndex, 1)
      setSelectedList(newSelectedList)
    }
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

  }

  const isSelectedListEmpty = selectedList.length === 0
  console.log(isSelectedListEmpty)

  return (
    <View style={{ flex: 1 }}>
      <IngredientsHeader handleDeleteChecked={handleDeleteSelectedIngredients} enableDeleteAll={!isSelectedListEmpty} />
      <FlatList
        ref={refFlatList}
        contentContainerStyle={{ marginLeft: 10, marginRight: 10 }}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps='handled'
        data={ingredientsList}
        renderItem={({ item: ingredient }) => {
          const { id, text } = ingredient
          const isSelected = !!selectedList.find(x => x === id)
          return (
            <IngredientItem
              id={id}
              handleSelect={handleSelectIngredient}
              handleUnselect={handleUnselectIngredient}
              isSelected={isSelected}
              selectOnPress={!isSelectedListEmpty}
              defaultText={text}
              handleChange={handleIngredientChange}
              handleDelete={confirmationDeleteItem}
            />
          )
        }}
      />
      <AddButton handleAddItem={handleAddIngredient} />

    </View>
  )
}
