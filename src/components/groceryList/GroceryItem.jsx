import { StyleSheet, Text, TextInput, View } from 'react-native'

import Checkbox from '../forms/Checkbox'
import IconButton from '../buttons/IconButton'

import { useGroceryItem } from '../../hooks/useGroceryItem'

export default function GroceryItem (props) {
  const {
    id,
    defaultChecked,
    defaultText,
    isItemToFocus
  } = props

  const {
    text,
    setText,
    showDeleteIcon,
    handleTextFocus,
    handleTextFocusEnd,
    handleCheckboxChange,
    handleDelete
  } = useGroceryItem({ id, defaultChecked, defaultText })

  return (
    <View style={styles.container}>
      <Checkbox
        checked={defaultChecked}
        onChange={handleCheckboxChange}
        style={styles.checkbox}
      />
      {defaultChecked
        ? (
          <Text style={styles.text}>
            {text}
          </Text>
          )
        : (
          <TextInput
            autoFocus={isItemToFocus}
            style={styles.textInput}
            value={text}
            maxLength={40}
            onChangeText={setText}
            onFocus={handleTextFocus}
            onEndEditing={handleTextFocusEnd}
          />
          )}
      {showDeleteIcon && !defaultChecked && <IconButton onPress={handleDelete} iconName='close' />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  checkbox: {
    marginRight: 15
  },
  text: {
    flex: 1,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginVertical: 4.1
  },
  textInput: {
    flex: 1
  }
})
