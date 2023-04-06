import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { ASYNC_STORAGE_KEYS } from '../constants/constants'
import { areObjectsEqual } from '../utils/areObjectsEqual'
import { capitalizeString, isNullOrWhiteSpace } from '../utils'

const { RECIPES_LIST } = ASYNC_STORAGE_KEYS

function sortRecipes (newRecipes) {
  newRecipes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  return newRecipes
}

function updateRecipes (newRecipes) {
  const jsonValue = JSON.stringify(newRecipes)
  AsyncStorage.setItem(RECIPES_LIST, jsonValue)
}

function cleanRecipeIngredients (recipe) {
  let ingredients = recipe.ingredients.filter(ingredient => !isNullOrWhiteSpace(ingredient))
  ingredients = ingredients.map(ingredient => capitalizeString(ingredient))
  return {
    ...recipe,
    ingredients
  }
}

export async function getRecipes () {
  const recipes = await AsyncStorage.getItem(RECIPES_LIST)
  return recipes
    ? JSON.parse(recipes)
    : []
}

export async function getRecipesFiltered (filter) {
  const recipes = await getRecipes()
  const recipesFiltered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(filter.toLowerCase())
  )
  return recipesFiltered
}

export async function pushRecipe (recipe) {
  recipe.id = uuid.v4()
  const cleanedRecipe = cleanRecipeIngredients(recipe)
  const recipes = await getRecipes()
  const newRecipes = [...recipes, cleanedRecipe]
  const newRecipesSorted = sortRecipes(newRecipes)
  updateRecipes(newRecipesSorted)
  return newRecipesSorted
}

export async function putRecipe (id, recipe) {
  const cleanedRecipe = cleanRecipeIngredients(recipe)
  const recipes = await getRecipes()
  const recipeIndex = recipes.findIndex(recipe => recipe.id === id)
  const areRecipesEqual = areObjectsEqual(cleanedRecipe, recipes[recipeIndex])
  if (!areRecipesEqual) {
    const newRecipes = [...recipes]
    newRecipes[recipeIndex] = cleanedRecipe
    const newRecipesSorted = sortRecipes(newRecipes)
    updateRecipes(newRecipesSorted)
    return newRecipesSorted
  }
  return recipes
}

export async function deleteRecipe (id) {
  const recipes = await getRecipes()
  const newRecipes = recipes.filter(recipe => recipe.id !== id)
  updateRecipes(newRecipes)
  return newRecipes
}
