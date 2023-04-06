import { useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useFieldArray, useForm } from 'react-hook-form'

import TextInputControlled from '../../components/forms/TextInputControlled'
import { RecipeInputEdit } from '../../components/recipes'

import { NEW_ELEMENT_ID } from '../../constants/constants'
import { INGREDIENTS, NOTES, RECIPE_NAME } from '../../constants/texts/texts'
import RecipeEditHeaderRight from '../../components/recipes/RecipeEditHeaderRight'

const FIELD_DEFAULT_INGREDIENT = { ingredient: '' }

export default function RecipeEditView () {
  const route = useRoute()
  const navigation = useNavigation()
  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      id: NEW_ELEMENT_ID,
      name: '',
      ingredients: [FIELD_DEFAULT_INGREDIENT, FIELD_DEFAULT_INGREDIENT],
      notes: ''
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
  })

  const _recipeNameInput = useRef({})
  const _ingredientsInput = useRef([])
  const _recieNotesInput = useRef({})

  const { recipe: recipeParam } = route.params ?? { recipe: null }

  const focusInput = (index) => {
    if (!index) { return _ingredientsInput.current[0]?.focus() }
    if (index === fields.length) { return _recieNotesInput.current.focus() }
    _ingredientsInput.current[index]?.focus()
  }

  const handleChange = (inputNumber) => {
    const ingredients = getValues('ingredients')
    const isLatIngredient = inputNumber === ingredients.length
    if (isLatIngredient) {
      append(FIELD_DEFAULT_INGREDIENT)
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RecipeEditHeaderRight recipeParam={recipeParam} handleSubmit={handleSubmit} />
      )
    })
    if (recipeParam) {
      const { id, name, notes, ingredients } = recipeParam
      const ingredientFields = ingredients.map(ingredient => ({ ingredient }))
      ingredientFields.push(FIELD_DEFAULT_INGREDIENT)
      reset({
        id,
        name,
        ingredients: ingredientFields,
        notes
      })
    } else {
      setTimeout(() => { _recipeNameInput.current?.focus() }, 100)
    }
  }, [])

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.modalText}>{RECIPE_NAME}</Text>
      <TextInputControlled
        name='name'
        control={control}
        blurOnSubmit={false}
        returnKeyType='next'
        onSubmitEditing={() => focusInput()}
        innerRef={_recipeNameInput}
      />
      <Text style={styles.modalText}>{INGREDIENTS}</Text>
      {fields.map((field, index) => (
        <RecipeInputEdit
          key={field.id}
          index={index}
          fieldNameIngredients='ingredients'
          fieldNameIngredient='ingredient'
          numberOfFields={fields.length}
          remove={remove}
          focusInput={focusInput}
          handleChange={handleChange}
          control={control}
          _ingredientsInput={_ingredientsInput}
        />
      ))}
      <Text style={styles.modalText}>{NOTES}</Text>
      <TextInputControlled
        name='notes'
        control={control}
        multiline
        numberOfLines={10}
        innerRef={_recieNotesInput}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginBottom: 10
  },
  modalText: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16
  }
})
