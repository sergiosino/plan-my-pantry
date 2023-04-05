import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { useWeekMenu, useRecipes } from '../../hooks'
import { DayMenu, DayIngredientsForGroceryList } from '../../components/weekMenu'
import Recipe from '../../components/recipes/Recipe'
import Divider from '../../components/Divider'
import DayMenuEditHeaderRight from '../../components/weekMenu/DayMenuEditHeaderRight'
import RecipesSearch from '../../components/weekMenu/RecipesSearch'

export default function DayMenuEditView () {
  const route = useRoute()
  const { dayId } = route.params
  const { getDayMenu, updateRecipeLunch, updateRecipeDinner } = useWeekMenu()
  const { recipes } = useRecipes()
  const navigation = useNavigation()

  const [isLunchSelected, setIsLunchSelected] = useState(true)
  const [recipeSelected, setRecipeSelected] = useState(null)
  const [dayMenu, setDayMenu] = useState({})
  const [dayMenuIngredients, setDayMenuIngredients] = useState([])

  const { dayName, lunch, dinner } = dayMenu

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
    const recipeInfo = id === recipeSelected
      ? null
      : { id, name }
    const updatedDayMenu = { ...dayMenu }

    if (isLunchSelected) {
      updateRecipeLunch(dayId, recipeInfo)
      updatedDayMenu.lunch = recipeInfo
    } else {
      updateRecipeDinner(dayId, recipeInfo)
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
    (lunch || dinner) && isLunchSelected
      ? setRecipeSelected(lunch?.id)
      : setRecipeSelected(dinner?.id)
  }, [isLunchSelected, dayMenu])

  useEffect(() => {
    if (dayName) {
      navigation.setOptions({
        title: dayName
      })
    }
  }, [dayMenu])

  useEffect(() => {
    setDayMenu(getDayMenu(dayId))
    navigation.setOptions({
      headerRight: () => (<DayMenuEditHeaderRight />)
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.dayMenuContainer}>
        <DayMenu
          lunch={lunch?.name}
          dinner={dinner?.name}
          onPressLunch={handlePressLunch}
          onPressDinner={handlePressDinner}
          isLunchSelected={isLunchSelected}
          isDinnerSelected={!isLunchSelected}
        />
        <RecipesSearch />
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
