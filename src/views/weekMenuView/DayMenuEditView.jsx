import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { useWeekMenu } from '../../hooks/useWeekMenu'
import DayMenu from '../../components/weekMenu/DayMenu'
import TextInputSyled from '../../components/TextInputSyled'
import { useRecipes } from '../../hooks/useRecipes'
import Recipe from '../../components/recipes/Recipe'
import Divider from '../../components/Divider'
import DayIngredientsForGroceryList from '../../components/weekMenu/DayIngredientsForGroceryList'
import { capitalizeString } from '../../utils/capitalizeString'

export default function DayMenuEditView () {
  const route = useRoute()
  const { dayId } = route.params
  const { getDayMenu, updateRecipeLunch, updateRecipeDinner } = useWeekMenu()
  const { recipes } = useRecipes()

  const [isLunchSelected, setIsLunchSelected] = useState(true)
  const [recipeSelected, setRecipeSelected] = useState(null)
  const [dayMenu, setDayMenu] = useState(getDayMenu(dayId))
  const [searchText, setSearchText] = useState('')
  const [dayMenuIngredients, setDayMenuIngredients] = useState([])

  const handlePressLunch = () => {
    if (isLunchSelected) { return }
    setIsLunchSelected(true)
  }

  const handlePressDinner = () => {
    if (!isLunchSelected) { return }
    setIsLunchSelected(false)
  }

  const handlePressRecipe = (recipe) => {
    const { id, name } = recipe
    const recipeInfo = { id, name }
    const updatedDayMenu = { ...dayMenu }

    if (isLunchSelected) {
      updateRecipeLunch(dayId, recipeInfo)
      updatedDayMenu.lunch = recipeInfo
    } else {
      updateRecipeDinner(dayId, { id, name })
      updatedDayMenu.dinner = recipeInfo
    }

    setDayMenu(updatedDayMenu)
    setRecipeSelected(id)
  }

  const handleLongPressRecipe = (pressedRecipe) => {
    const { ingredients } = pressedRecipe
    let ingredientsArray = ingredients.split(',')
    ingredientsArray = ingredientsArray.map(ingredient => capitalizeString(ingredient))

    const allIngredients = [...dayMenuIngredients, ...ingredientsArray]
    const uniqueIngredients = [...new Set(allIngredients)]
    setDayMenuIngredients(uniqueIngredients)
  }

  const renderItem = (recipe, recipeSelectedId) => {
    const { id, name, ingredients } = recipe
    const isRecipeSelected = recipeSelectedId === id
    return (
      <Recipe
        id={id}
        name={name}
        ingredients={ingredients}
        onPress={handlePressRecipe}
        onLongPress={isRecipeSelected && handleLongPressRecipe}
        isSelected={isRecipeSelected}
      />
    )
  }

  useEffect(() => {
    isLunchSelected
      ? setRecipeSelected(dayMenu.lunch?.id)
      : setRecipeSelected(dayMenu.dinner?.id)
  }, [isLunchSelected])

  return (
    <View style={styles.container}>
      <View style={styles.dayMenuContainer}>
        <DayMenu
          onPressLunch={handlePressLunch}
          onPressDinner={handlePressDinner}
          dayMenu={dayMenu}
          isLunchSelected={isLunchSelected}
          isDinnerSelected={!isLunchSelected}
        />
        <TextInputSyled
          value={searchText}
          onChangeText={setSearchText}
          placeholder='Search...'
        />
      </View>
      <View style={styles.recipesListContainer}>
        <Divider />
        <FlatList
          initialNumToRender={15}
          maxToRenderPerBatch={40}
          ItemSeparatorComponent={<Divider />}
          data={recipes}
          extraData={recipeSelected}
          renderItem={({ item }) => renderItem(item, recipeSelected)}
        />
      </View>
      <Divider />
      <View style={styles.ingredientsListContainer}>
        <DayIngredientsForGroceryList dayMenuIngredients={dayMenuIngredients} setDayMenuIngredients={setDayMenuIngredients} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  dayMenuContainer: {
    marginHorizontal: 10
  },
  recipesListContainer: {
    flex: 1,
    marginTop: 10
  },
  ingredientsListContainer: {
    flex: 0.5,
    marginHorizontal: 10,
    marginTop: 10
  }
})
