import { useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useFieldArray, useForm } from 'react-hook-form'

import Button from '../../components/buttons/Button'
import TextInputControlled from '../../components/forms/TextInputControlled'
import { RecipeInputEdit } from '../../components/recipes'

import * as rService from '../../services/RecipesService'

import { NEW_ELEMENT_ID } from '../../constants/constants'

const FIELD_NAME_ID = 'id'
const FIELD_NAME_INGREDIENTS = 'ingredients'
const FIELD_NAME_INGREDIENT = 'ingredient'
const FIELD_NAME_RECIPE = 'name'
const FIELD_NAME_NOTES = 'notes'
const FIELD_DEFAULT_INGREDIENT = { [FIELD_NAME_INGREDIENT]: '' }

export default function RecipeEditView () {
  const route = useRoute()
  const navigation = useNavigation()
  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      [FIELD_NAME_ID]: NEW_ELEMENT_ID,
      [FIELD_NAME_RECIPE]: '',
      [FIELD_NAME_INGREDIENTS]: [FIELD_DEFAULT_INGREDIENT, FIELD_DEFAULT_INGREDIENT],
      [FIELD_NAME_NOTES]: ''
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: FIELD_NAME_INGREDIENTS
  })

  const _recipeNameInput = useRef({})
  const _ingredientsInput = useRef([])
  const _recieNotesInput = useRef({})

  const { recipe } = route.params ?? { recipe: null }

  const focusInput = (index) => {
    if (!index) { return _ingredientsInput.current[0]?.focus() }
    if (index === fields.length) { return _recieNotesInput.current.focus() }
    _ingredientsInput.current[index]?.focus()
  }

  const handleSave = async (fields) => {
    const ingredients = fields[FIELD_NAME_INGREDIENTS].map(field => field[FIELD_NAME_INGREDIENT])
    const updatedRecipe = {
      id: fields[FIELD_NAME_ID],
      name: fields[FIELD_NAME_RECIPE],
      ingredients,
      notes: fields[FIELD_NAME_NOTES]
    }
    recipe
      ? await rService.putRecipe(updatedRecipe.id, updatedRecipe)
      : await rService.pushRecipe(updatedRecipe)
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
        [FIELD_NAME_ID]: recipe.id,
        [FIELD_NAME_RECIPE]: recipe.name,
        [FIELD_NAME_INGREDIENTS]: ingredientFields,
        [FIELD_NAME_NOTES]: recipe.notes
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
        <Text style={styles.modalText}>Notes</Text>
        <TextInputControlled
          name={FIELD_NAME_NOTES}
          control={control}
          multiline
          numberOfLines={10}
          innerRef={_recieNotesInput}
        />
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
    justifyContent: 'space-between'
  },
  scrollContainer: {
    paddingHorizontal: 15,
    marginBottom: 10
  },
  buttonsContainer: {
    paddingHorizontal: 15,
    marginBottom: 10
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
