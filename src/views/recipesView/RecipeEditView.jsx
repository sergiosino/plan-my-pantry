import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { useRecipes } from '../../hooks/useRecipes'
import Button from '../../components/buttons/Button'
import { useFieldArray, useForm } from 'react-hook-form'
import { isNullOrWhiteSpace, capitalizeString } from '../../utils'
import TextInputControlled from '../../components/forms/TextInputControlled'
import { NEW_ELEMENT_ID } from '../../constants/constants'
import RecipeInputEdit from '../../components/recipes/RecipeInputEdit'

const FIELD_NAME_INGREDIENTS = 'ingredients'
const FIELD_NAME_INGREDIENT = 'ingredient'
const FIELD_NAME_RECIPE = 'name'
const FIELD_DEFAULT_INGREDIENT = { [FIELD_NAME_INGREDIENT]: '' }

export default function RecipeEditView () {
  const route = useRoute()
  const navigation = useNavigation()
  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      [FIELD_NAME_RECIPE]: '',
      [FIELD_NAME_INGREDIENTS]: [FIELD_DEFAULT_INGREDIENT, FIELD_DEFAULT_INGREDIENT]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: FIELD_NAME_INGREDIENTS
  })
  const { handleSaveRecipe } = useRecipes()

  const _ingredientsInput = useRef([])
  const _recipeNameInput = useRef({})

  const { recipe } = route.params ?? { recipe: null }

  const focusInput = (index) => {
    index
      ? _ingredientsInput.current[index] && _ingredientsInput.current[index]?.focus()
      : _ingredientsInput.current[0]?.focus()
  }

  const handleSave = (fields) => {
    const newIngredientsFields = fields[FIELD_NAME_INGREDIENTS].filter(field => !isNullOrWhiteSpace(field[FIELD_NAME_INGREDIENT]))
    const ingredients = newIngredientsFields.map(field => capitalizeString(field[FIELD_NAME_INGREDIENT]))
    const updatedRecipe = {
      id: recipe ? recipe.id : NEW_ELEMENT_ID,
      name: fields[FIELD_NAME_RECIPE],
      ingredients
    }
    handleSaveRecipe(updatedRecipe)
    navigation.goBack()
  }

  const handleChange = (inputNumber) => {
    const ingredients = getValues(FIELD_NAME_INGREDIENTS)
    const isLatIngredient = inputNumber === ingredients.length
    if (isLatIngredient) {
      append(FIELD_DEFAULT_INGREDIENT)
    }
  }

  useEffect(() => {
    if (recipe) {
      const ingredientFields = recipe.ingredients.map(ingredient => ({ [FIELD_NAME_INGREDIENT]: ingredient }))
      ingredientFields.push(FIELD_DEFAULT_INGREDIENT)
      reset({
        name: recipe.name,
        [FIELD_NAME_INGREDIENTS]: ingredientFields
      })
    } else {
      setTimeout(() => { _recipeNameInput.current?.focus() }, 100)
    }
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.modalText}>Recipe name</Text>
        <TextInputControlled
          name={FIELD_NAME_RECIPE}
          control={control}
          blurOnSubmit={false}
          returnKeyType='next'
          onSubmitEditing={() => focusInput()}
          innerRef={_recipeNameInput}
        />
        <Text style={styles.modalText}>Ingredients</Text>
        {fields.map((field, index) => (
          <RecipeInputEdit
            key={field.id}
            index={index}
            fieldNameIngredients={FIELD_NAME_INGREDIENTS}
            fieldNameIngredient={FIELD_NAME_INGREDIENT}
            numberOfFields={fields.length}
            remove={remove}
            focusInput={focusInput}
            handleChange={handleChange}
            control={control}
            _ingredientsInput={_ingredientsInput}
          />
        ))}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button onPress={handleSubmit(handleSave)}>
          <Text style={styles.textStyle}>Save</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between'
  },
  scrollContainer: {
    marginBottom: 20
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16
  }
})
