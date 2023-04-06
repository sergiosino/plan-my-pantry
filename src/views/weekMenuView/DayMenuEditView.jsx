import { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'

import { DayMenu, DayIngredientsForGroceryList, DayMenuEditHeaderRight, DayMenuRecipesSearch } from '../../components/weekMenu'
import Recipe from '../../components/recipes/Recipe'
import Divider from '../../components/Divider'

import { useRecipes } from '../../hooks'

import * as wmService from '../../services/WeekMenusService'

export default function DayMenuEditView () {
  const route = useRoute()
  const { dayMenu: dayMenuParam } = route.params
  const { recipes, handleGetRecipes, handleSearchRecipes } = useRecipes()
  const navigation = useNavigation()

  const [dayMenu, setDayMenu] = useState(dayMenuParam)
  const [isLunchSelected, setIsLunchSelected] = useState(true)
  const [recipeSelected, setRecipeSelected] = useState(null)
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
    const { dayId } = dayMenu
    const recipeInfo = id === recipeSelected
      ? null
      : { id, name }
    const updatedDayMenu = { ...dayMenu }

    if (isLunchSelected) {
      wmService.putDayMenu(dayId, 'lunch', recipeInfo)
      updatedDayMenu.lunch = recipeInfo
    } else {
      wmService.putDayMenu(dayId, 'dinner', recipeInfo)
      updatedDayMenu.dinner = recipeInfo
    }

    setDayMenu(updatedDayMenu)
    setRecipeSelected(id)
  }

  const handleLongPressRecipe = (pressedRecipe) => {
    const { ingredients } = pressedRecipe
    const allIngredients = [...dayMenuIngredients, ...ingredients]
    const uniqueIngredients = [...new Set(allIngredients)]
    setDayMenuIngredients(uniqueIngredients)
  }

  const renderItem = (recipe) => {
    const { id } = recipe
    const isRecipeSelected = recipeSelected === id
    return (
      <Recipe
        recipe={recipe}
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
  }, [isLunchSelected, dayMenu])

  useEffect(() => {
    const { dayName } = dayMenuParam
    navigation.setOptions({
      title: dayName,
      headerRight: () => (<DayMenuEditHeaderRight />)
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
      handleGetRecipes()
    }, [])
  )

  return (
    <View style={styles.container}>
      <View style={styles.dayMenuContainer}>
        <DayMenu
          lunch={dayMenu.lunch?.name}
          dinner={dayMenu.dinner?.name}
          onPressLunch={handlePressLunch}
          onPressDinner={handlePressDinner}
          isLunchSelected={isLunchSelected}
          isDinnerSelected={!isLunchSelected}
        />
        <DayMenuRecipesSearch handleSearchRecipes={handleSearchRecipes} />
      </View>
      <Divider />
      <FlatList
        initialNumToRender={15}
        maxToRenderPerBatch={40}
        ItemSeparatorComponent={<Divider />}
        data={recipes}
        extraData={recipeSelected}
        renderItem={({ item }) => renderItem(item)}
      />
      <Divider />
      <View style={styles.ingredientsListContainer}>
        <DayIngredientsForGroceryList dayMenuIngredients={dayMenuIngredients} setDayMenuIngredients={setDayMenuIngredients} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dayMenuContainer: {
    marginHorizontal: 10,
    height: 130
  },
  ingredientsListContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    height: 175
  }
})
