import { useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import uuid from 'react-native-uuid'

import AddButton from '../../components/AddButton'
import IngredientItem from './IngredientItem'

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

  const handleAddIngredient = () => {
    const newIngredient = { id: uuid.v4(), text: '' }
    const newIngredientsList = [...ingredientsList]
    newIngredientsList.push(newIngredient)
    itemIndexToFocus.current = newIngredientsList.length - 1
    setIngredientsList(newIngredientsList)
  }

  const handleSelectIngredient = (id) => {
    const newSelectedList = [...selectedList]
    newSelectedList.push(id)
    setSelectedList(newSelectedList)
  }

  const handleUnselectIngredient = (id) => {
    let newSelectedList = [...selectedList]
    newSelectedList = newSelectedList.filter(x => x !== id)
    setSelectedList(newSelectedList)
  }

  const handleIngredientChange = (id, text) => {
    const ingredientIndex = ingredientsList.findIndex(ingredient => ingredient.id === id)
    const ingredient = ingredientsList[ingredientIndex]

    if (ingredient.text !== text) {
      const newIngredientsList = [...ingredientsList]
      newIngredientsList[ingredientIndex] = { id, text }
      setIngredientsList(newIngredientsList)
    }
  }

  const handleDeleteIngredient = (id) => {
    const newIngredientsList = ingredientsList.filter(ingredient => ingredient.id !== id)
    setIngredientsList(newIngredientsList)
  }

  const isSelectedListEmpty = selectedList.length === 0

  return (
    <View style={{ flex: 1 }}>

      <FlatList
        ref={refFlatList}
        contentContainerStyle={{ marginLeft: 10, marginRight: 20 }}
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
              handleDelete={handleDeleteIngredient}
            />
          )
        }}
      />
      <AddButton handleAddItem={handleAddIngredient} />

    </View>
  )
}
