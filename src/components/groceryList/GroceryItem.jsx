import { StyleSheet, Text, TextInput, View } from 'react-native'

import { GROCERY_ITEM_HEIGHT } from '../../constants/constants'
import { useGroceryItem } from '../../hooks/useGroceryItem'
import Checkbox from '../Checkbox'
import IconButton from '../IconButton'

export default function GroceryItem (props) {
  const {
    defaultChecked,
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
  } = useGroceryItem(props)

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
    paddingVertical: 8,
    height: GROCERY_ITEM_HEIGHT
  },
  checkbox: {
    marginRight: 16
  },
  text: {
    flex: 1,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginVertical: 4.1
  },
  textInput: {
    flex: 1
  },
  closeIconContainer: {
    height: 25,
    width: 25
  }
})
