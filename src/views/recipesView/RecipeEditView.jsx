import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { useRecipes } from '../../hooks/useRecipes'
import Button from '../../components/Button'
import { useFieldArray, useForm } from 'react-hook-form'
import { isNullOrWhiteSpace, capitalizeString } from '../../utils'
import TextInputControlled from '../../components/forms/TextInputControlled'
import IconButton from '../../components/IconButton'
import { NEW_ELEMENT_ID } from '../../constants/constants'

const FIELD_NAME_INGREDIENTS = 'ingredients'
const FIELD_NAME_INGREDIENT = 'ingredient'
const FIELD_NAME_RECIPE = 'name'
const FIELD_DEFAULT_INGREDIENT = { [FIELD_NAME_INGREDIENT]: '' }
const ICON_SIZE = 25

export default function RecipeEditView () {
  const route = useRoute()
  const navigation = useNavigation()
  const { control, handleSubmit, watch, reset } = useForm({
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

  const { recipe } = route.params ?? { recipe: null }

  const focusInput = (index) => {
    index
      ? _ingredientsInput.current[index] && _ingredientsInput.current[index].focus()
      : _ingredientsInput.current[0].focus()
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
    const ingredients = watch(FIELD_NAME_INGREDIENTS)
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
        />
        <Text style={styles.modalText}>Ingredients</Text>
        {fields.map((field, index) => (
          <View key={field.id} style={styles.ingredientsContainer}>
            <TextInputControlled
              style={styles.ingredientTextInput}
              name={`${FIELD_NAME_INGREDIENTS}.${index}.${FIELD_NAME_INGREDIENT}`}
              control={control}
              blurOnSubmit={false}
              returnKeyType='next'
              onSubmitEditing={() => focusInput(index + 1)}
              onChange={() => handleChange(index + 1)}
              innerRef={(input) => { _ingredientsInput.current[index] = input }}
              placeholder='+ Ingredient'
            />
            {fields.length - 1 !== index
              ? <IconButton onPress={() => remove(index)} iconName='close' size={ICON_SIZE} />
              : <View style={styles.iconView} />}
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={handleSubmit(handleSave)}>
          <Text style={styles.textStyle}>Save</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between'
  },
  scrollContainer: {
    marginBottom: 20
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: 'gray'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginTop: 15,
    marginBottom: 5
  },
  ingredientsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  ingredientTextInput: {
    marginRight: 10
  },
  iconView: {
    width: ICON_SIZE
  }
})
