import { StyleSheet, View } from 'react-native'

import TextInputControlled from '../forms/TextInputControlled'
import IconButton from '../buttons/IconButton'

const ICON_SIZE = 25

export default function RecipeInputEdit (props) {
  const {
    index,
    fieldNameIngredients,
    fieldNameIngredient,
    numberOfFields,
    remove,
    focusInput,
    handleChange,
    control,
    _ingredientsInput
  } = props

  const isLastField = numberOfFields - 1 === index

  return (
    <View style={styles.ingredientsContainer}>
      <TextInputControlled
        style={styles.ingredientTextInput}
        name={`${fieldNameIngredients}.${index}.${fieldNameIngredient}`}
        control={control}
        onChange={() => handleChange(index + 1)}
        innerRef={(input) => { _ingredientsInput.current[index] = input }}
        placeholder='+ Ingredient'
        returnKeyType='next'
        onSubmitEditing={() => focusInput(index + 1)}
        blurOnSubmit={false}
      />
      {isLastField
        ? <View style={styles.iconView} />
        : <IconButton onPress={() => remove(index)} iconName='close' size={ICON_SIZE} />}
    </View>
  )
}

const styles = StyleSheet.create({
  ingredientsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  ingredientTextInput: {
    flex: 1,
    marginRight: 10
  },
  iconView: {
    width: ICON_SIZE
  }
})
