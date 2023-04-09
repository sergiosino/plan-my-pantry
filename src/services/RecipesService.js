import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { STORAGE_KEYS } from '../constants/constants'

import { capitalizeString, isNullOrWhiteSpace, areObjectsEqual } from '../utils'
import { RECIPES_MOCKUP } from '../constants/mockups'

const { RECIPES_LIST } = STORAGE_KEYS

/**
 * Returns the list of recipes arrange alphabetically by name
 * @param {object[]} newRecipes
 * @returns {object[]}
 */
function sortRecipes (newRecipes) {
  newRecipes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  return newRecipes
}

/**
 * Updates the recipes in async storage
 * @param {object[]} newRecipes
 */
function updateRecipes (newRecipes) {
  const jsonValue = JSON.stringify(newRecipes)
  AsyncStorage.setItem(RECIPES_LIST, jsonValue)
}

/**
 * Remove incorrect ingredients such as white spaced or nulls and capitalize them.
 * Returns the recipe with the correct ingredients.
 * @param {object} recipe
 * @returns {object}
 */
function cleanRecipeIngredients (recipe) {
  let ingredients = recipe.ingredients.filter(ingredient => !isNullOrWhiteSpace(ingredient))
  ingredients = ingredients.map(ingredient => capitalizeString(ingredient))
  return {
    ...recipe,
    ingredients
  }
}

/**
 * Returns the recipes saved in async storage if there are some.
 * If not, returns a MOCK of recipes for the first time
 * @returns {object[]}
 */
export async function getRecipes () {
  const storageRecipes = await AsyncStorage.getItem(RECIPES_LIST)
  return storageRecipes
    ? JSON.parse(storageRecipes)
    : RECIPES_MOCKUP
}

/**
 * Returns an array of recipes filtered by name
 * @param {string} filter
 * @returns {object[]}
 */
export async function getRecipesFiltered (filter) {
  const recipes = await getRecipes()
  const recipesFiltered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(filter.toLowerCase())
  )
  return recipesFiltered
}

/**
 * Add a new recipe and sort the new list.
 * Returns the new recipe list sorted.
 * @param {object} recipe
 * @returns {object[]}
 */
export async function pushRecipe (recipe) {
  recipe.id = uuid.v4()
  const cleanedRecipe = cleanRecipeIngredients(recipe)
  const recipes = await getRecipes()
  const newRecipes = [...recipes, cleanedRecipe]
  const newRecipesSorted = sortRecipes(newRecipes)
  updateRecipes(newRecipesSorted)
  return newRecipesSorted
}

/**
 * Updates a recipe if the existing one is different.
 * The new recipe ingredients are cleaned and the new recipe list sorted.
 * Returns the new recipes list if there are any change, or the last one if not.
 * @param {number} id
 * @param {object} recipe
 * @returns {object[]}
 */
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

/**
 * Delete a recipe from the list and returns the new recipes list
 * @param {number} id
 * @returns {object[]}
 */
export async function deleteRecipe (id) {
  const recipes = await getRecipes()
  const newRecipes = recipes.filter(recipe => recipe.id !== id)
  updateRecipes(newRecipes)
  return newRecipes
}
