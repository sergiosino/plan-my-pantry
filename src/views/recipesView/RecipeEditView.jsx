import { useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useFieldArray, useForm } from 'react-hook-form'

import TextInputControlled from '../../components/forms/TextInputControlled'
import { RecipeInputEdit } from '../../components/recipes'
import RecipeEditHeaderRight from '../../components/recipes/RecipeEditHeaderRight'

import { i18n } from '../../utils'

import { NEW_ELEMENT_ID } from '../../constants/constants'

const FIELD_DEFAULT_INGREDIENT = { ingredient: '' }

/**
 * Recipe edit and add form
 */
export default function RecipeEditView () {
  const route = useRoute()
  const navigation = useNavigation()
  /**
   * Initialization of recipe form with default values and two blank ingredients
   */
  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      id: NEW_ELEMENT_ID,
      name: '',
      ingredients: [FIELD_DEFAULT_INGREDIENT, FIELD_DEFAULT_INGREDIENT],
      notes: ''
    }
  })
  /**
   * Ingredients form array
   */
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
  })

  const _recipeNameInput = useRef({})
  const _ingredientsInput = useRef([])
  const _recieNotesInput = useRef({})

  const { recipe: recipeParam } = route.params ?? { recipe: null }

  /**
   * Focus the next input.
   * If there is not index, focus the first ingredient input.
   * If the index is the las input field, will focus the notes input.
   * @param {number} index
   */
  const focusInput = (index) => {
    if (!index) { return _ingredientsInput.current[0]?.focus() }
    if (index === fields.length) { return _recieNotesInput.current.focus() }
    _ingredientsInput.current[index]?.focus()
  }

  /**
   * Add new ingredient input if the user writes in the last one
   * @param {number} inputNumber
   */
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
    /**
     * If there are params, initialize the form inputs with them.
     * Else focus the first input (recipe name) after some ms
     */
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
      <Text style={styles.modalText}>{i18n.t('RECIPES.RECIPE_NAME')}</Text>
      <TextInputControlled
        name='name'
        control={control}
        blurOnSubmit={false}
        returnKeyType='next'
        onSubmitEditing={() => focusInput()}
        innerRef={_recipeNameInput}
      />
      <Text style={styles.modalText}>{i18n.t('RECIPES.INGREDIENTS')}</Text>
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
      <Text style={styles.modalText}>{i18n.t('RECIPES.NOTES')}</Text>
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
