import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { useWeekMenu } from '../../hooks/useWeekMenu'
import DayMenu from '../../components/weekMenu/DayMenu'
import TextInputSyled from '../../components/TextInputSyled'
import { useRecipes } from '../../hooks/useRecipes'
import RecipeItem from '../../components/recipes/RecipeItem'
import Divider from '../../components/Divider'

export default function DayMenuEditView () {
  const route = useRoute()
  const { dayId } = route.params
  const { getDayMenu, updateRecipeLunch, updateRecipeDinner } = useWeekMenu()
  const { recipes } = useRecipes()

  const [isLunchSelected, setIsLunchSelected] = useState(true)
  const [recipeSelected, setRecipeSelected] = useState(null)
  const [dayMenu, setDayMenu] = useState(getDayMenu(dayId))
  const [searchText, setSearchText] = useState('')

  const handlePressLunch = () => {
    if (isLunchSelected) { return }
    setIsLunchSelected(true)
    console.log('handlePressLunch')
  }

  const handlePressDinner = () => {
    if (!isLunchSelected) { return }
    setIsLunchSelected(false)
    console.log('handlePressDinner')
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

  useEffect(() => {
    isLunchSelected
      ? setRecipeSelected(dayMenu.lunch?.id)
      : setRecipeSelected(dayMenu.dinner?.id)
  }, [isLunchSelected])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
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
      <FlatList
        contentContainerStyle={styles.flatListContent}
        initialNumToRender={15}
        data={recipes}
        ItemSeparatorComponent={<Divider />}
        extraData={recipeSelected}
        renderItem={({ item: recipe }) => {
          const { id, name, ingredients, ingredientsName } = recipe
          const isRecipeSelected = recipeSelected === id
          return (
            <View style={!isRecipeSelected && { backgroundColor: 'red' }}>
              <RecipeItem
                id={id}
                name={name}
                ingredients={ingredients}
                ingredientsName={ingredientsName}
                onPress={handlePressRecipe}
                isSelected={isRecipeSelected}
              />
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContent: {
    paddingBottom: 70
  }
})
