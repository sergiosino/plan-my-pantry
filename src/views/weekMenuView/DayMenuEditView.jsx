import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { useWeekMenu } from '../../hooks/useWeekMenu'
import DayMenu from '../../components/weekMenu/DayMenu'
import TextInputSyled from '../../components/TextInputSyled'
import { useRecipes } from '../../hooks/useRecipes'
import RecipeItem from '../../components/recipes/RecipeItem'
import Divider from '../../components/Divider'
import DayIngredientsForGroceryList from '../../components/weekMenu/DayIngredientsForGroceryList'

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
    const allIngredients = [...dayMenuIngredients, ...ingredients]
    const allIngredientsId = allIngredients.map(ingredient => ingredient.id)
    const uniqueIngredientsId = [...new Set(allIngredientsId)]
    const uniqueIngredients = uniqueIngredientsId.map(uniqueIngredientId => (
      allIngredients.find(ingredient => ingredient.id === uniqueIngredientId)
    ))
    setDayMenuIngredients(uniqueIngredients)
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
        <FlatList
          contentContainerStyle={styles.flatListContent}
          initialNumToRender={15}
          data={recipes}
          ItemSeparatorComponent={<Divider />}
          extraData={recipeSelected}
          renderItem={({ item: recipe }) => {
            const { id, name, ingredients } = recipe
            const isRecipeSelected = recipeSelected === id
            return (
              <RecipeItem
                id={id}
                name={name}
                ingredients={ingredients}
                onPress={handlePressRecipe}
                onLongPress={isRecipeSelected && handleLongPressRecipe}
                isSelected={isRecipeSelected}
              />
            )
          }}
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
  flatListContent: {
    paddingBottom: 70
  },
  dayMenuContainer: {
    marginHorizontal: 10
  },
  recipesListContainer: {
    flex: 1,
    marginTop: 10
  },
  ingredientsListContainer: {
    flex: 0.7,
    marginHorizontal: 10,
    marginTop: 10
  }
})
